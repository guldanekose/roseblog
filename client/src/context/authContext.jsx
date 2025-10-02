// client/src/context/authContext.jsx
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const sanitizeUser = (user) => {
  if (!user || typeof user !== "object") return null;
  // Backend'in döndürdüğü user objesine göre sadece gerekli alanları al:
  // örn: id, username, email -- backend'in gönderdiği alanları kontrol et
  return {
    id: user.id ?? null,
    username: user.username ?? user.name ?? null,
    email: user.email ?? null,
    // token vs gerekiyorsa ekle: token: user.token
  };
};

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  const login = async (inputs) => {
    try {
      const res = await axios.post("/api/auth/login", inputs, {
        // Eğer backend httpOnly cookie set ediyorsa withCredentials: true gerekebilir
        // withCredentials: true,
      });

      // debug: backend'in ne döndürdüğünü görmek için
      console.log("login response:", res.data);

      // sanitize edip sadece JSON-serializable alanları sakla
      const safeUser = sanitizeUser(res.data);
      setCurrentUser(safeUser);
      return safeUser;
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await axios.post("/api/auth/logout" /* , { withCredentials: true } */);
    } catch (err) {
      console.warn("Logout request failed:", err);
      // yine de local state temizleyebiliriz
    } finally {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    try {
      // sadece JSON-serializable safe object'i saklıyoruz
      localStorage.setItem("user", JSON.stringify(currentUser));
    } catch (err) {
      console.warn("Could not save user to localStorage:", err);
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
