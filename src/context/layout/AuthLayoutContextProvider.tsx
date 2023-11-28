"use client";

import { User, UserMembership } from "@prisma/client";
import React from "react";

type AuthLayoutContextValue = {
  userDetails: {
    user: User;
    membership: UserMembership | null;
  };
};

type AuthLayoutContextType = AuthLayoutContextValue;

export const AuthLayoutContext =
  React.createContext<AuthLayoutContextType | null>(null);

const AuthLayoutContextProvider = ({
  value,
  children,
}: {
  value: AuthLayoutContextValue;
  children: React.ReactNode;
}) => {
  const contextValue = value;

  return (
    <AuthLayoutContext.Provider value={contextValue}>
      {children}
    </AuthLayoutContext.Provider>
  );
};

export const useAuthLayoutContext = () =>
  React.useContext(AuthLayoutContext) as AuthLayoutContextType;

export default AuthLayoutContextProvider;
