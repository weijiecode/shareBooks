<template>
	<view class="content">
		<view class="photo">
			<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple :maxCount="1">
			</u-upload>
		</view>
		<view class="bookcontent">
			<u--input style="margin: 40rpx 0;" inputAlign="center" v-model="bookname" placeholder="输入你推荐的书名"
				border="bottom" clearable></u--input>
			<u--textarea height="250" maxlength="500" v-model="bookthink" placeholder="输入你的感想" count></u--textarea>

			<u--form labelPosition="left">
				<u-form-item labelWidth="160" label="图书评分" borderBottom>
					<u-rate :value="bookrate" active-color="#ffaa00" size="50" gutter="20"></u-rate>
				</u-form-item>
				<u-form-item @click="showtype=true" labelWidth="160" label="图书类别" borderBottom>
					<u--input v-model="booktype" disabled disabledColor="#ffffff" placeholder="请选择图书类别" border="none">
					</u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item labelWidth="160" label="阅读时间" borderBottom>
					<u-slider v-model="booktime" min="1" max="60"></u-slider>{{booktime+'(天)'}}
				</u-form-item>
			</u--form>
			<u-picker itemHeight="90" @cancel="showtype=false" @confirm="typeconfirm" :show="showtype" :columns="columns"></u-picker>
			<u-button type="primary" :plain="true" style="width: 45%;" text="分享图书"></u-button>
		</view>

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
					['类别一', '类别二', '类别三', '类别三', '类别三', '类别三', '类别三']
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
						url: 'http://192.168.2.21:7001/upload', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
						}
					});
				})
			},
			// 图书类别确定
			typeconfirm(e) {
				console.log(e)
				this.booktype = e.value[0]
				this.showtype = false
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
		background-color: #F8F8F8;
		align-items: center;
	}

	.photo {
		margin-top: 30rpx;
	}

	::v-deep .u-upload__button {
		width: 240rpx !important;
		height: 300rpx !important;
	}

	::v-deep .u-upload__status {
		width: 240rpx !important;
		height: 300rpx !important;
	}

	::v-deep .u-upload__wrap__preview__image {
		width: 240rpx !important;
		height: 300rpx !important;
		border-radius: 100%;
		box-shadow: 0 0 0 3px #f3efef;
	}
	
	::v-deep .u-slider {
		width: 400rpx;
	}

	::v-deep .u-textarea--radius[data-v-09988a29] {
		// height: inherit !important;
	}

	.photo {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 20rpx;
	}

	.bookcontent {
		width: 700rpx;
		// height: 400rpx;
	}
</style>
