<template>
	<view class="login-container">
		<!-- 标题 -->
		<view class="title">用手机号注册</view>

		<!-- 用户头像上传 -->
		<view class="user-avatar-section" @click="chooseAvatar">
			<image :src="avatarUrl" mode="aspectFill" class="user-avatar" referrerpolicy="no-referrer" />
			<view class="upload-text">设置头像</view>
			<input type="file" ref="avatarInput" accept="image/*" style="display:none;" @change="onAvatarChange" />
		</view>

		<!-- 注册表单 -->
		<view class="form-container">
			<view class="form-item">
				<text class="label">用户名：</text>
				<input class="input" placeholder="请输入您的用户名" placeholder-class="placeholder" v-model="username" />
			</view>

			<view class="form-item">
				<text class="label">国家/地区：</text>
				<text class="fixed-country">中国大陆 (+86)</text>
			</view>

			<view class="form-item">
				<text class="label">手机号：</text>
				<input class="input" type="number" maxlength="11" placeholder="请填写手机号码" placeholder-class="placeholder"
					v-model="phone" />
			</view>

			<view class="form-item">
				<text class="label">密码：</text>
				<input class="input" password placeholder="请填写密码" placeholder-class="placeholder" v-model="password" />
			</view>
		</view>

		<!-- 协议区域 -->
		<view class="agreement">
			<checkbox-group @change="checkboxChange">
				<label class="checkbox">
					<checkbox :checked="isAgree" color="#b8863a" value="agree" />
					<text class="checkbox-text">我已阅读并同意《软件许可及服务协议》</text>
				</label>
			</checkbox-group>
		</view>

		<!-- 按钮区域 -->
		<view class="button-container">
			<button class="submit-btn" :class="{ disabled: !isAgree }" :disabled="!isAgree"
				@click="submitRegister">{{ isUploading ? '上传中...' : '同意并继续' }}</button>
			<button class="back-btn" @click="goBack">返回</button>
		</view>
	</view>
</template>

