<template>
  <slot />
</template>

<script lang="ts" setup name="layer">
import Konva from "konva";
import { watch, onMounted, onUnmounted, getCurrentInstance, useAttrs } from "vue";
import { findParentKonva } from "./utils";
import { syncAttrs } from "./hooks/syncAttrs";

const instance: any = getCurrentInstance();


//创建图层
const konvaNode = new Konva.Layer();

//舞台页面中也保存了

// __konvaNode 保存到了instance
instance.__konvaNode = konvaNode;



//findParentKonva   判断形参上是否有 __konvaNode ,如果有直接发回,没有判断形参上有没有parent  没有直接返回空
const parentKonvaNode: Konva.Stage = findParentKonva(instance).__konvaNode;
//  __konvaNode 上添加图层
parentKonvaNode?.add(konvaNode);

onUnmounted(() => {
  konvaNode.destroy();
});

syncAttrs(konvaNode);
</script>
