type Props = {
  label: string;
  isOnFocus: boolean;
  isSelected: boolean;
};
const TextButton = ((props:Props)  => {
    return (
      <div className={`textButton${props.isOnFocus ? " onFocus" : ""}${props.isSelected ? " selected" : ""}`}>
        {props.label}
      </div>
    );
});

export default TextButton;