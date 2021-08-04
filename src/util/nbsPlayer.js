import { ref } from 'vue';

export default () => {
	const audioContext = new window.AudioContext();
	const instruments = [];
	const masterVolume = ref(0.1);

	const calcPitch = (key) => {
		return 2 ** ((key - 45) / 12);
	};

	const addInstrument = async (name, buffer, icon) => {
		instruments.push({
			name,
			arrayBuffer: await audioContext.decodeAudioData(buffer),
			icon
		});
	};

	const playNote = (nbs, note) => {
		const instrument = audioContext.createBufferSource();

		if (!instruments[note.instrument]) {
			return;
		}

		instrument.buffer = instruments[note.instrument].arrayBuffer;
		instrument.playbackRate.value = calcPitch(note.key);

		// Note
		const notePanning = new StereoPannerNode(audioContext, {pan: (note.panning - 100) / 100});
		const noteVolume = new GainNode(audioContext, {gain: note.velocity / 100});
		// Layer
		const layerPanning = new StereoPannerNode(audioContext, {pan: (nbs.layers[note.layer].stereo - 100) / 100});
		const layerVolume = new GainNode(audioContext, { gain: nbs.layers[note.layer].volume });
		// Master
		const masterVolumeGain = new GainNode(audioContext, { gain: masterVolume.value / 100 });

		instrument
			// Note
			.connect(noteVolume)
			.connect(notePanning)
			// Layer
			.connect(layerPanning)
			.connect(layerVolume)
			// Master
			.connect(masterVolumeGain)
			// Output
			.connect(audioContext.destination);

		instrument.start();
	};

	const playTick = (nbs, tick) => {
		if (nbs.songLength < tick) return false;

		for (const layer of nbs.layers) {
			if (layer.notes[tick]) playNote(nbs, layer.notes[tick]);
		}

		return true;
	};

	const getInterval = (nbs) => 1000 / (nbs.song.tempo / 100);

	return {
		playTick,
		playNote,
		addInstrument,
		getInterval,
		masterVolume,
		instruments
	};
};

export const instruments = [
	'harp',
	'dbass',
	'bdrum',
	'sdrum',
	'click',
	'guitar',
	'flute',
	'bell',
	'icechime',
	'xylobone',
	'iron_xylophone',
	'cow_bell',
	'didgeridoo',
	'bit',
	'banjo',
	'pling'
];
