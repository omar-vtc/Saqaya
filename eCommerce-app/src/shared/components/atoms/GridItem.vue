<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  prefixClassName?: string;
  className?: string;
}>();
</script>

<template>
  <div :class="[props.prefixClassName, props.className]">
    <slot />
  </div>
</template>
