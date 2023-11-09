import { types } from "./basicHotelInforValidation";

export default function getHotelRegisterLabel(type) {
    switch (type) {
        case types.HOTEL_NAME:
            return "Tên khách sạn";
        case types.HOTEL_TYPE:
            return "Loại khách sạn";
        case types.COUNTRY:
            return "Đất nước";
        case types.PROVINCE:
            return "Thành phố/Tỉnh"
        case types.DISTRICT:
            return "Quận/Phường"
        case types.ADDRESS:
            return "Địa chỉ";
        case types.DESCRIPTION:
            return "Mô tả về khách sạn";
        default:
            throw Error("Invalid basicHotelInforValidation Type");
    }
}