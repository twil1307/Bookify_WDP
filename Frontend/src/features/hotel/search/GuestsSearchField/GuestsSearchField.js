import { GuestsPicker } from "@/components";
import { SearchContext } from "@/utils/contexts";
import { useContext } from "react";
import guestSearchStyles from './GuestsSearchField.module.scss';

const description = {
    adult: "Từ 13 tuổi trở lên",
    child: "Độ tuổi 2 - 12",
    infant: "Dưới 2 tuổi",
    pet: "Bạn sẽ mang theo động vật ?",
};

const title = {
    adult: 'Người lớn',
    child: 'Trẻ em',
    infant: 'Em bé',
    pet: 'Thú cưng'
}

function GuestsSearchField() {
    const { guests, setGuests } = useContext(SearchContext);

    return (
        <div className={guestSearchStyles['guests-search-field']}>
            <GuestsPicker
                guests={guests}
                setGuests={setGuests}
                description={description}
                title={title}
                limit={null}
            />
        </div>
    );
}

export default GuestsSearchField;
