<script setup lang="ts">
import { defineProps } from "vue";
import ActionIcon from "../atoms/ActionIcon.vue";

type IconItem = {
  name: string | [string, string]; // FontAwesome icon name
  onClick?: () => void; // optional click handler
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
      :class-name="props.iconClass"
      :IconClass="icon.name"
      @click="icon.onClick"
    />
  </div>
</template>
