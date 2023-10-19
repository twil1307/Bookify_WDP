import { RegisterContext } from "@/utils/contexts";
import { useContext, useCallback, useState, useEffect } from "react";
import InputField from "../InputField/InputField";
import SelectField from "../SelectField/SelectField";
import TextAreaField from "../TextAreaField/TextAreaField";
import { getHotelRegisterLabel } from "@/utils/validation";

const getInputFieldType = (key) => {
  if (key === "name" || key === "address") {
    return InputField;
  } else if (key === "description") {
    return TextAreaField;
  } else {
    return SelectField;
  }
};

function BasicInformationForm({ className, setNextTabValid }) {
  const { basicHotelInfor, setBasicHotelInfo } = useContext(RegisterContext);
  // console.log(basicHotelInfor);
  const [isInformationValid, setInformationValid] = useState({
    name: false,
    hotelType: false,
    country: true,
    province: false,
    district: false,
    address: false,
    description: true,
  });

  const handleValueChange = useCallback((value, key) => {
    setBasicHotelInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    const isAllInformationValid = Object.values(isInformationValid).every(
      (isValid) => {
        return isValid;
      }
    );
    setNextTabValid(isAllInformationValid);
    //eslint-disable-next-line
  }, [isInformationValid]);
  // console.log(getInputFieldType(basicHotelInfor));

  return (
    <div className={className}>
      {Object.keys(basicHotelInfor).reduce((prev, key) => {
        const InputType = getInputFieldType(key);
        //  console.log(getInputFieldType(key));
        return [
          ...prev,
          <InputType
            key={key}
            id={key}
            label={getHotelRegisterLabel(key)}
            setValue={handleValueChange}
            value={basicHotelInfor[key]}
            setInformationValid={setInformationValid}
          />,
        ];
      }, [])}
    </div>
  );
}

export default BasicInformationForm;
