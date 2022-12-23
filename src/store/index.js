import {createStore} from 'vuex'
import {getCookie, setCookie} from "./cookies"
import axios from "axios";

// Constants
const API_URL = "http://194.9.172.252:3000";

// Templates data
const teamsTemplate = require("../assets/templates/mockTeams")
const usersTemplate = require("../assets/templates/mockUsers")
const noticesTemplate = require("../assets/templates/mockNotifications")

export default createStore({
    state: {
        user: {
            id: null,
            username: null,
            teamCode: null
        },
        token: null,
        teams: null,
        users: null,
        notices: null
    },
    mutations: {
        fetchToken(state){
            if(!state.token){
                let token = getCookie("token");
                if(token)
                    state.token = token;
            }
        },
        setUser(state, user){
            if(user === null){
                state.user = {
                    id: null,
                    username: null,
                    teamCode: null
                }
            }else state.user = user;
        },
        setToken(state, token){
            state.token = token;
            if(token === null){
                setCookie("token", null, 0);
            } else{
                setCookie("token", JSON.stringify({token: token}), 1);
            }
        },
        setTeams(state, teams){
            if(teams === null) return false;
            // for each team, sort members by username
            for(let team of teams){
                team.members.sort((a, b) => {
                    return a.username.localeCompare(b.username);
                })
            }
            // Sort teams by score
            teams.sort((a, b) => {
                return b.score - a.score;

            });
            state.teams = teams;
        },
        setNotifications(state, notices){
            if(notices === null) return false;
            // Sort notices by id
            notices.sort((a, b) => {
                return b.id - a.id;
            });
            state.notices = notices;
        },







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
                // user = checkAPIToken(this.apiURL, this.token);
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
        fetchTeams() {
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
            this.notices = finalNotices;
        },
        acceptNotification(state, noticeId){
            console.log("Accepting notification " + noticeId);
        },
        declineNotification(state, noticeId){
            console.log("Declining notification " + noticeId);
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
        // Authentification management
        async login({commit, dispatch}, loginInfos){
            try{
                const res = await axios.post(API_URL + "/api/token", loginInfos);
                if(res.status === 200) {
                    const user = res.data.user;
                    const token = res.data.token;
                    commit("setUser", user);
                    commit("setToken", token);
                    return 0;
                }
            }catch (error){
                if(error.response.status === 404)
                    return await dispatch("createUser", loginInfos);
                const errorMessage = `Error in login ${error.response.status} : ${error.response.data.message}; ${error.response.data.data}`;
                console.log(errorMessage)
                alert(errorMessage);
                return error.response.status;
            }
        },
        async createUser({commit}, userInfos){
            try{
                const res = await axios.post(API_URL + "/api/users", userInfos);
                if(res.status === 201){
                    const user = {
                        id: res.data.id,
                        username: res.data.username,
                        teamCode: null
                    }
                    commit("setUser", user);
                    commit("setToken", res.data.token);
                }
            }catch(error){
                const errorMessage = `Error in login ${error.response.status} : ${error.response.data.message}; ${error.response.data.data}`;
                console.log(errorMessage)
                alert(errorMessage);
                return error.response.status;
            }

        },
        async checkToken({commit, state}){
            if(!state.token)
                commit("fetchToken");
            if(!state.token) return false;
            try{
                const res = await axios.get(API_URL + "/api/token", {headers: { "Authorization": `Bearer ${state.token}`}});
                if(res.status === 200) {
                    commit("setUser", res.data);
                    return true;
                }
                return true;
            } catch (error){
                commit("setUser", null);
                commit("setToken", null);
                const errorMessage = `Error in login ${error.response.status} : ${error.response.data.message}; ${error.response.data.data}`;
                console.log(errorMessage)
                return false;
            }
        },
        async updateTeams({commit, state}){
            try{
                const res = await axios.get(API_URL + "/api/teams?complete=users", {headers: { "Authorization": `Bearer ${state.token}`}});
                if(res.status === 200) {
                    commit("setTeams", res.data);
                    return true;
                }else{
                    console.log("Error in updateTeams : " + res.status);
                    return false;
                }
            } catch(error){
                commit("setTeams", null);
                const errorMessage = `Error in login ${error.response.status} : ${error.response.data.message}; ${error.response.data.data}`;
                console.log(errorMessage)
                return false;
            }
        },
        async updateNotifications({commit, state}){
            try{
                const res = await axios.get(API_URL + "/api/notifications", {headers: { "Authorization": `Bearer ${state.token}`}});
                if(res.status === 200) {
                    commit("setNotifications", res.data);
                    return true;
                }
            }catch (error){
                commit("setNotifications", null);
                const errorMessage = `Error in login ${error.response.status} : ${error.response.data.message}; ${error.response.data.data}`;
                console.log(errorMessage)
                return false;
            }
        },
        async acceptNotification({commit, state, dispatch}, noticeId){
            try{
                console.log("Accepting notification " + noticeId);
                const res = await axios.post(API_URL + "/api/notifications/accept/" + noticeId, null, {headers: { "Authorization": `Bearer ${state.token}`}});
                if(res.status === 200) {
                    await dispatch("updateNotifications");
                    console.log("Accepted notification " + noticeId);
                    return true;
                }else{
                    console.log("Error in acceptNotification " + res.status);
                }
            }catch(error){
                commit("setNotifications", null);
                console.log(error);
                const errorMessage = `Error in login ${error.response.status} : ${error.response.data.message}; ${error.response.data.data}`;
                console.log(errorMessage)
                return false;
            }
        },









        // Notifications management
        loadNotifications({commit}){
            commit('loadUsers');
            return commit('loadNotifications');
        },
        declineNotification({commit}, notificationId){
            commit("declineNotification", notificationId);
        },
        // Team management
        loadTeams({commit}){
            commit('loadUsers');
            return commit('fetchTeams');
        },
        createTeam({commit}, teamName){
            commit('createTeam', teamName);
            return commit('fetchTeams');
        },
        invitePlayer({commit}, username){
            commit('invitePlayer', username);
        },
        removeFromTeam({commit}, username){
            commit('removeFromTeam', username);
            commit("fetchTeams");
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