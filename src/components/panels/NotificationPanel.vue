<template>
    <article class="panel">
        <HeaderComponent title="Notifications" class="panel__header"></HeaderComponent>
        <div class="panel__content">
            <NotificationComponent selector primary></NotificationComponent>
            <NotificationComponent></NotificationComponent>
            <NotificationComponent></NotificationComponent>
            <NotificationComponent></NotificationComponent>
            <NotificationComponent></NotificationComponent>
            <NotificationComponent></NotificationComponent>
            <NotificationComponent></NotificationComponent>
            <NotificationComponent></NotificationComponent>
            <NotificationComponent></NotificationComponent>
            <NotificationComponent></NotificationComponent>
        </div>
    </article>
</template>

<script>
import NotificationComponent from "@/components/panels/components/content/Notification.vue";
import HeaderComponent from "@/components/panels/components/Header.vue";

export default {
    name: "NotificationPanel",
    components: {HeaderComponent, NotificationComponent}
}
</script>

<style lang="scss">
@import "src/assets/style/panel";
</style>