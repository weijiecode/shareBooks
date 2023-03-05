<template>
	<view class="content">
		<view class="topimg">
			<image class="bookimg" :src="book.bookphoto" mode=""></image>
			<view class="subcontent">
				<image class="subphoto" :src="book.bookphoto" mode=""></image>
				<view class="rightcontent">
					<view class="bookname">
						{{book.bookname}}
					</view>
					<view class="time">
						{{book.createtime}}
					</view>
				</view>
			</view>
		</view>
		<view class="bookbox">
			<view class="bookcontent">
				{{book.bookthink}}
			</view>
			<view class="bookcontent">
				<view class="subrow">
					<span>类型：</span>{{book.booktype}}
				</view>
				<view class="subrow">
					<span>评分：</span><u-rate :value="book.bookrate" active-color="#ffaa00" size="50" gutter="20"></u-rate>
				</view>
				<view class="subrow">
					<span>阅读时间：</span>{{book.booktime}}天
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(option) {
			console.log(option)
			this.id = option.id
			this.type = option.type
		},
		mounted() {
			if (this.type == 1) {
				this.getBook()
			} else {
				this.getList()
			}
		},
		data() {
			return {
				// 传参
				id: "",
				type: "",
				// 图书数据
				book: "",
				// 书单数据
				list: ""
			}
		},
		methods: {
			// 获取图书详情
			async getBook() {
				const res = await this.$http({
					url: "getbooksdetail",
					method: "POST",
					data: {
						id: this.id * 1
					}
				})
				console.log(res)
				if (res.data.code === 200) {
					this.book = res.data.data[0]
				}
			},
			// 获取书单详情
			async getList() {
				const res = await this.$http({
					url: "getlistdetail",
					method: "POST",
					data: {
						id: this.id * 1
					}
				})
				console.log(res)
				if (res.data.code === 200) {
					this.list = res.data.data[0]
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		height: 100%;
		background-color: #F4F5F7;
	}

	.bookimg {
		position: fixed;
		width: 100%;
		height: 400rpx;
		z-index: 0;
		-webkit-filter: blur(4px);
		filter: blur(7px);
	}

	.subphoto {
		width: 240rpx;
		height: 320rpx;
		padding: 50rpx;
	}

	.subcontent {
		display: flex;
		align-items: center;
	}

	.rightcontent {
		display: flex;
		flex-direction: column;
		z-index: 1;
	}

	.bookname {
		font-size: 24px;
		font-weight: bold;
		color: #fff;
		margin-bottom: 20rpx;
	}

	.time {
		margin-bottom: 160rpx;
		color: #fff;
	}
	
	.bookcontent {
		background-color: #ffffff;
		padding: 36rpx;
		border-radius: 10px;
		width: 85%;
		margin: 18rpx auto;
		display: flex;
		flex-direction: column;
		span {
			color: 	#838383;
		}
	}
	
	.subrow {
		margin: 16rpx 0;
		display: flex;
		align-items: center;
	}
</style>
