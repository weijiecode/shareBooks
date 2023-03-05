<template>
	<view class="content">
		<image class="bookimg" src="../../static/bookbg.png" mode=""></image>
		<view class="photo">
			<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple :maxCount="1">
			</u-upload>
		</view>
		<view class="bookcontent">
			<u--input style="margin: 40rpx 100rpx;" inputAlign="center" v-model="bookname" placeholder="输入你推荐的书名"
				border="bottom" clearable></u--input>
			<u--textarea height="160" style="margin: 40rpx 100rpx;" maxlength="500" v-model="bookthink"
				placeholder="输入你的感想" count></u--textarea>

			<u--form style="width: 70%;display: flex;flex-direction: column;justify-content: center;margin: 0 auto;"
				labelPosition="left">
				<u-form-item labelWidth="160" label="图书评分" borderBottom>
					<u-rate :value="bookrate" active-color="#ffaa00" size="50" gutter="20"></u-rate>
				</u-form-item>
				<u-form-item @click="showtype=true" labelWidth="160" label="图书类别" borderBottom>
					<u--input v-model="booktype" disabled disabledColor="#ffffff" placeholder="请选择图书类别" border="none">
					</u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item labelWidth="140" label="阅读时间" borderBottom>
					<u-slider v-model="booktime" min="1" max="60"></u-slider>{{booktime+'(天)'}}
				</u-form-item>
			</u--form>
			<u-picker itemHeight="90" @cancel="showtype=false" @confirm="typeconfirm" :show="showtype"
				:columns="columns"></u-picker>
			<u-button @click="show=true" type="primary" :plain="true"
				style="width: 45%;position: fixed;bottom: 10px;transform: translateX(50%);" text="分享图书"></u-button>
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
				// 图片存储
				fileList1: [],
				// 书名类别选择器
				showtype: false,
				// 消息确认框
				show: false,
				// 图片
				bookphoto: "",
				// 书名
				bookname: "",
				// 感想
				bookthink: "",
				// 类别
				booktype: "",
				// 评分
				bookrate: 3,
				// 阅读时间
				booktime: 10,
				columns: [
					['文艺作品', '个人传记', '图文写真书', '宣传手册', '专业著作', '专业知识普及读物', '工作稿件结集', '实用类大众图书', '影视同期书']
				],
			}
		},
		methods: {
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'http://localhost:5001/api/photouploadurl',
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
							console.log(res.data)
							this.bookphoto = res.data.slice(1, res.data.length - 1)
							console.log(this.bookphoto)
						}
					});
				})
			},
			// 图书类别确定
			typeconfirm(e) {
				this.booktype = e.value[0]
				this.showtype = false
			},
			// 提交分享
			async confirm() {
				this.show = false
				if (this.bookphoto == '' || this.bookthink == '' || this.booktype == '') {
					this.$refs.uToast.show({
						type: 'error',
						message: "请填写完整后分享",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
					})
				} else {
					const username = uni.getStorageSync("username")
					const res = await this.$http({
						url: "sharebook",
						method: "POST",
						data: {
							username: username,
							bookphoto: this.bookphoto,
							bookname: this.bookname,
							bookthink: this.bookthink,
							bookrate: this.bookrate,
							booktype: this.booktype,
							booktime: this.booktime
						}
					})
					console.log(res)
					if (res.data.code === 200) {
						this.$refs.uToast.show({
							type: 'success',
							message: "分享图书成功",
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
						})
						this.bookphoto = ""
						this.bookname = ""
						this.bookrate = 3
						this.bookthink = ""
						this.booktime = 10
						this.booktype = ""
						setTimeout(() => {
							uni.switchTab({
								url: "/pages/sharecenter/sharecenter"
							})
						}, 1000)
					} else {
						this.$refs.uToast.show({
							type: 'error',
							message: "分享图书失败，请重试",
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
		// background: url(../../static/bookbg.png);
		// background-repeat: no-repeat;
		// background-position: center;
	}

	.photo {
		margin-top: 30rpx;
	}

	::v-deep .u-upload__button {
		width: 160rpx !important;
		height: 180rpx !important;
	}

	::v-deep .u-upload__status {
		width: 160rpx !important;
		height: 180rpx !important;
	}

	::v-deep .u-upload__wrap__preview__image {
		width: 160rpx !important;
		height: 180rpx !important;
		border-radius: 0 !important;
		box-shadow: 0 0 0 3px #f3efef;
	}

	::v-deep .u-slider {
		width: 340rpx;
	}

	::v-deep .u-textarea--radius[data-v-09988a29] {
		// height: inherit !important;
	}

	.photo {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 20rpx;
		z-index: 99;
	}

	.bookcontent {
		width: 560rpx;
		// height: 400rpx;
	}

	.bookimg {
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: -1;
	}

	::v-deep .u-input--square {
		background-color: unset !important;
	}

	::v-deep .u-textarea {
		background-color: unset !important;
	}

	::v-deep .u-textarea__count {
		background-color: unset !important;
	}
</style>
