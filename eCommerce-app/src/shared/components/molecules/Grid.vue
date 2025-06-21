<script setup lang="ts">
import { defineProps, useSlots } from "vue";

const props = defineProps<{
  className?: string;
}>();

const slots = useSlots();
</script>

<template>
  <div :class="['grid', props.className]">
    <slot />
  </div>
</template>
