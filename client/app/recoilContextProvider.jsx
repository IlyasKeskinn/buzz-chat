"use client";

import { Toaster } from "@/components/ui/toaster";
import { useInitializeUser } from "@/hooks/useInitializeUser";
import { RecoilRoot } from "recoil";

const RecoilContextProvider = ({ children }) => {
  return (
    <RecoilRoot>
      <InitializeUser />
      {children}
      <Toaster />
    </RecoilRoot>
  );
};

export default RecoilContextProvider;

const InitializeUser = () => {
  useInitializeUser();
  return null;
};
