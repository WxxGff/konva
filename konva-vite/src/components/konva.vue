<template>
	<div class="canvas" id="canvas">

	</div>
</template>

<script setup lang="ts" name="konva">

import Konva from 'konva';



var width = window.innerWidth;
var height = window.innerHeight;

var stage = new Konva.Stage({
	container: document.createElement("div"),
	width: width,
	height: height
});
var layer = new Konva.Layer();

var pentagon = new Konva.RegularPolygon({
	x: stage.width() / 2,
	y: stage.height() / 2,
	sides: 5,
	radius: 70,
	fill: 'red',
	stroke: 'black',
	strokeWidth: 4
});


// add the shape to the layer
layer.add(pentagon);

// add the layer to the stage
stage.add(layer);

</script>


<style lang="scss" scoped></style>
