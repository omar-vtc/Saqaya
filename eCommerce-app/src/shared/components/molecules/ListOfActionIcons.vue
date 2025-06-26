<script setup lang="ts">
import { defineProps } from "vue";
import ActionIcon from "../atoms/ActionIcon.vue";

type IconItem = {
  name: string | [string, string];
  onClick?: () => void;
  class?: string; // ✅ new optional class per icon
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
      @click="icon.onClick"
    />
  </div>
</template>
