import Lottie from "lottie-react";
import logo from "../../public/logo.json";
const Empty = () => {
  return (
    <div className="md:flex md:order-3 border-l border-slate-900/10 border-b border-b-bee hidden max-w-[100%] w-full md:max-h-[100%] h-[100%] bg-background">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="h-96 w-96">
          <Lottie animationData={logo} />
        </div>
        <div>
          <p className="text-3xl font-medium">Start buzzing! 🐝</p>
        </div>
      </div>
    </div>
  );
};

export default Empty;
