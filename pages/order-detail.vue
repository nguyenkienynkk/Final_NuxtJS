<template>
  <div>
    <section class="bg-white py-8 dark:bg-gray-900 md:py-16">
      <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div class="mx-auto max-w-5xl">
          <div class="gap-4 sm:flex sm:items-center sm:justify-between">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">My orders</h2>
          </div>
          <div v-if="orders.length === 0" class="text-center mt-6">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzibBVD9w_go7Ofo5BK44_ufJf_y7qQAoPKg&s" alt="No Orders" class="mx-auto" />
            <p class="text-gray-500 dark:text-gray-400">You have no orders yet. Start shopping now!</p>
            <button type="button"
                    @click="navigateTo('/products')"
                    class=" mt-3 w-full rounded-lg shadow-red-200  border border-gray-200 bg-white px-5  py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
              Return to Shopping
            </button>
          </div>
          <div v-else class="mt-6 flow-root sm:mt-8">
            <div class="divide-y divide-gray-200 dark:divide-gray-700">
              <div v-for="(item,index) in orders" :key="index" class="flex flex-wrap items-center gap-y-4 py-6">
                <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                  <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Order ID:</dt>
                  <dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                    <a href="#" class="hover:underline">#{{ item.id }}</a>
                  </dd>
                </dl>

                <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                  <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Date:</dt>
                  <dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                    {{ formatDate(item.created_at) }}
                  </dd>
                </dl>
                <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                  <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Total items:</dt>
                  <dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{{ item.order_items.length }}
                    items
                  </dd>
                </dl>
                <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                  <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Sub total:</dt>
                  <dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{{ item.sub_total }}$</dd>
                </dl>
                <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                  <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Tax:</dt>
                  <dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{{ item.tax }}$</dd>
                </dl>
                <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                  <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Total:</dt>
                  <dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{{ item.total }}$</dd>
                </dl>

                <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                  <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
                  <dd class="me-2 mt-1.5 inline-flex items-center rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                    <svg class="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                         height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z"/>
                    </svg>
                    {{ item.status }}
                  </dd>
                </dl>
                <div class="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                  <button type="button"
                          class="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto">
                    Cancel order
                  </button>
                  <div @click="navigateToOrderDetail(item.id)"
                       class="w-full inline-flex justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto">
                    View details
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useAsyncData} from "#app";
import methodService from "~/plugins/methodService";
definePageMeta({
  middleware: 'auth'
})
const orders = ref([]);
const {data} = await useAsyncData('orders', async () => {
      const response = await methodService().get('/orders')
      orders.value = response
      console.log(response)
    }
)
const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}/${month}/${day}`;
};
const router = useRouter()
function navigateToOrderDetail(id) {
  console.log('click')
  router.push(`/view-order-detail/${id}`);
}

</script>
<style scoped>

</style>