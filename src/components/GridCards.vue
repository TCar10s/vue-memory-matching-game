<script setup>
import { useEmoji } from '../composables/emoji.js'
import CardEmoji from './CardEmoji.vue'

const { emojis, actions, gameInfo } = useEmoji()
</script>

<template>
  <section class="game-info">
    <div class="pairs">
      <meter class="meter" :value="gameInfo.pairsMatched" max="8" />
      <span class="matched">
        <dt>Pairs matched:</dt>
        <dd>{{ gameInfo.pairsMatched }}/8</dd>
      </span>
    </div>

    <div class="total-moves">
      <dt>Total moves:</dt>
      <dd>{{ gameInfo.pairsTotal }}</dd>
    </div>
  </section>

  <ul class="grid">
    <li class="grid__item" v-for="emoji in emojis" :key="emoji.id">
      <CardEmoji
        :emoji="emoji"
        @click="actions.flipEmoji(emoji)"
        :class="{ notEvents: gameInfo.isLoading }"
      />
    </li>
  </ul>

  <button class="btn" @click="actions.resetGame">Reset game</button>
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

.meter {
  background-image: none;
  width: 100%;
  font-size: 1.5rem;
  display: block;

  &::-webkit-meter-optimum-value {
    transition: all 0.5s;
    background: rgb(46 46 77);
  }

  &::-moz-meter-bar {
    transition: all 0.5s;
    background: rgb(46 46 77);
  }
}

.game-info {
  display: flex;
  justify-content: space-between;
  column-gap: 1rem;

  color: #fff;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.pairs,
.total-moves {
  width: 100%;
  background-color: #2e2e3e;
  border-radius: 0.2rem;
  padding: 0.5rem;
}

.btn {
  margin-top: 1rem;
  padding: 0.75rem 1rem;

  font-size: 1rem;
  color: #fff;
  background-color: #31314c;

  border-radius: 0.2rem;
  border-style: none;
  cursor: pointer;
}
</style>
