<template>
  <div>
    <section class="bg-white py-8 antialiasing dark:bg-gray-900 md:py-16">
      <div class="mx-auto max-w-2xl px-4 2xl:px-0">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-2">Thanks for your order!</h2>
        <p class="text-gray-500 dark:text-gray-400 mb-6 md:mb-8">Your order <span  @click="navigateTo('/order')"
                                                                               class="font-medium text-gray-900 dark:text-white hover:underline">#7564804</span>
          will be processed within 24 hours during working days. We will notify you by email once your order has been
          shipped.</p>
        <div
            class="space-y-4 sm:space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800 mb-6 md:mb-8">
          <dl class="sm:flex items-center justify-between gap-4">
            <dt class="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Date</dt>
            <dd class="font-medium text-gray-900 dark:text-white sm:text-end">{{ date }}</dd>
          </dl>
          <dl class="sm:flex items-center justify-between gap-4">
            <dt class="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Payment Method</dt>
            <dd class="font-medium text-gray-900 dark:text-white sm:text-end">JPMorgan monthly installments</dd>
          </dl>
          <dl class="sm:flex items-center justify-between gap-4">
            <dt class="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Name</dt>
            <dd class="font-medium text-gray-900 dark:text-white sm:text-end">{{ name ? name : 'Administrators' }}</dd>
          </dl>
        </div>
        <div class="flex items-center space-x-4">
          <div @click="navigateTo('/order-detail')"
               class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
            Track
            your order
          </div>
          <div @click="navigateTo('/products')"
             class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Return
            to shopping</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";

const name = ref('')
const cookieName = useCookie('name')
name.value = cookieName.value
let date = ref('')
date = dayjs(Date.now(), 'dd-MM-yyyy HH:mm:ss')
</script>

<style scoped>
</style>
