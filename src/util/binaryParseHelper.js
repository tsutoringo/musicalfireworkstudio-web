export default (ab) => { // Browser
	const arrayBuffer = ab;
	const dv = new DataView(arrayBuffer);
	let pointer = 0;

	const addPointer = (n) => {
		pointer += n;
	};

	const getPointer = () => {
		return pointer;
	};

	const readInt8 = (signed) => {
		const result = signed ? dv.getInt8(pointer) : dv.getUint8(pointer);
		addPointer(1);
		return result;
	};

	const readInt16 = (signed) => {
		const result = signed ? dv.getInt16(pointer, true) : dv.getUint16(pointer, true);
		addPointer(2);
		return result;
	};

	const readInt32 = (signed) => {
		const result = signed ? dv.getInt32(pointer, true) : dv.getUint32(pointer, true);
		addPointer(4);
		return result;
	};

	const readByte = (length) => {
		const sliced = arrayBuffer.slice(pointer, pointer + length);
		addPointer(length);
		return sliced;
	};

	const readString = () => {
		const length = readInt32();
		if (!length) return '';
		const decoder = new TextDecoder();
		return decoder.decode(readByte(length));
	};

	return {
		addPointer,
		readInt8,
		readInt16,
		readInt32,
		readString,
		getPointer
	};
};
