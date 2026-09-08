"use client";
import { LoginValues } from "@/app/(auth)/lib/authSchemas";
import { User } from "@/app/types";
import {
  getUserApi,
  logoutApi,
  signinApi,
  signupApi,
} from "@/services/authServices";
import { authTpe, AuthUserType } from "@/services/types";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { toast } from "sonner";

type AuthState = {
  user: AuthUserType | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: unknown;
};

type AuthContextValue = {
  signup: (value: authTpe) => void;
  signin: (value: LoginValues) => void;
  logout: () => void;
  user: AuthUserType | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: unknown;
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};
const AuthContext = createContext<AuthContextValue>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  signin: () => {},
  signup: () => {},
  logout: () => {},
});

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
  const [{ error, isAuthenticated, isLoading, user }, dispatch] = useReducer(
    authReducer,
    initialState,
  );

  const router = useRouter();

  const signup = async (values: authTpe) => {
    dispatch({ type: "loading" });

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
    dispatch({ type: "loading" });

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

  async function getUser() {
    dispatch({ type: "loading" });
    try {
      const {
        data: { user },
      } = await getUserApi();
      dispatch({ type: "user/loaded", payload: user });
    } catch (err: any) {
      const error = err?.response?.data?.message;
      dispatch({ type: "rejected", payload: error });
    }
  }
  async function logout() {
    try {
      await logoutApi();
      router.push("/");
      dispatch({ type: "logout" });
    } catch (error: any) {
      toast.error(error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      await getUser();
    }
    fetchData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        error,
        isAuthenticated,
        isLoading,
        user,
        signin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("not found Auth context");
  return useContext(AuthContext);
}