<script>
	import {
		register
	} from '@/utils/api.js';
	export default {
		data() {
			return {
				// form: {
				// 	username: '',
				// 	password: '',
				// 	phone: ''.
				// }
				avatarUrl: '/static/默认头像.png', // 默认头像路径
				username: '',
				phone: '',
				password: '',
				isAgree: false,
				isUploading: false, // 上传状态标志
			}
		},
		methods: {
			// 选择头像
			// chooseAvatar() {
			// 	// 使用 uni.chooseImage API 选择图片
			// 	uni.chooseImage({
			// 		count: 1, // 最多选择一张
			// 		sizeType: ['compressed'], // 可以指定是原图还是压缩图
			// 		sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机
			// 		success: (res) => {
			// 			const tempFilePaths = res.tempFilePaths;
			// 			if (tempFilePaths.length > 0) {
			// 				this.avatarUrl = tempFilePaths[0];
			// 				// 可以在这里调用上传头像的方法
			// 				// this.uploadAvatar(tempFilePaths[0]);
			// 			}
			// 		},
			// 		fail: (err) => {
			// 			console.error('选择图片失败', err);
			// 			uni.showToast({
			// 				title: '选择图片失败，请重试',
			// 				icon: 'none'
			// 			});
			// 		}
			// 	});
			// },

			// 处理文件输入变化（备选方案，如果需要直接使用 input 方式）
			// onAvatarChange(e) {
			// 	const file = e.detail.files[0];
			// 	if (file) {
			// 		// 使用 FileReader 读取文件并显示预览
			// 		const reader = new FileReader();
			// 		reader.onload = (event) => {
			// 			this.avatarUrl = event.target.result;
			// 		};
			// 		reader.readAsDataURL(file);
			// 		// 可以在这里调用上传头像的方法
			// 		// this.uploadAvatar(file);
			// 	}
			// },

			// // 上传头像（模拟上传，实际开发中需要对接后端接口）
			// uploadAvatar(avatarFile) {
			// 	this.isUploading = true;
			// 	// 模拟上传过程，实际开发中使用 uni.uploadFile
			// 	uni.showLoading({
			// 		title: '上传中...',
			// 	});

			// 	// 假装上传耗时 2 秒
			// 	setTimeout(() => {
			// 		uni.hideLoading();
			// 		this.isUploading = false;
			// 		uni.showToast({
			// 			title: '头像上传成功',
			// 			icon: 'success'
			// 		});
			// 	}, 2000);

			/*
			// 实际上传示例（需要后端接口支持）
			uni.uploadFile({
			  url: 'https://your-backend-api.com/upload-avatar', // 替换为后端上传接口
			  filePath: avatarFile.path,
			  name: 'avatar',
			  formData: {
			    'user': 'test'
			  },
			  success: (uploadFileRes) => {
			    const data = JSON.parse(uploadFileRes.data);
			    if (data.success) {
			      uni.showToast({
			        title: '头像上传成功',
			        icon: 'success'
			      });
			      // 保存头像 URL 到服务器，通常会返回新的头像 URL
			      // this.avatarUrl = data.url;
			    } else {
			      uni.showToast({
			        title: data.message || '头像上传失败',
			        icon: 'none'
			      });
			    }
			  },
			  fail: (err) => {
			    console.error('上传失败', err);
			    uni.showToast({
			      title: '头像上传失败',
			      icon: 'none'
			    });
			  },
			  complete: () => {
			    this.isUploading = false;
			  }
			});
			*/
			// },

			// 复选框状态变化
			checkboxChange(e) {
				this.isAgree = e.detail.value.length > 0;
			},

			// 提交注册
			async submitRegister() {
				if (!this.isAgree) {
					uni.showToast({
						title: '请先同意协议',
						icon: 'none'
					});
					return;
				}

				// 简单表单验证
				if (!this.username.trim()) {
					uni.showToast({
						title: '请输入用户名',
						icon: 'none'
					});
					return;
				}

				if (!this.phone.trim()) {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					});
					return;
				}

				if (this.phone.length !== 11) {
					uni.showToast({
						title: '请输入有效的11位手机号',
						icon: 'none'
					});
					return;
				}

				if (!this.password.trim()) {
					uni.showToast({
						title: '请输入密码',
						icon: 'none'
					});
					return;
				}
				// 检查密码格式：8-20位，且包含大写字母、小写字母和数字
				const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/;
				if (!passwordRegex.test(this.password)) {
					uni.showToast({
						title: '密码格式不正确，需为8-20位且包含大小写字母和数字',
						icon: 'none'
					});
					return;
				}

				try {
					// 2. 调用注册接口，只传 username、phone、password
					const res = await register({
						username: this.username,
						phone: this.phone,
						password: this.password,
						// 注意：avatar 和 其它非必填字段暂时不传
					});

					// 3. 注册成功
					console.log('注册成功：', res);
					uni.showToast({
						title: '注册成功',
						icon: 'success'
					});

					// 4. 跳转到登录页
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/login/login'
						});
					}, 1500);

				} catch (error) {
					// 5. 错误提示已由 utils/request.js 自动处理（如 toast 弹出）
					console.error('注册失败：', error);
				}
				// 如果头像未上传，可以选择上传头像或者暂存头像路径
				// 这里假设头像已经上传，avatarUrl 是服务器返回的头像 URL
				// 如果头像未上传，可以在这里调用上传头像的方法
				// if (this.avatarUrl !== '/static/默认头像.png') {
				// 	// 调用上传头像方法
				// 	// this.uploadAvatar(this.avatarFile);
				// 	// 为了演示，我们假设上传已经完成
				// 	this.isUploading = true;
				// 	uni.showToast({
				// 		title: '头像上传中...',
				// 		icon: 'loading'
				// 	});
				// 	setTimeout(() => {
				// 		this.isUploading = false;
				// 		// 假设上传成功，继续注册流程
				// 		this.finalizeRegistration();
				// 	}, 2000);
				// } else {
				// 	// 使用默认头像，继续注册流程
				// 	this.finalizeRegistration();
				// }
			},

			// // 完成注册流程（模拟）
			// async finalizeRegistration() {
			// 	// 模拟注册过程，实际开发中使用 uni.request 提交数据到后端
			// 	uni.showLoading({
			// 		title: '注册中...'
			// 	});
			// 	try {
			// 		const res = await register(this.form);
			// 	}
			// // 假装网络请求，2秒后模拟成功
			// setTimeout(() => {
			// 	uni.hideLoading();
			// 	uni.showToast({
			// 		title: '注册成功',
			// 		icon: 'success',
			// 		duration: 1500,
			// 		success: () => {
			// 			// 注册成功后跳转到登录页
			// 			setTimeout(() => {
			// 				uni.navigateTo({
			// 					url: '/pages/login/login'
			// 				});
			// 			}, 1500);
			// 		}
			// 	});
			// }, 2000);
			// },

			// 返回上一页
			goBack() {
				uni.navigateBack();
			}
		},
	}
