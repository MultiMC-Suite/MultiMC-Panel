<template>
    <main>

    </main>
</template>

<script>
export default {
    name: "Main-View",
    beforeCreate() {
        // TODO: Check token and redirect to login if not valid
        console.log(this.$store.token)
        if(!this.$store.token){
            console.log(this.$store.token)
            this.$router.push("/login");
        }
    }
}
</script>

<style scoped>

</style>