import userAtom from "@/atom/userAtom";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

export const useInitializeUser = () => {
  const setUser = useSetRecoilState(userAtom);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, [setUser]);
};


