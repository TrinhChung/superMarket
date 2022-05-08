// for add item to cart
export const addCart = (product) => {
    return {
        type: "ADDITEM",
        payload: product
    }
}

export const delCart = (product) => {
    return {
        type: "DELITEM",
        payload: product
    }
}

export const user = (infoUser) => {
    return {
        type: "LOGIN",
        payload: infoUser
    }
}

