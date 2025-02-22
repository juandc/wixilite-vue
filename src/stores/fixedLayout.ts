import { computed, ref, toRaw } from "vue";
import { defineStore } from "pinia";
import type {
  IDevices,
  IFixedElementEditingImgProps,
  IFixedElementEditingTextProps,
  IFixedElementNew,
  IFixedElementsDict,
} from "@/types";
import {
  addElementToElementsDict,
  addImgElementToElementsDict,
  addRectangleElementToElementsDict,
  addTextElementToElementsDict,
  duplicateElementInElementsDict,
  editImgPropsInElementsDict,
  editingImgDefaults,
  editingRectangleDefaults,
  editingTextDefaults,
  editTextPropsInElementsDict,
  moveElementInElementsDict,
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
      ...fn({ ...toRaw(JSON.parse(JSON.stringify(elements.value))) }),
    };
  }

  const addElement = (type: IFixedElementNew["type"]) => (x: number, y: number) => {
    const id = `${Math.random()}`;
    editElements(addElementToElementsDict(type)(id, x, y));
    // setElements(addElementToElementsDict(type)(id, x, y));
    // setSelectedElementId(id);
  };

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

  const moveElement = (id: string) => (x: number, y: number) => {
    console.log("moving element", id, x, y);
    editElements(moveElementInElementsDict(id, x, y));
    selectedElementId.value = id;
  };

  const duplicateElement = (id: string) => {
    const newId = `${Date.now()}`;
    editElements(duplicateElementInElementsDict(id, newId));
    selectedElementId.value = newId;
  };

  const duplicateSelectedElement = () => {
    if (selectedElement.value) {
      duplicateElement(selectedElement.value.id);
    }
  };

  const deleteElement = (id: string) => {
    delete deviceElements.value[device.value][id];
  };

  const deleteSelectedElement = () => {
    if (selectedElement.value) {
      deleteElement(selectedElement.value.id);
      selectedElementId.value = undefined;
    }
  };

  const editTextProps = (id: string, textProps: IFixedElementEditingTextProps) => {
    editElements(editTextPropsInElementsDict(id, textProps));
  };

  const editSelectedTextProps = (textProps: IFixedElementEditingTextProps) => {
    if (selectedElement.value?.type === "fixed--editing-text")
    editElements(editTextPropsInElementsDict(selectedElement.value.id, textProps));
  };

  const editImgProps = (id: string, imgProps: IFixedElementEditingImgProps) => {
    editElements(editImgPropsInElementsDict(id, imgProps));
  };

  const editSelectedImgProps = (imgProps: IFixedElementEditingImgProps) => {
    if (selectedElement.value?.type === "fixed--editing-img") {
      editImgProps(selectedElement.value.id, imgProps);
    }
  };

  return {
    device,
    deviceElements,
    elements,
    elementIds,
    selectedElementId,
    selectedElement,
    editElements,
    addElement,
    addDefaultTextElement,
    addDefaultImgElement,
    addDefaultRectangleElement,
    moveElement,
    duplicateElement,
    duplicateSelectedElement,
    deleteElement,
    deleteSelectedElement,
    editTextProps,
    editSelectedTextProps,
    editImgProps,
    editSelectedImgProps,
  };
});
