import { useEffect, useRef } from 'react';


// type Props = {
//     eventName:string;
//     handler:() => void;
//     element:string;
// };

const useEventListener = (eventName:string, handler:(e:Event)=>void, element = window) => {
    // const savedHandler = useRef();
    const savedHandler = useRef<any>();

    //-- set the handler as the current value of the ref to cache it
    useEffect(() => {
      savedHandler.current = handler;
    }, [handler]);
  
    useEffect(() => {
      const eventListener = (event:Event) => savedHandler.current(event);
      element.addEventListener(eventName, eventListener);
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    }, [eventName, element]);
};

export default useEventListener;