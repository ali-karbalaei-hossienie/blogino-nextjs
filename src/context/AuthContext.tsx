import { LoginValues } from "@/app/(auth)/lib/authSchemas";
import { signinApi, signupApi } from "@/services/authServices";
import { authTpe } from "@/services/types";
import { createContext, ReactNode, useReducer } from "react";
import { toast } from "sonner";

type AuthState = {
  user: unknown;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: unknown;
};

type AuthContextValue = {
  signup: (value: authTpe) => void;
  signin: (value: LoginValues) => void;

  state: AuthState;
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const authReducer = (state: AuthState, action: any): AuthState => {
  switch (action.type) {
    case "signup": {
      return {
        user: action.payload,
        isAuthenticated: true,
        error: null,
        isLoading: false,
      };
    }
    case "signin": {
      return {
        user: action.payload,
        isAuthenticated: true,
        error: null,
        isLoading: false,
      };
    }
    case "loading": {
      return {
        user: null,
        isAuthenticated: false,
        error: null,
        isLoading: true,
      };
    }
    case "rejected": {
      return {
        user: null,
        isAuthenticated: false,
        error: action.payload,
        isLoading: true,
      };
    }
    case "user/loaded":
      return {
        user: action.payload,
        isAuthenticated: true,
        error: null,
        isLoading: false,
      };
    case "logout":
      return {
        user: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
      };
    default:
      throw new Error("Unknown action!");
  }
};

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const signup = async (values: authTpe) => {
    try {
      const {
        data: { message, user },
      } = await signupApi(values);

      dispatch({ type: "signup", payload: user });
      toast.success(message);
      // router.push("/profile");
    } catch (err: any) {
      const error = err?.response?.data?.message;
      dispatch({ type: "rejected", payload: error });
      toast.error(error);
    }
  };

  const signin = async (values: LoginValues) => {
    try {
      const {
        data: { message, user },
      } = await signinApi(values);

      dispatch({ type: "signin", payload: user });
      toast.success(message);
      // router.push("/profile");
    } catch (err: any) {
      const error = err?.response?.data?.message;
      dispatch({ type: "rejected", payload: error });
      toast.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ signup, state, signin }}>
      {children}
    </AuthContext.Provider>
  );
}
