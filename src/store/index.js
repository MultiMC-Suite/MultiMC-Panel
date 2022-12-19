import {createStore} from 'vuex'
import {getCookie, setCookie} from "./cookies"
import {checkAPIToken} from "./auth"

// Templates data
const teams = require("../assets/templates/mockTeams")
const users = require("../assets/templates/mockUsers")

export default createStore({
    state: {
        user: {
            userId: null,
            username: null,
            teamCode: null
        },
        token: null,
        teams: null,
        users: null
    },
    mutations: {
        login(state, loginForm){
            if(!this.token && loginForm != null){
                // TODO: Get token from API
                let fetchedToken = "token";
                setCookie("token", JSON.stringify({token: fetchedToken}), 1);
                this.token = fetchedToken;
            }else return false;
            return true;
        },
        checkToken(){
            // If currently no token, check if there is a token in the cookies
            if(!this.token){
                let cookie = getCookie("token");
                let jsonCookie;
                if(cookie)
                    jsonCookie = JSON.parse(cookie);
                if(jsonCookie)
                    this.token = jsonCookie.token;
            }
            let user;
            if(this.token)
                user = checkAPIToken(this.token);
            if(!user){
                this.token = null;
                this.user.username = null;
            }else{
                this.user = user;
            }
        },
        loadTeams() {
            for(let team of teams){
                team.ownerId = getUserFromId(users, team.ownerId);
                let members = [];
                for(let member of team.members){
                    members.push(getUserFromId(users, member));
                }
                team.members = members;
            }
            this.teams = teams;
        }
    },
    actions: {
        login({commit}, loginForm){
            commit('checkToken');
            return commit('login', loginForm);
        },
        checkToken({commit}){
            commit('checkToken');
        },
        loadTeams({commit}){
            return commit('loadTeams');
        }
    }
})

function getUserFromId(userlist, id){
    for(let user of userlist){
        if(user.userId === id)
            return user;
    }
    return null;
}