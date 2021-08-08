<template>
	<div class="playing-line" ref="root" :style="{
		left: `calc(var(--mass-size) * ${state.playingTick})`
	}"
	:class="{
		dragging
	}">
		<button
			class="handle"
			@mousedown="onMousedonw($event)"
		></button>
	</div>
</template>
<script>
import { computed, inject, ref } from 'vue';

export default {
	name: 'PlayingLine',
	setup () {
		const state = inject('state');
		const massSize = inject('massSize');
		const dragging = ref(false);
		const root = ref(null);
		const parent = computed(() => root.value.parentElement);

		const onMousedonw = () => {
			dragging.value = true;
		};

		document.addEventListener('mousemove', e => {
			if (!dragging.value) return;
			e.preventDefault();
			const clientRect = parent.value.getBoundingClientRect();
			state.playing = false;
			state.playingTick = Math.max(Math.round((e.pageX  - clientRect.left + window.pageXOffset) / massSize.value), 0);
		});

		document.addEventListener('mouseup', () => {
			dragging.value = false;
		});

		return {
			state,
			onMousedonw,
			root,
			dragging
		};
	},
};
</script>

<style lang="scss">
.playing-line {
	position: absolute;
	top: 0;
	background-color: red;
	width: 1px;
	height: 100%;

	.handle {
		position: absolute;
		clip-path: polygon(0 0, 100% 0, 100% 44%, 50% 100%, 0 44%);
		left: 50%;
		top: 0;
		transform: translateX(-50%);
		background-color: inherit;
		outline: none;

		width: 12px;
		height: 12px;

		cursor: pointer;
		border: none;
		padding: none;
	}

	&.dragging {
		.handle {
			cursor: col-resize;
		}
	}
}
</style>