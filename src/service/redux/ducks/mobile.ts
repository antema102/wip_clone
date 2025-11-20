export type MobileState = {
    mobile: boolean;
};

export const enum MobileActionType {
    setMobile = '[Mobile] Set Mobile',
}

export const initialMobileState: MobileState = {
    mobile: false,
};

export const mobileReducer = (state = initialMobileState, action) => {
    const { type, payload } = action;
    switch (type) {
        case MobileActionType.setMobile:
            return {
                ...state,
                mobile: payload,
            };

        default:
            return state;
    }
};
