const toastType = {
    SUCCESS: "success",
    FAILURE: "failure",
}

const getSuccessToastMessage = payload => ({
    ...payload,
    type: toastType.SUCCESS
})

const getFailureToastMessage = payload => ({
    ...payload,
    type: toastType.FAILURE
})

export default function toastMessageReducer(state, toast) {
    switch(toast.type) {
        case toastType.SUCCESS:
            return [...state, { ...toast }];
        case toastType.FAILURE:
            return [...state, { ...toast }];
        default:
            throw new Error("Invalid Toast Message Type");
    }
}

export {
    toastType,
    getFailureToastMessage,
    getSuccessToastMessage
}