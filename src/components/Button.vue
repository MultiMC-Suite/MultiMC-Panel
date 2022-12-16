<template>
    <button
        class="button"
        :class="{primary, icon:iconName != null}"
        type="submit"
        @click="submit"
    >
        <IconComponent
            class="button__icon"
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
        },
        primary: {
            type: Boolean,
            default: false,
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
    background-color: colors.$dark-background-color;
    color: white;
    border: none;
    padding: .75em 2em;
    line-height: 100%;
    cursor: pointer;
    transition-property: background-color;
    transition-duration: 300ms;
    transition-timing-function: ease-in-out;
    white-space: nowrap;
    &:hover{
        background-color: colors.$background-color;
    }
    &:active{
        transform: scale(.90);
    }
    &.icon{
        padding: .75em;
    }
    &.primary{
        background-color: colors.$primary-color;
        &:hover{
            background-color: colors.$primary-color-hover;
        }
    }
}

</style>