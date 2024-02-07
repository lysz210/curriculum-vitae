<script setup>
const localePath = useLocalePath()
onMounted(() => {
    navigateTo(localePath({ name: 'experience' }))
})
</script>