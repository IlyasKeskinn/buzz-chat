"use client";
import { useLottie } from "lottie-react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import { fetchRoutes } from "@/constants";
import { useRouter } from "next/navigation";
import logo from "../../../public/logo.json";
import axios from "axios";

const Login = () => {
  const router = useRouter();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName: name, email, photoURL: profileImage },
    } = await signInWithPopup(firebaseAuth, provider);

    try {
      const { data } = await axios.post(fetchRoutes.checkUser, { email });
      if (!data.status) {
        router.push("/sign-up");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const options = {
    animationData: logo,
    loop: true,
  };
  const { View } = useLottie(options);
  return (
    <>
      <main>
        <section className="px-5">
          <div className="flex justify-center items-center min-h-screen">
            <div className="flex justify-center items-center flex-col gap-8">
              <div className="w-96 flex justify-center items-center">
                {View}
                <h4 className="text-4xl pe-16">Buzzys</h4>
              </div>
              <div className="w-80 ">
                <div className="flex justify-center items-center ">
                  <Button
                    onClick={handleLogin}
                    className="py-7 px-10 rounded-xl text-xl"
                  >
                    <FcGoogle className="text-4xl mx-4" />
                    Login with Google
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;
