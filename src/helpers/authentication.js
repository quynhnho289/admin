
class Authentication {

    isAuthentication() {
        const token = sessionStorage.getItem('token');
        const user = sessionStorage.getItem('userID');
        return token && user;
    }
}

const authentication = new Authentication();
export { authentication };