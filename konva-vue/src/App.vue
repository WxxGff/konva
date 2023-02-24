<template>
  <Canvas :canvasConfig="{ width: 900, height: 600 }" :shapes="shapes" @onChange="onChange" :creatorType="creatorType"
    @onCreateNewShape="onCreateNewShape" />
  <button @click="creatorType = 'circle'">画圆形</button>
  <button @click="creatorType = 'rect'">画矩形</button>
  <button @click="creatorType = 'polygon'">画多边形</button>
  <button @click="setEditMode">{{ editMode ? "关闭" : "开启" }}编辑模式</button>
  <button @click="showRandomData = !showRandomData">{{ showRandomData ? "关闭" : "开启" }}性能测试</button>
</template>

<script setup lang="ts">
import { v4 as uuid } from "uuid";
import Canvas from "./components/Canvas.vue";
import { computed, ref } from "vue";
import { IShape, TCreatorType } from "./components/interface";
import { randomColor, randomNum } from "./components/utils";
const creatorType = ref<TCreatorType | undefined>();
const editMode = ref<Boolean>(false);
const showRandomData = ref<Boolean>(false);



//用于性能模式生成的 200个随机图像
const randomData = ref<IShape[]>(
  //  new Array(200).fill("")
  //创建一个数组有200元素, 每个元素的内容是""
  new Array(200).fill("").map(() => ({
    type: Math.ceil(Math.random() * 10) % 2 ? "circle" : "rect",
    id: uuid(),
    x: randomNum(800),
    y: randomNum(600),
    width: 70,
    height: 70,
    fill: randomColor(),
  })),
);
//开始就生成的两个图像
const data = ref<IShape[]>([
  {
    type: "circle",
    id: uuid(),
    x: 120,
    y: 200,
    width: 70,
    height: 70,
    fill: "blue",
  },
  {
    type: "rect",
    id: uuid(),
    x: 20,
    y: 20,
    width: 70,
    height: 70,
    fill: "red",
  },
]);
//showRandomData  开不开启性能模型//
const shapes = computed(() =>
  (showRandomData.value ? randomData.value : [])
    .concat(data.value)
    .map((item) => ({ ...item, draggable: !!editMode.value })),
  // ! 取反  !!取正
  //editMode.value  是否开启编辑模式   开启可以移动图形 draggable(是否可以移动)
);

const onCreateNewShape = (shape: IShape) => {
  creatorType.value = undefined;

  data.value.push({ ...shape, fill: "red" });
};

const onChange = (shape: IShape) => {
  data.value = data.value.map((item) => {
    if (item.id === shape.id) {
      return { ...shape };
    }
    return item;
  });
  if (showRandomData) {
    randomData.value = randomData.value.map((item) => {
      if (item.id === shape.id) {
        return { ...shape };
      }
      return item;
    });
  }
};
//点击编辑
const setEditMode = () => {
  editMode.value = !editMode.value;
};
</script>
