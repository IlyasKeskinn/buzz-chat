import Lottie from "lottie-react";
import logo from "../../../public/logo.json";
import React from "react";
const PageLoading = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="w-max-[760px] flex flex-col justify-center items-center">
        <Lottie animationData={logo} />
      </div>
    </div>
  );
};

export default PageLoading;
