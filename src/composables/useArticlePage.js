import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '@/stores/products'
import { api } from '@/services/api'
import { getArticleBySlug, articles } from '@/data/articles'
import { formatArticleBody, estimateReadMinutes } from '@/utils/articleContent'
import { isMotivationalSpeechProduct } from '@/utils/productKinds'
import dayjs from 'dayjs'

function productToArticleVm(p) {
  const long = p.descriptionLong || p.description || ''
  const excerpt = p.descriptionShort || ''
  const isAudioArticle = isMotivationalSpeechProduct(p)
  return {
    id: p.id,
    slug: String(p.id),
    title: p.title,
    excerpt,
    category: isAudioArticle ? 'motivational_speeches' : p.category,
    readTime: p.readTimeMinutes || estimateReadMinutes(long),
    datePublished: dayjs(),
    thumbnail: p.thumbnail,
    banner: p.banner,
    thumbnailGradient: p.thumbnailGradient,
    downloadUrl: p.downloadUrl || null,
    audioUrl: p.audioUrl || null,
    isAudioArticle,
    content: formatArticleBody(long),
    _source: 'api'
  }
}

function mockToArticleVm(a) {
  return {
    ...a,
    downloadUrl: a.downloadUrl || null,
    content: formatArticleBody(a.content),
    _source: 'mock'
  }
}

export function useArticlePage() {
  const route = useRoute()
  const productsStore = useProductsStore()
  const article = ref(null)
  const loading = ref(true)

  async function load() {
    loading.value = true
    article.value = null
    const slug = route.params.slug

    if (/^\d+$/.test(String(slug))) {
      let p = productsStore.getById(slug)
      if (!p) {
        try {
          p = await productsStore.fetchProductById(slug)
        } catch {
          p = null
        }
      }
      if (p && (p.type === 'article' || isMotivationalSpeechProduct(p))) {
        article.value = productToArticleVm(p)
        loading.value = false
        // 602 launch — user opened this article product (real product id).
        api.logEvent({ event_type: 602, product: p.id })
        return
      }
    }

    const mock = getArticleBySlug(slug)
    article.value = mock ? mockToArticleVm(mock) : null
    loading.value = false
    // 602 launch — mock/demo article has no store.product id, so no `product`.
    if (article.value) api.logEvent({ event_type: 602 })
  }

  watch(() => route.params.slug, load, { immediate: true })

  const related = computed(() => {
    const slug = route.params.slug
    if (article.value?._source === 'api') {
      return productsStore.articles
        .filter((p) => String(p.id) !== String(slug))
        .slice(0, 3)
        .map((p) => ({
          id: p.id,
          slug: String(p.id),
          title: p.title,
          readTime:
            p.readTimeMinutes ||
            estimateReadMinutes(p.descriptionLong || p.description || ''),
          thumbnail: p.thumbnail,
          banner: p.banner,
          thumbnailGradient: p.thumbnailGradient
        }))
    }
    return articles
      .filter((a) => a.slug !== slug)
      .slice(0, 3)
      .map((a) => ({
        id: a.id,
        slug: a.slug,
        title: a.title,
        readTime: a.readTime,
        thumbnailGradient: a.thumbnailGradient
      }))
  })

  return { article, related, loading }
}
