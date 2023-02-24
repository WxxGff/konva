import Konva from "konva";
import { findParentKonva } from "../utils";
import { computed, ComputedRef, defineEmits, getCurrentInstance, inject, onUnmounted, watch } from "vue";
import { IShape } from "../interface";

/*
 * 使 Shape 支持变形操作
 * */
export const useTransform = (konvaNode: Konva.Shape) => {
  const instance = getCurrentInstance();
  console.log("🚀 ~ file: useTransform.ts:11 ~ useTransform ~ instance:", instance)

  if (!instance) {
    console.error("useTransform: Can not find instance");
    return;
  }
  const emit = instance.emit;
  const props = instance.props;
  if (!emit) {
    console.error("useTransform: 组件必须定义 emit onChange 事件");
    return;
  }
  if (!props) {
    console.error("useTransform: 组件必须定义 props config 类型");
    return;
  }
  const config = computed(() => props.config) as ComputedRef<IShape>;

  //Transformer  图形可以编辑
  const tr = new Konva.Transformer();
  
  const layer: Konva.Layer = findParentKonva(instance).__konvaNode;

  layer?.add(tr);

  watch(
    () => config.value.draggable,
    () => {
      if (config.value.draggable) {
        //获取/设置 Transformer 的附加节点。Transformer 会适应它们的大小并监听它们的事件
        /*  nodes()
        get/set attached nodes of the Transformer. Transformer will adapt to their size and listen to their events */
        console.log(konvaNode)
        tr.nodes([konvaNode]);
      } else {
        tr.nodes([]);
      }
    },
    { deep: true, immediate: true },
  );

  onUnmounted(() => {
    tr.destroy();
  });
  const onDragend = () => {
    // konvaNode.getAttrs() 获取属性对象字面量
    emit("onChange", { ...config.value, ...konvaNode.getAttrs() });
  };
// /* 
//   拖动事件：dragstart、dragmove和dragend。
// 变换事件：transformstart, transform, transformend. */
  konvaNode.on("transformend", onDragend);
  konvaNode.on("dragend", onDragend);

  onUnmounted(() => {
    konvaNode.off("transformend", onDragend);
    konvaNode.off("dragend", onDragend);
    konvaNode.destroy();
  });
};
