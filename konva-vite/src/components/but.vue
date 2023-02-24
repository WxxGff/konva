<template>
	<div>
		<div id="container" ref="container"></div>
		<n-icon size="20">
			<CartOutline />
		</n-icon>

		<n-space>
			<n-button>naive-ui</n-button>
			<n-button type="info">
				点击可以移动
			</n-button>
		</n-space>
	</div>
</template>

<script setup lang="ts" name="but">
import { CartOutline } from '@vicons/ionicons5'

import { NButton } from 'naive-ui'
</script>

<style lang="scss" scoped></style>

