<template>
    <div>Loading...</div>
</template>
<script setup lang="ts">
const localePath = useLocalePath()
onMounted(() => {
    navigateTo(localePath({ name: 'experience' }))
})
</script>