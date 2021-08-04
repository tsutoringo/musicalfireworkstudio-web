import binaryParseHelper from './binaryParseHelper.js';

const nbsParser = (buffer) => {
	const { readInt8, readInt16, readInt32, readString } = binaryParseHelper(buffer);

	const oldSongLength = readInt16();
	const version = readInt8();

	let nbs = {};

	if (!oldSongLength) {

		// PART 1: HEADER

		nbs = {
			openNBS: true,
			version,
			vanillaInstrumentCount: readInt8(),
			songLength: readInt16(),
			layerCount: readInt16(),
			song: {
				name: readString(),
				author: readString(),
				originalAuthor: readString(),
				description: readString(),
				tempo: readInt16(),
			},
			autoSaving: !!readInt8(),
			autoSavingDuration: readInt8(),
			timeSignature: readInt8(),
			minuteSpent: readInt32(),
			leftClicks: readInt32(),
			rightClicks: readInt32(),
			noteBlocksAdded: readInt32(),
			noteBlocksRemoved: readInt32(),
			MIDISchematicFileName: readString(),
			loop: {
				enable: !!readInt8(),
				maxCount: readInt8()
			},
			LoopStartTick: readInt16()
		};

		// PART 2: NOTE BLOCKS

		const notes = [];
		let tickCount = -1;

		for (;;) {
			let layer = -1;
			const jumpsToTheNextTick = readInt16();

			if (jumpsToTheNextTick === 0) break;

			tickCount += jumpsToTheNextTick;

			for (;;) {
				const jumpsToTheNextLayer = readInt16();
				layer += jumpsToTheNextLayer;

				if (jumpsToTheNextLayer === 0) break;

				const note = {
					jumpsToTheNextTick,
					jumpsToTheNextLayer,
					tick: tickCount,
					layer,
					instrument: readInt8(),
					key: readInt8(),
					velocity: readInt8(),
					panning: readInt8(),
					pitch: readInt16(true)
				};

				notes.push(note);
			}
		}
		
		const layers = [];

		for (let i=0; i<nbs.layerCount; i++) {
			layers.push({
				name: readString(),
				lock: !!readInt8(),
				volume: readInt8(),
				stereo: readInt8(),
				notes: []
			});
		}
		
		nbs.layers = layers;
		
		for (const note of notes) {
			nbs.layers[note.layer].notes[note.tick] = note;
		}

		// PART 4: CUSTOM INSTRUMENTS

		const customInstrumentsCount = readInt8();
		const customInstruments = [];

		for (let i=0; i<customInstrumentsCount; i++) {
			customInstruments.push({
				name: readString(),
				soundFile: readString(),
				soundPitch: readInt8(),
				pressKey: readInt8()
			});
		}

		nbs.customInstruments = customInstruments;
	} else {
		// TODO: 古いバージョンにも対応させる
	}

	return nbs;
};

export default nbsParser;
