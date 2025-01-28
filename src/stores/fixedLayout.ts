import { computed, ref } from "vue";
import { defineStore } from "pinia";
import type {
  IDevices,
  IFixedElementEditingTextProps,
  IFixedElementsDict,
} from "@/types";
import {
  addImgElementToElementsDict,
  addRectangleElementToElementsDict,
  addTextElementToElementsDict,
  editingImgDefaults,
  editingRectangleDefaults,
  editingTextDefaults,
  editTextPropsInElementsDict,
} from "@/utils/fixedElement";

type DeviceElementsDict = Record<IDevices, IFixedElementsDict>;

const initialElements: DeviceElementsDict = {
  mobile: {
    "watermark": {
      id: "watermark",
      type: "fixed--editing-img",
      data: {
        ...editingImgDefaults,
        borderRadius: 12,
        x: 268,
        y: 4,
        w: 45,
        h: 45,
        opacity: 0.5,
      },
    },
    "title": {
      id: "title",
      type: "fixed--editing-text",
      data: {
        ...editingTextDefaults,
        text: ["JUANDC"],
        color: "#BE41EC",
        fontSize: 21,
        x: 111,
        y: 90,
      },
    },
    "subtitle": {
      id: "subtitle",
      type: "fixed--editing-text",
      data: {
        ...editingTextDefaults,
        text: ["Un puente para conectar diseño, desarrollo y educación"],
        color: "#0E0319",
        fontSize: 14,
        textAlign: "center",
        x: 48,
        y: 142,
        w: 222,
        h: 20,
      },
    },
    "buttonbg": {
      id: "buttonbg",
      type: "fixed--editing-rectangle",
      data: {
        ...editingRectangleDefaults,
        borderRadius: 12,
        x: 80,
        y: 212,
        w: 145,
        h: 40,
      },
    },
    "buttontext": {
      id: "buttontext",
      type: "fixed--editing-text",
      data: {
        ...editingTextDefaults,
        text: ["Contáctame"],
        color: "#FFFFFF",
        x: 111,
        y: 220,
        w: 90,
        h: 16,
      },
    },
  },
  desktop: {},
};

export const useFixedLayoutStore = defineStore('fixedLayoutStore', () => {
  const device = ref<IDevices>("mobile");
  const deviceElements = ref<DeviceElementsDict>(initialElements);
  const selectedElementId = ref<string | undefined>(undefined);
  const elements = computed(() => deviceElements.value[device.value]);
  const elementIds = computed(() => Object.keys(elements.value));
  const selectedElement = computed(() => selectedElementId.value ? elements.value[selectedElementId.value] : undefined);

  type EditElementsFn = (oldElements: IFixedElementsDict) => IFixedElementsDict;
  function editElements(fn: EditElementsFn) {
    deviceElements.value[device.value] = {
      ...elements.value,
      ...fn({ ...elements.value }),
    };
  }

  const addDefaultTextElement = (x: number, y: number) => {
    const newId = `${Date.now()}`;
    editElements(addTextElementToElementsDict(newId, x,y));
  };

  const addDefaultImgElement = (x: number, y: number) => {
    const newId = `${Date.now()}`;
    editElements(addImgElementToElementsDict(newId, x,y));
  };

  const addDefaultRectangleElement = (x: number, y: number) => {
    const newId = `${Date.now()}`;
    editElements(addRectangleElementToElementsDict(newId, x,y));
  };

  const editTextProps = (id: string, textProps: IFixedElementEditingTextProps) => {
    editElements(editTextPropsInElementsDict(id, textProps));
  };

  const editSelectedTextProps = (textProps: IFixedElementEditingTextProps) => {
    if (selectedElement.value?.type === "fixed--editing-text")
    editElements(editTextPropsInElementsDict(selectedElement.value.id, textProps));
  };

  return {
    device,
    deviceElements,
    elements,
    elementIds,
    selectedElementId,
    selectedElement,
    editElements,
    addDefaultTextElement,
    addDefaultImgElement,
    addDefaultRectangleElement,
    editTextProps,
    editSelectedTextProps,
  };
})

// import { reactive } from 'vue';
// import type { IDevices, IFixedElement, IFixedElementsDict } from '@/types';
// import { editingImgDefaults, editingRectangleDefaults, editingTextDefaults } from '@/utils/fixedElement';

// type DeviceElementsDict = Record<IDevices, IFixedElementsDict>;

// const initialElements: DeviceElementsDict = {
//   mobile: {
//     "watermark": {
//       id: "watermark",
//       type: "fixed--editing-img",
//       data: {
//         ...editingImgDefaults,
//         borderRadius: 12,
//         x: 268,
//         y: 4,
//         w: 45,
//         h: 45,
//         opacity: 0.5,
//       },
//     },
//     "title": {
//       id: "title",
//       type: "fixed--editing-text",
//       data: {
//         ...editingTextDefaults,
//         text: ["JUANDC"],
//         color: "#BE41EC",
//         fontSize: 21,
//         x: 111,
//         y: 90,
//       },
//     },
//     "subtitle": {
//       id: "subtitle",
//       type: "fixed--editing-text",
//       data: {
//         ...editingTextDefaults,
//         text: ["Un puente para conectar diseño, desarrollo y educación"],
//         color: "#0E0319",
//         fontSize: 14,
//         textAlign: "center",
//         x: 48,
//         y: 142,
//         w: 222,
//         h: 20,
//       },
//     },
//     "buttonbg": {
//       id: "buttonbg",
//       type: "fixed--editing-rectangle",
//       data: {
//         ...editingRectangleDefaults,
//         borderRadius: 12,
//         x: 80,
//         y: 212,
//         w: 145,
//         h: 40,
//       },
//     },
//     "buttontext": {
//       id: "buttontext",
//       type: "fixed--editing-text",
//       data: {
//         ...editingTextDefaults,
//         text: ["Contáctame"],
//         color: "#FFFFFF",
//         x: 111,
//         y: 220,
//         w: 90,
//         h: 16,
//       },
//     },
//   },
//   desktop: {},
// };

// type FixedLayoutState = {
//   device: IDevices;
//   deviceElements: DeviceElementsDict;
//   // elementIds: string[];
//   // selectedElementId: string | undefined;
//   // selectedElement: IFixedElement | undefined;
// };

// export const fixedLayoutStore = reactive<FixedLayoutState>({
//   device: "mobile",
//   deviceElements: initialElements,
// });

// export const 
