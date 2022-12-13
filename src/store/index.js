import { createStore } from 'vuex'

export default createStore({
    state: {
        token: undefined
    },
    mutations: {
        login(state, loginForm){
            console.log("login form:", loginForm)
            let cookie = getCookie("token");
            let jsonCookie;
            if(cookie){
                jsonCookie = JSON.parse(cookie);
            }
            if(jsonCookie){
                this.token = jsonCookie.token;
                // TODO: Verify token in the API
                // Return false if token is invalid
            }else if(loginForm != null){
                // TODO: Get token from API
                let fetchedToken = "token";
                setCookie("token", JSON.stringify({token: fetchedToken}), 1);
                this.token = fetchedToken;
            }else{
                return false;
            }
            return true;
        }
    },
    actions: {
        login({commit}, loginForm){
            return commit('login', loginForm);
        }
    },
    modules: {

    }
})

function setCookie(cookieName, cookieValue, expirationDays) {
    const d = new Date();
    d.setTime(d.getTime() + (expirationDays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}
function getCookie(cookieName) {
    let name = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}