import types from "../types/types";


const setError = msg => ({
    type: types.uiSetError,
    payload: msg
})

const removeError = () => ({
    type: types.uiRemoveError
})

const uiStartLoading = () => ({
    type: types.uiStartLoading
})

const uiFinishLoading = () => ({
    type: types.uiFinishLoading
})

export {
    setError,
    removeError,
    uiStartLoading,
    uiFinishLoading
}