<template>
	<button class="f-button">
		<slot />
	</button>
</template>

<script>
export default {
	name: 'FButton'
};
</script>

<style lang="scss" scoped>
button {
	padding: 0;
	margin: 4px;
	background-color: transparent;
	border: none;
	user-select: none;
	color: #37474F;
	cursor: pointer;
	transition: all 100ms 0s ease;

	&:hover:not(:disabled), &.checked:not(:disabled) {
		background-color: #00000010;
	}

	&:active:not(:disabled), &.checked:active:not(:disabled) {
		background-color: #00000020;
	}

	&:disabled {
		color: #CFD8DC;
		cursor: default;
	}
}
</style>