import {  useState, forwardRef } from 'react';
import { API_IMAGE } from '../data/tmdAPI';

type Props = {
  key:number;
  title:string;
  poster_path:string;
};

const Tile = forwardRef<HTMLDivElement, Props>((props:Props, ref) => {
        const [isOnFocus, setIsOnFocus] = useState(false);
        const onFocusIn = () => {
          setIsOnFocus(true);
        }
        const onFocusOut = () => {
          setIsOnFocus(false);
        }
      
        return (
          <div className="tile" ref={ref} >
          {/* <div className="tile"> */}
            <div className={`tile_title${isOnFocus ? " onFocus" : ""}`}>{props.title}</div>
            <img className="tile_image" alt={props.title} src={API_IMAGE + props.poster_path}/>
          </div>
        );
});

// export default forwardRef(Tile);
export default Tile;