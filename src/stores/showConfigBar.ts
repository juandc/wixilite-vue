import { reactive } from 'vue';

export const configBarStore = reactive<{ show?: boolean }>({ show: true });
