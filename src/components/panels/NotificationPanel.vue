<template>
    <article class="panel">
        <HeaderComponent title="Notifications" class="panel__header" @primary="this.updateNotifications"></HeaderComponent>
        <div class="panel__content">
            <div v-for="notice in this.notices" :key="notice">
                <NotificationComponent :notice=notice></NotificationComponent>
            </div>
        </div>
    </article>
</template>

<script>
import NotificationComponent from "@/components/panels/components/content/Notification.vue";
import HeaderComponent from "@/components/panels/components/Header.vue";

export default {
    name: "NotificationPanel",
    components: {HeaderComponent, NotificationComponent},
    methods: {
        updateNotifications() {
            this.$store.dispatch("updateNotifications");
        }
    },
    computed: {
        notices() {
            return this.$store.state.notices;
        }
    },
    created() {
        this.$store.dispatch("updateNotifications");
    }
}
</script>

<style lang="scss">
@import "src/assets/style/panel";
</style>