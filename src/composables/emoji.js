import { onMounted, reactive, ref, watch } from 'vue'
import debounce from 'just-debounce-it'

export function useEmoji() {
  const emojis = ref([])
  const selectedEmoji = ref(null)
  const gameInfo = reactive({
    pairsMatched: 0,
    pairsTotal: 0,
    isLoading: false
  })
  const actions = reactive({
    flipEmoji: (emoji) => {
      emoji.isFlipped = !emoji.isFlipped
      selectedEmoji.value = emoji
    },
    resetGame: () => {
      gameInfo.pairsMatched = 0
      gameInfo.pairsTotal = 0
      loadRandomEmojis()
    }
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

  const changeStatus = debounce((emojis, type = '') => {
    emojis.map((emoji) => {
      if (type === 'match') emoji.isMatched = true
      if (type === 'flip') emoji.isFlipped = false
    })

    gameInfo.isLoading = false
  }, 500)

  watch(
    () => selectedEmoji.value,
    (newVal, oldValue) => {
      if (!oldValue || !newVal) return

      gameInfo.isLoading = true
      gameInfo.pairsTotal++

      if (newVal.value === oldValue.value) {
        changeStatus([newVal, oldValue], 'match')
        gameInfo.pairsMatched++
      } else {
        changeStatus([newVal, oldValue], 'flip')
      }

      selectedEmoji.value = null
    }
  )

  onMounted(loadRandomEmojis)

  return { emojis, actions, gameInfo }
}
