<template>
    <main>
        <section class="panels">
            <article class="panels__teams">
                <header>
                    <h1>Teams</h1>
                </header>
            </article>
            <aside class="panels__right">
                <article class="panels__right__notify">
                    <header>
                        <h1>Notifications</h1>
                    </header>
                </article>
                <article class="panels__right__team">
                    <header class="panels__right__team__header">
                        <h1 class="panels__right__team__header__title">My Team</h1>
                        <ul>
                            <li>
                                <button class="panels__right__team__header__button"><icon-component name="refresh"/></button>
                            </li>
                        </ul>
                    </header>
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
    main{
        background-color: colors.$global-background-color;
        width: 100%;
        min-height: 100vh;
        display: grid;
        place-items: center;
    }
</style>