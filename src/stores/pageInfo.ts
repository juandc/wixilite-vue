import { reactive } from 'vue';
import type { IPageInfo } from '@/types';

const defaultPageInfo = {
  id: "default-page",
  name: "Untitled Landing",
  innerBackground: "#FFC2FD",
  outerBackground: "#222222",
  height: 400,
};

export const pageInfoStore = reactive<IPageInfo>(defaultPageInfo);
// en teoría no se necesitan actualizadores... ya veremos
