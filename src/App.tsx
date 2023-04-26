import { useState, useEffect, useRef, useCallback } from 'react';
// import { gsap } from "gsap";
//-- components
import Tile from './components/Tile';
//-- data
import { MovieType, Ref } from './data/DataType';
import { API_MOVIE } from './data/tmdAPI';
//-- styles
import './styles/App.scss';


const MOVIES_PER_ROW = 5;

function App() {
  const numCols = MOVIES_PER_ROW;
  const [numRows, setNumRows] = useState(0);
  const [movies, setMovies] = useState([]);
  const [totalMovies, setTotalMovies] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);
  const tileRefs = useRef<Ref[]>([]);

  //-- get movies data
  useEffect(() => {
    const getMovies = async() => {
      const data = await(await fetch(API_MOVIE)).json();
      // console.log("data : ", data);
      const movies = data.results;
      const numOfMovies = movies.length;
      setNumRows(Math.round(numOfMovies/MOVIES_PER_ROW));
      setMovies(movies);
      setTotalMovies(numOfMovies);
    };
    getMovies();
  }, []);

  const onKeyDownHandler = useCallback((event:KeyboardEvent) => {
    event.preventDefault();
    event.stopPropagation();
    // console.log(event.code);
    switch (event.code) {
      case "ArrowDown":
        if (activeIndex === -1) {
          //-- move focus from header to movies grid
          setActiveIndex(0);
        } else if (activeIndex < totalMovies - numCols) {
          setActiveIndex(activeIndex + numCols);
        }
        break;
      case "ArrowUp":
          if (activeIndex > numRows) {
            setActiveIndex(activeIndex - numCols);
          } else {
            //-- move focus from movies grid to header
            setActiveIndex(-1);
          }
          break;
      case "ArrowRight":
        if (activeIndex < totalMovies - 1 && activeIndex !== -1) {
          if (activeIndex % numCols === (numCols - 1)) {
            //-- if at the right end, move to the 1st tile of the row (circular)
            setActiveIndex(activeIndex - numCols + 1);
          } else {
            setActiveIndex(activeIndex + 1);
          }
        }
        break;
      case "ArrowLeft":
        if (activeIndex >= 0) {
          if (activeIndex % numCols === 0) {
            //-- if at the left end, move to the last tile of the row (circular)
            const lastIndex = (activeIndex + numCols - 1 >= totalMovies -1) ? 
                              totalMovies -1: activeIndex + numCols - 1;
            setActiveIndex(lastIndex);
          } else {
            setActiveIndex(activeIndex - 1);
          }
        }
        break;
      default:
        break;
    }
    console.log("activeIndex?", activeIndex)
  }, [activeIndex, numRows, numCols, totalMovies]);
  
  //-- add listeners on mount, remove on unmount
  useEffect(() => {
    window.addEventListener("keydown", onKeyDownHandler);
    return () => {
        window.removeEventListener("keydown", onKeyDownHandler);
    };
  }, [onKeyDownHandler]);

  return (
    <div className="container">
      <div className="movies">
        <div className={`movies_header${activeIndex === -1 ? " onFocus" : ""}`}>Popular Movies</div>
        <div className="movies_grid">
          { 
            movies?.map((movie:MovieType, index) => 
              <Tile key={movie.id} 
                    title={movie.title}
                    poster_path={movie.poster_path}
                    isOnFocus={(activeIndex === index) ? true:false}
                    ref={(elt:any) => tileRefs.current[index] = elt}
              />
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;