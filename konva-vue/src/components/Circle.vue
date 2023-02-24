<template></template>

<script lang="ts" setup name="circle">
import Konva from "konva";
import { onUnmounted, getCurrentInstance, defineEmits } from "vue";
import { findParentKonva } from "./utils";
import { syncAttrs } from "./hooks/syncAttrs";
import { syncConfig } from "./hooks/syncConfig";
import { useTransform } from "./hooks/useTransform";
import { IShape } from "./interface";

defineEmits(["onChange"]);

//config 图形数据
defineProps<{
  config: IShape;
}>();

const instance: any = getCurrentInstance();
//生成一个圆
const konvaNode = new Konva.Circle();

//保存到instance上
instance.__konvaNode = konvaNode;


//findParentKonva   判断形参上是否有 __konvaNode ,如果有直接发回,没有判断形参上有没有parent  没有直接返回空
const layer: Konva.Layer = findParentKonva(instance).__konvaNode;

//图层上添加这个圆
layer?.add(konvaNode);

useTransform(konvaNode);
syncConfig(konvaNode);
syncAttrs(konvaNode);

onUnmounted(() => {
  konvaNode.destroy();
});
</script>
