import { AUTH } from '../constants/actionTypes'
import * as api from '../api/index'

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData)

        dispatch({ type: AUTH, data })
        navigate("/")
    } catch (error) {
        window.alert('Usuário não cadastrado')
        navigate("/")
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData)

        dispatch({ type: AUTH, data })

        navigate("/")
    } catch (error) {
        window.alert('Usuário já cadastrado')
        navigate("/")
    }
}