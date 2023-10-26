import PersonalInputStyle from "./PersonalInput.module.scss";

function PersonalInput({
  inputField,
  type,
  placeholder,
  name,
  value,
  onChange,
  labelContent,
  readOnly,
}) {
  const newValue = value ? value : "";

  return (
    <span
      className={
        !readOnly
          ? PersonalInputStyle["input-field"]
          : PersonalInputStyle["input-field-readOnly"]
      }
    >
      {/* Subname ------------------------------- */}
      <input
        spellCheck="false"
        type={type}
        placeholder={placeholder}
        name={name}
        value={newValue ? newValue : null}
        className={
          !readOnly
            ? PersonalInputStyle["input-update"]
            : PersonalInputStyle["input-update-readOnly"]
        }
        onChange={onChange}
        readOnly={readOnly}
      />
      <label className={PersonalInputStyle["input-label"]} htmlFor={name}>
        {labelContent}
      </label>
    </span>
  );
}

export default PersonalInput;
