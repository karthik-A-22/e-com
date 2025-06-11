// src/context/CommonProvider.jsx
import React from "react";
import { AuthProvider } from "./AuthContext";
import { CartProvider } from "./CartContext";

const CommonProvider = ({ children }) => {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
};

export default CommonProvider;
