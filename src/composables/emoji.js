import { onMounted, reactive, ref, watch } from 'vue'
import debounce from 'just-debounce-it'

export function useEmoji() {
  const emojis = ref([])
  const selectedEmoji = ref(null)
  const isMatching = ref(false)
  const gameInfo = reactive({
    pairsMatched: 0,
    pairsTotal: 0
  })

  const loadRandomEmojis = () => {
    const emojiCharacters = [
      '🐶',
      '🐱',
      '🐭',
      '🐹',
      '🐰',
      '🦊',
      '🐨',
      '🐯',
      '🐶',
      '🐱',
      '🐭',
      '🐹',
      '🐰',
      '🦊',
      '🐨',
      '🐯'
    ]

    emojis.value = emojiCharacters
      .sort(() => Math.random() - 0.5)
      .map((value) => ({
        value,
        isMatched: false,
        isFlipped: false
      }))
  }

  const flipEmoji = (emoji) => {
    emoji.isFlipped = !emoji.isFlipped
    selectedEmoji.value = emoji
  }

  const matchingEmojis = debounce((emojis) => {
    emojis.map((emoji) => (emoji.isMatched = true))
    isMatching.value = false
  }, 500)

  const flipEmojis = debounce((emojis) => {
    emojis.map((emoji) => (emoji.isFlipped = false))
    isMatching.value = false
  }, 500)

  watch(
    () => selectedEmoji.value,
    (newVal, oldValue) => {
      if (!oldValue || !newVal) return

      isMatching.value = true
      gameInfo.pairsTotal++

      if (newVal.value === oldValue.value) {
        matchingEmojis([newVal, oldValue])
        gameInfo.pairsMatched++
      } else {
        flipEmojis([newVal, oldValue])
      }

      selectedEmoji.value = null
    }
  )

  const resetGame = () => {
    gameInfo.pairsMatched = 0
    gameInfo.pairsTotal = 0
    loadRandomEmojis()
  }

  onMounted(loadRandomEmojis)

  return { emojis, flipEmoji, isMatching, gameInfo, resetGame }
}
