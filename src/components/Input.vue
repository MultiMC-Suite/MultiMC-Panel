<template>
    <input
        class="input__field"
        :type="type"
        id="input"
        :maxlength="maxLength"
        v-model="content"
        required
    >
    <label
        class="input__label"
        for="input"
    ><slot></slot></label>
</template>

<script>
export default {
    name: "Input-Component",
    data() {
        return {
            content: ""
        }
    },
    props:{
        type: {
            type: String,
            default: "text",
            required: false
        },
        maxLength: {
            type: Number,
            default: 255,
            required: false
        }
    }
}
</script>

<style lang="scss">
@use "../assets/colors.scss" as colors;
.input {
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
</style>