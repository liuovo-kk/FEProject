<template>
	<view class="login-container">
		<!-- 标题 -->
		<view class="title">忘记密码</view>

		<!-- 设置头像 -->
		<view class="user-avatar-section">
			<image :src="avatarUrl" mode="aspectFill" class="user-avatar" referrerpolicy="no-referrer" />
		</view>

		<!-- 找回密码表单 -->
		<view class="form-container">
			<view class="form-item">
				<text class="label">手机号：</text>
				<input class="input" type="number" maxlength="11" placeholder="请填写手机号码" placeholder-class="placeholder"
					v-model="phone" />
			</view>

			<view class="form-item">
				<text class="label">验证码：</text>
				<input class="input code-input" type="number" maxlength="6" placeholder="请填写验证码"
					placeholder-class="placeholder" v-model="code" />
				<button class="get-code-btn" :disabled="isCounting"
					@click="getCode">{{countdown > 0 && countdown < 60 ? countdown + 's' : '获取验证码'}}</button>
			</view>

			<view class="form-item">
				<text class="label">密码：</text>
				<input class="input" password placeholder="请填写新密码" placeholder-class="placeholder"
					v-model="newPassword" />
			</view>
		</view>

		<!-- 按钮区域 -->
		<view class="button-container">
			<button class="submit-btn" @click="submitReset">{{ isSubmitting ? '提交中...' : '确认' }}</button>
			<button class="back-btn" @click="goBack">返回</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatarUrl: '/static/默认头像.png', // 默认头像路径
				phone: '',
				code: '',
				newPassword: '',
				isSubmitting: false, // 提交状态标志
				isCounting: false, // 验证码倒计时标志
				countdown: 60 // 验证码倒计时秒数
			}
		},
		methods: {
			// 获取验证码
			getCode() {
				// 简单的手机格式校验
				if (!/^1\d{10}$/.test(this.phone)) {
					uni.showToast({
						title: '请输入正确的手机号码',
						icon: 'none'
					});
					return;
				}

				// 开始倒计时
				this.isCounting = true;
				this.countdown = 60;

				// 发送验证码请求（这里只是模拟）
				uni.showToast({
					title: '验证码已发送',
					icon: 'success'
				});

				// 倒计时
				const timer = setInterval(() => {
					if (this.countdown <= 1) {
						clearInterval(timer);
						this.isCounting = false;
						return;
					}
					this.countdown--;
				}, 1000);
			},

			// 提交重置密码
			submitReset() {
				// 表单验证
				if (!this.phone.trim()) {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					});
					return;
				}

				if (!/^1\d{10}$/.test(this.phone)) {
					uni.showToast({
						title: '请输入有效的11位手机号',
						icon: 'none'
					});
					return;
				}

				if (!this.code.trim()) {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none'
					});
					return;
				}

				if (!this.newPassword.trim()) {
					uni.showToast({
						title: '请输入密码',
						icon: 'none'
					});
					return;
				}

				// 密码长度校验
				if (this.newPassword.length < 6) {
					uni.showToast({
						title: '密码长度至少6位',
						icon: 'none'
					});
					return;
				}

				// 提交表单
				this.isSubmitting = true;
				uni.showLoading({
					title: '提交中...',
				});

				// 模拟API请求
				setTimeout(() => {
					uni.hideLoading();
					this.isSubmitting = false;
					uni.showToast({
						title: '密码已重置',
						icon: 'success',
						success: () => {
							// 重置成功后跳转到登录页
							setTimeout(() => {
								uni.navigateTo({
									url: '/pages/login/login'
								});
							}, 1500);
						}
					});
				}, 1500);
			},

			// 返回登录页
			goBack() {
				uni.navigateBack();
			}
		}
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

	.form-container {
		width: 100%;
		background-color: #fff;
		border-radius: 20rpx;
		padding: 10rpx;
		margin-bottom: 70rpx;
	}

	.form-item {
		display: flex;
		align-items: center;
		padding: 25rpx 20rpx;
		border-bottom: 1rpx solid #f0f0f0;
		position: relative;
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

	/* 验证码按钮样式 */
	.code-input {
		margin-right: 200rpx;
	}

	.get-code-btn {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		font-size: 26rpx;
		color: #5f371e;
		background: transparent;
		border: none;
		padding: 10rpx;
		line-height: normal;
	}

	.get-code-btn::after {
		border: none;
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