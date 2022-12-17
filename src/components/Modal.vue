<template>
    <div class="modal" v-if="this.opened">
        <div class="modal__content">
            <h2 class="modal__content__title">{{this.title}}</h2>
            <form class="modal__content__form">
                <InputComponent ref="input">{{this.inputContent}}</InputComponent>
                <ButtonComponent primary>{{this.buttonContent}}</ButtonComponent>
            </form>
            <ButtonComponent @click="this.close" icon-name="close" class="modal__content__close"></ButtonComponent>
        </div>
    </div>
</template>

<script>
import InputComponent from "@/components/Input.vue";
import ButtonComponent from "@/components/Button.vue";

export default {
    name: "Simple-Modal-Component",
    components: {ButtonComponent, InputComponent},
    data() {
        return {
            opened: false
        }
    },
    props: {
        title: {
            type: String,
            default: "Modal"
        },
        inputContent: {
            type: String,
            default: "Modal content"
        },
        buttonContent: {
            type: String,
            default: "Modal button"
        }
    },
    methods: {
        open(){
            this.opened = true;
        },
        close() {
            this.opened = false;
        },
    },
    computed: {
        content() {
            return this.$refs.input.content;
        }
    }
}
</script>

<style lang="scss">
@use "../assets/colors.scss" as colors;
.modal{
    display: flex;
    //display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    background-color: #181818;
    //opacity: 70%;
    align-items: center;
    justify-content: center;
    &__content{
        position: relative;
        display: flex;
        flex-direction: column;
        background-color: colors.$dark-background-color;
        align-items: center;
        justify-content: center;
        grid-gap: 3em;
        &__title{
            color: white;
            //padding: 1.5em 2.5em 0 2.5em;
            padding-top: 1.5em;
            letter-spacing: .1em;
            text-transform: uppercase;
            font-size: 1.5rem;
        }
        &__form {
            align-items: center;
            justify-content: center;
            display: flex;
            flex-direction: column;
            grid-gap: 2em;
            padding: 0 32px 24px 32px;
        }
        &__close{
            position: absolute;
            right: 0;
            top: 0
        }
    }
}
</style>