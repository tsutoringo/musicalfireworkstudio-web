<template>
	<span
		class="google-material-icon"
		:class="[`material-icons${type ? '-' + type : ''}`, icon]">
		{{icon}}
	</span>
</template>
<script>
export default {
	name: 'GIcon',
	props: {
		icon: {
			type: String,
			required: true
		},
		type: {
			type: String,
			default: ''
		}
	},
	setup () {

	}
};
</script>

<style lang="scss" scoped>
.google-material-icon {
	display: inline-block;
	vertical-align: middle;
}
</style>