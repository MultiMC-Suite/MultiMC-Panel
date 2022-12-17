<template>
    <div class="ranking">
        <div class="ranking__infos">
            <h2 class="ranking__infos__title">{{rank}}</h2>
            <div class="ranking__infos__team">
                <h3 class="ranking__infos__team__name">{{teamName}}</h3>
                <p class="ranking__infos__team__members">{{members}}</p>
            </div>
        </div>
        <div class="ranking__score">
            <h2>{{score}}</h2>
        </div>
    </div>
</template>

<script>
export default {
    name: "TeamRanking-Component",
    props: {
        rank: {
            type: String,
            required: true
        },
        teamName: {
            type: String,
            required: true
        },
        members: {
            type: String,
            required: true
        },
        score: {
            type: Number,
            required: true
        }
    }
}
</script>

<style lang="scss">
.ranking{
    // Team score display
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: .75em 1.5em;
    &__infos{
        display: flex;
        flex-direction: row;
        align-items: center;
        grid-gap: 1.5em;
        &__title{
            color: white;
            opacity: 20%;
            justify-content: left;
            font-size: 1.25em;
            width: 4em;
            //padding: .75em 0;
        }
        &__team{
            display: flex;
            flex-direction: column;
            grid-gap: .25em;
            &__name{
                color: white;
            }
            &__members{
                color: white;
                font-size: .75em;
                opacity: 30%;
            }
        }
    }
    &__score{
        color: white;
        font-size: 1.5em;
    }
}
</style>