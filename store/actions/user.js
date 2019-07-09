import { SET_USER } from './actionTypes'
import { API_URL } from '../../utility/constants'
import AsyncStorage from "@react-native-community/async-storage";
import { authRemoveToken, authRemoveAsyncData, uiStartLoading, uiStopLoading } from './';

export const  setUser = (user) => {
    return {
        type: SET_USER,
        user
    }
}

export const getUserId = () => {
    return async (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            const userId = await getState().auth.userId

            if (!userId) {
                try {
                    let storedUserId = await AsyncStorage.getItem("userId")

                    resolve(parseInt(storedUserId))
                } catch (error) {
                    reject(error)
                }
            } else {
                resolve(userId)
            }
        })
    }
}

export const getUser = () => {
    return async (dispatch, getState) => {
        dispatch(uiStartLoading())
        try {
            let userData = await getState().user.user

            if (!userData.first_name) {
                    userData = JSON.parse(await AsyncStorage.getItem("user-data"))

                    if (!userData) {
                        reject()
                    }
                    else {
                        await dispatch(uiStopLoading())
                        dispatch(setUser(userData))
                        if (userData.role === "merchant") await dispatch(getMerchant())
                        return userData
                    }
            } else {
                await dispatch(uiStopLoading())
                if (userData.role === "merchant") await dispatch(getMerchant())
                return userData
            }
        } catch (e) {
            try {
                console.warn(object)
                let token = await dispatch(getAuthToken())
                let userId = await dispatch(getUserId());
                console.warn(userId)

                let res = await fetch(`${API_URL}users/${userId}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token,
                        "Accept": "application/json"
                    }
                })
                let resJson = await res.json()

                console.warn(resJson)

                await dispatch(uiStopLoading())
                if (resJson.errors) {
                    alert(resJson.errors[0] || "Something went wrong, pls try again")
                    return false;
                } else {
                    await AsyncStorage.setItem("user-data", JSON.stringify(resJson.user))
                    dispatch(setUser(resJson.user))
                    if (resJson.user.role === "merchant") await dispatch(getMerchant())
                    return resJson.user
                }
            } catch (error) {
                dispatch(uiStopLoading())
                alert('Something went wrong, please try again. If this persists then you are not logged in')
                await dispatch(authRemoveAsyncData())
                return false
            }
        }
    }
}

export const logout = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(uiStartLoading())

            dispatch(authRemoveToken())
            dispatch(authRemoveAsyncData())

            dispatch(uiStopLoading())

            return "done"
        } catch (error) {
            alert("Logout failed, please try again")
            dispatch(uiStopLoading())
            return null
        }
    }
}