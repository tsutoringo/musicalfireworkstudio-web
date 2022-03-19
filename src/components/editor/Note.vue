<template>
	<div
		class="note"
		v-if="note"
		:style="{
			left: `calc(var(--mass-size) * ${note.tick})`,
			backgroundImage: player.instruments[note.instrument] ? `url(${player.instruments[note.instrument].icon})` : ''
		}"
	>
		{{ note.key }}
	</div>
</template>

<script>
import { inject } from 'vue';

export default {
	name: 'Note',
	props: {
		note: {
			type: Object,
			required: true
		}
	},
	setup () {
		const player = inject('player');

		return {
			player
		};
	}
};
</script>

<style scoped>
.note {
	position: absolute;
	width: var(--mass-size);
	height: var(--mass-size);
	text-align: center;
	background-size: cover;
	image-rendering: pixelated;
	color: black;
	box-sizing: border-box;
	/* border: 1px solid #703d29; */
	cursor: pointer;

	user-select: none;
}
</style>