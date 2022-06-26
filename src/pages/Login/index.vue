<template>
  <div>login</div>
</template>

<script setup lang="ts">
import { userStore } from '@/store/userStore'
const user = userStore()
console.log(user.token)
</script>

<style scoped></style>
