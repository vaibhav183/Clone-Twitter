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