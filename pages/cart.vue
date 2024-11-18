<template>
  <div>
    <section class="bg-white py-8 antialiasing dark:bg-gray-900 md:py-16">
      <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>

        <div class="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div class="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div class="space-y-6" v-if="cart.length > 0">
              <div
                  v-for="(item, index) in cart" :key="index"
                  class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                  <a href="#" class="shrink-0 md:order-1">
                    <img class="h-20 w-20 dark:hidden" :src="item.preview_img_path" alt="Product image"/>
                    <img class="hidden h-20 w-20 dark:block" :src="item.preview_img_path" alt="Product image"/>
                  </a>

                  <label for="counter-input" class="sr-only">Choose quantity:</label>
                  <div class="flex items-center justify-between md:order-3 md:justify-end">
                    <div class="flex items-center">
                      <button type="button" @click="decrementQuantity(index)"
                              class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                        <svg class="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M1 1h16"/>
                        </svg>
                      </button>
                      <input type="text" v-model="item.quantity"
                             class="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                             placeholder="" required/>
                      <button type="button" @click="incrementQuantity(index)"
                              class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                        <svg class="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 1v16M1 9h16"/>
                        </svg>
                      </button>
                    </div>
                    <div class="text-end md:order-4 md:w-32">
                      <p class="text-base font-bold text-gray-900 dark:text-white">
                        {{ formatPrice(item.price * item.quantity) }}</p>
                    </div>
                  </div>

                  <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                    <a href="#" class="text-base font-medium text-gray-900 hover:underline dark:text-white">{{
                        item.name
                      }}</a>
                    <div class="flex items-center gap-4">
                      <button type="button"
                              class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
                              @click="addToFavorites(item)">
                        <svg class="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                             height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"/>
                        </svg>
                        Add to Favorites
                      </button>
                      <button type="button"
                              class="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                              @click="removeFromCart(index)">
                        <svg class="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                             height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18 17.94 6M18 18 6.06 6"/>
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                <div
                    class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                  <p class="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>
                  <div class="space-y-4">
                    <div class="space-y-2">
                      <dl class="flex items-center justify-between gap-4">
                        <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                        <dd class="text-base font-medium text-gray-900 dark:text-white">{{
                            formatPrice(totalPrice)
                          }}
                        </dd>
                      </dl>
                      <dl class="flex items-center justify-between gap-4">
                        <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                        <dd class="text-base font-medium text-green-600">{{ formatPrice(totalPrice) }}</dd>
                      </dl>
                    </div>
                    <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                      <dt class="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                      <dd class="text-base font-bold text-gray-900 dark:text-white">{{ formatPrice(totalPrice) }}</dd>
                    </dl>
                  </div>
                  <div @click="processToCheck"
                       class="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Proceed to Checkout
                  </div>
                  <div class="flex items-center justify-center gap-2">
                    <span class="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
                    <div @click="navigateTo('/products')" title=""
                         class="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                      Continue Shopping
                      <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                           viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M19 12H5m14 0-4 4m4-4-4-4"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-center mt-6">
              <img width="400" height="400"
                   src="https://w7.pngwing.com/pngs/432/660/png-transparent-empty-cart-illustration.png"
                   alt="Empty Cart" class="mx-auto"/>
              <p class="text-gray-500">Your cart is empty. Start shopping now!</p>

              <button
                  @click="navigateTo('/products')"
                  class="mt-4 px-6 py-2 text-white bg-fuchsia-700 rounded-lg hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Go to shopping
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  </div>
</template>


<script setup>
import {ref, onMounted} from 'vue';
import methodService from "~/plugins/methodService.ts";
import {useToast} from "vue-toastification";
import {navigateTo} from "#app";

const cart = ref([]);
const toast = useToast()
const formatPrice = (price) => {
  return `$${price.toFixed(2)}`;
};

function processToCheck() {
  checkStock()
}

definePageMeta({
  middleware: 'auth'
})
onMounted(() => {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    cart.value = JSON.parse(storedCart);
  }
});
const checkStock = async () => {
  debugger
  const productIds = cart.value.map(item => item.id);
  try {
    const responses = await Promise.all(productIds.map(id =>
        methodService().get(`/products/${id}/check-stock`)
    ));
    const allInStock = responses.every((response) => response.message === 'In stock');
    if (allInStock) {
      navigateTo('/checkout');
    } else {
      toast.error('Not all products are in stock. Please check your cart.');
    }
    responses.forEach((response, index) => {
      if (response.message === 'In stock') {
        toast.success(`Product ${cart.value[index].name} is in stock.`);
      } else {
        toast.error(`Product ${cart.value[index].name} is out of stock.`);
      }
    });
  } catch (error) {
    toast.error('Not all products are in stock. Please check your cart.');
  }
};

onMounted(() => {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    cart.value = JSON.parse(storedCart);
  }
});
const incrementQuantity = (index) => {
  const storedCart = JSON.parse(localStorage.getItem('cart'));
  const maxStock = storedCart[index].stock;

  if (cart.value[index].quantity >= maxStock) {
    toast.error(`Quantity cannot exceed stock level of ${maxStock}`);
    return;
  }
  cart.value[index].quantity++;
  updateLocalStorage();
};


const decrementQuantity = (index) => {
  if (cart.value[index].quantity > 1) {
    cart.value[index].quantity--;
    updateLocalStorage();
  }
};

const removeFromCart = (index) => {
  cart.value.splice(index, 1);
  updateLocalStorage();
};

const addToFavorites = (item) => {
};

const updateLocalStorage = () => {
  localStorage.setItem('cart', JSON.stringify(cart.value));
};

const totalPrice = computed(() => {
  return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0);
});

</script>
