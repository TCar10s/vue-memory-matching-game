import { onMounted, ref, watch } from 'vue'
import debounce from 'just-debounce-it'

export function useEmoji() {
  const emojis = ref([])
  const selectedEmoji = ref(null)
  const isMatching = ref(false)

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
      .map((value, index) => ({
        value,
        id: index,
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

      if (newVal.value === oldValue.value) {
        matchingEmojis([newVal, oldValue])
      } else {
        flipEmojis([newVal, oldValue])
      }

      selectedEmoji.value = null
    }
  )

  onMounted(loadRandomEmojis)

  return { emojis, flipEmoji, isMatching }
}
