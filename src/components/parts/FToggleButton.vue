<template>
	<f-button @click="toggle">
		<slot name="on"  v-if="modelValue" />
		<slot name="off" v-else />
	</f-button>
</template>

<script>
import FButton from './FButton.vue';

export default {
	props: {
		modelValue: Boolean
	},
	components: {
		FButton
	},
	emits: ['update:modelValue'],
	setup (props, { emit }) {
		const toggle = () => {
			emit('update:modelValue', !props.modelValue);
		};

		return {
			toggle
		};
	}
};
</script>
