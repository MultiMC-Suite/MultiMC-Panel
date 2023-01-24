import {createStore} from 'vuex'
import {getCookie, setCookie} from "./cookies"
import axios from "axios";

// Constants
const API_URL = "https://api.multimc.dotslash.fr:3000";

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
            if(teams === null){
                state.teams = [];
                return false;
            }
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
            if(notices === null){
                state.notices = [];
                return false;
            }
            // Sort notices by id
            notices.sort((a, b) => {
                return b.id - a.id;
            });
            state.notices = notices;
        },
        setUserTeam(state, teamCode){
            state.user.teamCode = teamCode;
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
                const res = await axios.post(API_URL + "/api/notifications/accept/" + noticeId, null, {headers: { "Authorization": `Bearer ${state.token}`}});
                if(res.status === 200) {
                    await dispatch("updateNotifications");
                    return true;
                }else{
                    console.log("Error in acceptNotification " + res.status);
                }
            }catch(error){
                commit("setNotifications", null);
                const errorMessage = `Error in login ${error.response.status} : ${error.response.data.message}; ${error.response.data.data}`;
                console.log(errorMessage)
                return false;
            }
        },
        async declineNotification({commit, state, dispatch}, noticeId){
            try{
                const res = await axios.post(API_URL + "/api/notifications/decline/" + noticeId, null, {headers: { "Authorization": `Bearer ${state.token}`}});
                if(res.status === 200) {
                    await dispatch("updateNotifications");
                    return true;
                }else{
                    console.log("Error in declineNotification " + res.status);
                }
            }catch(error){
                commit("setNotifications", null);
                const errorMessage = `Error in declineNotification ${error.response.status} : ${error.response.data.message}; ${error.response.data.data}`;
                console.log(errorMessage)
                return false;
            }
        },
        async createTeam({commit, state, dispatch}, teamName){
            try{
                const res = await axios.post(API_URL + "/api/teams", {teamName: teamName},{headers: { "Authorization": `Bearer ${state.token}`}});
                if(res.status === 201) {
                    commit("setUserTeam", res.data.code);
                    await dispatch("updateTeams");
                    return true;
                }
            }catch(error){
                const errorMessage = `Error in login ${error.response.status} : ${error.response.data.message}; ${error.response.data.data}`;
                console.log(errorMessage)
            }
        },
        async sendInvitation({state}, targetUsername){
            try{
                const getRes = await axios.get(API_URL + "/api/users",{headers: { "Authorization": `Bearer ${state.token}`}});
                if(getRes.status === 200){
                    const users = getRes.data;
                    const targetUser = users.find(user => user.username === targetUsername);
                    if(targetUser) {
                        const notificationBody = {
                            targetId: targetUser.id,
                            type: "invite",
                            content: {
                                teamCode: state.user.teamCode
                            }
                        }
                        const res = await axios.post(API_URL + "/api/notifications", notificationBody, {headers: {"Authorization": `Bearer ${state.token}`}});
                        if(res.status !== 201) {
                            console.log("Error in post sendInvitation " + res.status);
                            return false;
                        }else{
                            return true;
                        }
                    }else{
                        console.log("User not found");
                        alert("User not found");
                        return false;
                    }
                }else{
                    console.log("Error in get sendInvitation " + getRes.status);
                    return false;
                }
            }catch(error){
                const errorMessage = `Error in login ${error.response.status} : ${error.response.data.message}; ${error.response.data.data}`;
                console.log(errorMessage)
            }
        },
        async removeFromTeam({state, dispatch}, userName){
            try{
                const getRes = await axios.get(API_URL + "/api/users",{headers: { "Authorization": `Bearer ${state.token}`}});
                if(getRes.status === 200){
                    const targetUser = getRes.data.find(user => user.username === userName);
                    const targetId = targetUser.id;
                    const res = await axios.delete(API_URL + "/api/teams/members/" + targetId, {headers: { "Authorization": `Bearer ${state.token}`}});
                    if(res.status === 204){
                        await dispatch("updateTeams");
                        await dispatch("updateNotifications");
                        return true;
                    }else{
                        console.log("Error in removeFromTeam " + res.status);
                        return false;
                    }
                }
            }catch(error){
                const errorMessage = `Error in removeFromTeam ${error.response.status} : ${error.response.data.message}; ${error.response.data.data}`;
                console.log(errorMessage)
            }
        }
    }
})