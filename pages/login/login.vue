<template>
	<view class="login-container">
		<!-- 顶部logo -->
		<view class="logo">
			<image src="/static/logo.png" mode="aspectFit"></image>
		</view>

		<!-- 输入框区域 -->
		<view class="form-area">
			<view class="input-row">
				<text class="label">手机号：</text>
				<input class="input" type="number" placeholder="请输入您的手机号" v-model="phone" />
			</view>
			<view class="input-row">
				<text class="label">密码：</text>
				<input class="input" password placeholder="请输入您的密码" v-model="password" />
			</view>
			<!-- 操作按钮区 -->
			<view class="action-buttons">
				<button class="brown-button" @click="onForgotPassword">忘记密码</button>
				<button class="brown-button" @click="onRegister">注册</button>
			</view>
		</view>

		<!-- 登录按钮 -->
		<button class="login-btn" @click="handleLogin">登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				password: ''
			};
		},
		methods: {
			handleLogin() {
				// TODO: 调用 member A 的 auth.js 登录接口
				console.log('登录：', this.phone, this.password);
				// 成功后跳转首页或内容列表页
				if (this.phone && this.password) {
					uni.switchTab({
						url: '/pages/home/home'
					});
				} else {
					uni.showToast({
						title: '请输入手机号和密码',
						icon: 'none'
					});
				}
			},
			onForgotPassword() {
				uni.navigateTo({
					url: '/pages/forget-passward/forget-passward'
				});
			},
			onRegister() {
				uni.navigateTo({
					url: '/pages/register/register'
				});
			}
		}
	};
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

	.logo {
		width: 200rpx;
		height: 200rpx;
		margin-bottom: 60rpx;
	}

	.logo image {
		width: 100%;
		height: 100%;
	}

	.form-area {
		background-color: #fff;
		border-radius: 20rpx;
		padding: 40rpx;

		.input-row {
			display: flex;
			align-items: center;
			margin-bottom: 30rpx;
			position: relative;

			&:last-child {
				margin-bottom: 0;
			}

			&::before {
				// 伪元素也嵌套进来
				content: '';
				position: absolute;
				left: 0;
				bottom: 0;
				width: 100%;
				height: 1rpx;
				background-color: #f0f0f0;
			}

			.label {
				width: 140rpx;
				font-size: 32rpx;
				color: #5f371e;
				text-align: right;
				font-weight: bold; // 粗体
			}

			.input {
				flex: 1;
				height: 80rpx;
				padding: 0 20rpx;
				border-radius: 8rpx;
				font-size: 28rpx;
			}
		}

		.action-buttons {
			display: flex;
			// justify-content: space-between;
			margin: 10rpx 10rpx;
			color: #fff;
			width: 100%;
			max-width: 500rpx;
			gap: 266rpx;
		}

		/* 棕色圆角按钮 */
		.brown-button {
			background-color: #5f371e;
			border-radius: 20rpx;
			height: 50rpx;
			line-height: 50rpx;
			color: #fff;
			font-size: 22rpx;
		}
	}



	.login-btn {
		width: 40%;
		max-width: 500rpx;
		background-color: #5f371e;
		/* 棕色按钮 */
		color: #fff;
		border-radius: 50rpx;
		height: 88rpx;
		line-height: 88rpx;
		font-size: 34rpx;
		margin-top: 60rpx;
		font-weight: bold; // 粗体
	}
</style>