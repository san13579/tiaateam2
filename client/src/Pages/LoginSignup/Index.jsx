import React, { useState } from "react";
import mobimg from "../../assets/image/mobimg.png";
import video from "../../assets/video/1.mp4";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { useDispatch } from "react-redux";
import { loaderAction } from "../../Store/loader-slice";

export const LoginSignUp = () => {
  const [first, setFirst] = useState(false);
  const dispatch = useDispatch();
  if (first === false) {
    dispatch(loaderAction.changeLoaderStateTrue());
  }
  return (
    <div className="relative min-w-[300px] w-screen h-screen ">
      <img
        src={mobimg}
        alt=""
        onLoadedData={() => {
          dispatch(loaderAction.changeLoaderStateFalse());
          setFirst(true);
        }}
        className="w-full h-full card-zoom-image overflow-hidden md:hidden contrast-125 brightness-75"
      />

      <video
        src={video}
        type="video/mp4"
        loop
        autoPlay
        onLoadedData={() => {
          dispatch(loaderAction.changeLoaderStateFalse());
          setFirst(true);
        }}
        className="w-full h-full object-fill max-md:hidden contrast-125 brightness-75"
      />

      {window.location.pathname === "/login" && <Login />}
      {window.location.pathname === "/signup" && <Signup />}
    </div>
  );
};
