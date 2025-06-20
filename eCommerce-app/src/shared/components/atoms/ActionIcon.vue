<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  className?: string;
  IconClass: string;
}>();
console.log(props.IconClass);
</script>

<template>
  <div :class="props.className">
    <font-awesome-icon :icon="props.IconClass" />
  </div>
</template>
