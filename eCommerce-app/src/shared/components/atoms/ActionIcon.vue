<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  className?: string;
  IconClass: string | [string, string];
  onClick?: () => void;
  badgeCount?: number;
}>();
</script>

<template>
  <div :class="props.className" class="icon-container" @click="props.onClick">
    <font-awesome-icon :icon="props.IconClass" />
    <span v-if="props.badgeCount && props.badgeCount > 0" class="icon-badge">
      {{ props.badgeCount }}
    </span>
  </div>
</template>
