<template>
  <Teleport to="body">
    <Transition name="modal-outer">
      <div v-show="modalActive"
        class="absolute w-full bg-black bg-opacity-50 h-screen top-0 left-0 flex justify-center px-8">
        <Transition name="modal-inner">
          <div v-show="modalActive"
            class="p-4 flex flex-col mx-32 items-center container rounded-3xl bg-opacity-20 self-start mt-32 max-w-screen-md">
            <slot />
            <button @click="$emit('close-modal')"
              class="mt-8 mx-auto py-2 px-6 bg-white text-black hover:bg-weather-secondary hover:text-white duration-150 cursor-pointer active:bg-weather-primary active:text-white">
              Close
            </button>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>

const emits = defineEmits(['close-modal'])

const props = defineProps({
  modalActive: {
    type: Boolean,
    default: false
  }
})

</script>

<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: 0;
}

.modal-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-inner-leave-to {
  transform: scale(0.8);
}
</style>