import axios from "axios";

export const registerUser = (user) => async (dispatch) => {
    dispatch({ type: 'USER_REGISTER_REQ' })
    try {


        const res = await axios.post('/api/users/register', user)
        console.log(res)
        dispatch({ type: 'USER_REGISTER_SUCCESS' })
        window.location.href = "/login"

    } catch (error) {
        dispatch({ type: 'USER_REGISTER_FAIL', payload: error })
    }
}

export const loginUser = (user) => async (dispatch) => {
    dispatch({ type: 'USER_LOGIN_REQ' })
    try {
        const config = {
            headers: {
                "Content-type": "application/json",

            }
        }
        const response = await axios.post('/api/users/login', user, config)
        console.log(response.data.token)
        dispatch({ type: 'USER_LOGIN_SUCCESS', payload: response.data })
        localStorage.setItem('currentUser', JSON.stringify(response.data))

        axios.put(`api/product/Loginuser/${response.data.name}`).then(res=>{
            console.log("user updated")
        })
        window.location.href = "/home"

    }
    catch (error) {
        dispatch({ type: 'USER_LOGIN_FAIL', payload: error })
        alert("Login failed")
        window.location.href = "/login"


    }


}

export const resetUser = (user) => async (dispatch) => {
    dispatch({ type: 'USER_LOGIN_REQ' })
    try {
        const config = {
            headers: {
                "Content-type": "application/json",
            }
        }
        const response = await axios.post('/api/users/reset-password', user, config)

        console.log(response.data)
        dispatch({ type: 'USER_LOGIN_SUCCESS', payload: response.data })
        localStorage.setItem('currentUser', JSON.stringify(response.data))
        window.location.href = "/login"

    }
    catch (error) {
        dispatch({ type: 'USER_LOGIN_FAIL', payload: error })
        alert("Login failed")
    }
}

export const logoutUser = () => async (dispatch) => {
    localStorage.removeItem('currentUser')
    window.location.href = "/home"
}

