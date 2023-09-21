import { types } from './basicHotelInforValidation';

export default function getHotelRegisterErrorMessage(type) {
    switch (type) {
        case types.HOTEL_NAME:
            return "Tên khách sạn phải dài hơn 8 ký tự"
        case types.HOTEL_TYPE:
            return "Loại khách sạn không tồn tại"
        case types.COUNTRY:
            return ""
        case types.PROVINCE:
            return "Tỉnh thành không tồn tại"
        case types.DISTRICT:
            return "Quận không tồn tại"
        case types.ADDRESS:
            return "Địa chỉ không được để trống"
        case types.DESCRIPTION:
            return "Mô tả giới hạn 500 ký tự"
        default:
            throw Error("Invalid basicHotelInforValidation Type");
    }
}