// import React from 'react';
import { useState, 
  forwardRef 
} from 'react';
//-- data
import { Ref } from '../data/DataType';
import { API_IMAGE } from '../data/tmdAPI';

// type Props = {
//   key:number;
//   title:string;
//   poster_path:string;
// };

// const Tile = forwardRef<Ref, Props>((props, ref) => {
const Tile = ((props:any, ref:Ref) => {
        const [isOnFocus, setIsOnFocus] = useState(false);
        const onFocusIn = () => {
          setIsOnFocus(true);
        }
        const onFocusOut = () => {
          setIsOnFocus(false);
        }
      
        return (
          // <div className="tile" ref={props.ref} >
          <div className="tile">
            <div className={`tile_title${isOnFocus ? " onFocus" : ""}`}>{props.title}</div>
            <img className="tile_image" alt={props.title} src={API_IMAGE + props.poster_path}/>
          </div>
        );
});

// export default forwardRef(Tile);
export default Tile;