import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuthContext } from "./AuthContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

interface User {
  username: string;
  email: string;
  password: string;
  currentWorkspace: string;
}
interface UserState {
  userData: {
    id: string;
    username: string;
    email: string;
    avatar: string;
    currentWorkspace: string;
  };
  setUserData: (
    id: string,
    username: string,
    email: string,
    avatar: string,
    currentWorkspace: string
  ) => void;
  updateUser: (user: User) => void;
}

export let userContext = createContext<UserState | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("useAppContext must be used within an UserContextProvider");
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserContextProvider: React.FC<UserProviderProps> = ({
  children,
}) => {
  const { token } = useAuthContext();
  const [userData, setUserData] = useState<any>(token ? "loading" : null);
  const updateUser = async (user: User) => {
    try {
      const { id } = jwtDecode<any>(token); // Decode the token and get the ID
      const response = await axios.put(
        `https://worknest-server-eight.vercel.app/api/user`,
        user,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const { username, email, avatar, currentWorkspace } = response.data; // Destructure the response data

      setUserData({ id, username, email, avatar, currentWorkspace }); // Set the user data in state
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUserData(null); // Reset user data if there is an error
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      setUserData("loading");
      try {
        const { id } = jwtDecode<any>(token); // Decode the token and get the ID
        const response = await axios.get(
          `https://worknest-server-eight.vercel.app/api/user`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const { username, email, avatar, currentWorkspace } = response.data; // Destructure the response data

        setUserData({ id, username, email, avatar, currentWorkspace }); // Set the user data in state
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserData(null); // Reset user data if there is an error
      }
    };

    if (token) {
      fetchUserData(); // Call the async function
    } else {
      setUserData(null);
    }
  }, [token]);

  return (
    <userContext.Provider
      value={{
        userData,
        setUserData,
        updateUser,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
