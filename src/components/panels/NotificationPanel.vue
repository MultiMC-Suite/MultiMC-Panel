<template>
    <article class="panel">
        <HeaderComponent title="Notifications" class="panel__header"></HeaderComponent>
        <div class="panel__content">
            <div v-for="notice in this.$store.notices" :key="notice">
                <NotificationComponent v-if="notice.notificationType === `invite`" selector primary>{{notice.senderId.username}} vous a invité à rejoindre son équipe.</NotificationComponent>
                <NotificationComponent v-else>{{ notice.content.message }}</NotificationComponent>
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
    created() {
        this.$store.dispatch("loadNotifications");
    }
}
</script>

<style lang="scss">
@import "src/assets/style/panel";
</style>