<template>
	<view class="content">
		<view class="bookcontent">
			<view class="listtitle">
				<u-icon name="bookmark-fill" style="margin-right: 30rpx;" color="#2979ff" size="40"></u-icon>
				<u--input style="margin: 40rpx 0;" v-model="title" placeholder="输入你书单的标题" border="bottom" clearable>
				</u--input>
			</view>
			</u--input>
			<view class="row" v-for="(item, index) in booknames" :key="item.csty">
				<view class="co" :style="item.csty"></view>
				<u--input style="margin: 40rpx 0;" v-model="item.value" placeholder="输入你推荐的书名" border="bottom" clearable>
				</u--input>
				<u-icon v-if="booknames.length-1 === index && index>1" @click="poplist" name="minus-circle-fill" color="#ff0000" size="40"></u-icon>
			</view>
			<u-icon style="display: flex;justify-content: center;" @click="addlist" name="plus-circle-fill" color="#2979ff" size="85"></u-icon>
			<!-- <u-button @click="addlist" type="primary" :plain="true" style="width: 45%;" text="继续添加"></u-button> -->
			<u-button @click="show=true" type="primary" :plain="true" style="width: 45%;margin-top: 90rpx;" text="分享书单"></u-button>
		</view>
		<!-- 消息提示组件 -->
		<u-toast ref="uToast"></u-toast>
		<u-modal title="是否分享到广场" confirmText="分享" cancelText="取消" :show="show" :showCancelButton="true"
			@confirm="confirm" @cancel="show=false" ref="uModal" :asyncClose="true"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 消息确认框
				show: false,
				// 书单列表,
				title: "",
				booknames: [{
					value: "",
					csty: this.getColor(),
				},{
					value: "",
					csty: this.getColor(),
				},{
					value: "",
					csty: this.getColor(),
				}]
			}
		},
		// mounted() {
		// 	this.colors.forEach((item,index) => {
		// 		this.colors[index]=this.getColor()
		// 	})
		// 	this.booknames.forEach((item,index) => {
		// 		item.csty = this.colors[index]
		// 	})
		// 	console.log(this.booknames)
		// },
		methods: {
			// 生成随机颜色方法
			getColor() {
				const r = Math.floor(Math.random() * 256);
				const g = Math.floor(Math.random() * 256);
				const b = Math.floor(Math.random() * 256);
				return `border: 4px solid rgb(${r},${g},${b});`;
			},
			// 添加书单
			addlist() {
				this.booknames.push({
					value: "",
					csty: this.getColor()
				})
			},
			// 删除书单
			poplist() {
				this.booknames.pop()
			},
			// 提交分享
			async confirm() {
				this.show = false
				let iscontent = false
				// 遍历查询是否有未填的input
				this.booknames.forEach(item => {
					if(item.value=='') {
						iscontent = true
					}
				})
				if (iscontent) {
					this.$refs.uToast.show({
						type: 'error',
						message: "输入框请填写完整后重试",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
					})
				} else {
					const username = uni.getStorageSync("username")
					const res = await this.$http({
						url: "sharelist",
						method: "POST",
						data: {
							username: username,
							title: this.title,
							booklist: JSON.stringify(this.booknames)
						}
					})
					console.log(res)
					if (res.data.code === 200) {
						this.$refs.uToast.show({
							type: 'success',
							message: "分享书单成功",
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
						})

						setTimeout(() => {
							uni.switchTab({
								url: "/pages/sharecenter/sharecenter"
							})
						}, 1000)
					} else {
						this.$refs.uToast.show({
							type: 'error',
							message: "分享书单失败，请重试",
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
						})
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		align-items: center;
	}

	.row {
		display: flex;
		align-items: center;
	}

	.co {
		width: 8px;
		height: 8px;
		background-color: #fff;
		border-radius: 50%;
		margin-right: 30rpx;
	}
	
	.listtitle {
		display: flex;
		align-items: center;
	}
</style>
