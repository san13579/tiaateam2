import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { message } from "antd";

import { loginAction } from "../Store/login-slice";
import logo from "../assets/image/logo.png";
import IMDB from "../assets/image/IMDB.png";

import { TbLogin } from "react-icons/tb";
import { BiSearchAlt } from "react-icons/bi";
import { BiCameraMovie } from "react-icons/bi";
import { TbChairDirector } from "react-icons/tb";
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";
import { BiGridSmall } from "react-icons/bi";
import { GiMusicalScore } from "react-icons/gi";

export const Navbar = ({ setType, setInputValue, inputValue }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.login);
  const [isMenu, setIsMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [isFilter, setIsFilter] = useState(false);
  const [filterName, setFilterName] = useState("movies");

  const signupHandler = () => {
    navigate("/signup");
  };

  const loginHandler = () => {
    navigate("/login");
  };

  const logOutHandler = () => {
    dispatch(loginAction.logout());
    message.success(" Logout Successful ");
    navigate("/home");
  };

  return (
    <>
      <nav
        className={`w-full h-auto relative  shadow-lg flex flex-row px-12 py-[15px] justify-between font-cairo z-[45] bg-[#232323]  max-lg:px-6 navbar text-lg`}
      >
        <Link to="/home">
          <div className={`flex flex-row items-center brand `}>
            <div className="w-16 h-16 "></div>
            <div className="flex flex-col justify-center">
              <div className="font-bold font-mono text-4xl text-black dark:text-white max-sm:text-2xl max-sm:leading-5">
                <img src={IMDB} alt="CPC Logo" className="w-40" />
              </div>
            </div>
          </div>
        </Link>

        <div class="hero bg-gredient-dark flex flex-col items-center justify-center px-2 ">
          <div class="w-full sm:w-full md:w-full lg:w-3/4 xl:w-3/4 ">
            <div class="flex flex-row border-2 rounded-full border-white">
              <span
                onClick={() => setIsFilter(!isFilter)}
                className="flex w-[100px] cursor-pointer items-center justify-center rounded-full text-white border-0 hover:text-[#fee227] px-3 font-bold text-grey-100"
              >
                <motion.div whileHover={{ scale: 1.15 }}>
                  {filterName === "all" && (
                    <BiGridSmall className=" h-12 w-12 " />
                  )}
                  {filterName === "movies" && (
                    <BiCameraMovie className=" h-8 w-8 " />
                  )}
                  {filterName === "actor" && <FaMale className=" h-6 w-6 " />}
                  {filterName === "actress" && (
                    <FaFemale className=" h-6 w-6 " />
                  )}
                  {filterName === "director" && (
                    <TbChairDirector className=" h-8 w-6 " />
                  )}
                  {filterName === "genre" && (
                    <GiMusicalScore className=" h-8 w-6 " />
                  )}
                </motion.div>

                {isFilter && (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="absolute z-10 top-16 w-225 p-4 gap-4 bg-card shadow-lg rounded-lg backdrop-blur-sm flex flex-col"
                  >
                    <p
                      className="flex flex-row gap-2 items-center justify-center text-textColor hover:bg-[#fee227] hover:rounded-full p-2 hover:font-bold duration-150 transition-all ease-in-out text-xl text-center cursor-pointer"
                      onClick={() => {
                        setFilterName("all");
                        setType("all");
                      }}
                    >
                      <BiGridSmall className=" h-8 w-8 " /> All
                    </p>
                    <p
                      className="flex flex-row gap-2 items-center justify-center text-textColor hover:bg-[#fee227] hover:rounded-full p-2 hover:font-bold duration-150 transition-all ease-in-out text-xl text-center cursor-pointer"
                      onClick={() => {
                        setFilterName("movies");
                        setType("movies");
                      }}
                    >
                      <BiCameraMovie className=" h-8 w-8 " /> Movies
                    </p>
                    <p
                      className="flex flex-row gap-2 items-center justify-center text-textColor hover:bg-[#fee227] hover:rounded-full p-2 hover:font-bold duration-150 transition-all ease-in-out text-xl text-center cursor-pointer"
                      onClick={() => {
                        setFilterName("actor");
                        setType("actor");
                      }}
                    >
                      <FaMale className=" h-6 w-6 " /> Actor
                    </p>
                    <p
                      className="flex flex-row gap-2 items-center justify-center text-textColor hover:bg-[#fee227] hover:rounded-full p-2 hover:font-bold duration-150 transition-all ease-in-out text-xl text-center cursor-pointer"
                      onClick={() => {
                        setFilterName("actress");
                        setType("actress");
                      }}
                    >
                      <FaFemale className=" h-6 w-6 " />
                      Actress
                    </p>
                    <p
                      className="flex flex-row gap-2 items-center justify-center text-textColor hover:bg-[#fee227] hover:rounded-full p-2 hover:font-bold duration-150 transition-all ease-in-out text-xl text-center cursor-pointer"
                      onClick={() => {
                        setFilterName("director");
                        setType("director");
                      }}
                    >
                      <TbChairDirector className=" h-8 w-6 " />
                      Director
                    </p>
                    <p
                      className="flex flex-row gap-2 items-center justify-center text-textColor hover:bg-[#fee227] hover:rounded-full p-2 hover:font-bold duration-150 transition-all ease-in-out text-xl text-center cursor-pointer"
                      onClick={() => {
                        setFilterName("genre");
                        setType("genre");
                      }}
                    >
                      <GiMusicalScore className=" h-8 w-6 " />
                      Genre
                    </p>
                  </motion.div>
                )}
              </span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="h-16 border font-bold w-[1000px] py-1 px-2 outline-none text-xl "
                type="text"
                placeholder="Search One-CINEFLIX"
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    setInputValue(search);
                  }
                }}
              />
              <span className="flex items-center   border-0 px-3 font-bold text-grey-100 rounded-full">
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  className="bg-gredient-dark hover:bg-gredient-light text-lg text-black font-bold py-2 px-4"
                >
                  <BiSearchAlt
                    onClick={() => {
                      setInputValue(search);
                    }}
                    className="h-8 w-8 text-white hover:text-[#fee227]"
                  />
                </motion.button>
              </span>
            </div>
          </div>
        </div>

        <div
          className={`flex flex-row justify-center items-center gap-4 font-normal dark:text-white max-lg:gap-5 max-md:gap-8 max-vs:gap-4 parentFormNavigator `}
        >
          {!userData.isLogin && (
            <div className="flex flex-row gap-2">
              <motion.button
                whileHover={{ scale: 1.15, x: 2 }}
                onClick={loginHandler}
                className={`max-md:hidden text-xl bg-gray-800 formNavigator hover:bg-[#fee227] border-2 border-white  hover:text-black px-8 py-2 rounded-full mx-1 my-2 font-bold`}
              >
                <TbLogin className="md:hidden" />
                Login
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.15, x: 2 }}
                onClick={signupHandler}
                className={`max-md:hidden text-xl bg-gray-800 formNavigator hover:bg-[#fee227] border-2 border-white  hover:text-black px-8 py-2 rounded-full mx-1 my-2 font-bold`}
              >
                <TbLogin className="md:hidden" />
                Register
              </motion.button>
            </div>
          )}
          {userData.isLogin && (
            <div
              onMouseEnter={() => setIsMenu(true)}
              onMouseLeave={() => setIsMenu(false)}
              className={`flex items-center ml-auto cursor-pointer gap-2 relative`}
            >
              <img
                src={userData.image_url}
                className="w-12 h-12 min-w-[44px] object-cover  rounded-full shadow-lg"
                alt=""
                referrerPolicy="no-referrer"
              />{" "}
              <h1 className="text-2xl hover:text-headingColor font-semibold text-gray-200">
                {userData.username}
              </h1>
              {isMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  className="absolute z-10 top-12 right-0 w-225 p-4 gap-4 bg-card shadow-lg rounded-lg backdrop-blur-sm flex flex-col"
                >
                  {userData.username === "Deokumar12" && (
                    <NavLink to={"/dashboard/home"}>
                      <p className="text-textColor hover:font-bold duration-150 transition-all ease-in-out text-xl text-center">
                        Dashboard
                      </p>
                    </NavLink>
                  )}

                  <p
                    className=" text-textColor hover:font-bold duration-150 transition-all ease-in-out text-xl text-center"
                    onClick={logOutHandler}
                  >
                    Logout
                  </p>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
};
