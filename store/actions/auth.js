import {
    AUTH_ERROR,
    AUTH_REMOVE_TOKEN,
    AUTH_SET_TOKEN
} from "./actionTypes";
import {
    uiStartLoading,
    uiStopLoading,
    setUser
} from './'
import AsyncStorage from '@react-native-community/async-storage';
import {
    API_URL
} from "../../utility/constants";
import { getUser } from "./";

export const authError = (error) => {
    return {
        type: AUTH_ERROR,
        error
    }
}

export const authSetToken = (token, userId) => {
    return {
        type: AUTH_SET_TOKEN,
        token,
        userId
    }
}

export const authRemoveToken = () => {
    return {
        type: AUTH_REMOVE_TOKEN
    }
}

export const authStoreAsyncData = (token, userId, userData) => {
    return dispatch => {
        dispatch(authSetToken(token, userId))
        AsyncStorage.setItem("userId", userId.toString())
        AsyncStorage.setItem("auth-token", token);
        AsyncStorage.setItem("user-data", JSON.stringify(userData))
    }
}

export const authRemoveAsyncData = () => {
    return dispatch => {
        AsyncStorage.removeItem("userId")
        AsyncStorage.removeItem("auth-token");
        AsyncStorage.removeItem("user-data")
    }
}

export const logIn = (authData) => {
    return async (dispatch) => {
        try {
            dispatch(uiStartLoading())
            dispatch(authRemoveAsyncData())

            let res = await fetch(`${API_URL}auth/login`, {
                method: "POST",
                body: JSON.stringify({
                    email: authData.email,
                    password: authData.password,
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })

            setTimeout(() => {
                if (!res) {
                    dispatch(uiStopLoading())
                    dispatch(authError("Please check your internet connection"))
                }
            }, 15000);

            let resJson = await res.json()
            console.warn(resJson)

            await dispatch(uiStopLoading())
            if (resJson.error && resJson.error.status) {
                dispatch(authError(resJson.error.message))
            } else {
                dispatch(authError(""));
                dispatch(authStoreAsyncData(resJson.access_token, resJson.user.id, resJson.user))
                dispatch(setUser(resJson.user))
            }
        } catch (error) {
            dispatch(uiStopLoading())
            console.warn(error)
            dispatch(authError("Authentication failed, please try again"));
        }
    }
}

export const getAuthToken = () => {
    return async (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            const token = await getState().auth.token

            if (!token) {
                try {
                    let storedToken = await AsyncStorage.getItem("auth-token")
                    let userId = await AsyncStorage.getItem("userId")

                    dispatch(authSetToken(storedToken, userId))
                    await resolve(storedToken)
                } catch (error) {
                    dispatch(authRemoveAsyncData())
                    reject(error)
                }
            } else {
                resolve(token)
            }
        })
    }
}

export const authAutoSignIn = () => {
    return async (dispatch, getState) => {
        try {
            let token = await dispatch(getAuthToken())

            if (!token) {
                reject()
            } else {
                await dispatch(getUser())
                dispatch(authError(""));
            }

            return token
        } catch (e) {
            dispatch(authRemoveAsyncData())
            return false
        }
    }
}