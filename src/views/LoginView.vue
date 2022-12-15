<template>
    <main>
        <form
            class="form"
            method="post"
            @submit.prevent="this.login"
        >
            <h1 class="form__title">Connexion</h1>
            <div class="form__input">
                <input
                    class="form__input__field"
                    type="text"
                    id="username"
                    v-model="username"
                    required
                >
                <label
                    class="form__input__label"
                    for="username"
                >Pseudo Minecraft</label>
            </div>
            <div class="form__input">
                <input
                    class="form__input__field"
                    type="text"
                    id="code"
                    v-model="code"
                    maxlength="8"
                    required
                >
                <label
                    class="form__input__label"
                    for="code"
                >Code Session</label>
            </div>
            <button
                class="form__submit"
                type="submit"
                :disabled="isLoginIn"
            >Valider</button>
        </form>
    </main>
</template>

<script>
export default {
    name: "Login-View",
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
                console.log("Login success");
                this.$router.push("/");
            }else{
                this.isLoginIn = false;
            }
        }
    },
    created(){
        // TODO: Check token and redirect to main if valid
        if(this.$store.token){
            // this.$router.push("/");
        }
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
        &__submit{
            background-color: colors.$primary-color;
            color: white;
            border: none;
            padding: .75em 2em;
            cursor: pointer;
            transition-property: background-color;
            transition-duration: 300ms;
            transition-timing-function: ease-in-out;
            &:hover{
                background-color: colors.$primary-color-hover;
            }
            &:active{
                transform: scale(.90);
            }
        }
        &__input {
            position: relative;
            width: max-content;
            &__label {
                position: absolute;
                left: 1rem;
                bottom: 50%;
                transform: translate(0, 50%);
                transform-origin: left center;
                transition-property: transform, bottom, opacity;
                transition-duration: 120ms;
                transition-timing-function: ease-out;
                color: white;
                opacity: 30%;
                font-size: 1em;
                line-height: 100%;
            }

            &__field {
                font-size: 1em;
                padding: 0.5em 1em;
                color: white;
                border: none;
                box-sizing: border-box;
                width: 18em;
                background: colors.$background-color;
                outline: none;

                &:focus, &:valid {
                    + label {
                        transform: scale(.8) translate(0, -50%);
                        color: colors.$primary-color;
                        opacity: 100%;
                        bottom: 100%;
                    }
                }
            }

            &:hover{
                label{
                    opacity: 100%;
                }
            }
        }
    }

</style>