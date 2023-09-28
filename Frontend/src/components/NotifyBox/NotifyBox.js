import DropdownBox from "../DropdownBox";
import NotifyItem from "../NotifyItem";
import { useMemo, useState } from "react";
import markAllNotifAsRead from "@/services/hotel/markAllNotifAsRead";

function NotifyBox({ notifs, setNotifs, setDropdownOpen }) {
    const handleClick = (readNotifId) => {
        setNotifs((list) => {
            return list.reduce((prev, notif) => {
                if (notif.id !== readNotifId) {
                    return [...prev, notif]
                } else {
                    return [...prev, {
                        ...notif,
                        isRead: true
                    }]
                }
            }, [])
        })
    }
    const handleActBooking = (bookingId, type) => {
        setNotifs((list) => {
            return list.reduce((prev, notif) => {
                if (notif.sourceId !== bookingId) {
                    return [...prev, notif]
                } else {
                    return [...prev, {
                        ...notif,
                        notifyType: type,
                        isRead: true
                    }]
                }
            }, [])
        })
    }
    const [index, setIndex] = useState(0);

    const tabs = useMemo(() => ([
        {
            title: 'Tất cả',
            list: notifs,
            index: 0,
            role: [1, 2, 3],
        },
        {
            title: 'Chưa đọc',
            list: notifs.filter(({ isRead }) => !isRead),
            index: 1,
            role: [1, 2, 3],
        },
        {
            title: 'Đặt phòng',
            index: 2,
            list: notifs.filter(({ notifyType }) => notifyType === 3 || notifyType === 4),
            role: [1, 3],
        }, 
        {
            title: 'Đơn đặt phòng',
            index: 3,
            list: notifs.filter(({ notifyType }) => notifyType === 0),
            role: [2],
        },
        {
            title: 'Báo cáo',
            index: 4,
            list: notifs.filter(({ notifyType }) => notifyType === 7),
            role: [3],
        }
    ]), [notifs])

    
    return (  
        <DropdownBox 
            heading={"Thông báo"}
            extraButtonTittle={"Đánh dấu đã đọc"}
            isScrollable={notifs.length > 5}
            tabs={tabs}
            activeIndex={index}
            setActiveIndex={setIndex}
            extraButtonHandleClick={(userId) => {
                markAllNotifAsRead(userId).then(data => {
                    setNotifs(prev => prev.map((notif) => ({
                        ...notif,
                        isRead: true
                    })))
                });
            }}
        >
            {
                tabs[index].list.map((notif) => (
                    <NotifyItem 
                        notif={notif}
                        key={notif.id}
                        handleClick={handleClick}
                        handleActBooking={handleActBooking}
                        setDropdownOpen={setDropdownOpen}
                    />
                ))
            }
        </DropdownBox>
    );
}

export default NotifyBox;