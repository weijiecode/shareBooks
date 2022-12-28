<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		mounted() {
			// 页面加载判断是否有登录，未登录则跳转到登录页面
			if(!uni.getStorageSync("username")) {
				uni.navigateTo({
					url: "/pages/login/login"
				})
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
