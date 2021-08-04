<template>
	<f-flex-wrapper classes="timeline" ref="timelineWrapper">
		<div class="current-time">
			<f-text>{{ state.playingTick }} tick</f-text>
		</div>
		<div
			class="timebar"
			:style="{
				width: `calc(var(--mass-size) * ${state.nbs.songLength})`
			}">
			Timebar
		</div>
		<div class="layers">
			<div class="layer" v-for="(layer, i) in state.nbs.layers" :key="i">
				{{layer.name || `Layer ${i+1}`}}
			</div>
		</div>
		<div class="notes" :style="{
			height: `calc(var(--mass-size) * ${state.nbs.layers.length})`
		}">
			<div class="layer" v-for="(layer, i) in state.nbs.layers" :key="i">
				<template  v-for="(note, j) in layer.notes.slice(viewNotes.start, viewNotes.end)" :key="j">
					<div
						class="note"
						v-if="note"
						:style="{
							left: `calc(var(--mass-size) * ${note.tick})`,
							// backgroundImage: player.instruments[note.instrument] ? `url(${player.instruments[note.instrument].icon})` : ''
						}"
					>
						{{ note.key }}
					</div>
				</template>
				<div class="playing-line" :style="{
					left: `calc(var(--mass-size) * ${state.playingTick})`
				}"></div>
			</div>
		</div>
	</f-flex-wrapper>
</template>

<script>
import { inject, ref, onMounted, reactive, computed } from 'vue';

import FText from '../parts/FText.vue';
import FFlexWrapper from '../parts/FFlexWrapper.vue';

export default {
	name: 'Timeline',
	components: { FFlexWrapper, FText },
	setup () {
		const state = inject('state');
		const player = inject('player');
		const timelineWrapper = ref(null);
		let timeline = computed(() => timelineWrapper.value.$el.querySelector('.timeline'));

		const viewNotes = reactive({
			start: 0,
			end: 0
		});

		const setViewNotes = () => {
			viewNotes.start = Math.floor(timeline.value.scrollLeft / 40);
			viewNotes.end = Math.ceil((timeline.value.scrollLeft + timeline.value.clientWidth) / 40);
		};

		onMounted(() => {
			setViewNotes();
			timeline.value.addEventListener('scroll', () => setViewNotes());
			window.addEventListener('resize', () => setViewNotes());
		});

		return {
			state,
			player,
			timelineWrapper,
			viewNotes,
			setViewNotes
		};
	}
};
</script>

<style lang="scss" scoped>
.timeline {
	position: absolute;
	height: 100%;
	width: 100%;
	left: 0;
	top: 0;

	overflow: scroll;

	>* {
		background-color: white;
	}

	.current-time {
		grid-row: 1 / 2;
		grid-column: 1 / 2;
		position: sticky;
		top: 0;
		left: 0;
		z-index: 10;

		display: flex;
		align-items: center;
		justify-content: center;
	}
	.timebar {
		grid-row: 1 / 2;
		grid-column: 2 / 3;
		position: sticky;
		top: 0;
		z-index: 5;

		display: flex;
		align-items: center;
	}
	.layers {
		grid-row: 2 / 3;
		grid-column: 1 / 2;
		position: sticky;
		left: 0;
		z-index: 5;
		min-height: 100%;

		.layer {
			height: var(--mass-size);
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.notes {
		grid-row: 2 / 3;
		grid-column: 2 / 3;
		z-index: 0;
		min-height: 100%;
		background-image: linear-gradient(
			90deg,
			gray 0%,
			gray 1%,
			transparent 1%,
			transparent 99%,
			gray 99%,
			gray 100%
		);
		background-size: 40px 100%;
		background-repeat: repeat;
		background-attachment: local;
		
		.layer {
			height: var(--mass-size);
			width: 100%;
			position: relative;

			.note {
				position: absolute;
				width: var(--mass-size);
				height: var(--mass-size);
				text-align: center;
				background-size: cover;
				image-rendering: pixelated;

				color: white;
				text-shadow: 0 0 2px black;
			}
		}
	}

	.playing-line {
		position: absolute;
		top: 0;
		background-color: red;
		width: 1px;
		height: 100%;
	}
}
</style>
