const BASE_URL = 'http://localhost:5001/api/' //接口地址
// const BASE_URL = 'http://192.168.43.24:5001/'
export const http = (options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			header: {
			    'content-type': 'application/json'  //重点一application/json
			  },
			method: options.method || 'GET',
			data: options.data || {},
			success: (res) => {
				if (res.data.code != '200') {
					// return uni.showToast({
					// 	icon: 'loading',
					// 	title:'获取数据失败' 
					// }) 
				}
				resolve(res)
			},
			fail: (err) => {
				return uni.showToast({
					icon: 'loading',
					title: '请求失败'
				})
				reject(err)
			}
		})
	})
}
