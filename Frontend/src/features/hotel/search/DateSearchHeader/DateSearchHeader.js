import dateHeader from './DateSearchHeader.module.scss';
import { SearchContext } from '@/utils/contexts';
import { useContext } from 'react';

function formatDay(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    if (date) {
        const from = date.toLocaleDateString(undefined, options).split(', ');
        return `${from[1]}, ${from[2]}`;
    }

    return undefined;
}

function DateSearchHeader({ currentTab, onTabChange }) {
    const { selectedDays } = useContext(SearchContext);
    const index = 1;
    
    return (  
        <div
            id={dateHeader["date-search"]}
            className={[
                dateHeader["advance-search__input-field"],
                currentTab === index ? dateHeader['active'] : ''  
            ].join(' ')}
            index='1'
            onClick={onTabChange}
        >
            <h4 className={dateHeader["heading"]}>Thời gian</h4>
            <div className={dateHeader['date-inputs']}>
                <input
                    className={dateHeader["date-from"]}
                    placeholder={"DD/MM/YYYY"}
                    value={formatDay(selectedDays?.from)}
                    onChange={(event) => {
                        
                    }}
                />
                <span>-</span>
                <input
                    className={dateHeader["date-to"]}
                    placeholder={"DD/MM/YYYY"}
                    value={formatDay(selectedDays?.to)}
                    onChange={(event) => {
                        
                    }}
                />
            </div>
        </div>
    );
}

export default DateSearchHeader;