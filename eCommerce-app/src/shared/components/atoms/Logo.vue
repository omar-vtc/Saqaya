<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  className?: string;
  imgClassName?: string;
}>();

// console.log(props.imgClassName);
</script>
<template>
  <div :class="props.className">
    <img
      :class="props.imgClassName"
      src="../../../assets/img/logo2.png"
      alt="Logo"
    />
  </div>
</template>
