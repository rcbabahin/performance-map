class Auth {
    signup(user) {
        this.signin(user);
    }
    signin({ token, username }){
        // const _id = this.parseJWT(token).id;

        const user = {
            username,
            // _id,
            // backendToken: token
        };

        localStorage.setItem('user', JSON.stringify(user));
    }
    signout() {        
        delete localStorage['user'];
    }
    isSigned() {
        return localStorage.getItem('user') !== null
    }
    getUsername() {
        if (!this.isSigned())
            return null

        const { username } = JSON.parse(localStorage.getItem('user'));
        
        return username;
    }
    getUserId() {
        if (!this.isSigned())
            return null

        const { _id } = JSON.parse(localStorage.getItem('user'));

        return _id;
    }
    getBackendToken() {
        if (!this.isSigned())
            return null

        const { backendToken } = JSON.parse(localStorage.getItem('user'));
        
        return backendToken;
    }
    setBackendToken(token) {
        let user = JSON.parse(localStorage.getItem('user'));
        const _id = this.parseJWT(token).id

        user = { 
            ...user,
             _id,
             backendToken: token 
        };
        
        localStorage.setItem('user', JSON.stringify(user));
    }
    parseJWT(token) {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');

        return JSON.parse(window.atob(base64));
    }
}

export default new Auth();