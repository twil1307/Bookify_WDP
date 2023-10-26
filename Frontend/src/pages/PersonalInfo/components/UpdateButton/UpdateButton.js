import UpdateButtonStyle from "./UpdateButton.module.scss";

function UpdateButton({ content, type, onClick }) {
  return (
    <button className={UpdateButtonStyle[type + "-button"]} onClick={onClick}>
      {content}
    </button>
  );
}

export default UpdateButton;
