<template>
	<view class="content">
		<p class="sharep">今天想分享点什么...</p>
		<view class="btnbox">
			<u-button type="primary" @click="tobook" shape="circle" style="margin-top: 60rpx;width: 40%;" text="图书分享"></u-button>
			<u-button type="primary" @click="tolist" shape="circle" style="margin-top: 60rpx;width: 40%;" text="书单分享"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		mounted() {
			// 页面加载判断是否有登录，未登录则跳转到登录页面
			if (!uni.getStorageSync("username")) {
				uni.navigateTo({
					url: "/pages/login/login"
				})
			}
		},
		onLoad() {

		},
		methods: {
			// 跳转图书分享
			tobook() {
				uni.navigateTo({
					url: "/pages/sharebook/sharebook"
				})
			},
			// 跳转书单分享
			tolist() {
				uni.navigateTo({
					url: "/pages/sharelist/sharelist"
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.btnbox {
		display: flex;
		margin-top: 60rpx;
	}

	.sharep {
		font-size: 30px;
		text-align: center;
		font-weight: bold;
		margin-top: 260rpx;
		color: #5c5c5c;
	}
</style>
