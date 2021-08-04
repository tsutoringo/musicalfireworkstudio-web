<template>
	<router-view/>
</template>
<script>
import { inject, watch, toRefs } from 'vue';

export default {
	name: 'App',
	setup () {
		const state = inject('state');
		const player = inject('player');

		const tick = () => {
			return state.currentPlaying = setInterval(() => {
				if (!player.playTick(state.nbs, state.playingTick)) {
					state.playingTick = 0;
					if (!state.nbs.loop.enable) stop();
				} else {
					state.playingTick++;
				}
			}, player.getInterval(state.nbs));
		};

		watch(toRefs(state).playing, () => {
			if (state.playing) {
				tick();
			} else {
				if (state.currentPlaying) clearInterval(state.currentPlaying);
				state.currentPlaying = null;
			}
		});

		watch(toRefs(state).nbs, () => {
			state.playing = false;
			state.playingTick = 0;
		});
	}
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300&display=swap');

body {
	margin: 0;
}

#app {
	font-family: 'Noto Sans JP', Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}
</style>
