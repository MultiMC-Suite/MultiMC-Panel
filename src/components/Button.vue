<template>
    <button
        class="button"
        type="submit"
        @click="submit"
    >
        <IconComponent
            v-if="iconName != null"
            :name="iconName"
        />
        <slot v-if="iconName == null"></slot>
    </button>
</template>

<script>
import IconComponent from "@/components/Icon.vue";

export default {
    name: "Button-Component",
    components: {IconComponent},
    props: {
        iconName: {
            type: String,
            default: null,
            required: false
        }
    },
    methods: {
        submit(){
            this.$emit("clicked");
        }
    }
}
</script>

<style lang="scss">
@use "../assets/colors.scss" as colors;
.button{
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
</style>