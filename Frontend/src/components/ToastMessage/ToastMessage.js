import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faXmarkCircle,
    faCircleCheck,
} from "@fortawesome/free-regular-svg-icons";
import { toastType } from "@/utils/reducers/toastMessageReducer";
import toastMessageStyles from "./ToastMessage.module.scss";
import { useClsx } from "@/utils/hooks";
import { useState, useEffect } from "react";

const getToastType = (type) => {
    switch (type) {
        case toastType.SUCCESS:
            return faCircleCheck;
        case toastType.FAILURE:
            return faXmarkCircle;
        default:
            throw new Error("Invalid Toast Message Type");
    }
};

function ToastMessage({ type, message }) {
    const [isMount, setMount] = useState(true);

    useEffect(() => {
        let timer = setTimeout(() => {
            setMount(false);
        }, 3700);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {isMount && (
                <div
                    className={[
                        toastMessageStyles["toast-message"],
                        toastMessageStyles[type],
                    ].join(" ")}
                    onClick={() => setMount(false)}
                >
                    <FontAwesomeIcon icon={getToastType(type)} />
                    <p className={toastMessageStyles["message"]}>{message}</p>
                </div>
            )}
        </>
    );
}

export default ToastMessage;
