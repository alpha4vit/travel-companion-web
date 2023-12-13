export const checkAuthenticated = () => {
    return !!localStorage.getItem("jwtAccessToken");
}