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
        <div className={`dummyPage_container${activeMenuIndex}`}>
            dummyPage {activeMenuIndex}
        </div>
    </div>
  )
}

export default DummyPage;
