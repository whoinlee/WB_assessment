
type Props = {
    pageIndex: number;
}

const DummyPage = (props:Props) => {
  return (
    <div className="dummyPage">
      dummyPage + {props.pageIndex}
    </div>
  )
}

export default DummyPage;
