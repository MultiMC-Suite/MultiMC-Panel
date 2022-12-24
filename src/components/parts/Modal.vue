<template>
    <div class="modal" v-if="this.opened">
        <div class="modal__content">
            <h2 class="modal__content__title">{{this.title}}</h2>
            <form class="modal__content__form" method="post" @submit.prevent="null">
                <InputComponent ref="input">{{this.inputContent}}</InputComponent>
                <ButtonComponent primary @action="this.submit">{{this.buttonContent}}</ButtonComponent>
            </form>
            <ButtonComponent icon-name="close" class="modal__content__close" @action="this.close"></ButtonComponent>
        </div>
    </div>
</template>

<script>
import InputComponent from "@/components/parts/Input.vue";
import ButtonComponent from "@/components/parts/Button.vue";

export default {
    name: "Modal-Component",
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
        submit() {
            this.$emit("submitted", this.$refs.input.value);
            this.close();
        }
    },
    computed: {
        content() {
            return this.$refs.input.content;
        }
    }
}
</script>

<style lang="scss">
@use "../../assets/colors" as colors;
.modal{
    display: flex;
    position: fixed;
    z-index: 2;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
    &::before{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: #181818;
        opacity: 70%;
    }
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