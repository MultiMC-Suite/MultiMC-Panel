<template>
    <article class="panel">
        <header-component title="Teams" class="panel__header"></header-component>
        <div class="panel__content">
            <TeamRankingComponent rank="#1" score="48" team-name="Team 1" :members="[`Xen0Xys`, `eTechVO`]"></TeamRankingComponent>
            <TeamRankingComponent rank="#2" score="48" team-name="Team 1" :members="[`Xen0Xys`, `eTechVO`]"></TeamRankingComponent>
        </div>
    </article>
</template>

<script>
import HeaderComponent from "@/components/panels/components/Header.vue";
import TeamRankingComponent from "@/components/panels/components/content/TeamRanking.vue";

export default {
    name: "TeamsPanel",
    components: {TeamRankingComponent, HeaderComponent}
}
</script>

<style lang="scss">
@import "src/assets/style/panel";
</style>