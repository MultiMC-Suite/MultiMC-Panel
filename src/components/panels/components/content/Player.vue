<template>
    <div class="player">
        <p class="player__name"><slot></slot></p>
        <ButtonComponent v-if="permission" :icon-name="owner ? `owner` : `trash`" class="player__action" @action="this.clicked"></ButtonComponent>
    </div>
</template>

<script>
import ButtonComponent from "@/components/parts/Button.vue";

export default {
    name: "Player-Component",
    components: {ButtonComponent},
    props: {
        owner: {
            type: Boolean,
            default: false
        },
        permission: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        clicked() {
            this.$emit("clicked", this.$slots.default()[0].children);
        }
    }
}
</script>

<style lang="scss">
.player{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    color: white;
    &__name{
        padding: .5em 0;
    }
    &__action{
        width: 2.5em;
        height: 2.5em;
    }
}
</style>