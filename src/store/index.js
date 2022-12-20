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
        loadUser(){
            // TODO: Get user from API
            this.user = {
                userId: 1,
                username: "User 1",
                teamCode: "T1"
            }
        },
        loadUsers(){
            // TODO: Axios request to get users
            this.users = users;
        },
        loadTeams() {
            // TODO: Axios request to get teams and users
            for(let team of teams){
                team.ownerId = getUserFromId(this.users, team.ownerId);
                let members = [];
                for(let member of team.members){
                    members.push(getUserFromId(this.users, member));
                }
                team.members = members;
            }
            teams.sort((a, b) => b.score - a.score);
            this.teams = teams;
        },
        createTeam(){
            // TODO: Axios request to create team
            let teamCode = "T1";
            this.user.teamCode = teamCode;
        },
        invitePlayer(){
            // TODO: Axios request to invite player
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
            commit('loadUsers');
            return commit('loadTeams');
        },
        createTeam({commit}, teamName){
            commit('createTeam', teamName);
            return commit('loadTeams');
        },
        invitePlayer({commit}, username){
            commit('invitePlayer', username);
        }
    }
})

function getUserFromId(userList, id){
    for(let user of userList){
        if(user.userId === id)
            return user;
    }
    return null;
}