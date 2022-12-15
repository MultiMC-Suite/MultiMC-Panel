<template>
    <span class="icon" v-if="json" v-html="json">

    </span>
</template>

<script>
const icons = require("@/assets/mockIcon");
export default {
    name: "icon-component",
    data(){
        return{
            json: null
        }
    },
    props: {
        name: {
            type: String,
            required: true
        }
    },
    created(){
        if(!this.name || !icons[this.name]){
            console.error("Icon not found");
            return;
        }
        this.json = icons[this.name];
    }
}
</script>

<style scoped>
    .icon{
        height: 1.25rem;
        aspect-ratio: 1/1;
        color: currentColor;
    }
</style>