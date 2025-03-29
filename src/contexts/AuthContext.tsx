"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { User, UserProfile, UserCredentials } from "@/types";
import { authService } from "@/services/auth-service";

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  login: (credentials: UserCredentials) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  // localStorage'dan kullanıcı bilgisini kontrol et
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Kullanıcı giriş yapmışsa profil bilgilerini yükle
      if (parsedUser.isLoggedIn) {
        fetchUserProfile();
      }
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const profileData = await authService.getUserProfile();
      setProfile(profileData);
    } catch (error) {
      console.error("Profil bilgileri yüklenirken hata oluştu:", error);
    }
  };

  const login = async (credentials: UserCredentials): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await authService.login(credentials);

      if (response.status) {
        const userData: User = {
          userId: credentials.userId,
          isLoggedIn: true,
        };

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));

        // Profil bilgilerini yükle
        await fetchUserProfile();

        setIsLoading(false);
        return true;
      }

      setIsLoading(false);
      return false;
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, profile, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
