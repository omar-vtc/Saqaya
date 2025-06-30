<script setup lang="ts">
import { defineProps } from "vue";
import ActionIcon from "../atoms/ActionIcon.vue";

type IconItem = {
  name: string | [string, string];
  onClick?: () => void;
  class?: string;
  badgeCount?: number;
  [key: string]: unknown; // ← This allows extra props like `data-testid`
};

const props = defineProps<{
  className?: string;
  iconClass?: string;
  icons: IconItem[];
}>();
</script>

<template>
  <div :class="props.className">
    <ActionIcon
      v-for="(icon, index) in props.icons"
      :key="index"
      :class-name="icon.class ?? props.iconClass"
      :IconClass="icon.name"
      :badgeCount="icon.badgeCount"
      @click="icon.onClick"
      v-bind="icon"
    />
  </div>
</template>
