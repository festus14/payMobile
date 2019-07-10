import {
    SET_USER
} from './actionTypes'
import {
    API_URL
} from '../../utility/constants'
import {
    authRemoveToken,
    uiStartLoading,
    uiStopLoading,
    getAuthToken
} from './';

export const setUser = (user) => {
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
                    dispatch(getAuthToken())
                    userId = await getState().auth.userId

                    resolve(parseInt(userId))
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

            if (!userData.email) {
                let token = await dispatch(getAuthToken())
                let userId = await dispatch(getUserId());

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
                    dispatch(setUser(resJson.user))
                    return resJson.user
                }
            } else {
                await dispatch(uiStopLoading())
                return userData
            }
        } catch (e) {
            dispatch(uiStopLoading())
            alert('Something went wrong, please try again. If this persists then you are not logged in')
            return false
        }
    }
}