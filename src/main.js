import { createApp, nextTick, ref } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import getState from './state.js';
import useNBSPlayer, { instruments } from './util/nbsPlayer.js';

const nbsPlayer = useNBSPlayer();

nextTick(async () => {
	for (const instrument of instruments) {
		const arrayBuffer = await (await fetch(`/assets/sounds/${instrument}.ogg`)).arrayBuffer();
		await nbsPlayer.addInstrument(instrument, arrayBuffer, `/assets/img/${instrument}.png`);
	}
});

createApp(App)
	.use(router)
	.provide('state', getState())
	.provide('player', nbsPlayer)
	.provide('massSize', ref(40))
	.mount('#app');
