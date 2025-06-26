<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  className?: string;
  IconClass: string | [string, string];
  onClick?: () => void; // optional click handler
}>();
// console.log(props.IconClass);
</script>

<template>
  <div :class="props.className">
    <font-awesome-icon :icon="props.IconClass" @click="props.onClick" />
  </div>
</template>
