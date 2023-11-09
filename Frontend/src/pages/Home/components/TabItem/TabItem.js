import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import tabItemStyles from './TabItem.module.scss';
import { memo, useEffect, useState } from 'react';

const shallowCompare = (firstObject, secondObject) => {
    if (firstObject === null || secondObject === null)
        return false;

    if (Object.keys(firstObject).length !== Object.keys(secondObject).length) {
        return false;
    }
    return Object.keys(firstObject).every((value) => {
        if (secondObject[value] === null)
            return false;
        if (firstObject[value] === secondObject[value])
            return true;
        else 
            return false;
    })
}

function TabItem({ filterType, filterTypeId, icon, name, type, handleClick }) {
    const [isChecked, setChecked] = useState(false);

    // testing purpose only
    useEffect(() => {
        setChecked(shallowCompare(type, {
            filterType, filterTypeId
        }))
    //eslint-disable-next-line
    }, [type])

    return (  
        <div 
            onClick={(e) => {
                e.stopPropagation();
                if (isChecked) {
                    handleClick({})
                }
                else {
                    handleClick({
                        filterType,
                        filterTypeId
                    })
                }
            }}
            className={tabItemStyles['tab-item']}
        >
            <input 
                type="radio"
                checked={isChecked}
                hidden
                name='category'
                onChange={() => {}}
            />
            <label>
                <FontAwesomeIcon icon={icon} style={{
                    fontSize: '1.2em'
                }}
                />
                <span className={tabItemStyles['title']}>{name}</span>
            </label>
        </div>
    );
}

export default memo(TabItem);