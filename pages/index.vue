<template>
  <div>
    <div>
      <div class="flex gap-4">
        <button class="font-bold text-red-700" @click="setLocale('en')">EN</button>
        <button class="font-bold text-black" @click="setLocale('fr')">FR</button>
        <p>{{ $t('welcome') }}</p>
        <div>
          <p>{{ $t('nguoiVietNam') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {setLocale} from "@nuxtjs/i18n/dist/runtime/compatibility";

const {setLocale} = useI18n()
</script>