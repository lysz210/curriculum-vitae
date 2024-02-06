<template>
    <p v-for="skill in skills">
    {{  skill.content }}
    </p>
</template>

<script setup>
const { locale } = useI18n()
const {data: skills} = await useFetch(`/me/knowledge/it-skills`, {
  baseURL: computed(() => `/api/${locale.value}`)
})

onMounted(() => {
    window.pdfReady = true
})
</script>