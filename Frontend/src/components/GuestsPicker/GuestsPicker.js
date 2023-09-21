import guestsPickerStyles from "./GuestsPicker.module.scss";
import NumberPicker from "../NumberPicker";
import { memo, useMemo } from "react";

function GuestsPicker({
  guests,
  setGuests,
  limit,
  description = null,
  title = null,
  totalLimit = 100,
  isAllowPet = true,
}) {
  const total = useMemo(() => {
    return Object.keys(guests).reduce((prev, key) => {
      if (key !== "pet") {
        return prev + guests[key];
      } else {
        return prev;
      }
    }, 0);
  }, [guests]);

  return (
    <div id={guestsPickerStyles["guest-picker-field"]}>
      {Object.keys(guests).map((type) => (
        <NumberPicker
          key={type}
          title={title[type]}
          description={description[type]}
          limit={limit ?? 100}
          value={guests[type]}
          setValue={(value) => {
            setGuests((prev) => {
              return {
                ...prev,
                [type]: value || 0,
              };
            });
          }}
          total={total}
          isAllowPet={type === "pet" ? isAllowPet : true}
          disabled={type !== "pet" ? total >= totalLimit : false}
        />
      ))}
    </div>
  );
}

export default memo(GuestsPicker);
