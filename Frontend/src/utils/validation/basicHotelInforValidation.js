const types = {
    HOTEL_NAME: "name",
    HOTEL_TYPE: "type",
    COUNTRY: "country",
    PROVINCE: "province",
    DISTRICT: "district",
    ADDRESS: "address",
    DESCRIPTION: "description",
};

function validateHotelName(name) {
    return name !== null && name.length >= 8;
}

function validateType(typeName, typeSelectionList) {
    const typeNames = typeSelectionList.map((type) => type.name);
    return typeNames.includes(typeName);
}

function validateCountry(countryName, countrySelectionList) {
    return true;
}

function validateProvince(province, provinceList) {
    const provinceNames = provinceList.map((province) => province.name);
    return provinceNames.includes(province);
}

function validateDistrict(districtName, districtSelectionList) {
    return districtName.length > 0;
}

function validateAddress(address) {
    return address !== null && address.length > 0;
}

function validateDescription(description) {
    return description !== null && description.length <= 500;
}

export default function basicHotelInforValidation(type, value, selectionList = []) {
    switch (type) {
        case types.HOTEL_NAME:
            return validateHotelName(value);
        case types.HOTEL_TYPE:
            return validateType(value, selectionList);
        case types.COUNTRY:
            return validateCountry(value, selectionList);
        case types.PROVINCE:
            return validateProvince(value, selectionList);
        case types.DISTRICT:
            return validateDistrict(value, selectionList);
        case types.ADDRESS:
            return validateAddress(value);
        case types.DESCRIPTION:
            return validateDescription(value);
        default:
            throw Error("Invalid basicHotelInforValidation Type");
    }
}

export { types };