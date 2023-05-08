import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import moment from "moment";
import { BsStarFill } from "react-icons/bs";
import bg from "../assets/image/mobimg.png";
import { getOneMovie } from "../api";
import { detailsAction } from "../Store/details-slice";
export const MovieCard = ({ data, index }) => {
  const login = useSelector((state) => state.login);
  const allData = useSelector((state) => state.movie);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const detailsHandler = () => {
    if (login.isLogin) {
      getOneMovie(data._id).then((res) => {
        let actordetails = [],
          actressdetails = [],
          directordetails = [];
        allData.allActors.map((e) => {
          if (e.name === res.data.movie.actor) {
            actordetails.push(e);
          }
        });
        allData.allActress.map((e) => {
          if (e.name === res.data.movie.actress) {
            actressdetails.push(e);
          }
        });

        res.data.movie.directors.map((n) => {
          allData.allDirectors.map((o) => {
            if (n === o.name) {
              directordetails.push(o);
            }
          });
        });
        dispatch(
          detailsAction.addDetails({
            title: res.data.movie.title,
            image_url: res.data.movie.image_url,
            trailer_url: res.data.movie.trailer_url,
            actor: actordetails,
            actress: actressdetails,
            description: res.data.movie.Villan,
            releaseDate: moment(new Date(res.data.movie.releaseDate)).format(
              "MMMM Do YYYY"
            ),
            movie_duration: res.data.movie.movie_duration,
            budget: res.data.movie.budget,
            official_collection: res.data.movie.official_collection,
            likes: res.data.movie.likes,
            dislikes: res.data.movie.dislikes,
            ratings: res.data.movie.ratings_per_user,
            awards: res.data.movie.awards,
            tags: res.data.movie.tags,
            directors: directordetails,
            genre: res.data.movie.genre,
            reviews: res.data.movie.reviews,
            _id: res.data.movie._id,
          })
        );
      });
      navigate(`/movie/${data._id}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative w-[275px] h-[670px] bg-[#171717] shadow-md flex flex-col  hover:shadow-2xl m-8"
    >
      <div className=" h-[400px] drop-shadow-lg relative items-center overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={data.image_url}
          className="w-[275px] h-[400px] object-cover"
        />
      </div>
      <div className="flex flex-row">
        <div className="flex flex-row px-2 gap-1 py-2 m-4">
          <p className="text-[#fee227] text-2xl">⭐</p>
          <p className="text-gray-600 font-sans text-2xl font-bold">
            {data.ratings_per_user[0]}
          </p>
        </div>
      </div>
      <p className="flex items-center justify-center text-center">
        <span className="text-3xl text-center text-white my-2">
          {data.title}
        </span>
      </p>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex items-center justify-center my-4"
        onClick={detailsHandler}
      >
        <button className=" h-[50px] w-[200px] rounded-md hover:bg-[#232323] text-2xl text-white bg-[#000000]">
          More Info
        </button>
      </motion.div>
    </motion.div>
  );
};
