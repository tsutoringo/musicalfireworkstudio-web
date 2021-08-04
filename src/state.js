import { reactive, computed } from 'vue';

export default function getState () {
	const state = reactive({
		playing: false,
		curretPlaying: null,
		playingTick: 0,
		nbs: null
	});

	state.loaded = computed(() => {
		return !!state.nbs;
	});

	return state;
}
