<template>
    <div class="team-info">
        <h2 class="team-info--title">{{title}}</h2>
        <p class="team-info--content">{{content}}</p>
    </div>
</template>

<script>
export default {
    name: "TeamInfo",
    props: {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="scss">
@use "../../../../assets/colors.scss" as colors;
.team-info{
    &--title{
        display: flex;
        justify-content: center;
        font-size: 2rem;
    }
    &--content{
        opacity: 30%;
    }
}
</style>