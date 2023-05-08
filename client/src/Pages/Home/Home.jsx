import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Carousel from "react-elastic-carousel";

import { MovieCard } from "../../components/MovieCard";
import { Details } from "../Details/Details";
import { movieAction } from "../../Store/movie-slice";
import {
  getAllActors,
  getAllActress,
  getAllDirector,
  getAllGenre,
  getAllMovie,
} from "../../api";
import { Navbar } from "../../components/Navbar";

const breakPoints = [{ width: 1800, itemsToShow: 1 }];

export const Home = () => {
  const [type, setType] = useState("all");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [randomElements, setRandomElements] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const allData = useSelector((state) => state.movie);
  const login = useSelector((state) => state.login);

  useEffect(() => {
    getAllMovie().then((res) => {
      dispatch(movieAction.addMovies(res.data.movies));
    });
    getAllActors().then((res) => {
      dispatch(movieAction.addActors(res.data.actors));
    });
    getAllActress().then((res) => {
      dispatch(movieAction.addActress(res.data.actress));
    });
    getAllDirector().then((res) => {
      dispatch(movieAction.addDirectors(res.data.directors));
    });
    getAllGenre().then((res) => {
      dispatch(movieAction.addGenre(res.data.genres));
    });
  }, []);

  useEffect(() => {
    let allMovies = [];
    allMovies.push(allData.allMovies);
    const shuffledArr = allMovies.sort(() => 0.5 - Math.random());
    const selected = shuffledArr.slice(0, 5);
    setRandomElements(selected);
  }, []);

  const moviesArray = () => {
    let moviesArray = [];
    allData.allMovies?.map((e) => {
      if (inputValue === "") {
        return moviesArray.push(e);
      }
      if (
        inputValue !== "" &&
        inputValue?.toLowerCase().replace(/\s/g, "") ===
          e.title
            ?.toLowerCase()
            .replace(/\s/g, "")
            .substring(0, inputValue.length)
      ) {
        return moviesArray.push(e);
      }
    });
    return moviesArray;
  };

  const watchlistArray = () => {
    let watchlistArray = [];
    allData.allMovies?.map((e) => {
      console.log(login, e.title);
      return login.watchlist?.includes(e.title) ? watchlistArray.push(e) : null;
    });
    return watchlistArray;
  };

  const genreArray = (data) => {
    let genreArray = [];
    allData.allMovies?.map((e) => {
      return e.genre?.includes(data.name) ? genreArray.push(e) : null;
    });
    return genreArray;
  };

  const directorArray = (data) => {
    let directorArray = [];
    allData.allMovies?.map((e) => {
      return e.directors.includes(data.name) ? directorArray.push(e) : null;
    });
    return directorArray;
  };

  const actorArray = (data) => {
    let actorArray = [];
    allData.allMovies?.map((e) => {
      return e.actor.includes(data.name) ? actorArray.push(e) : null;
    });
    return actorArray;
  };

  const actressArray = (data) => {
    let actressArray = [];
    allData.allMovies?.map((e) => {
      return e.actress.includes(data.name) ? actressArray.push(e) : null;
    });
    return actressArray;
  };

  return (
    <>
      <Navbar
        setType={setType}
        setInputValue={setInputValue}
        inputValue={inputValue}
      />
      <div className="flex flex-col items-center justify-center shadow-lg bg-black w-full h-full">
        {/* Highlighter */}
        {type === "all" && inputValue === "" && (
          <Carousel
            breakPoints={breakPoints}
            enableAutoPlay
            autoPlaySpeed={10000}
          >
            {allData.allMovies?.map((e) => {
              return (
                <div className="mt-8 bg-black">
                  <iframe
                    width="1800"
                    height="750"
                    src={e.trailer_url}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              );
            })}
          </Carousel>
        )}
        {/* Watchlist */}
        {login.watchlist !== [] && type === "all" && inputValue === "" && (
          <div className="relative w-[1800px] my-4 p-4 gap-4 ">
            <p className="text-2xl text-left ml-12 font-bold my-2 text-white ">
              WatchList...
            </p>
            <div>
              <div>
                <MovieContainerMain data={watchlistArray()} />
              </div>
            </div>
          </div>
        )}
        {/* Main Container Movies */}
        {(type === "all" || type === "movies") && (
          <div className="relative w-[1800px] my-4 p-4 gap-4 ">
            <p className="text-2xl text-left ml-12 font-bold my-2 text-white ">
              Movies You would Like...
            </p>
            <div>
              <div>
                <MovieContainerMain data={moviesArray()} />
              </div>
            </div>
          </div>
        )}

        {/* Directors */}
        {(type === "all" || type === "director") &&
          allData.allDirectors &&
          allData.allDirectors?.map((data, index) => {
            if (inputValue === "") {
              return (
                <div className="relative w-full my-4 p-4 pt-32 pb-14 ">
                  <div>
                    <div className="absolute top-4 left-40 flex items-center gap-4">
                      <img
                        alt=""
                        src={data.image_url}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      <p className="text-lg text-center font-bold my-2 text-white">
                        {data.name}'s Movies
                      </p>
                    </div>
                  </div>
                  <div>
                    <MovieContainerMain data={directorArray(data)} />
                  </div>
                </div>
              );
            }
            if (
              inputValue !== "" &&
              inputValue?.toLowerCase().replace(/\s/g, "") ===
                data.name
                  ?.toLowerCase()
                  .replace(/\s/g, "")
                  .substring(0, inputValue.length)
            ) {
              return (
                <div className="relative w-full my-4 p-4 pt-32 pb-14 ">
                  <div>
                    <div className="absolute top-4 left-40 flex items-center gap-4">
                      <img
                        alt=""
                        src={data.image_url}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      <p className="text-lg text-center font-bold my-2 text-white">
                        {data.name}'s Movies
                      </p>
                    </div>
                  </div>
                  <div>
                    <MovieContainerMain data={directorArray(data)} />
                  </div>
                </div>
              );
            }
          })}
        {/* Actors */}
        {(type === "all" || type === "actor") &&
          allData.allActors &&
          allData.allActors?.map((data, index) => {
            if (inputValue === "") {
              return (
                <div className="relative w-full my-4 p-4 pt-32 pb-14 ">
                  <div>
                    <div className="absolute top-4 left-40 flex items-center gap-4">
                      <img
                        alt=""
                        src={data.image_url}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      <p className="text-lg text-center font-bold my-2 text-white">
                        {data.name}'s Movies
                      </p>
                    </div>
                  </div>
                  <div>
                    <MovieContainerMain data={actorArray(data)} />
                  </div>
                </div>
              );
            }

            if (
              inputValue !== "" &&
              inputValue?.toLowerCase().replace(/\s/g, "") ===
                data.name
                  ?.toLowerCase()
                  .replace(/\s/g, "")
                  .substring(0, inputValue.length)
            ) {
              return (
                <div className="relative w-full my-4 p-4 pt-32 pb-14 ">
                  <div>
                    <div className="absolute top-4 left-40 flex items-center gap-4">
                      <img
                        alt=""
                        src={data.image_url}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      <p className="text-lg text-center font-bold my-2 text-white">
                        {data.name}'s Movies
                      </p>
                    </div>
                  </div>
                  <div>
                    <MovieContainerMain
                      data={actorArray(data)}
                      inputValue={inputValue}
                    />
                  </div>
                </div>
              );
            }
          })}
        {/* Genre */}
        {(type === "all" || type === "genre") &&
          allData.allGenre &&
          allData.allGenre?.map((data, index) => {
            if (inputValue === "") {
              return (
                <div className="relative w-full my-4 p-4 pt-32 pb-14 ">
                  <div>
                    <div className="absolute top-4 left-40 flex items-center gap-4">
                      <img
                        alt=""
                        src={data.image_url}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      <p className="text-lg text-center font-bold my-2 text-white">
                        {data.name} Genre
                      </p>
                    </div>
                  </div>
                  <div>
                    <MovieContainerMain
                      data={genreArray(data)}
                      inputValue={inputValue}
                    />
                  </div>
                </div>
              );
            }
            if (
              inputValue !== "" &&
              inputValue?.toLowerCase().replace(/\s/g, "") ===
                data.name
                  ?.toLowerCase()
                  .replace(/\s/g, "")
                  .substring(0, inputValue.length)
            ) {
              return (
                <div className="relative w-full my-4 p-4 pt-32 pb-14 ">
                  <div>
                    <div className="absolute top-4 left-40 flex items-center gap-4">
                      <img
                        alt=""
                        src={data.image_url}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      <p className="text-lg text-center font-bold my-2 text-white">
                        {data.name} Genre
                      </p>
                    </div>
                  </div>
                  <div>
                    <MovieContainerMain
                      data={genreArray(data)}
                      inputValue={inputValue}
                    />
                  </div>
                </div>
              );
            }
          })}
        {/* Actress */}
        {(type === "all" || type === "actress") &&
          allData.allActress &&
          allData.allActress?.map((data, index) => {
            if (inputValue === "") {
              return (
                <div className="relative w-full my-4 p-4 pt-32 pb-14 ">
                  <div>
                    <div className="absolute top-4 left-40 flex items-center gap-4">
                      <img
                        alt=""
                        src={data.image_url}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      <p className="text-lg text-center font-bold my-2 text-white">
                        {data.name}'s Movies
                      </p>
                    </div>
                  </div>
                  <div>
                    <MovieContainerMain
                      data={actressArray(data)}
                      inputValue={inputValue}
                    />
                  </div>
                </div>
              );
            }
            if (
              inputValue !== "" &&
              inputValue?.toLowerCase().replace(/\s/g, "") ===
                data.name
                  ?.toLowerCase()
                  .replace(/\s/g, "")
                  .substring(0, inputValue.length)
            ) {
              return (
                <div className="relative w-full my-4 p-4 pt-32 pb-14 ">
                  <div>
                    <div className="absolute top-4 left-40 flex items-center gap-4">
                      <img
                        alt=""
                        src={data.image_url}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      <p className="text-lg text-center font-bold my-2 text-white">
                        {data.name}'s Movies
                      </p>
                    </div>
                  </div>
                  <div>
                    <MovieContainerMain
                      data={actressArray(data)}
                      inputValue={inputValue}
                    />
                  </div>
                </div>
              );
            }
          })}
      </div>
    </>
  );
};

export const MovieContainerMain = ({ data, inputValue }) => {
  return (
    <div className="w-full flex flex-wrap gap-4 items-center justify-evenly">
      {data &&
        data.map((movie, i) => {
          if (movie)
            return <MovieCard key={movie?._id} data={movie} index={i} />;
          return null;
        })}
    </div>
  );
};
