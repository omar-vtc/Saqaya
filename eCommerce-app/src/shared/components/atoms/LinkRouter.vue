<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  className?: string;
  to: string;
  value: string;
  exact?: boolean;
}>();

// console.log(props.exact);
</script>

<template>
  <router-link
    :to="props.to"
    :class="props.className"
    v-bind="{ exact: props.exact }"
    >{{ props.value }}</router-link
  >
</template>
