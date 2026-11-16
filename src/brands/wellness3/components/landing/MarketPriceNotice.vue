<template>
  <!-- Regulated price wording next to a subscribe button (Calmasoul GB). Renders
       nothing on every other instance. Imported RELATIVELY on purpose: an
       @/components/... import would resolve to the active brand and break the
       builds of the brands that don't have this file. -->
  <div v-if="market" class="price-notice" :class="{ 'price-notice--compact': compact }">
    <p class="price-notice__price">{{ price }}</p>
    <!-- Ofcom wording, GB only: Sweden does not ask for it, so the keys are
         absent there and the lines must not render empty. -->
    <template v-if="!compact">
      <p v-if="market.eligibilityNotice" class="price-notice__small">{{ market.eligibilityNotice }}</p>
      <p v-if="wellbeing && market.wellbeingNotice" class="price-notice__small">{{ market.wellbeingNotice }}</p>
    </template>
  </div>
</template>

<script setup>
import { getMarket, fillPlaceholders } from '@/config/market'

defineProps({
  compact: { type: Boolean, default: false },
  wellbeing: { type: Boolean, default: false }
})

const market = getMarket()
const price = market ? fillPlaceholders(market.priceNotice, market) : ''
</script>

<style scoped>
.price-notice {
  display: grid;
  gap: 4px;
  max-width: 560px;
  margin-top: 14px;
}
.price-notice__price {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.45;
  color: var(--text-primary);
}
.price-notice__small {
  margin: 0;
  font-size: 13px;
  line-height: 1.45;
  color: var(--text-secondary);
}
.price-notice--compact .price-notice__price {
  font-size: 13px;
  font-weight: 500;
}
</style>
