import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  SetStateAction,
} from "react";
import axios from "axios";
import toast from "react-hot-toast";

export interface UserData {
  id: number;
  username: string;
  email: string;
}

interface UserAuthFields {
  username: string;
  password: string;
}

interface AuthContextType {
  user: UserData | null;
  login: (UserAuthFields: UserAuthFields) => void;
  logout: () => void;
  signup: (signup: SignUpFields) => void;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>
}

interface SignUpFields {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  username: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const init = async () => {
      const res = await fetch("http://localhost:8000/", {
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
    };
    init();
  }, []);

  // Function to set the user when logged in
  const login = (user: UserAuthFields) => {
    const loginapi = async (user: UserAuthFields) => {
      const apiUrl = `${process.env.REACT_APP_BASE_URL}/auth/login`;
      const data = { username: user.username, password: user.password };
      const csrftoken = document.cookie.split("csrftoken=")[1];
      try {
        const apiResponsePromise = axios.post(apiUrl, data, {
          headers: {
            "X-CSRFToken": csrftoken,
          },
          withCredentials: true,
        });
        const resprm = toast.promise(apiResponsePromise, {
          loading: "Logging in...",
          success: "Logged in",
          error: "Invalid crendentials",
        });
        const res = await resprm;
        console.log(res.data);
        setUser({
          id: res.data.id,
          email: res.data.email,
          username: res.data.username,
        });
      } catch (err) {}
    };
    loginapi({ username: user.username, password: user.password });
  };

  // Function to remove the user when logged out
  const logout = () => {
    try{
      const apiUrl = `${process.env.REACT_APP_BASE_URL}/auth/logout`;
      const responsePrm = axios.get(apiUrl, { withCredentials: true });
      toast.promise(responsePrm, {
        loading: "Logging out...",
        success: "Logged out successfully",
        error: "error while logging off",
      });
    } catch(err) {}
    setUser(null);
  };

  const signup = ({
    first_name,
    last_name,
    email,
    password,
    username,
  }: SignUpFields) => {
    const init = async () => {
      if (!first_name || !last_name || !email || !password || !username) {
        toast.error("All fields are required");
      }
      const apiUrl = `${process.env.REACT_APP_BASE_URL}/auth/signup`;
      const csrftoken = document.cookie.split("csrftoken=")[1];
      const data = {
        first_name: first_name,
        password: password,
        username: username,
        email: email,
        last_name: last_name,
      };

      try {
        const apiResponsePromise = axios.post(apiUrl, data, {
          headers: {
            "X-CSRFToken": csrftoken,
          },
          withCredentials: true,
        });
        const resprm = toast.promise(apiResponsePromise, {
          loading: "Signing in...",
          success: "Signed in",
          error: "Validation failure",
        });
        const res = await resprm;
        console.log(res.data);
        setUser({
          id: res.data.id,
          username: res.data.username,
          email: res.data.email,
        });
      } catch (err) {}
    };
    init();
  };

  console.log("render of auth context");

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContext;
};

export default AuthProvider;
