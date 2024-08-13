"use client";
import Lottie from "lottie-react";
import logo from "../../../public/logo.json";
import SignUpForm from "@/components/shared/theme/Forms/SignUpForm";

const SignUp = () => {
  return (
    <main>
      <section className="px-5">
        <div className="flex justify-center items-center min-h-screen">
          <div className="flex justify-center items-center flex-col gap-8">
            <div className="w-96 flex justify-center items-center">
              <Lottie animationData={logo} />
              <h4 className="text-4xl pe-16">Buzzys</h4>
            </div>
            <div className="w-96 px-4 ">
              <SignUpForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SignUp;
