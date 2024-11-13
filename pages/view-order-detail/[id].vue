<template>
  <section class="py-24 relative">
    <div class="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
      <h2 class="font-manrope font-bold text-4xl leading-10 text-black text-center">
        Order Details
      </h2>
      <p class="mt-4 font-normal text-lg leading-8 text-gray-500 mb-11 text-center">
        Thanks for making a purchase, you can check our order summary from below
      </p>
      <div class="main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
          <div class="data">
            <p class="font-semibold text-base leading-7 text-black">Order Id: <span class="text-indigo-600 font-medium"> #{{ res ? res.id : 'Loading...' }}</span></p>
            <p class="font-semibold text-base leading-7 text-black mt-4">Order Payment : <span
                class="text-gray-400 font-medium">{{ res ? formatDate(res.created_at) : 'Loading...'}}</span></p>
          </div>
          <button
              class="rounded-full py-3 px-7 font-semibold text-sm leading-7 text-white bg-indigo-600 max-lg:mt-5 shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400"
              @click="trackOrder">Track Your Order
          </button>
        </div>
        <div class="w-full px-3 min-[400px]:px-6">
          <div  v-for="item in selectedOrder" :key="item.id" class="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full">
            <div class="img-box max-lg:w-full">
              <img src="https://product.hstatic.net/200000427375/product/4_5d16681273a34ab1bac9c1692334e2a4.png" alt="Premium Watch image"
                   class="aspect-square w-full lg:max-w-[140px] rounded-xl object-cover">
            </div>
            <div  class="flex flex-row items-center w-full">
              <div class="grid grid-cols-1 lg:grid-cols-2 w-full">
                <div class="flex items-center">
                  <div>
                    <h2 class="font-semibold text-xl leading-8 text-black mb-3">{{ item.name }}</h2>
                    <p class="font-normal text-lg leading-8 text-gray-500 mb-3">@_@</p>
                    <div class="flex items-center">
                      <p class="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">Price:
                        <span class="text-gray-500"> {{ item.price }}$</span></p>
                      <p class="font-medium text-base leading-7 text-black">Quantity: <span
                          class="text-gray-500">{{ item.quantity }}</span></p>
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-5">
                  <div class="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                    <div class="flex gap-3 lg:block">
                      <p class="font-medium text-sm leading-7 text-black">Price</p>
                      <p class="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">{{ item.total }}$</p>
                    </div>
                  </div>
                  <div class="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                    <div class="flex gap-3 lg:block">
                      <p class="font-medium text-sm leading-7 text-black">Status</p>
                      <p class="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-emerald-50 text-emerald-600">
                        Pending
                      </p>
                    </div>
                  </div>
                  <div class="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                    <div class="flex gap-3 lg:block">
                      <p class="font-medium text-sm whitespace-nowrap leading-6 text-black">Expected Delivery Time</p>
                      <p class="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">
                        {{ formatDate(item.updated_at) }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full border-t border-gray-200 px-6 flex flex-col lg:flex-row items-center justify-between">
          <div class="flex flex-col sm:flex-row items-center max-lg:border-b border-gray-200">
            <button
                class="flex outline-0 py-6 sm:pr-6 sm:border-r border-gray-200 whitespace-nowrap gap-2 items-center justify-center font-semibold group text-lg text-black bg-white transition-all duration-500 hover:text-indigo-600"
                @click="cancelOrder">
              <svg class="stroke-black transition-all duration-500 group-hover:stroke-indigo-600"
                   xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M5.5 5.5L16.5 16.5M16.5 5.5L5.5 16.5" stroke="" stroke-width="1.6" stroke-linecap="round"/>
              </svg>
              Exit Order
            </button>
            <p class="font-medium text-lg text-gray-900 pl-6 py-3 max-lg:text-center">Paid using Credit Card <span
                class="text-gray-500">ending with 8822</span></p>
          </div>
          <p class="font-semibold text-lg text-black py-6">Total Price: <span
              class="text-indigo-600">{{ totalPrice }}$</span></p>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
const router = useRouter()
const totalPrice = computed(() => {
  if (Array.isArray(selectedOrder.value)) {
    return selectedOrder.value.reduce((sum, item) => sum + item.total, 0);
  }
  return 0;
});
const trackOrder = () => {
  alert('Tracking your order...');
};

const cancelOrder = () => {
  router.push('/order-detail')
};
import {onMounted, ref} from 'vue';
import {useRoute} from 'vue-router';
import methodService from '~/plugins/methodService';

const selectedOrder = ref(null);
const route = useRoute();
let res = null
const orderId = route.params.id;
const fetchOrderDetails = async () => {
  try {
    const response = await methodService().get(`/orders/${orderId}`);
    selectedOrder.value = response.order_items
    res = response
    console.log("res: ",res)
  } catch (error) {
    console.error('Error fetching order details:', error);
  }
};

onMounted(() => {
  fetchOrderDetails();
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
};
</script>

<style scoped>
</style>
