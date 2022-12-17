<template>
    <SimpleModalComponent ref="inviteModal" title="Inviter un joueur" input-content="Pseudo du joueur" button-content="Valider"></SimpleModalComponent>
    <main>
        <section class="panels">
            <article class="panels__article panels__teams">
                <header class="panels__article__header">
                    <h1 class="panels__article__header__title">Teams</h1>
                    <ul class="panels__article__header__actions">
                        <li>
                            <ButtonComponent icon-name="refresh"></ButtonComponent>
                        </li>
                    </ul>
                </header>
                <hr class="panels__separator">
                <div class="panels__team-display">
                    <div class="panels__team-display__infos">
                        <h2 class="panels__team-display__infos__title">#1</h2>
                        <div class="panels__team-display__infos__team">
                            <h3 class="panels__team-display__infos__team__name">Team 1</h3>
                            <p class="panels__team-display__infos__team__content">eTechVo . Xen0Xys</p>
                        </div>
                    </div>
                    <div class="panels__team-display__score">
                        <h2>48</h2>
                    </div>
                </div>
            </article>
            <aside class="panels__right">
                <article class="panels__article panels__right__notify">
                    <header class="panels__article__header">
                        <h1 class="panels__article__header__title">Notifications</h1>
                        <ul class="panels__article__header__actions">
                            <li>
                                <ButtonComponent icon-name="refresh"></ButtonComponent>
                            </li>
                        </ul>
                    </header>
                    <hr class="panels__separator">
                </article>
                <article class="panels__article panels__right__team">
                    <header class="panels__article__header">
                        <h1 class="panels__article__header__team-title">My Team <span class="panels__article__header__team-title--team-name">Les infâmes</span></h1>
                        <ul class="panels__article__header__actions">
                            <li>
                                <ButtonComponent icon-name="refresh"></ButtonComponent>
                            </li>
                            <li>
                                <ButtonComponent @clicked="openInviteModal" primary>Inviter un joueur</ButtonComponent>
                            </li>
                        </ul>
                    </header>
                    <hr class="panels__separator">
                    <div class="panels__own-team">
                        <ul class="panels__own-team__infos">
                            <li class="panels__own-team__infos--item">
                                <h2 class="panels__own-team__infos__title">#1</h2>
                                <p class="panels__own-team__infos__content">Classement</p>
                            </li>
                            <hr class="panels__separator panels__own-team__infos__separator">
                            <li class="panels__own-team__infos--item">
                                <h2 class="panels__own-team__infos__title">18</h2>
                                <p class="panels__own-team__infos__content">Score</p>
                            </li>
                            <hr class="panels__separator panels__own-team__infos__separator">
                            <li class="panels__own-team__infos--item">
                                <h2 class="panels__own-team__infos__title">3</h2>
                                <p class="panels__own-team__infos__content">Joueurs</p>
                            </li>
                        </ul>
                        <div class="panels__own-team__players">
                            <h2 class="panels__own-team__players__title">Joueurs</h2>
                            <ul class="panels__own-team__players__list">
                                <li class="panels__own-team__players__list__item">
                                    <p class="panels__own-team__players__list__item__text">Xen0Xys</p>
                                    <ButtonComponent icon-name="owner"></ButtonComponent>
                                </li>
                                <li class="panels__own-team__players__list__item">
                                    <p class="panels__own-team__players__list__item__text">Bidule</p>
                                    <ButtonComponent icon-name="trash"></ButtonComponent>
                                </li>
                                <li class="panels__own-team__players__list__item">
                                    <p class="panels__own-team__players__list__item__text">Machin</p>
                                    <ButtonComponent icon-name="trash"></ButtonComponent>
                                </li>
                            </ul>
                        </div>
                    </div>
                </article>
            </aside>
        </section>
    </main>
</template>

<script>
import ButtonComponent from "@/components/Button.vue";
import SimpleModalComponent from "@/components/Modal.vue";

export default {
    name: "Main-View",
    components: {SimpleModalComponent, ButtonComponent},
    beforeCreate() {
        // TODO: Check token and redirect to login if not valid
        if(!this.$store.token){
            this.$router.push("/login");
        }
    },
    methods: {
        openInviteModal() {
            this.$refs.inviteModal.open();
        }
    }
}
</script>

<style lang="scss">
    @use "../assets/colors.scss" as colors;
    $gap: 4rem;
    .panels{
        display: flex;
        flex-direction: row;
        align-items: stretch;
        grid-gap: $gap;
        background-color: colors.$global-background-color;
        width: 100%;
        min-height: 100vh;
        padding: 4.5rem 5rem;
        // Panels display
        &__teams, &__right{
            flex: 1 1 50%;
        }
        &__article{
            background-color: colors.$dark-background-color;
            &__header{
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                padding: 1em 1.5em;
                &__team-title{
                    font-size: 20px;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    grid-gap: .5em;
                    &--team-name {
                        opacity: 30%;
                        font-size: 16px;
                        font-style: italic;
                        font-weight: normal;
                        order: 1;
                    }
                    &::after {
                        content: '';
                        width: .25em;
                        border-radius: 50%;
                        aspect-ratio: 1 / 1;
                        background-color: white;
                        opacity: 40%;
                    }
                }
                &__title{
                    font-size: 20px;
                    color: white;
                }
                &__actions{
                    display: flex;
                    grid-gap: .5em;
                }
            }
        }
        &__right{
            display: flex;
            flex-direction: column;
            grid-gap: $gap;

            &__team, &__notify{
                flex: 1 1 50%;
                display: flex;
                flex-direction: column;
            }
        }
        &__separator{
            margin: 0;
            border: 1px solid colors.$background-color;
        }
        // Team score display
        &__teams{
            // Parent of team score display
        }
        &__team-display{
            // Team score display
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: .75em 1.5em;
            &__infos{
                display: flex;
                flex-direction: row;
                align-items: center;
                grid-gap: 1.5em;
                &__title{
                    color: white;
                    opacity: 20%;
                    justify-content: left;
                    font-size: 1.25em;
                    width: 4em;
                    //padding: .75em 0;
                }
                &__team{
                    display: flex;
                    flex-direction: column;
                    grid-gap: .25em;
                    &__name{
                        color: white;
                    }
                    &__content{
                        color: white;
                        font-size: .75em;
                        opacity: 30%;
                    }
                }
            }
            &__score{
                color: white;
                font-size: 1.5em;
            }
        }
        // Own team display
        &__own-team{
            display: flex;
            flex-direction: row;
            align-items: stretch;
            height: 100%;
            &__infos{
                background-color: colors.$background-color;
                display: flex;
                flex-direction: column;
                align-items: center;
                flex: 0 0 auto;
                width: 10rem;
                &__separator{
                    width: 100%;
                    border-color: colors.$dark-background-color;
                }
                &--item{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    flex: 1 1 33.33%;
                    justify-content: center;
                    width: 100%;
                    color: white;
                }
                &__title{
                    display: flex;
                    justify-content: center;
                    font-size: 2rem;
                }
                &__content{
                    opacity: 30%;
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
                    &__item{
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        color: white;
                        align-items: center;
                        &__text{
                            padding: .5em 0;
                        }
                        &__button{
                            width: 2.5em;
                            height: 2.5em;
                        }
                    }
                }
            }
        }
    }

</style>