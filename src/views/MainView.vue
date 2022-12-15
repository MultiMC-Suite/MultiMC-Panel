<template>
    <main>
        <section class="panels">
            <article class="panels__article panels__teams">
                <header class="panels__article__header">
                    <h1 class="panels__article__header__title">Teams</h1>
                    <ul class="panels__article__header__actions">
                        <li>
                            <button class="panels__article__header__actions__button"><icon-component class="refresh__icon" name="refresh"/></button>
                        </li>
                    </ul>
                </header>
                <hr class="panels__separator">
            </article>
            <aside class="panels__right">
                <article class="panels__article panels__right__notify">
                    <header class="panels__article__header">
                        <h1 class="panels__article__header__title">Notifications</h1>
                        <ul class="panels__article__header__actions">
                            <li>
                                <button class="panels__article__header__actions__button"><icon-component class="refresh__icon" name="refresh"/></button>
                            </li>
                        </ul>
                    </header>
                    <hr class="panels__separator">
                </article>
                <article class="panels__article panels__right__team">
                    <header class="panels__article__header">
                        <h1 class="panels__article__header__title">My Team <span class="panels__article__header__title--team-name">Les infâmes</span></h1>
                        <ul class="panels__article__header__actions">
                            <li>
                                <button class="panels__article__header__actions__button"><icon-component class="refresh__icon" name="refresh"/></button>
                            </li>
                            <li>
                                <button class="panels__article__header__actions__button invite">Inviter un joueur</button>
                            </li>
                        </ul>
                    </header>
                    <hr class="panels__separator">
                </article>
            </aside>
        </section>
    </main>
</template>

<script>
import IconComponent from "@/components/icon.vue";

export default {
    name: "Main-View",
    components: {IconComponent},
    beforeCreate() {
        // TODO: Check token and redirect to login if not valid
        console.log(this.$store.token)
        if(!this.$store.token){
            console.log(this.$store.token)
            this.$router.push("/login");
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
                &__title{
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
                &__actions{
                    display: flex;
                    grid-gap: .5em;
                    &__button{
                        padding: .75em;
                        color: white;
                        &:hover{
                            background-color: colors.$background-color;
                        }
                        &.invite{
                            line-height: 100%;
                            background-color: colors.$primary-color;
                            padding: .75em 2em;
                            &:hover{
                                background-color: colors.$primary-color-hover;
                            }
                        }
                    }
                }
            }
        }

        &__right{
            display: flex;
            flex-direction: column;
            grid-gap: $gap;

            &__team, &__notify{
                flex: 1 1 50%;
            }
        }
        &__separator{
            margin: 0;
            border: 1px solid colors.$background-color;
        }

    }

</style>