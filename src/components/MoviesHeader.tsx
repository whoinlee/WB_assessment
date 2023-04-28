import { useState, useEffect, useCallback, useContext } from 'react';
//-- components
import TextButton from './ui/TextButton';
//-- contexts
import { HeaderMenuContext } from '../context/HeaderMenuContext';


type Props = {
  menus: string[];
};
const MoviesHeader = ((props:Props)  => {
  const [totalMenus, setTotalMenus] = useState(0);
  const { 
    activeMenuIndex,
    setActiveMenuIndex,
    onHeaderFocus,
    setOnHeaderFocus
  } = useContext(HeaderMenuContext);

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
        setOnHeaderFocus(false);
        break;
      case "ArrowUp": //-- nothing above, currently, so do nothing!
      default:
        break;
    }
    // console.log("INFO MoviesHeader :: onKeyDownHandler, activeMenuIndex? ", activeMenuIndex);
  }, [activeMenuIndex, totalMenus, setActiveMenuIndex, setOnHeaderFocus]);

  useEffect(() => {
    if (onHeaderFocus) {
      console.log("INFO MoviesHeader :: useEffect, adding eventListener");
      window.addEventListener("keydown", onKeyDownHandler);
    } else {
      console.log("INFO MoviesHeader :: useEffect, removing eventListener");
      window.removeEventListener("keydown", onKeyDownHandler);
    }
    console.log("INFO MoviesHeader :: useEffect onHeaderFocus? ", onHeaderFocus);

    return () => {
      window.removeEventListener("keydown", onKeyDownHandler);
    };
  }, [onHeaderFocus, onKeyDownHandler]);

  return (
    <div className="movies_header">
      {
        props.menus?.map((menu:string, index) => 
          <TextButton key={menu + index} label={menu} isOnFocus={(activeMenuIndex === index) && onHeaderFocus}/>
        )
      }
    </div>
  );
});

export default MoviesHeader;