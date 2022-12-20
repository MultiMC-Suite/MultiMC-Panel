<template>
    <main>
        <form
            class="form"
            method="post"
            @submit.prevent="this.login"
        >
            <h1 class="form__title">Connexion</h1>
            <InputComponent>Pseudo Minecraft</InputComponent>
            <InputComponent :max-length=8>Code Session</InputComponent>
            <ButtonComponent @clicked="login" primary>Valider</ButtonComponent>
<!--            <button-->
<!--                class="form__submit"-->
<!--                type="submit"-->
<!--                :disabled="isLoginIn"-->
<!--            >Valider</button>-->
        </form>
    </main>
</template>

<script>
import InputComponent from "@/components/parts/Input.vue";
import ButtonComponent from "@/components/parts/Button.vue";

export default {
    name: "Login-View",
    components: {ButtonComponent, InputComponent},
    data(){
        return{
            username: "",
            code: "",
            isLoginIn: false
        }
    },
    methods: {
        login(){
            this.isLoginIn = true;
            if(this.$store.dispatch("login", {username: this.username, code: this.code})){
                this.$router.push("/");
            }else{
                this.isLoginIn = false;
            }
        }
    },
    created(){
        // TODO: Check token and redirect to main if valid
        this.$store.dispatch("checkToken").then(() => {
            if(this.$store.token){
                this.$router.push("/");
            }
        })
    }
}
</script>

<style scoped lang="scss">
@use "../assets/colors.scss" as colors;
    main{
        background-color: colors.$global-background-color;
        width: 100%;
        min-height: 100vh;
        display: grid;
        place-items: center;
    }
    .form{
        background-color: colors.$dark-background-color;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        grid-gap: 2em;
        padding: 1.5em 2em;
        box-shadow: colors.$shadow;
        &__title{
            color: white;
            font-size: 1.5em;
            margin-bottom: 1em;
            text-transform: uppercase;
            letter-spacing: .1em;
        }
    }

</style>