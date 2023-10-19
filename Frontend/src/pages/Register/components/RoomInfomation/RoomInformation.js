import RoomPickers from "../RoomPickers";
import RoomStyle from "./RoomInformation.module.scss";

function RoomInformation() {
    return (
        <>
            <div className={RoomStyle["header"]}>
                <h3 className={RoomStyle["heading"]}>
                    Thiết lập các giá trị cho phòng thuê của khách
                </h3>
            </div>
            <div className={RoomStyle["container"]}>
                <RoomPickers />
            </div>
        </>
    );
}

export default RoomInformation;
