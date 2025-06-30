<script lang="ts" setup>
import { defineEmits, defineProps } from "vue";

const props = defineProps<{
  modelValue: "default" | "asc" | "desc";
  className?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: "default" | "asc" | "desc"): void;
}>();
</script>

<template>
  <div :class="props.className">
    <label for="sort">Sort by Price:</label>
    <select
      id="sort"
      :value="props.modelValue"
      @change="(e) => {
        const target = e.target as HTMLSelectElement | null;
        if (target) emit('update:modelValue', target.value as 'default' | 'asc' | 'desc');
      }"
    >
      <option value="default">Default</option>
      <option value="asc">Low to High</option>
      <option value="desc">High to Low</option>
    </select>
  </div>
</template>
