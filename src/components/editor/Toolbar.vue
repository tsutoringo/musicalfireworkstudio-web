<template>
	<div class="toolbar">
		<f-toggle-button v-model="state.playing" :disabled="!state.loaded">
			<template #on><g-icon icon="pause" /></template>
			<template #off><g-icon icon="play_arrow" /></template>
		</f-toggle-button>
		<f-button :disabled="!state.loaded" @click="stopPlay()">
			<g-icon icon="stop" />
		</f-button>
		<f-button :disabled="!state.loaded" @click="skipStart()">
			<g-icon icon="skip_previous" />
		</f-button>
		<f-button :disabled="!state.loaded" @click="skipEnd()">
			<g-icon icon="skip_next" />
		</f-button>
		<template v-if="state.loaded">
			<f-button @click="state.nbs.loop.enable = !state.nbs.loop.enable" :off="!state.nbs.loop.enable">
				<g-icon icon="loop" />
			</f-button>
			<f-vhr />
			<input type="text" v-model="state.nbs.song.tempo">
		</template>
	</div>
</template>
<script>
import { inject } from 'vue';

import FVhr from '../parts/FVhr.vue';
import FButton from '../parts/FButton.vue';
import FToggleButton from '../parts/FToggleButton.vue';
import GIcon from '../icon/GIconRound.vue';

export default {
	name: 'Toolbar',
	components: {
		FVhr,
		FButton,
		FToggleButton,
		GIcon
	},
	setup () {
		const state = inject('state');


		const stopPlay = () => {
			state.playing = false;
			state.playingTick = 0;
		};

		const skipStart = () => {
			state.playingTick = 0;
		};

		const skipEnd = () => {
			state.playingTick = state.nbs.songLength + 1;
		};

		return {
			state,
			stopPlay,
			skipStart,
			skipEnd,
		};
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
