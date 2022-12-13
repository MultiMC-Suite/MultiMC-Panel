<template>
    <main>
        <form @submit.prevent="isLoginIn" @submit="this.login">
            <h1>Login</h1>
            <div class="input">
                <input type="text" id="username" v-model="username" required>
                <label for="username">Minecraft Username</label>
            </div>
            <div class="input">
                <input type="password" id="code" v-model="code" required>
                <label for="code">LAN Code</label>
            </div>
            <button type="submit">Login</button>
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
    }
}
</script>

<style scoped lang="scss">
@use "../assets/colors.scss" as colors;
    main{
        background-color: colors.$global-background-color;
        width: 100%;
        height: 100%;
    }
    form{
        background-color: colors.$dark-background-color;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        >h1{
            color: white;
        }
        > button{
            background-color: colors.$primary-color;
            color: white;
            border: none;
            padding: 10px;
            margin-top: 10px;
            cursor: pointer;
            width: 5%;
            &:hover{
                background-color: colors.$primary-color-hover;
            }
        }
    }
    .input{
        position: relative;
        width: max-content;
        margin-bottom: 1.4em;
        > label{
            position: absolute;
            left: 0;
            top: 0;
            transform: translate(0, 0);
            transform-origin: 0 0;
            transition: transform 120ms ease-in;
            color: white;
            opacity: 30%;
            padding: 0.6em 1em 0.2em;
            font-size: 1em;
        }
        > input{
            padding: 0.6em 1em 0.6em;
            font-size: 1em;
            color: white;
            border: none;
            box-sizing: border-box;
            width: 100%;
            background: colors.$background-color;
            outline: none;
            &:focus{
                & + label{
                    transform: translate(.25rem, -65%) scale(.8);
                    color: colors.$primary-color;
                    opacity: 100%;
                }
            }
        }
    }

</style>