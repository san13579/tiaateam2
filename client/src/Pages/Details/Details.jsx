import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useParams } from "react-router-dom";

import { GiFilmSpool } from "react-icons/gi";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import { BsWatch } from "react-icons/bs";
import { detailsAction } from "../../Store/details-slice";
import {
  getOneMovie,
  userDislikeById,
  userLikeById,
  likeById,
  dislikeById,
  movieReview,
  userReview,
  ratingMovie,
  ratingUser,
  getUserById,
  watchlistById,
} from "../../api";
import { Navbar } from "../../components/Navbar";
import { loginAction } from "../../Store/login-slice";

const removeElement = (arr, element) => {
  const index = arr.indexOf(element);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
};

export const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [watchlist, setWatchlist] = useState(false);
  const [ratings, setRatings] = useState(0);
  const [like, setLike] = useState(null);
  const allDetails = useSelector((state) => state.details);
  const allData = useSelector((state) => state.movie);
  const login = useSelector((state) => state.login);

  const likesHandler = () => {
    let likeArray = [...login.likes, allDetails.title];
    if (like === null) {
      console.log(allDetails._id, login._id);
      likeById(allDetails._id, allDetails.likes + 1).catch((e) =>
        console.log("likebyID: ", e)
      );
      userLikeById(login._id, likeArray).catch((e) =>
        console.log("userLikebyID: ", e)
      );
    }
    if (like === false) {
      let dislikeArray = [];
      login.dislikes.forEach((e) => {
        if (e !== allDetails.title) {
          dislikeArray.push(e);
        }
      });
      dislikeById(allDetails._id, allDetails.dislikes - 1).catch((e) =>
        console.log("DislikebyID: ", e)
      );
      likeById(allDetails._id, allDetails.likes + 1).catch((e) =>
        console.log("likebyID: ", e)
      );
      userDislikeById(login._id, dislikeArray).catch((e) =>
        console.log("userDislikebyID: ", e)
      );
      userLikeById(login._id, likeArray).catch((e) =>
        console.log("userLikebyID: ", e)
      );
    }
    setLike(true);
  };

  const dislikeHandler = () => {
    let dislikeArray = [...login.dislikes, allDetails.title];
    if (like === null) {
      dislikeById(allDetails._id, allDetails.dislikes + 1).catch((e) =>
        console.log("DislikebyID: ", e)
      );
      userDislikeById(login._id, dislikeArray).catch((e) =>
        console.log("userDislikebyID: ", e)
      );
    }
    if (like === true) {
      let likeArray = [];

      login.likes.forEach((e) => {
        if (e !== allDetails.title) {
          likeArray.push(e);
        }
      });
      dislikeById(allDetails._id, allDetails.dislikes + 1).catch((e) =>
        console.log("DislikebyID: ", e)
      );
      likeById(allDetails._id, allDetails.likes - 1).catch((e) =>
        console.log("likebyID: ", e)
      );
      userDislikeById(login._id, dislikeArray).catch((e) =>
        console.log("userDislikebyID: ", e)
      );
      userLikeById(login._id, likeArray).catch((e) =>
        console.log("userLikebyID: ", e)
      );
    }
    setLike(false);
  };

  useEffect(() => {
    login.ratings.map((e) => {
      if (e.movie_id === allDetails.title) {
        setRatings(e.rating);
      }
    });
  });

  useEffect(() => {
    getOneMovie(id).then((res) => {
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

      login.likes.map((e) => {
        if (e === res.data.movie.title) {
          setLike(true);
        }
      });

      login.dislikes.map((e) => {
        if (e === res.data.movie.title) {
          setLike(false);
        }
      });

      login.ratings.map((e) => {
        if (e.movie_id === allDetails.title) {
          setRatings(e.rating);
        }
      });

      login.watchlist.map((e) => {
        if (e === res.data.movie.title) {
          setWatchlist(true);
        }
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
    }, []);
  });

  const CommentHandler = (event) => {
    if (event.key === "Enter") {
      movieReview(allDetails._id, [
        ...allDetails.reviews,
        { user_id: login.username, comment: inputValue },
      ]).catch((e) => {
        console.log(e);
      });

      userReview(login._id, [
        ...login.reviews,
        { movie_id: allDetails.title, review: inputValue },
      ]).catch((e) => {
        console.log(e);
      });

      setInputValue("");
    }
  };

  const changeRatingHandler = (prevRating, newRating) => {
    if (prevRating !== 0) {
      let loginArray = [];
      let movieArray = [...allDetails.ratings];
      login.ratings.map((e) => {
        if (e.movie_id === allDetails.title) {
          loginArray.push({ movie_id: allDetails.title, rating: newRating });
        }
        loginArray.push(e);
      });
      const newMovieArray = removeElement(movieArray, prevRating);
      newMovieArray.push(newRating);
      ratingMovie(allDetails._id, newMovieArray);
      ratingUser(login._id, loginArray).then((e) => {
        getUserById(login._id).then((res) => {
          if (res) {
            dispatch(loginAction.logout());
            dispatch(
              loginAction.addLogin({
                username: res.data.user.userName,
                image_url: res.data.user.image_url,
                likes: res.data.user.likes,
                dislikes: res.data.user.dislike,
                reviews: res.data.user.reviews,
                ratings: loginArray,
                _id: res.data.user._id,
                watchlist: res.data.watchlist,
              })
            );
          }
        });
      });
    }
    if (prevRating === 0) {
      ratingMovie(allDetails._id, [...allDetails.ratings, newRating]);
      ratingUser(login._id, [
        ...login.ratings,
        {
          movie_id: allDetails.title,
          rating: newRating,
        },
      ]).then((e) => {
        getUserById(login._id).then((res) => {
          if (res) {
            dispatch(loginAction.logout());
            dispatch(
              loginAction.addLogin({
                username: res.data.user.userName,
                image_url: res.data.user.image_url,
                likes: res.data.user.likes,
                dislikes: res.data.user.dislike,
                reviews: res.data.user.reviews,
                ratings: [
                  ...login.ratings,
                  {
                    movie_id: allDetails.title,
                    rating: newRating,
                  },
                ],
                _id: res.data.user._id,
                watchlist: res.data.watchlist,
              })
            );
          }
        });
      });
    }
  };

  const watchlistUpdateHandler = () => {
    if (login.watchlist !== []) {
      watchlistById(login._id, [...login?.watchlist, allDetails.title]).then(
        (e) => {
          getUserById(login._id).then((res) => {
            if (res) {
              dispatch(loginAction.logout());
              dispatch(
                loginAction.addLogin({
                  username: res.data.user.userName,
                  image_url: res.data.user.image_url,
                  likes: res.data.user.likes,
                  dislikes: res.data.user.dislike,
                  reviews: res.data.user.reviews,
                  ratings: res.data.user.ratings,
                  _id: res.data.user._id,
                  watchlist: [...login?.watchlist, allDetails.title],
                })
              );
            }
          });
        }
      );
    } else {
      watchlistById(login._id, [allDetails.title]).then((e) => {
        getUserById(login._id).then((res) => {
          if (res) {
            dispatch(loginAction.logout());
            dispatch(
              loginAction.addLogin({
                username: res.data.user.userName,
                image_url: res.data.user.image_url,
                likes: res.data.user.likes,
                dislikes: res.data.user.dislike,
                reviews: res.data.user.reviews,
                ratings: res.data.user.ratings,
                _id: res.data.user._id,
                watchlist: [allDetails.title],
              })
            );
          }
        });
      });
    }

    setWatchlist(true);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-row">
        <div className="flex flex-col h-screen fixed top-0 w-1/3 left-0 bg-[#0d0d0d] mt-24">
          {/* Poster */}
          <div className=" flex items-center justify-center">
            <img
              src={allDetails.image_url}
              alt="movie"
              className="w-[350px] h-[500px] mt-16"
            />
          </div>
          {/* title */}
          <div className="flex items-center justify-center">
            <h2 className="text-3xl p-4 text-white font-semibold">
              {allDetails.title}
            </h2>
          </div>
          {/* Release Data, Duration */}
          <div className="flex flex-col gap-2 mt-8">
            <div className="relative flex flex-row text-lg p-2 text-white">
              <h3 className="absolute left-24 text-xl font-serif text-white">
                🎬 Release Date
              </h3>
              <h3 className="absolute flex flex-row gap-2 right-24 text-xl font-serif text-white">
                <GiFilmSpool />
                Duration
              </h3>
            </div>
            <div className="relative flex flex-row text-lg p-2 text-[#fee227]">
              <h3 className="absolute left-24 text-xl font-serif">
                {allDetails.releaseDate}
              </h3>
              <h3 className="absolute right-24 text-xl font-serif">
                {allDetails.movie_duration}
              </h3>
            </div>
          </div>
          {/*likes,dislikes,ratings,watchlist */}
          <div className="text-white p-4  ">
            <div className="flex flex-row gap-24 p-4 mt-8 ml-16">
              <button
                onClick={likesHandler}
                className={`flex flex-row gap-2  ${
                  like === true
                    ? "bg-blue-500 text-white border-transparent"
                    : "text-blue-500 border-blue-500"
                }  font-semibold py-2 px-4 border rounded text-2xl`}
              >
                <BiLike className="w-[35px] h-[35px]" /> {allDetails.likes}
              </button>
              <button
                onClick={dislikeHandler}
                className={`flex flex-row gap-2  ${
                  like === false
                    ? "bg-red-500 text-white border-transparent"
                    : "border-red-500 text-red-500"
                } font-semibold hover: py-2 px-4 border rounded text-2xl`}
              >
                <BiDislike className="w-[35px] h-[35px]" />{" "}
                {allDetails.dislikes}
              </button>
              <button
                className={`flex flex-row gap-2  bg-green-500  font-semibold text-white py-2 px-4 border border-green-500 border-transparent rounded text-2xl`}
              >
                <AiFillStar className="w-[35px] h-[35px] " />{" "}
                {(
                  allDetails.ratings.reduce((acc, num) => acc + num, 0) /
                  allDetails.ratings.length
                ).toFixed(2)}
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 mt-2">
              <div
                className={`flex flex-row items-center justify-center gap-2 cursor-pointer w-[100px] h-[50px] font-semibold text-black border  border-transparent rounded text-2xl`}
              >
                <AiFillStar
                  className={`w-[35px] h-[50px]  ${
                    ratings === 1 || ratings > 1
                      ? "text-yellow-500"
                      : "text-white"
                  } `}
                  onClick={() => {
                    changeRatingHandler(ratings, 1);
                    setRatings(1);
                  }}
                />
              </div>
              <div
                className={`flex flex-row items-center justify-center gap-2 cursor-pointer w-[100px] h-[50px] font-semibold text-black border  border-transparent rounded text-2xl`}
              >
                <AiFillStar
                  className={`w-[35px] h-[50px] ${
                    ratings === 2 || ratings > 2
                      ? "text-yellow-500"
                      : "text-white"
                  } `}
                  onClick={() => {
                    changeRatingHandler(ratings, 2);
                    setRatings(2);
                  }}
                />
              </div>
              <div
                className={`flex flex-row items-center justify-center gap-2 cursor-pointer w-[100px] h-[50px] font-semibold text-black border  border-transparent rounded text-2xl`}
              >
                <AiFillStar
                  className={`w-[35px] h-[50px] ${
                    ratings === 3 || ratings > 3
                      ? "text-yellow-500"
                      : "text-white"
                  }`}
                  onClick={() => {
                    changeRatingHandler(ratings, 3);
                    setRatings(3);
                  }}
                />
              </div>
              <div
                className={`flex flex-row items-center justify-center gap-2 cursor-pointer w-[100px] h-[50px] font-semibold text-black border  border-transparent rounded text-2xl`}
              >
                <AiFillStar
                  className={`w-[35px] h-[50px] ${
                    ratings === 4 || ratings > 4
                      ? "text-yellow-500"
                      : "text-white"
                  }`}
                  onClick={() => {
                    changeRatingHandler(ratings, 4);
                    setRatings(4);
                  }}
                />
              </div>
              <div
                className={`flex flex-row items-center justify-center gap-2 cursor-pointer   w-[100px] h-[50px] font-semibold text-black border  border-transparent rounded text-2xl`}
              >
                <AiFillStar
                  className={`w-[35px] h-[50px] ${
                    ratings === 5 ? "text-yellow-500" : "text-white"
                  }`}
                  onClick={() => {
                    changeRatingHandler(ratings, 5);
                    setRatings(5);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="fixed top-0 right-0 w-2/3 h-full overflow-y-auto text-white bg-black gap-4">
          <div className="flex flex-col items-center justify-center gap-4 ">
            {/*trailer */}
            <div className="flex items-center justify-center mt-32 p-4">
              <iframe
                width="960"
                height="540"
                src={allDetails.trailer_url}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            {/*tags */}
            <div className="flex flex-row gap-10 items-center justify-center">
              {allDetails.tags.map((e) => {
                return (
                  <div className="px-2 py-2 gap-2 bg-transparent hover:bg-white text-gray-200 font-semibold hover:text-black  border border-white hover:border-transparent rounded text-2xl">
                    {e}
                  </div>
                );
              })}
            </div>
            {/*description */}
            <div className="flex font-semibold text-xl p-4 items-center justify-center">
              <h1 className="w-[900px]">{allDetails.description}</h1>
            </div>
            {/* Watchlist Button */}
            <button
              className={`flex justify-center items-center w-72 h-16 gap-2 ${
                watchlist === true
                  ? "bg-orange-500 text-white border-transparent disabled:true disabled:opacity-50 disabled:cursor-not-allowed"
                  : "text-orange-500  border-orange-500 cursor-pointer"
              }   font-semibold py-2 px-4 border-2 rounded text-2xl`}
              onClick={watchlistUpdateHandler}
            >
              <BsWatch className="w-[35px] h-[35px] " />{" "}
              {watchlist === true ? "Added to watchlist" : "Add to watchlist"}
            </button>
            {/*Stars */}
            <div className="flex flex-col font-semibold text-xl  gap-4 items-center justify-center p-4">
              <h1 className="text-3xl text-blue-300">Stars</h1>
              <div className="flex flex-row gap-8 items-center justify-center">
                <div className="flex flex-wrap flex-col h-[370px] drop-shadow-lg relative items-center overflow-hidden ">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    src={allDetails.actor[0]?.image_url}
                    className="w-[225px] h-[300px] object-cover"
                  />
                  <p className="flex items-center justify-center text-center">
                    <span className="text-3xl font-mono text-center text-blue-300 mt-2">
                      {allDetails.actor[0]?.name}
                    </span>
                  </p>
                </div>
                <div className="flex flex-wrap flex-col h-[370px] drop-shadow-lg relative items-center overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    src={allDetails.actress[0]?.image_url}
                    className="w-[225px] h-[300px] object-cover"
                  />
                  <p className="flex items-center justify-center text-center">
                    <span className="text-3xl font-mono text-center text-blue-300 mt-2">
                      {allDetails.actress[0]?.name}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            {/*Directors */}
            <div className="flex flex-col font-semibold text-xl gap-4 items-center justify-center p-4">
              <h1 className="text-3xl text-yellow-300">Directors</h1>
              <div className="flex flex-row gap-8 items-center justify-center">
                {allDetails.directors.map((e) => {
                  return (
                    <div className="flex flex-wrap flex-col h-[370px] drop-shadow-lg relative items-center overflow-hidden">
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        src={e.image_url}
                        className="w-[225px] h-[300px] object-cover"
                      />
                      <p className="flex items-center justify-center text-center">
                        <span className="text-3xl font-mono text-center text-yellow-300 mt-2">
                          {e.name}
                        </span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            {/*Comments*/}
            <div className="flex flex-col mb-8">
              <h1 className="mx-12 text-bold font-sans text-3xl">Comments</h1>
              <div className="flex flex-row gap-4 mx-16 mt-4 ">
                <img
                  src={login.image_url}
                  className="w-16 h-16 min-w-[44px] object-cover  rounded-full shadow-lg"
                  alt=""
                  referrerPolicy="no-referrer"
                />
                <input
                  className="rounded-full p-4 w-[1200px] text-black font-bold "
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  placeholder="Type your Comment"
                  onKeyDown={CommentHandler}
                />
              </div>
              <div className="flex flex-col gap-2 mx-40 mt-4 ">
                {allDetails.reviews.map((e) => {
                  return (
                    <div className="">
                      <h1 className="font-semibold text-xl text-yellow-300">
                        {e.user_id}
                      </h1>
                      <h1 className="mx-2">{e.comment}</h1>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
