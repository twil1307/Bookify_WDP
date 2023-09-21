import { Input } from "@/components";
import inputFieldStyles from "./InputField.module.scss";
import { memo } from "react";
import { getErrorMessage } from "@/utils/validation";

function InputField({
  value,
  onValueChange,
  id,
  label,
  type,
  isValid = true,
  isSignIn = false,
  ref = null,
}) {
  return (
    <div className={[inputFieldStyles["input-field"]].join(" ")}>
      <Input
        value={value ?? ""}
        onValueChange={(value) => {
          onValueChange(value, id);
        }}
        isValid={isValid}
        id={id}
        type={type}
        ref={ref}
      />
      <label htmlFor={id}>
        {isValid ? label : getErrorMessage(id, isSignIn)}
      </label>
    </div>
  );
}

export default memo(InputField);
