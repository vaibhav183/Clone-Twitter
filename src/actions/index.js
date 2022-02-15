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
export const filling = (value) => {
    return {
        type: "filled",
        data:{
            name:value.name,
            username:value.username,
            email:value.email,
            verified:value.verified,
            imgurl:value.imgurl,
            followers:value.followers,
            following:value.following,
            posts:value.posts,
            comments:value.comments,
        }
    }
}
export const clear = () => {
    return {
        type: "clear",
    }
}