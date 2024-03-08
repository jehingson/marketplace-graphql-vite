"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeApp = void 0;
require("dotenv/config");
// graqhl
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const apollo_server_express_1 = require("apollo-server-express");
const graphql_1 = require("../app/graphql");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importStar(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const http = __importStar(require("http"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const jsonwebtoken_1 = require("jsonwebtoken");
const data_source_1 = require("./data-source");
// import router from "../api/routes"
const status_enum_1 = require("../app/enum/status.enum");
const initializeApp = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    let httpServer = null;
    app.use(body_parser_1.default.json());
    app.use((0, cors_1.default)());
    app.use((0, helmet_1.default)());
    app.use((0, express_fileupload_1.default)());
    app.use((0, morgan_1.default)("dev"));
    // app.use(router())
    const PORT = process.env.PORT || 30001;
    app.get("/ping", (_req, res) => {
        console.log("somene pinged here!!");
        res.send("Pong");
    });
    // if (appConfig.https) {
    //   const certName = appConfig.name.toLowerCase().replace(/\s/g, '-');
    //   const key = fs.readFileSync(`/etc/ssl/${certName}.key`);
    //   const cert = fs.readFileSync(`/etc/ssl/${certName}.crt`);
    //   httpServer = https.createServer(
    //     {
    //       key,
    //       cert,
    //     },
    //     app
    //   );
    // } else {
    //   httpServer = http.createServer(app);
    // }
    httpServer = http.createServer(app);
    const startApolloServer = () => __awaiter(void 0, void 0, void 0, function* () {
        const server = new server_1.ApolloServer({
            typeDefs: graphql_1.typeDefs,
            resolvers: graphql_1.resolvers,
            csrfPrevention: true,
            plugins: [(0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
            formatError: (err) => {
                // Don't give the specific errors to the client.
                if (err.message.startsWith("Database Error: ")) {
                    return new Error("Internal server error");
                }
                // Otherwise return the original error. The error can also
                // be manipulated in other ways, as long as it's returned.
                return err;
            },
        });
        yield server.start();
        app.use("/graphql", (0, cors_1.default)(), (0, body_parser_1.json)(), (0, express4_1.expressMiddleware)(server, {
            context: ({ req }) => __awaiter(void 0, void 0, void 0, function* () {
                if (!req)
                    throw new apollo_server_express_1.AuthenticationError("you must be logged in");
                const Query = req.body.query;
                if (req.body.operationName === "IntrospectionQuery" ||
                    Query.includes("getAccessToken"))
                    return {};
                const appShortName = process.env.SHORT_NAME.toUpperCase();
                if (Query.includes("register") ||
                    Query.includes("login") ||
                    Query.includes("googleRegister") ||
                    Query.includes("productsPublic")) {
                    const accessToken = req.header(`x-${appShortName}-access-token`);
                    try {
                        (0, jsonwebtoken_1.verify)(accessToken, process.env.JWT_SECRET);
                        return {};
                    }
                    catch (error) {
                        throw new apollo_server_express_1.AuthenticationError("invalid token access");
                    }
                }
                try {
                    const header = req.header(`x-${appShortName}-auth-token`);
                    const tokenVerifiedContent = (0, jsonwebtoken_1.verify)(header, process.env.JWT_SECRET);
                    if (!tokenVerifiedContent)
                        throw new apollo_server_express_1.AuthenticationError("invalid token auth");
                    const model = (yield Promise.resolve(`${`../app/models/${tokenVerifiedContent.modelName}.model`}`).then(s => __importStar(require(s))).then((md) => Object.values(md)[0]));
                    const tokenModel = (yield Promise.resolve(`${`../app/models/${tokenVerifiedContent.modelName}-token.model`}`).then(s => __importStar(require(s))).then((md) => Object.values(md)[0]));
                    const repository = data_source_1.AppDataSource.getRepository(model);
                    const tokenRepository = data_source_1.AppDataSource.getRepository(tokenModel);
                    const token = yield tokenRepository.findOne({
                        where: {
                            authToken: header,
                            status: status_enum_1.Status.Active,
                        },
                    });
                    if (!token)
                        throw new apollo_server_express_1.AuthenticationError("invalid token auth");
                    const account = yield repository.findOne({
                        where: {
                            id: tokenVerifiedContent.id,
                        },
                    });
                    if (!account)
                        throw new apollo_server_express_1.AuthenticationError("invalid token auth");
                    return {
                        account,
                        authToken: header,
                    };
                }
                catch (error) {
                    throw new apollo_server_express_1.AuthenticationError("invalid token auth");
                }
            }),
        }));
        console.log(`apollo server is running at https://sandbox.apollo.dev/?endpoint=http://localhost:${PORT}/graphql`);
    });
    startApolloServer();
    yield new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
});
exports.initializeApp = initializeApp;
