export const setNull = () => {
    return {
        type: "doNull"
    }
}

export const setTokenNumber = (value) => {
    return {
        type: "doNotSetNull",
        token: value,
    }
}
export const setTokenNumber1 = (value) => {
    return {
        type: "setMail",
        token: value,
    }
}