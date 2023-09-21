import { useEffect, useState, useRef } from "react";

function usePopup(state = false) {
    const [isOpen, setOpen] = useState(state);
    const containerRef = useRef();

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const handleBlur = (event) => {
        const target = event.relatedTarget;
        const container = containerRef.current;

        if (
            event.target?.innerText === "Tìm kiếm khách sạn" ||
            event.target?.classList
                ?.item(0)
                ?.includes("BookmarkItem_unbookmark-button") ||
            event.target?.classList?.item(0)?.includes("notif-func-button")
        ) {
            container.focus();
            return true;
        }

        setOpen((prev) => {
            if (prev && !container.contains(target)) {
                return !prev;
            } else {
                return prev;
            }
        });
    };

    useEffect(() => {
        const container = containerRef.current;
        // auto focus element;
        container.focus();

        // container.addEventListener("click", handleClick);
        container.addEventListener("blur", handleBlur, true);

        return () => {
            // container.removeEventListener("click", handleClick);
            container.removeEventListener("blur", handleBlur, true);
        };
        //eslint-disable-next-line
    }, []);

    return [isOpen, handleClick, containerRef];
}

export default usePopup;
