import { firebaseAuth } from "@/utils/FirebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Logout = () => {
  const router = useRouter();
  useEffect(() => {
    signOut(firebaseAuth);
    router.push("/login");
  }, []);
  return <div></div>;
};

export default Logout;
