// utils/request.js

// 基础配置
const BASE_URL = 'http://106.52.165.122:8080'; // 后端接口地址
const TIMEOUT = 10000; // 请求超时时间

// 请求方法枚举（可选，提高可读性）
const METHOD = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	DELETE: 'DELETE'
};

/**
 * 封装的请求方法
 * @param {String} url 接口地址，如 '/auth/login'
 * @param {Object} options 请求配置 { method, data, showLoading, showError }
 * @returns {Promise}
 */
function request(url, options = {}) {
	return new Promise((resolve, reject) => {
		const {
			method = METHOD.POST,
				data = {},
				showLoading = true,
				showError = true
		} = options;

		// 显示 loading
		if (showLoading) {
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
		}

		// 获取 token
		const token = uni.getStorageSync('token');

		// 构造请求头
		const headers = {
			'Content-Type': 'application/json'
		};

		if (token) {
			headers['Authorization'] = `Bearer ${token}`;
		}

		// 发起请求
		uni.request({
			url: BASE_URL + url,
			method: method,
			data: method === METHOD.GET ? data : JSON.stringify(data), // GET 参数直接传，其他方法传 JSON
			header: headers,
			timeout: TIMEOUT,
			success: (res) => {
				// 隐藏 loading
				if (showLoading) {
					uni.hideLoading();
				}

				const {
					code,
					message,
					data: responseData
				} = res.data;

				// 通用业务逻辑状态码处理
				if (code === 200) {
					resolve(responseData); // 只返回 data 部分，方便使用
				} else {
					// 业务错误，如 400, 401, 403, 404
					const errorMsg = message || '请求失败';
					if (showError) {
						uni.showToast({
							title: errorMsg,
							icon: 'none',
							duration: 2000
						});
					}

					// 特殊状态码处理，比如 token 过期跳登录
					if (code === 401) {
						// 清除本地 token 和用户信息
						uni.removeStorageSync('token');
						uni.removeStorageSync('userInfo');
						uni.reLaunch({
							url: '/pages/login/login' // 跳转到登录页
						});
					}

					reject({
						code,
						message,
						data: responseData
					});
				}
			},
			fail: (err) => {
				// 隐藏 loading
				if (showLoading) {
					uni.hideLoading();
				}

				const errorMsg = '网络异常，请检查网络连接';
				if (showError) {
					uni.showToast({
						title: errorMsg,
						icon: 'none'
					});
				}

				reject(err);
			}
		});
	});
}

// 为了简化调用，提供常用方法的别名
const http = {
	get: (url, data, options) => request(url, {
		...options,
		method: METHOD.GET,
		data
	}),
	post: (url, data, options) => request(url, {
		...options,
		method: METHOD.POST,
		data
	}),
	put: (url, data, options) => request(url, {
		...options,
		method: METHOD.PUT,
		data
	}),
	delete: (url, data, options) => request(url, {
		...options,
		method: METHOD.DELETE,
		data
	})
};

export default http;
// 如果你喜欢，也可以直接 export request 函数