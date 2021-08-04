<template>
	<div class="toolbar">
		<slot />
	</div>
</template>
<script>
export default {
	name: 'Toolbar',
	setup () {
		
	}
};
</script>
<style lang="scss" scoped>
.toolbar {
	background-color: #FAFAFA;
	color: #37474F;
	box-shadow: 0 0 5px 1px #00000030;
	padding: 4px;
	box-sizing: border-box;
	display: inline-flex;
	align-items: center;
}
</style>
