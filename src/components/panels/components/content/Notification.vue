<template>
    <div class="notification">
        <div class="notification__content" :class="{selector: selector === true, primary: primary === true}">
            <p class="notification__content__text">{{message}}</p>
            <div class="notification__content__selector" v-if="selector === true">
                <button-component @clicked="this.decline">Refuser</button-component>
                <button-component primary @clicked="this.accept">Accepter</button-component>
            </div>
        </div>
    </div>
</template>

<script>
import ButtonComponent from "@/components/parts/Button.vue";

export default {
    name: "Notification-Component",
    components: {ButtonComponent},
    props: {
        notice: {
            type: Object,
            required: true
        }
    },
    methods: {
        accept() {
            this.$store.dispatch("acceptNotification", this.notice.notificationId);
        },
        decline() {
            this.$store.dispatch("declineNotification", this.notice.notificationId);
        }
    },
    computed: {
        message() {
            return this.notice.content.message;
        },
        selector() {
            return this.notice.notificationType === "invite";
        },
        primary() {
            return this.selector === true;
        }
    }
}
</script>

<style lang="scss">
@use "../../../../assets/colors" as colors;
.notification{
    &__content{
        display: flex;
        align-items: flex-end;
        flex-direction: column;
        position: relative;
        padding: 1.25em 2em;
        color: white;
        font-size: 1rem;
        grid-gap: 1.5em;

        &__text{
            width: 100%;
        }

        &::before{
            top: 0;
            left: 0;
            content: '';
            height: 100%;
            width: .25rem;
            display: block;
            position: absolute;
            background-color: colors.$background-color;
        }

        &__selector{
            display: flex;
            grid-gap: 1em;
        }
    }
}
.selector{
    padding: 1.25em 1.5em 1em 2em;
}
.primary{
    &::before{
        background-color: colors.$primary-color;
    }
}
</style>