<template>
    <article class="panel">
        <HeaderComponent title="Notifications" class="panel__header"></HeaderComponent>
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
    computed: {
        notices() {
            return this.$store.notices;
        }
    },
    created() {
        this.$store.dispatch("loadNotifications");
    }
}
</script>

<style lang="scss">
@import "src/assets/style/panel";
</style>