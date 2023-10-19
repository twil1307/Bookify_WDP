import checkboxStyles from "./Checkbox.module.scss";
import { useClsx } from "@/utils/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function Checkbox({ isChecked, setChecked, label ,id,name}) {
  return (
    <div className={[checkboxStyles["checkbox"]]} onClick={() => {}}>
      <input
        type="checkbox"
        className={useClsx(
          checkboxStyles["check-icon"],
          isChecked ? checkboxStyles["checked"] : ""
        )}
        onChange={() => {
          setChecked(!isChecked)
        }}
        hidden
        name={name} id={id}
      />
      <div className={checkboxStyles["extra-infor-checkbox"]}>
        {isChecked && <FontAwesomeIcon icon={faCheck} />}
      </div>
      <label className={checkboxStyles["checkbox-label"]} for={id}>{label}</label>
    </div>
  );
}

export default Checkbox;
