<template>
    <article class="panel">
        <header-component title="My Team" subtitle="Les infâmes" button-content="Inviter un joueur" class="panel__header"></header-component>
        <div class="my-team-panel__content">
            <ul class="my-team-panel__content__infos">
                <li class="my-team-panel__content__infos__item">
                    <team-info title="#1" content="Classement"></team-info>
                </li>
                <hr class="my-team-panel__content__infos__item--separator">
                <li class="my-team-panel__content__infos__item">
                    <team-info title="48" content="Score"></team-info>
                </li>
                <hr class="my-team-panel__content__infos__item--separator">
                <li class="my-team-panel__content__infos__item">
                    <team-info title="3" content="Joueurs"></team-info>
                </li>
            </ul>
            <div class="my-team-panel__content__players">
                <h2 class="my-team-panel__content__players__title">Joueurs</h2>
                <ul class="my-team-panel__content__players__list">
                    <li class="my-team-panel__content__players__list--item">
                        <player-component owner>Xen0Xys</player-component>
                    </li>
                    <li class="my-team-panel__content__players__list--item">
                        <player-component>Machin</player-component>
                    </li>
                    <li class="my-team-panel__content__players__list--item">
                        <player-component>Bidule</player-component>
                    </li>
                </ul>
            </div>
        </div>
    </article>
</template>

<script>
import HeaderComponent from "@/components/panels/components/Header.vue";
import PlayerComponent from "@/components/panels/components/content/Player.vue";
import TeamInfo from "@/components/panels/components/content/TeamInfo.vue";

export default {
    name: "MyTeamPanel",
    components: {TeamInfo, PlayerComponent, HeaderComponent}
}
</script>

<style lang="scss">
@use "../../assets/colors.scss" as colors;
@import "src/assets/style/panel";
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