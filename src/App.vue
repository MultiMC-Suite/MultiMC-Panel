<template>
    <header class="header color">
        MultiMC v1.0
    </header>
    <router-view/>
    <footer class="footer color">
        Organisé par <a href="" target="_blank">Loïc MAES</a> & <a href="" target="_blank">Tom CZEKAJ</a>
    </footer>
</template>

<script>
export default {
    name: "App",
    created() {
        this.$store.dispatch("login", null);
    }
}
</script>

<style lang="scss">
@forward "./assets/normalize.scss";
@use "./assets/colors.scss" as colors;

    .color{
        color: #EEE;
        opacity: 50%;
        position: fixed;
    }

    .header{
        top: 1.5em;
        left: 5em;
        letter-spacing: .1em;
        font-weight: bold;
    }

    .footer{
        bottom: 1.5em;
        right: 5em;
        > a{
            position: relative;
            font-weight: bold;
            &::after{
                content: "";
                position: absolute;
                bottom: -5px;
                left: 0;
                width: 100%;
                height: 2px;
                background-color: currentColor;
                opacity: 50%;
                transform: scaleX(0);
                transform-origin: right;
                transition: transform 300ms;
            }
            &:hover::after{
                transform: scaleX(1);
                transform-origin: left;
            }
        }
    }
</style>