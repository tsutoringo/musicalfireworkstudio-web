<template>
	<div class="content-wrap">
		<div class="content" :class="classes">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: 'FFlexWrapper',
	props: {
		classes: {}
	}
};
</script>

<style lang="scss" scoped>
.content-wrap {
	position: relative;
	flex: 1;
	width: 100%;
}

.content {
	position: absolute;
	height: 100%;
	width: 100%;
	left: 0;
	top: 0;

	overflow: scroll;
	
}
</style>