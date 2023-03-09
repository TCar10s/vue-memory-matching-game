<script setup>
import { computed } from 'vue'

const prop = defineProps({
  emoji: {
    type: Object,
    required: true
  }
})

const isFlipped = computed(() => ({ 'is-flipped': prop.emoji.isFlipped }))
const isMatched = computed(() => ({ 'is-matched': prop.emoji.isMatched }))
</script>

<template>
  <div class="card-container" :class="[isFlipped, isMatched]">
    <span class="card card__back">{{ emoji.value }}</span>
    <span class="card card__front">{{ emoji.value }}</span>
  </div>
</template>

<style scope lang="scss">
.card-container {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 120px;
  cursor: pointer;

  position: relative;
  transition: transform 0.3s, -webkit-transform 0.3s;
  transform-style: preserve-3d;

  .card {
    position: absolute;
    backface-visibility: hidden;
  }

  .card__front {
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 4rem;
    user-select: none;

    transform: rotateY(180deg);
  }
}

.is-flipped {
  transform: rotateY(180deg);
}

.is-matched {
  pointer-events: none;

  .card__front {
    opacity: 0.3;
    transition: opacity 0.5s;
  }
}
</style>
