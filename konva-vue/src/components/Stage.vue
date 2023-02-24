<template>
  <div ref="container" class="konva-stage" id="konva_stage">
    <slot />
  </div>
</template>

<script lang="ts" setup name="stage">
import Konva from "konva";
import { ref, watch, onMounted, getCurrentInstance, useAttrs, onUnmounted } from "vue";
const props = defineProps<{ config: { width: number; height: number } }>();


const instance: any = getCurrentInstance();


const attrs = useAttrs();  //父组件上所有没有被props接收的值


//获取到页面中的 container
const container = ref<HTMLDivElement | null>(null);


//创建出一个Stage(舞台)

const konvaNode = new Konva.Stage({
  // config app传过来的宽高
  width: props.config.width,
  height: props.config.height,
  //自己创建了一个div
  container: document.createElement("div"),
});


konvaNode.setAttrs(attrs);


//保存到instance上
instance.__konvaNode = konvaNode;


onMounted(() => {
  // console.log(konvaNode.container)
  // ƒ () {
  //     if (arguments.length) {
  //       this[setter](arguments[0]);
  //       return this;
  //     }
  //     return this[getter]();
  //   }

  //把container Dom放了进去
  konvaNode.container(container.value!);
});

onUnmounted(() => {
  konvaNode.removeChildren();
  konvaNode.destroy();
});

watch(
  () => props.config,
  () => {
    konvaNode.size({ width: props.config.width, height: props.config.height });
  },
  { deep: true },
);

watch(
  () => attrs,
  () => {
    konvaNode.setAttrs(attrs);
  },
  { deep: true },
);
</script>
