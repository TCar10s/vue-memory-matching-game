<script setup>
import { useEmoji } from '../composables/emoji.js'
import CardEmoji from './CardEmoji.vue'

const { emojis, flipEmoji, isMatching } = useEmoji()

</script>

<template>
  <ul class="grid">
    <li class="grid__item" v-for="emoji in emojis" :key="emoji.id">
      <CardEmoji
        :emoji="emoji"
        @click="flipEmoji(emoji)"
        :class="{ notEvents: isMatching }"
      />
    </li>
  </ul>
</template>

<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
  padding: 0;

  .grid__item {
    border: 1px solid rgb(56, 55, 69);

    list-style: none;
    margin: 0;

    &:hover {
      border-color: rgb(157 158 161);
      transition: border-color 0.5s;
    }
  }
}

.notEvents {
  pointer-events: none;
}
</style>
