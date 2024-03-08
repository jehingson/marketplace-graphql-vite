import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Status } from "../enum/status.enum";
import { Roles } from "../enum/roles.enum";
import { AccountsToken } from "./accounts-token.model";
import { Products } from "./products.model";
import { Orders } from "./orders.modal";



@Entity()
export class Accounts extends BaseEntity {
  @PrimaryColumn({
    length: 36,
  })
  id: string;

  @Column()
  username: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: Roles,
    default: Roles.Client,
  })
  role: Roles;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.Active,
  })
  status: Status;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => AccountsToken, accountToken => accountToken.account)
  tokens: AccountsToken[];

  @OneToMany(() => Products, product => product.account)
  products: Products[];

  @OneToMany(() => Orders, order => order.account)
  orders: Orders[];

}
