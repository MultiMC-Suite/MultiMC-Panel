<template>
    <article class="panel">
        <header-component title="Équipes" class="panel__header"></header-component>
        <div class="panel__content">
            <TeamRankingComponent v-for="(team, key) of teams" :key=key :rank=key+1 :score=team.score :team-name=team.teamName :members=team.members></TeamRankingComponent>
<!--            <TeamRankingComponent rank="#1" :score=48 team-name="Team 1" :members="[`Xen0Xys`, `eTechVO`]"></TeamRankingComponent>-->
        </div>
    </article>
</template>

<script>
import HeaderComponent from "@/components/panels/components/Header.vue";
import TeamRankingComponent from "@/components/panels/components/content/TeamRanking.vue";

export default {
    name: "TeamsPanel",
    components: {TeamRankingComponent, HeaderComponent},
    data: () => {
        return {
            teams: null
        }
    },
    computed: {

    },
    created() {
        this.$store.dispatch("loadTeams").then(() => {
            const teams = this.$store.teams;
            for (let team of teams) {
                team.members = team.members.map(member => member !== null ? member.username : "");
                team.members.push(team.ownerId !== null ? team.ownerId.username : "");
                team.members.sort();
            }
            this.teams = teams;
        });
    }
}
</script>

<style lang="scss">
@import "src/assets/style/panel";
</style>