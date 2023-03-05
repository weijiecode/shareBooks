<template>
	<view class="content">
		<u-subsection fontSize="24" mode="button" :list="['推荐','图书','书单']" :current="current" @change="sectionChange">
		</u-subsection>
		<view class="hot" v-if="current==0">
			<view @click="todetail(bookData[0])" class="imgboxtop" style="background-color: rgb(255 124 0 / 30%);">
				<view class="boxcontent">
					<view class="one">
						<image class="bookimg" :src="bookData[0].bookphoto" mode=""></image>
						<view class="booktext">
							<view class="booktitle">
								{{bookData[0].bookname}}
							</view>
							<view class="booktime">
								{{bookData[0].createtime.split(' ')[0]}}
							</view>
						</view>
					</view>
					<view class="two">
						{{bookData[0].bookthink}}
					</view>
					<view class="three">
						<u-icon name="share-fill" color="#3a3a3a" size="28"></u-icon>
						<view class="username">
							来自用户 {{bookData[0].nickname}} 的分享
						</view>
					</view>
				</view>
			</view>
			<view class="row">
				<view class="leftbox">
					<view @click="todetail(bookData[1])" class="imgboxl"
						style="background-color: rgb(237 237 208 / 30%);">
						<view class="boxcontent">
							<view class="one">
								<image class="bookimg" :src="bookData[1].bookphoto" mode=""></image>
								<view class="booktext">
									<view class="booktitle">
										{{bookData[1].bookname}}
									</view>
									<view class="booktime">
										{{bookData[1].createtime.split(' ')[0]}}
									</view>
								</view>
							</view>
							<view class="two">
								{{bookData[1].bookthink}}
							</view>
							<view class="three">
								<u-icon name="share-fill" color="#3a3a3a" size="28"></u-icon>
								<view class="username">
									来自用户 {{bookData[0].nickname}} 的分享
								</view>
							</view>
						</view>
					</view>
					<view @click="todetail(bookData[2])" class="imgboxr"
						style="background-color: rgb(76 76 70 / 30%);">
						<view class="boxcontent">
							<view class="one">
								<image class="bookimg" :src="bookData[2].bookphoto" mode=""></image>
								<view class="booktext">
									<view class="booktitle">
										{{bookData[2].bookname}}
									</view>
									<view class="booktime">
										{{bookData[2].createtime.split(' ')[0]}}
									</view>
								</view>
							</view>
							<view class="two">
								{{bookData[2].bookthink}}
							</view>
							<view class="three">
								<u-icon name="share-fill" color="#3a3a3a" size="28"></u-icon>
								<view class="username">
									来自用户 {{bookData[2].nickname}} 的分享
								</view>
							</view>
						</view>
					</view>
					<view @click="todetail(bookData[8])" class="imgboxl" style="background-color: rgb(163 221 97);">
						<view class="boxcontent">
							<view class="one">
								<image class="bookimg" :src="bookData[8].bookphoto" mode=""></image>
								<view class="booktext">
									<view class="booktitle">
										{{bookData[8].bookname}}
									</view>
									<view class="booktime">
										{{bookData[8].createtime.split(' ')[0]}}
									</view>
								</view>
							</view>
							<view class="two">
								{{bookData[8].bookthink}}
							</view>
							<view class="three">
								<u-icon name="share-fill" color="#3a3a3a" size="28"></u-icon>
								<view class="username">
									来自用户 {{bookData[8].nickname}} 的分享
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="rightbox">
					<view @click="todetail(bookData[3])" class="imgboxr"
						style="background-color: rgb(249 38 52 / 30%);">
						<view class="boxcontent">
							<view class="one">
								<image class="bookimg" :src="bookData[3].bookphoto" mode=""></image>
								<view class="booktext">
									<view class="booktitle">
										{{bookData[3].bookname}}
									</view>
									<view class="booktime">
										{{bookData[3].createtime.split(' ')[0]}}
									</view>
								</view>
							</view>
							<view class="two">
								{{bookData[3].bookthink}}
							</view>
							<view class="three">
								<u-icon name="share-fill" color="#3a3a3a" size="28"></u-icon>
								<view class="username">
									来自用户 {{bookData[0].nickname}} 的分享
								</view>
							</view>
						</view>
					</view>
					<view @click="todetail(bookData[7])" class="imgboxl" style="background-color: rgb(152 198 235);">
						<view class="boxcontent">
							<view class="one">
								<image class="bookimg" :src="bookData[7].bookphoto" mode=""></image>
								<view class="booktext">
									<view class="booktitle">
										{{bookData[7].bookname}}
									</view>
									<view class="booktime">
										{{bookData[7].createtime.split(' ')[0]}}
									</view>
								</view>
							</view>
							<view class="two">
								{{bookData[7].bookthink}}
							</view>
							<view class="three">
								<u-icon name="share-fill" color="#3a3a3a" size="28"></u-icon>
								<view class="username">
									来自用户 {{bookData[4].nickname}} 的分享
								</view>
							</view>
						</view>
					</view>
					<view @click="todetail(bookData[9])" class="imgboxr" style="background-color: rgb(218 207 237);">
						<view class="boxcontent">
							<view class="one">
								<image class="bookimg" :src="bookData[9].bookphoto" mode=""></image>
								<view class="booktext">
									<view class="booktitle">
										{{bookData[9].bookname}}
									</view>
									<view class="booktime">
										{{bookData[9].createtime.split(' ')[0]}}
									</view>
								</view>
							</view>
							<view class="two">
								{{bookData[9].bookthink}}
							</view>
							<view class="three">
								<u-icon name="share-fill" color="#3a3a3a" size="28"></u-icon>
								<view class="username">
									来自用户 {{bookData[9].nickname}} 的分享
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="bottomtext">
				到底啦~
			</view>
			<view class="zhanwei">

			</view>
		</view>
		<view class="book" v-if="current==1">
			<view @click="todetail(item)" class="onebox" v-for="item in bookData" :key="item.id">
				<view class="leftimg">
					<image class="subbookimg" :src="item.bookphoto" mode=""></image>
				</view>
				<view class="righttext">
					<view class="rname">
						{{item.bookname}}
					</view>
					<view class="rtime">
						{{item.createtime.split(' ')[0]}}
					</view>
					<view class="subthree">
						<u-icon name="share-fill" color="#3a3a3a" size="28"></u-icon>
						<view class="username">
							用户 {{item.nickname}} 的分享
						</view>
					</view>
				</view>
			</view>
			<view class="bottomtext">
				到底啦~
			</view>
			<view class="zhanwei">

			</view>
		</view>
		<view class="list" v-if="current==2">
			<view @click="todetaillist(item)" class="subonebox" v-for="item in booklist" :key="item.id">
				<view class="righttext">
					<view class="rname">
						{{item.title}}
					</view>
					<view class="rtime" style="color: #03a9f4;">
						共{{item.booklist.length}}本
					</view>
					<view class="subthree1">
						<u-icon name="share-fill" color="#3a3a3a" size="28"></u-icon>
						<view class="username">
							用户 {{item.nickname}} 的分享
						</view>
					</view>
				</view>
			</view>
			<view class="zhanwei">

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		mounted() {
			// 页面加载判断是否有登录，未登录则跳转到登录页面
			if (!uni.getStorageSync("username")) {
				uni.navigateTo({
					url: "/pages/login/login"
				})
			}
		},
		data() {
			return {
				// 顶部菜单索引
				current: 0,
				// 图书数据
				bookData: [{
					bookphoto: "",
					bookname: "",
					bookrate: "",
					bookthink: "",
					createtime: "",
					username: ""
				}, {
					bookphoto: "",
					bookname: "",
					bookrate: "",
					bookthink: "",
					createtime: "",
					username: ""
				}, {
					bookphoto: "",
					bookname: "",
					bookrate: "",
					bookthink: "",
					createtime: "",
					username: ""
				}, {
					bookphoto: "",
					bookname: "",
					bookrate: "",
					bookthink: "",
					createtime: "",
					username: ""
				}, {
					bookphoto: "",
					bookname: "",
					bookrate: "",
					bookthink: "",
					createtime: "",
					username: ""
				}, {
					bookphoto: "",
					bookname: "",
					bookrate: "",
					bookthink: "",
					createtime: "",
					username: ""
				}, {
					bookphoto: "",
					bookname: "",
					bookrate: "",
					bookthink: "",
					createtime: "",
					username: ""
				}, {
					bookphoto: "",
					bookname: "",
					bookrate: "",
					bookthink: "",
					createtime: "",
					username: ""
				}, {
					bookphoto: "",
					bookname: "",
					bookrate: "",
					bookthink: "",
					createtime: "",
					username: ""
				}, {
					bookphoto: "",
					bookname: "",
					bookrate: "",
					bookthink: "",
					createtime: "",
					username: ""
				}],
				// 书单数据
				booklist: []
			}
		},
		mounted() {
			this.getBookData()
			this.getListData()
		},
		methods: {
			// 跳转顶部菜单
			sectionChange(index) {
				this.current = index
			},
			// 获取图书数据
			async getBookData() {
				const res = await this.$http({
					url: "getbooks",
					method: "GET"
				})
				if (res.data.code === 200) {
					this.bookData = res.data.data
				}
				console.log(this.bookData)
			},
			// 获取书单数据
			async getListData() {
				const res = await this.$http({
					url: "getlist",
					method: "GET"
				})
				if (res.data.code === 200) {
					this.booklist = res.data.data
					this.booklist.forEach(item => {
						item.booklist = JSON.parse(item.booklist)
					})
				}
				console.log(this.booklist)
			},
			// 点击具体图书
			todetail(item) {
				console.log(item)
				uni.navigateTo({
					url: "/pages/sharedetail/sharedetail?id=" + item.id + "&type=1&nickname=" + item.nickname
				})

			},
			// 点击具体书单
			todetaillist(item) {
				console.log(item)
				uni.navigateTo({
					url: "/pages/sharedetail/sharedetail?id=" + item.id + "&type=2&nickname=" + item.nickname
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hot {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.imgboxtop {
		margin: 20rpx;
		border-radius: 12px;
	}

	.bookimg {
		width: 90rpx !important;
		height: 120rpx !important;
		margin: 20rpx 0 0 20rpx;
	}

	.subbookimg {
		width: 120rpx !important;
		height: 145rpx !important;
		margin-left: 20rpx;
		margin-right: 30rpx;
	}

	.boxcontent {
		backdrop-filter: blur(34px);
		border-radius: 5px;
		font-family: sans-serif;
		height: 100%;
		border-radius: 12px;
	}

	.one {
		display: flex;
		align-items: center;
	}

	.booktext {
		display: flex;
		flex-direction: column;
		margin-left: 30rpx;
		font-size: 12px;
		color: #3a3a3a;
	}

	.two {
		font-size: 12px;
		color: #3a3a3a;
		padding: 0 20rpx;
		margin: 20rpx;
	}

	.row {
		margin: 20rpx;
		display: flex;
	}

	.three {
		font-size: 12px;
		display: flex;
		justify-content: center;
		color: #3a3a3a;
		margin-bottom: 20rpx;
		padding-bottom: 15rpx;
	}

	.imgboxl,
	.imgboxr {
		border-radius: 12px;
		margin: 20rpx 8rpx;
	}

	.leftbox,
	.rightbox {
		display: flex;
		flex-direction: column;
		width: 50%;
	}

	.imgboxl {
		.two {
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 3;
			overflow: hidden;
		}
	}

	.imgboxr {
		.two {
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 6;
			overflow: hidden;
		}
	}

	.username {
		margin-left: 10rpx;
	}

	.onebox {
		display: flex;
		padding: 16rpx;
		border-bottom: 1px solid #c9c9c9;
	}

	.subonebox {
		padding: 0 24rpx;
		border-bottom: 1px solid #c9c9c9;
		margin-top: 10rpx;
	}

	.righttext {
		display: flex;
		flex-direction: column;
	}

	.rname {
		font-weight: bold;
	}

	.rtime {
		font-size: 13px;
		color: #787575;
	}

	.subthree {
		font-size: 12px;
		display: flex;
		justify-content: end;
		color: #3a3a3a;
		margin-top: 40rpx;
	}

	.subthree1 {
		font-size: 12px;
		display: flex;
		justify-content: end;
		color: #3a3a3a;
		padding-bottom: 15rpx;
	}

	.zhanwei {
		width: 100%;
		height: 100rpx;
	}

	.bottomtext {
		margin-top: 20rpx;
		font-size: 14px;
		text-align: center;
		color: #787575;
	}
</style>
