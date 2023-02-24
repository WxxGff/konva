<template>
	<div class="canvas" id="canvas" ref="konva">

	</div>

	<div>
		<n-space style="text-align:center">
			<n-button type="info" @click="click_move"> 点击可以移动 </n-button>
			&nbsp;
			<n-button type="error" @click="click_close_move">
				点击关闭移动
			</n-button>
			&nbsp;
			<n-button type="info" @click="click_draw_polygon">
				点击绘画多边形
			</n-button>
			<n-button type="info" @click="click_draw_rect">
				点击绘画矩形 </n-button>
		</n-space>

	</div>
</template>

<script setup lang="ts" name="konva">
import Konva from 'konva';
import { NButton, NSpace } from "naive-ui";
import { ref, onMounted, getCurrentInstance } from 'vue'
const konva = ref(null)
var width = window.innerWidth;
var height = window.innerHeight;

interface dataType {
	id: string,
	x: number,
	y: number,
	width: number,
	height: number,
	fill: string,
}
//矩形数据
let Rect_data: dataType = {
	id: '222',
	x: 120,
	y: 200,
	width: 70,
	height: 70,
	fill: "blue",
}
//椭圆数据
let Ellipse_data = {
	x: 150,
	y: 100,
	radiusX: 100,
	radiusY: 50,
	fill: 'yellow',
	stroke: 'black',
	strokeWidth: 4
}
//创建一个舞台
const stage = new Konva.Stage({
	container: document.createElement('div'),
	width,
	height
});

//创建一个图层
const layer = new Konva.Layer();
//创建一个矩形
const Rect = new Konva.Rect();
const Ellipse = new Konva.Ellipse();

// add the shape to the layer
//图层上添加这个矩形
layer.add(Rect);
layer.add(Ellipse);

//舞台上添加这个图层
// add the layer to the stage
stage.add(layer);
//设置矩形的属性
Rect.setAttrs(Rect_data);
Ellipse.setAttrs(Ellipse_data);

const tr = new Konva.Transformer();
//点击移动
const click_move = () => {
	Rect.setAttrs({ ...Rect.getAttrs(), draggable: true })
}
//关闭移动
const click_close_move = () => {
	Rect.setAttrs({
		...Rect.getAttrs(),
		draggable: false
	})
}
//多边形路径
let path: number[] = [];
const initLine = {
	id: '1215515',
	type: "polygon",
	stroke: "black",
	strokeWidth: 5,
	fill: "red",
};
const initLine_shape: Konva.Line = new Konva.Line(initLine);

//绘画多边形
const click_draw_polygon = () => {
	stage.on("mousedown", onMousedown);
}
const poly = new Konva.Line({
	fill: '#00D2FF',
	stroke: 'black',
	strokeWidth: 5,
	closed: true
});
layer.add(poly);

// 这个是辅助线
const auxiliaryLine: Konva.Line = new Konva.Line({
	points: [],
	stroke: "green",
	strokeWidth: 2,
	lineJoin: "round",
	dash: [10],
});

const onMouseMove = ({ evt }: { evt: MouseEvent }) => {
	const beginX = path[0]
	const beginY = path[1]
	const lastPathX = path[path.length - 2];
	const lastPathY = path[path.length - 1];
	let x = evt.offsetX
	let y = evt.offsetY

	if (Math.abs(beginX - x) <= 10 && Math.abs(beginY - y) <= 10) {
		x = beginX
		y = beginY
	}

	auxiliaryLine.setAttrs({ points: [lastPathX, lastPathY, x, y] })

}


const onMousedown = ({ evt }: { evt: MouseEvent }) => {
	const x = evt.offsetX;
	const y = evt.offsetY;
	if (Math.abs(path?.[0] - x) <= 10 && Math.abs(path?.[1] - y) <= 10) {
		const newShape = { ...initLine, points: path.concat([path[0], path[1]]), closed: true };
		console.log("🚀 ~ file: konva.vue:124 ~ onMousedown ~ newShape:", newShape)
		poly.setAttrs({ points: [...path, ...[path[0], path[1]]] })
		stage.off("mousedown", onMousedown);
		stage.off("mousemove", onMouseMove);
		//删除辅助线
		auxiliaryLine.destroy();
		path = []
		return;
	}
	path.push(...[x, y]);
	layer.add(auxiliaryLine);
	layer.add(initLine_shape);


	initLine_shape.setAttrs({ points: path });

	stage.on("mousemove", onMouseMove);


}


// stage.on('click tap', function (e) {
// 	console.log(e)
// 	// if click on empty area - remove all transformers
// 	if (e.target === stage) {
// 		tr.nodes([]);
// 		return;
// 	}
// 	// do nothing if clicked NOT on our rectangles

// 	// remove old transformers
// 	// TODO: we can skip it if current rect is already selected
// 	layer.add(tr);
// 	tr.nodes([Rect]);

// });

const rect = new Konva.Rect({
	fill: 'green',
	stroke: 'black',
	strokeWidth: 4
});
// add the shape to the layer
layer.add(rect);
let initPosition: { x: number; y: number } | null = null;
const click_draw_rect = () => {
	stage.on("mousedown", ({ evt }: { evt: MouseEvent }) => {
		initPosition = {
			x: evt.offsetX,
			y: evt.offsetY
		}
	});
	stage.on("mousemove", ({ evt }: { evt: MouseEvent }) => {
		if (!initPosition) return;
		let width = Math.abs(initPosition.x - evt.offsetX);
		let height = Math.abs(initPosition.y - evt.offsetY);
		let x = initPosition.x
		let y = initPosition.y

		if (evt.offsetX < initPosition.x) {
			x = evt.offsetX;
		}
		if (evt.offsetY < initPosition.y) {
			y = evt.offsetY;
		}
		rect.setAttrs({
			x,
			y,
			width,
			height
		})
	});

	window.addEventListener('mouseup', (event) => {

		stage.off('mousemove')
		stage.off('mousedown')
		initPosition = null
	})


}

//dom加载完成后,把舞台添加到dom里
onMounted(() => {
	stage.container(konva.value!);
})
</script>


<style lang="scss" scoped>
#canvas {
	background-color: #7b7d85;
	border: 5px solid #000;
}
</style>
