import { DatePicker } from "@/components";
import dateSearchStyles from './DateSearchField.module.scss';
import { useContext } from "react";
import { SearchContext } from "@/utils/contexts";

function DateSearchField() {
    const { selectedDays, setSelectedDays } = useContext(SearchContext);

    return (
        <div className={dateSearchStyles['date-search-field']}>
            <DatePicker 
                numberOfMonths="2"
                mode="range"
                setSelectedDays={setSelectedDays}
                selectedDays={selectedDays}
            />
        </div>
    );
}

export default DateSearchField;
