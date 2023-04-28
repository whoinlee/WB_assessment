import { useState, useEffect, useCallback, useContext } from 'react';
//-- components
import TextButton from './ui/TextButton';
//-- contexts
import { HeaderMenuContext } from '../context/HeaderMenuContext';

type Props = {
  menus: string[];
  isOnFocus: boolean;
};

const MoviesHeader = ((props:Props)  => {
  const [totalMenus, setTotalMenus] = useState(0);
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);
  const [onFocus, setOnFocus] = useState(props.isOnFocus);

  useEffect(() => {
    setTotalMenus(props.menus.length);
  }, [props.menus]);

  const onKeyDownHandler = useCallback((event:KeyboardEvent) => {
    // console.log("INFO MoviesHeader :: onKeyDownHandler", event.code);
    event.preventDefault();
    event.stopPropagation();

    switch (event.code) {
      case "ArrowRight":
        if (activeMenuIndex === (totalMenus - 1)) {
          setActiveMenuIndex(0);
        } else {
          setActiveMenuIndex(activeMenuIndex + 1);
        }
        break;
      case "ArrowLeft":
        if (activeMenuIndex === 0) {
          setActiveMenuIndex(totalMenus-1);
        } else {
          setActiveMenuIndex(activeMenuIndex - 1);
        }
        break;
      case "ArrowDown":
        setOnFocus(false);
        break;
      case "ArrowUp": //-- nothing above, currently, so do nothing!
      default:
        break;
    }
    // console.log("INFO MoviesHeader :: onKeyDownHandler, activeMenuIndex? ", activeMenuIndex);
  }, [activeMenuIndex, totalMenus]);

  useEffect(() => {
    if (onFocus) {
      window.addEventListener("keydown", onKeyDownHandler);
    } else {
      window.removeEventListener("keydown", onKeyDownHandler);
    }
    // console.log("INFO MoviesHeader :: useEffect onFocus? ", onFocus);

    return () => {
      window.removeEventListener("keydown", onKeyDownHandler);
    };
  }, [onFocus, onKeyDownHandler]);

  return (
    <>
    <HeaderMenuContext.Provider value={{activeMenuIndex}}>
      <div className="movies_header">
        {
          props.menus?.map((menu:string, index) => 
            <TextButton key={menu + index} label={menu} isOnFocus={(activeMenuIndex === index) && onFocus}/>
          )
        }
      </div>
    </HeaderMenuContext.Provider>
    </>
  );
});

export default MoviesHeader;