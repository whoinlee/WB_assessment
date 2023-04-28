import { useState, useEffect } from 'react';


type Props = {
  label: string;
  isOnFocus: boolean;
};
const TextButton = ((props:Props)  => {
        const [isOnFocus, setIsOnFocus] = useState(props.isOnFocus);
        useEffect(() => {
          setIsOnFocus(props.isOnFocus);
        }, [props.isOnFocus]);
      
        return (
          <div className={`textButton${isOnFocus ? " onFocus" : ""}`}>
            {props.label}
          </div>
        );
});

export default TextButton;