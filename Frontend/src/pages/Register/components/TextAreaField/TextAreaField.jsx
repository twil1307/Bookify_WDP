import { Box } from '@mui/material';
import { useEffect } from 'react';
import { memo, useRef, useState } from 'react';
import { basicHotelInforValidation, getHotelRegisterErrorMessage } from '@/utils/validation';
import { useClsx } from '@/utils/hooks';
import "./TextAreaField.scss";

function TextAreaField({ id, label, value, setValue, setInformationValid }) {
    const [isFocus, setFocused] = useState(false);
    const inputRef = useRef();
    const isValid = basicHotelInforValidation(id, value);

    const handleFocus = (e) => {
        e.stopPropagation();
        setFocused(true);
    }

    useEffect(() => {
        const inputElement = inputRef.current;

        // if element hasn't received focus
        if (!isFocus) {
            inputElement.addEventListener('focus', handleFocus);
        } else { return }

        return () => {
            inputElement.removeEventListener('focus', handleFocus);
        }
    }, [inputRef, isFocus])

    useEffect(() => {
        setInformationValid(prev => ({
            ...prev,
            [id]: isValid
        }));
    }, [value])

    return (  
        <div className={useClsx('input-field', 'text-area-field')}>
            <textarea 
                id={id} 
                ref={inputRef}
                type="text" 
                value={value}
                onChange={(e) => {
                    if (e.target.value.length > 500) {
                        return;
                    } else {
                        setValue(e.target.value, id);
                    }
                }}
                className={useClsx('text-area')}
            />
            <label htmlFor={id}>
                {!isValid && isFocus ? getHotelRegisterErrorMessage(id) : label}
            </label>
        </div>
    );
}

export default TextAreaField;