<template>
  <section class="bg-white py-8 dark:bg-gray-900 md:py-16">
    <form @submit.prevent="handleSubmit" class="mx-auto max-w-screen-xl px-4 2xl:px-0">
      <div class="mx-auto max-w-3xl">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Order summary</h2>
        <div class="min-w-0 flex-1 space-y-8">
          <div class="space-y-4">
            <br>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label for="phone-input-3" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Phone
                  Number* </label>
                <div class="flex items-center">
                  <button id="dropdown-phone-button-3" data-dropdown-toggle="dropdown-phone-3"
                          class="z-10 inline-flex shrink-0 items-center rounded-s-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                          type="button">
                    +84
                    <svg class="-me-0.5 ms-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                         height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m19 9-7 7-7-7"/>
                    </svg>
                  </button>

                  <div class="relative w-full">
                    <input type="text" id="phone-input"
                           v-model="phone"
                           class="z-20 block w-full rounded-e-lg border border-s-0 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:border-s-gray-700  dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500"
                           placeholder="0393-524-703" required/>
                  </div>
                </div>
              </div>
              <div>
                <div class="mb-2 flex items-center gap-2">
                  <label for="select-country-input-3" class="block text-sm font-medium text-gray-900 dark:text-white">
                    Address </label>
                </div>
                <input id="input-text"
                       v-model="address"
                       placeholder="Enter your address"
                       class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                </input>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-6 sm:mt-8">
          <div class="relative overflow-x-auto border-b border-gray-200 dark:border-gray-800">
            <table class="w-full text-left font-medium text-gray-900 dark:text-white md:table-fixed">
              <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
              <tr v-for="(item,index) in cart" :key="index">
                <td class="whitespace-nowrap py-4 md:w-[384px]">
                  <div class="flex items-center gap-4">
                    <a href="#" class="flex items-center aspect-square w-20 h-20 shrink-0">
                      <img class="h-20 w-20 dark:hidden" :src="item.preview_img_path" alt="Product image"/>
                    </a>
                    <a href="#" class="hover:underline">Apple iMac 27”</a>
                  </div>
                </td>
                <td class="p-4 text-base font-normal text-gray-900 dark:text-white">x {{ item.quantity }}</td>

                <td class="p-4 text-right text-base font-bold text-gray-900 dark:text-white">
                  {{ formatPrice(item.price * item.quantity) }}
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="mt-4 space-y-6">
            <h4 class="text-xl font-semibold text-gray-900 dark:text-white">Order summary</h4>

            <div class="space-y-4">
              <div class="space-y-2">
                <dl class="flex items-center justify-between gap-4">
                  <dt class="text-gray-500 dark:text-gray-400">Original price</dt>
                  <dd class="text-base font-medium text-gray-900 dark:text-white">{{ formatPrice(totalPrice) }}</dd>
                </dl>

                <dl class="flex items-center justify-between gap-4">
                  <dt class="text-gray-500 dark:text-gray-400">Savings</dt>
                  <dd class="text-base font-medium text-green-500">{{ formatPrice(totalPrice) }}</dd>
                </dl>

              </div>

              <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                <dt class="text-lg font-bold text-gray-900 dark:text-white">Total</dt>
                <dd class="text-lg font-bold text-gray-900 dark:text-white">{{ formatPrice(totalPrice) }}</dd>
              </dl>
            </div>

            <div class="flex items-start sm:items-center gap-2">
              <input id="terms-checkbox-2" type="checkbox" value=""
                     class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"/>
              <label for="terms-checkbox-2" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"> I agree
                with the <a href="#" title=""
                            class="text-primary-700 underline hover:no-underline dark:text-primary-500">Terms and
                  Conditions</a> of use of the Flowbite marketplace </label>
            </div>

            <div class="gap-4 sm:flex sm:items-center">
              <button type="button"
                      class="w-full rounded-lg  border border-gray-200 bg-white px-5  py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
                Return to Shopping
              </button>

              <button type="submit"
                      class="mt-4 flex w-full items-center justify-center rounded-lg bg-primary-700  px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300  dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:mt-0">
                Send the order
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>
<script setup>
import {onMounted, ref} from "vue";
import methodService from "~/plugins/methodService.ts";

const cart = ref([]);
const phone = ref('');
const address = ref('');
const router = useRouter()
onMounted(() => {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    cart.value = JSON.parse(storedCart);
  }
});
const formatPrice = (price) => {
  return `$${price.toFixed(2)}`;
};

const totalPrice = computed(() => {
  return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0);
});
const handleSubmit = async () => {
  const token = localStorage.getItem('token');
  const dataSend = {
    phone: phone.value,
    address: address.value,
    cart_item: cart.value.map(item => ({
      product_id: item.id,
      quantity: item.quantity,
      price: item.price,
      name: item.name
    }))
  }
  try {
    const response = await methodService().post('/order', dataSend)
    await router.push("/order-success")
    console.log('Order submitted successfully', response);
  } catch (error) {
    console.error('Error submitting order', error);
  }
}
</script>