</script>

<style lang="scss" scoped>
	.login-container {
		min-height: 100vh;
		padding: 140rpx 60rpx 0;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #FAF4F0;
		/* 米黄色背景 */
	}

	.title {
		font-size: 36rpx;
		color: #5f371e;
		font-weight: bold;
		margin-bottom: 40rpx;
	}

	.user-avatar-section {
		position: relative;
		width: 150rpx;
		height: 150rpx;
		margin-bottom: 40rpx;
	}

	.user-avatar {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		object-fit: cover;
	}

	.upload-text {
		position: absolute;
		bottom: 10rpx;
		width: 100%;
		text-align: center;
		background-color: rgba(0, 0, 0, 0.4);
		color: #fff;
		padding: 8rpx 0;
		border-bottom-left-radius: 90rpx;
		border-bottom-right-radius: 90rpx;
		font-size: 20rpx;
	}

	.form-container {
		width: 90%;
		background-color: #fff;
		border-radius: 20rpx;
		padding: 10rpx 40rpx;
		margin-bottom: 30rpx;
	}

	.form-item {
		display: flex;
		align-items: center;
		padding: 25rpx 0;
		border-bottom: 1rpx solid #f0f0f0;
	}

	.form-item:last-child {
		border-bottom: none;
	}

	.label {
		width: 160rpx;
		font-size: 28rpx;
		color: #5f371e;
	}

	.input {
		flex: 1;
		font-size: 28rpx;
		color: #333;
	}

	.placeholder {
		color: #bbb;
	}

	.fixed-country {
		flex: 1;
		font-size: 28rpx;
		color: #666;
	}

	/* 协议样式 */
	.agreement {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 40rpx;
	}

	.checkbox {
		display: flex;
		align-items: center;
		margin-bottom: 10rpx;
	}

	.checkbox-text {
		font-size: 26rpx;
		color: #666;
		margin-left: 15rpx;
	}

	.agreement-desc {
		font-size: 24rpx;
		color: #999;
		text-align: center;
	}

	/* 按钮样式 */
	.button-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.submit-btn {
		width: 70%;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 30rpx;
		color: #fff;
		background-color: #5f371e;
		border-radius: 40rpx;
		margin-bottom: 30rpx;
		font-weight: bold;
	}

	.submit-btn.disabled {
		color: #5f371e;
		background-color: #fff;
		border: 1rpx solid #5f371e;
	}

	.back-btn {
		width: 70%;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 30rpx;
		color: #5f371e;
		background-color: #fff;
		border: 1rpx solid #5f371e;
		border-radius: 40rpx;
		font-weight: bold;
	}
</style>