// react
import type { FC, ReactNode } from 'react';
import { createContext, useEffect, useReducer } from 'react';

// types
import type { User } from '../types/user';

interface State {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: User | null;
}

interface AuthContextValue extends State {
  platform: 'JWT';
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

type InitializeAction = {
  type: 'INITIALIZE';
  payload: {
    isAuthenticated: boolean;
    user: User | null;
  };
};

type LoginAction = {
  type: 'LOGIN';
  payload: {
    user: User;
  };
};

type UpdateAction = {
  type: 'UPDATE_USER';
  payload: {
    user: User;
  };
};

type LogoutAction = {
  type: 'LOGOUT';
};

type RegisterAction = {
  type: 'REGISTER';
  payload: {
    user: User;
  };
};

type Action =
  | InitializeAction
  | LoginAction
  | LogoutAction
  | RegisterAction
  | UpdateAction;

const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers: Record<string, (state: State, action: Action) => State> = {
  INITIALIZE: (state: State, action: InitializeAction): State => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state: State, action: LoginAction): State => {
    const { user } = action.payload;
    
    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  UPDATE_USER: (state: State, action: UpdateAction): State => {
    const { user } = action.payload;

    return {
      ...state,
      user,
    };
  },
  LOGOUT: (state: State): State => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state: State, action: RegisterAction): State => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state: State, action: Action): State =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext<AuthContextValue>({
  ...initialState,
  platform: 'JWT',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  updateUser: () => Promise.resolve(),
});

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const localUser = localStorage.getItem('user')
      ? JSON.parse(localStorage?.getItem('user') ?? '{}')
      : null;

    if (token && localUser) {
      const user = {
        ...localUser,
        token,
      };
      dispatch({
        type: 'INITIALIZE',
        payload: {
          user,
          isAuthenticated: true,
        },
      });
    } else {
      dispatch({
        type: 'INITIALIZE',
        payload: {
          user: null,
          isAuthenticated: false,
        },
      });
    }
  }, []);

  const login = async (user: User): Promise<void> => {
    localStorage.setItem('authToken', user.token);
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({
      type: 'LOGIN',
      payload: {
        user,
      },
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateUser = async (user: User): Promise<void> => {
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({
      type: 'UPDATE_USER',
      payload: {
        user,
      },
    });
  };

  const logout = async (): Promise<void> => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        platform: 'JWT',
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
