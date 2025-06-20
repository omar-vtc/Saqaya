<script setup lang="ts">
import { defineProps } from "vue";
import LinkRouter from "../atoms/LinkRouter.vue";
const props = defineProps<{
  divClassName?: string;
  className?: string;
  eleClassName?: string;
}>();
</script>
<template>
  <div :class="props.divClassName">
    <ul :class="props.className">
      <li :class="props.eleClassName">
        <LinkRouter
          :to="'/'"
          class-name="list-item__ele"
          value="Home"
          :exact="true"
        />
      </li>
      <li :class="props.eleClassName">
        <LinkRouter
          :to="'/products'"
          class-name="list-item__ele"
          value="Products"
          :exact="false"
        />
      </li>
      <li :class="props.eleClassName">
        <LinkRouter
          :to="'/contact-us'"
          class-name="list-item__ele"
          value="Contact Us"
          :exact="false"
        />
      </li>
    </ul>
  </div>
</template>
