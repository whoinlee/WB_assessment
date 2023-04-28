import { useContext } from 'react';
//-- contexts
import { HeaderMenuContext } from '../context/HeaderMenuContext';


const DummyPage = () => {
    const { 
        activeMenuIndex,
        onHeaderFocus
        } = useContext(HeaderMenuContext);

  return (
    <div className={`dummyPage${!onHeaderFocus ? " onFocus" : ""}`}>
      dummyPage {activeMenuIndex}
    </div>
  )
}

export default DummyPage;
