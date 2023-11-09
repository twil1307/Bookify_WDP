import guestsPickerStyles from "./GuestsPicker.module.scss";
import NumberPicker from "../NumberPicker";
import { memo, useMemo, useEffect, useState } from "react";

function GuestsPicker({
  guests,
  setGuests,
  limit,
  description = null,
  title = null,
  totalLimit = 100,
  isAllowPet = true,
}) {
  const [disable, setDisable] = useState(false);
  useEffect(() => {
    let total = 0;
    Object.keys(guests).map((type) => {
      total += guests[type];
    });
    setDisable(total >= totalLimit);
  }, [guests]);
  return (
    <div id={guestsPickerStyles["guest-picker-field"]}>
      {Object.keys(guests).map((type) => (
        <NumberPicker
          key={type}
          title={title[type]}
          description={description[type]}
          limit={limit ?? 100}
          disabled={disable}
          value={guests[type]}
          setValue={(value) => {
            setGuests((prev) => {
              return {
                ...prev,
                [type]: value || 0,
              };
            });
          }}
          isAllowPet={type === "pet" ? isAllowPet : true}
        />
      ))}
    </div>
  );
}

export default memo(GuestsPicker);
