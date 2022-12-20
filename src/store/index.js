import {createStore} from 'vuex'
import {getCookie, setCookie} from "./cookies"
import {checkAPIToken} from "./auth"

// Templates data
const teamsTemplate = require("../assets/templates/mockTeams")
const usersTemplate = require("../assets/templates/mockUsers")
const noticesTemplate = require("../assets/templates/mockNotifications")

export default createStore({
    state: {
        user: {
            userId: null,
            username: null,
            teamCode: null
        },
        token: null,
        teams: null,
        users: null,
        notices: null
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
                this.user = {
                    userId: null,
                    username: null,
                    teamCode: null
                }
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
            this.users = JSON.parse(JSON.stringify(usersTemplate));
        },
        loadTeams() {
            // TODO: Axios request to get teams and users
            let teams = JSON.parse(JSON.stringify(teamsTemplate))
            let finalTeams = [];
            for(let team of teams){
                team.ownerId = getUserFromId(this.users, team.ownerId);
                let members = [];
                for(let member of team.members){
                    members.push(getUserFromId(this.users, member));
                }
                team.members = members;
                finalTeams.push(JSON.parse(JSON.stringify(team)));
            }
            finalTeams.sort((a, b) => b.score - a.score);
            this.teams = finalTeams;
        },
        loadNotifications(){
            const notices = JSON.parse(JSON.stringify(noticesTemplate));
            const finalNotices = [];
            for(let notice of notices){
                if(notice.senderId !== null)
                    notice.senderId = getUserFromId(this.users, notice.senderId);
                if(notice.notificationType in ["invite"])
                    if(notice.state !== "waiting")
                        continue;
                finalNotices.push(JSON.parse(JSON.stringify(notice)));
            }
            console.log(finalNotices)
            this.notices = finalNotices;
        },
        createTeam(){
            // TODO: Axios request to create team
            let teamCode = "T1";
            this.user.teamCode = teamCode;
        },
        invitePlayer(){
            // TODO: Axios request to invite player
        },
        removeFromTeam(){
            // TODO: Axios request to remove player from team
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
        loadNotifications({commit}){
            commit('loadUsers');
            return commit('loadNotifications');
        },
        createTeam({commit}, teamName){
            commit('createTeam', teamName);
            return commit('loadTeams');
        },
        invitePlayer({commit}, username){
            commit('invitePlayer', username);
        },
        removeFromTeam({commit}, username){
            commit('removeFromTeam', username);
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