<template>
    <SimpleModalComponent ref="inviteModal" title="Inviter un joueur" input-content="Pseudo du joueur" button-content="Valider"></SimpleModalComponent>
    <main>
        <section class="panels">
            <TeamsPanel></TeamsPanel>
            <aside class="panels__right">
                <NotificationPanel></NotificationPanel>
                <MyTeamPanel></MyTeamPanel>
            </aside>
        </section>
    </main>
</template>

<script>
import SimpleModalComponent from "@/components/parts/Modal.vue";
import NotificationPanel from "@/components/panels/NotificationPanel.vue";
import TeamsPanel from "@/components/panels/TeamsPanel.vue";
import MyTeamPanel from "@/components/panels/MyTeamPanel.vue";

export default {
    name: "Main-View",
    components: {
        MyTeamPanel,
        TeamsPanel,
        NotificationPanel,
        SimpleModalComponent},
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
        height: 100vh;
        padding: 4.5rem 5rem;
        &__teams, &__right{
            flex: 1 1 50%;
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
    }

</style>