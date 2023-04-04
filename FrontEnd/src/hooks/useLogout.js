import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()

    const logout = () => {

        //remove user from storage (user becomes null again)
        localStorage.removeItem('user')

        //dispatch logout action
        dispatch ({type: 'LOGOUT'})

    }

    return {logout}
}

export default useLogout;