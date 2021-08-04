<template>
	<div
		ref="root"
		class="project-editor"
		:style="{
			'--mass-size': `${massSize}px`
		}"
		@dragover="onDragover($event)"
		@dragleave="dragging = false"
		@drop="onDrop($event)">
		<f-toolbar>
			<f-toggle-button v-model="state.playing" :disabled="!state.loaded">
				<template #on><g-icon icon="pause" /></template>
				<template #off><g-icon icon="play_arrow" /></template>
			</f-toggle-button>
			<f-button :disabled="!state.loaded" @click="stopPlay()">
				<g-icon icon="stop" />
			</f-button>
			<f-vhr />
			<template v-if="state.loaded">
				<input type="text" v-model="state.nbs.song.tempo">
			</template>
		</f-toolbar>
		<f-timeline v-if="state.loaded" />
		<f-flex-wrapper v-else classes="no-nbs-file">
			<g-icon icon="music_note" class="icon"/>
			<div>
				No NBS file. <br>
				Drag to load.
			</div>
		</f-flex-wrapper>
	</div>
</template>

<script>
import { inject, ref, reactive } from 'vue';
import nbsParser from '../util/nbsParser';

import FTimeline from '../components/editor/Timeline.vue';
import GIcon from '../components/icon/GIconRound.vue';
import FToolbar from '../components/editor/Toolbar.vue';
import FButton from '../components/parts/FButton.vue';
import FToggleButton from '../components/parts/FToggleButton.vue';
import FVhr from '../components/parts/FVhr.vue';
import FFlexWrapper from '../components/parts/FFlexWrapper.vue';

export default {
	name: 'ProjectEditor',
	components: { FTimeline, GIcon, FToolbar, FButton, FToggleButton, FVhr, FFlexWrapper },
	setup () {
		const state = inject('state');
		const massSize = inject('massSize');
		const dragging = ref(false);

		const onDragover = e => {
			dragging.value = true;
			e.preventDefault();
			e.dataTransfer.dropEffect = 'copy';
		};

		const onDrop = e => {
			e.preventDefault();
			dragging.value = false;
			const file = e.dataTransfer.files[0];

			file.arrayBuffer().then(ab => {
				state.nbs = reactive(nbsParser(ab));
			});
		};

		const stopPlay = () => {
			state.playing = false;
			state.playingTick = 0;
		};

		return {
			state,
			dragging,
			onDragover,
			onDrop,
			stopPlay,
			massSize
		};
	}
};
</script>

<style lang="scss" scoped>
.project-editor {
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;

	.toolbar {
		width: 100%;
	}

	/deep/ .timeline {
		display: grid;
		grid-template-rows: 40px auto;
		grid-template-columns: 180px auto;
	}

	/deep/ .no-nbs-file {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		.icon {
			font-size: 100px;
		}
	}
}
</style>