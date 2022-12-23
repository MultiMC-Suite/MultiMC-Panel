<template>
    <modal-component ref="createTeamModal" title="Créer une équipe" button-content="Valider" input-content="Nom de l'équipe" @submitted="this.createTeam"></modal-component>
    <modal-component ref="invitePlayerModal" title="Inviter un joueur" input-content="Pseudo du joueur" button-content="Valider" @submitted="this.invitePlayer"></modal-component>
    <article class="panel" v-if="this.userTeam !== null">
        <header-component v-if="this.isTeamOwner" title="Mon équipe" :subtitle="this.teamName" button-content="Inviter un joueur" class="panel__header" @primary="this.refresh" @secondary="this.openInvitePlayerModal"></header-component>
        <header-component v-else title="Mon équipe" :subtitle="this.teamName" class="panel__header" @primary="this.refresh"></header-component>
        <div class="my-team-panel__content">
            <ul class="my-team-panel__content__infos">
                <li class="my-team-panel__content__infos__item">
                    <team-info :title=this.teamInfos.rank content="Classement"></team-info>
                </li>
                <hr class="my-team-panel__content__infos__item--separator">
                <li class="my-team-panel__content__infos__item">
                    <team-info :title=this.teamInfos.score content="Score"></team-info>
                </li>
                <hr class="my-team-panel__content__infos__item--separator">
                <li class="my-team-panel__content__infos__item">
                    <team-info :title=this.teamInfos.players content="Joueurs"></team-info>
                </li>
            </ul>
            <div class="my-team-panel__content__players">
                <h2 class="my-team-panel__content__players__title">Joueurs</h2>
                <ul class="my-team-panel__content__players__list">
                    <li class="my-team-panel__content__players__list--item">
                        <player-component owner>{{teamOwner}}</player-component>
                    </li>
                    <li class="my-team-panel__content__players__list--item" v-for="teamMember of this.teamMembers" :key="teamMember">
                        <player-component @clicked="this.removePlayer">{{teamMember}}</player-component>
                    </li>
                </ul>
            </div>
        </div>
    </article>
    <article v-else class="panel empty-panel">
        <ButtonComponent primary @clicked="openCreateTeamModal">Créer mon équipe</ButtonComponent>
    </article>
</template>

<script>
import HeaderComponent from "@/components/panels/components/Header.vue";
import PlayerComponent from "@/components/panels/components/content/Player.vue";
import TeamInfo from "@/components/panels/components/content/TeamInfo.vue";
import ButtonComponent from "@/components/parts/Button.vue";
import ModalComponent from "@/components/parts/Modal.vue";

export default {
    name: "MyTeamPanel",
    components: {ModalComponent, ButtonComponent, TeamInfo, PlayerComponent, HeaderComponent},
    methods: {
        refresh() {
            this.$store.dispatch("loadTeams");
        },
        openCreateTeamModal() {
            this.$refs.createTeamModal.open();
        },
        openInvitePlayerModal() {
            this.$refs.invitePlayerModal.open();
        },
        createTeam(){
            this.$store.dispatch('createTeam', this.$refs.createTeamModal.content).then(() => {
                this.$forceUpdate();
            });
        },
        invitePlayer(){
            this.$store.dispatch('invitePlayer', this.$refs.invitePlayerModal.content);
        },
        getUserTeam() {
            console.log(this.$store.state.teams)
            if(!this.$store.state.teams) return null;
            for(let team of this.$store.state.teams){
                if(team.teamCode === this.$store.state.user.teamCode){
                    return team;
                }
            }
            return null;
        },
        getTeamRank() {
            let rank = 1;
            for(let team of this.$store.state.teams){
                if(team.score > this.userTeam.score){
                    rank++;
                }
            }
            return rank;
        },
        removePlayer(playerName){
            this.$store.dispatch('removeFromTeam', playerName);
        }
    },
    computed: {
        userTeam(){
            if(!this.$store.state.teams) return null;
            for(let team of this.$store.state.teams){
                if(team.code === this.$store.state.user.teamCode){
                    return team;
                }
            }
            return null;
        },
        teamInfos() {
            const userTeam = this.userTeam;
            if(userTeam === null){
                return {
                    rank: null,
                    score: null,
                    players: null
                }
            }
            return {
                rank: "#" + this.getTeamRank(),
                score: userTeam.score + "",
                players: userTeam.members.length + ""
            };
        },
        teamMembers() {
            const userTeam = this.userTeam;
            if(userTeam === null) return;
            const memberUsernames = [];
            console.log(userTeam.members)
            for(let member of userTeam.members){
                if(member.username !== this.teamOwner)
                    memberUsernames.push(member.username);
            }
            return memberUsernames;
        },
        teamOwner() {
            const userTeam = this.userTeam;
            if(userTeam === null) return null;
            for(let member of userTeam.members){
                if(member.id === userTeam.ownerId){
                    return member.username;
                }
            }
            return null;
        },







        isTeamOwner() {
            const userTeam = this.getUserTeam();
            if(userTeam === null) return;
            return userTeam.ownerId.username === this.$store.user.username;
        },
        teamName() {
            const userTeam = this.getUserTeam();
            if(userTeam === null) return;
            return userTeam.teamName;
        }
    }
}
</script>

<style lang="scss">
@use "../../assets/colors.scss" as colors;
@import "src/assets/style/panel";
.empty-panel{
    background-color: colors.$background-color;
    display: flex;
    justify-content: center;
    align-items: center;
}
.my-team-panel{
    &__content{
        display: flex;
        flex-direction: row;
        align-items: stretch;
        height: 100%;
        &__infos{
            background-color: colors.$background-color;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 10rem;
            &__item{
                display: flex;
                flex: 1 1 33.33%;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 100%;
                color: white;
                &--separator{
                    width: 100%;
                    margin: 0;
                    border: 1px solid colors.$dark-background-color;
                }
            }
        }
        &__players{
            display: flex;
            flex-direction: column;
            flex: 1 1;
            &__title{
                padding: 1rem 1.5rem .5rem;
                color: white;
                font-weight: bold;
                font-size: 20px;
            }
            &__list{
                padding: 0 1.5em 1em 1.5em;
            }
        }
    }
}
</style>