<template>
    <article class="panel">
        <header-component title="Équipes" class="panel__header" @primary="this.updateTeams"></header-component>
        <div class="panel__content">
            <TeamRankingComponent v-for="(team, key) of teams" :key=key :rank=key+1 :score=team.score :team-name=team.name :members=team.members></TeamRankingComponent>
        </div>
    </article>
</template>

<script>
import HeaderComponent from "@/components/panels/components/Header.vue";
import TeamRankingComponent from "@/components/panels/components/content/TeamRanking.vue";

export default {
    name: "TeamsPanel",
    components: {TeamRankingComponent, HeaderComponent},
    computed: {
        teams() {
            return this.$store.state.teams;
        }
    },
    methods: {
        updateTeams() {
            this.$store.dispatch('updateTeams');
        }
    },
    created() {
        this.updateTeams();
    }
}
</script>

<style lang="scss">
@import "src/assets/style/panel";
</style>