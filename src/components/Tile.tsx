import { useState, useEffect } from 'react';
import { API_IMAGE } from '../data/tmdAPI';

type Props = {
  key:number;
  title:string;
  poster_path:string;
  isOnFocus:boolean;
};

const Tile = ((props:Props) => {
        const [isOnFocus, setIsOnFocus] = useState(props.isOnFocus);
        useEffect(() => {
          setIsOnFocus(props.isOnFocus);
        }, [props.isOnFocus]);
      
        return (
          <div className={`tile${isOnFocus ? " onFocus" : ""}`}>
            <div className={`tile_desc${isOnFocus ? " onFocus" : ""}`}>
              <div className={`tile_title${isOnFocus ? " onFocus" : ""}`}>{props.title}</div>
            </div>
            <img className={`tile_image${isOnFocus ? " onFocus" : ""}`} alt={props.title} src={API_IMAGE + props.poster_path}/>
          </div>
        );
});

export default Tile;