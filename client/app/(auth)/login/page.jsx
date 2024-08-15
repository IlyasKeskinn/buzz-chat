"use client";
import { useLottie } from "lottie-react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { checkUser } from "@/lib/actions/user.actions";
import { useToast } from "@/components/ui/use-toast";
import userAtom from "@/atom/userAtom";
import logo from "../../../public/logo.json";

const Login = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useRecoilState(userAtom);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName: name, email, photoURL: profileImage },
    } = await signInWithPopup(firebaseAuth, provider);

    const auth = firebaseAuth.currentUser;
    try {
      const checkedUser = await checkUser(email);
      if (!checkedUser) {
        localStorage.setItem(
          "user",
          JSON.stringify({ newUser: true, userInfo: { email: email } })
        );
        setUser({ newUser: true, userInfo: { email: email } });
        router.push("/sign-up");
      }
      if (checkedUser) {
        localStorage.setItem(
          "user",
          JSON.stringify({ newUser: false, userInfo: checkedUser })
        );
        setUser({ newUser: false, userInfo: checkedUser });
        router.push("/");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Something went wrong.",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };

  const options = {
    animationData: logo,
    loop: true,
  };
  const { View } = useLottie(options);
  return (
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
  );
};

export default Login;
