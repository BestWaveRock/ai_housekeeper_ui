<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const props = defineProps<{ id: string | number; loader: (id: string | number) => Promise<string> }>()
const name = ref('')

watchEffect(async () => {
  name.value = await props.loader(props.id)
})
</script>

<template>
  <span>{{ name }}</span>
</template>