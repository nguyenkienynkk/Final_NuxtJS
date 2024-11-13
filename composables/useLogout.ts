export const useLogout = () => {
    const user = useUser()
    return () => {
        user.value = null
        navigateTo('/login')
    }
}
