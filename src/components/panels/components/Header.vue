<template>
    <header class="panel-header">
        <h1 class="panel-header__title" :class="{subtitled: subtitle !== null}">{{title}}<span class="panel-header__title--subtitle" v-if="subtitle !== null">{{subtitle}}</span></h1>
        <ul class="panel-header__content">
            <li>
                <ButtonComponent icon-name="refresh" @action="this.primary"></ButtonComponent>
            </li>
            <li v-if="buttonContent !== null">
                <ButtonComponent primary @action="this.secondary">{{buttonContent}}</ButtonComponent>
            </li>
        </ul>
    </header>
</template>

<script>
import ButtonComponent from "@/components/parts/Button.vue";

export default {
    name: "Header-Component",
    components: {ButtonComponent},
    props: {
        title: {
            type: String,
            default: "Title"
        },
        subtitle: {
            type: String,
            default: null
        },
        buttonContent: {
            type: String,
            default: null
        }
    },
    methods: {
        primary() {
            this.$emit('primary');
        },
        secondary() {
            this.$emit('secondary');
        },
    }
}
</script>

<style lang="scss">
@use "../../../assets/colors" as colors;
.panel-header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1em 1.5em;
    position: relative;
    background-color: colors.$dark-background-color;
    z-index: 1;
    &::after{
        content: "";
        display: block;
        width: 100%;
        height: 1px;
        background-color: colors.$background-color;
        position: absolute;
        top: 100%;
        left: 0;
    }
    &__title{
        font-size: 20px;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        grid-gap: .5em;
        &--subtitle{
            opacity: 30%;
            font-size: 16px;
            font-style: italic;
            font-weight: normal;
            order: 1;
        }
    }
    &__content{
        display: flex;
        grid-gap: .5em;
    }
}
.subtitled{
    &::after {
        content: '';
        width: .25em;
        border-radius: 50%;
        aspect-ratio: 1 / 1;
        background-color: white;
        opacity: 40%;
    }
}
</style>