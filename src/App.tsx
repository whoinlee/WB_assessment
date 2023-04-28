import { useState, useEffect, useCallback, useContext } from 'react';
//-- components
import Tile from './components/ui/Tile';
import MoviesHeader from './components/MoviesHeader';
//-- contexts
import { HeaderMenuContext } from './context/HeaderMenuContext';
//-- data
import { MovieType } from './data/DataType';
import { API_MOVIE } from './data/tmdAPI';
//-- styles
import './styles/App.scss';


const MOVIES_PER_ROW = 5;

function App() {
  const numCols = MOVIES_PER_ROW;
  const [numRows, setNumRows] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [movies, setMovies] = useState([]);
  const [totalMovies, setTotalMovies] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [onHeaderFocus, setOnHeaderFocus] = useState(true);
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);
  const headerMenus = ["Popular Movies", "Menu1","Menu2", "Menu3"];

  //-- get movies data
  useEffect(() => {
    const getMovies = async() => {
      const data = await(await fetch(API_MOVIE)).json();
      // console.log("data : ", data);
      const movies = data.results;
      const numOfMovies = movies.length;
      setMovies(movies);
      setNumRows(Math.round(numOfMovies/MOVIES_PER_ROW));
      setTotalMovies(numOfMovies);
      setDataLoaded(true);
    };
    getMovies();
  }, []);

  const onKeyDownHandler = useCallback((event:KeyboardEvent) => {
    console.log("INFO App :: onKeyDownHandler", event.code);
    event.preventDefault();
    event.stopPropagation();

    switch (event.code) {
      case "ArrowDown":
        if (activeIndex === -1) {
          //-- move focus from header to movies grid
          setActiveIndex(0);
          // window.addEventListener("keydown", onKeyDownHandler);
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
            // window.removeEventListener("keydown", onKeyDownHandler);
          }
          break;
      case "ArrowRight":
        if (activeIndex <= totalMovies - 1 && activeIndex !== -1) {
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
    // console.log("activeIndex?", activeIndex);
  }, [activeIndex, numRows, numCols, totalMovies]);
  
  //-- add listeners on mount, remove on unmount
  useEffect(() => {
    if (!onHeaderFocus) {
      window.addEventListener("keydown", onKeyDownHandler);
    } else {
      //-- focus on header
      window.removeEventListener("keydown", onKeyDownHandler);
    }

    console.log("INFO App :: useEffect activeIndex? ", activeIndex);
    return () => {
      window.removeEventListener("keydown", onKeyDownHandler);
    };
  }, [onKeyDownHandler, activeIndex, onHeaderFocus]);

  return (
    <div className="container">
      <HeaderMenuContext.Provider value={{
        activeMenuIndex,
        setActiveMenuIndex,
        onHeaderFocus,
        setOnHeaderFocus
      }}>
      <div className="movies">
        {/* <MoviesHeader menus={headerMenus} isOnFocus={activeIndex === -1} /> */}
        <MoviesHeader menus={headerMenus}/>
        { !dataLoaded ? 
        <p className="movies_loading">loading data...</p> :
        <div className="movies_grid">
          { 
            movies?.map((movie:MovieType, index) => 
              <Tile key={movie.id} 
                    title={movie.title}
                    poster_path={movie.poster_path}
                    isOnFocus={(activeIndex === index)}
              />
            )
          }
        </div>
        }
      </div>
      </HeaderMenuContext.Provider>
    </div>
  );
}

export default App;