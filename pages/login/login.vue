<template>
	<view class="login-container" :style="{ backgroundColor: '#E6F7FF' }">
		<!-- 顶部原生状态栏，UniApp 自动显示 -->

		<!-- 标题区 -->
		<view class="header">
			<text class="title">欢迎回来</text>
			<text class="subtitle">请登录您的账户</text>
		</view>

		<!-- 圆形头像 -->
		<view class="avatar-wrapper">
			<image class="avatar" src="/static/images/头像.png" mode="aspectFill"></image>
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
		</view>

		<!-- 链接区 -->
		<view class="links">
			<navigator url="/pages/register/register" open-type="navigate">注册</navigator>
			<text class="link-spacer">|</text>
			<text class="link" @click="onForgotPassword">忘记密码</text>
		</view>

		<!-- 登录按钮 -->
		<button class="login-btn" type="primary" @click="handleLogin">登录</button>
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
			},
			onForgotPassword() {
				uni.showToast({
					title: '忘记密码功能待开发',
					icon: 'none'
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.login-container {
		min-height: 100vh;
		padding: 80rpx 60rpx 0;
		box-sizing: border-box;
	}

	.header {
		text-align: center;
		margin-bottom: 60rpx;

		.title {
			display: block;
			font-size: 48rpx;
			font-weight: bold;
			color: #333;
		}

		.subtitle {
			display: block;
			font-size: 28rpx;
			color: #666;
			margin-top: 20rpx;
		}
	}

	.avatar-wrapper {
		display: flex;
		justify-content: center;
		margin-bottom: 60rpx;

		.avatar {
			width: 160rpx;
			height: 160rpx;
			border-radius: 50%;
			border: 4rpx solid #fff;
			box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
		}
	}

	.form-area {
		background-color: #fff;
		border-radius: 16rpx;
		padding: 40rpx;

		.input-row {
			display: flex;
			align-items: center;
			margin-bottom: 30rpx;

			.label {
				width: 140rpx;
				font-size: 32rpx;
				color: #333;
			}

			.input {
				flex: 1;
				height: 80rpx;
				padding: 0 20rpx;
				border: 1rpx solid #ddd;
				border-radius: 8rpx;
				font-size: 30rpx;
			}
		}
	}

	.links {
		display: flex;
		justify-content: flex-end;
		margin: 20rpx 0 60rpx;
		font-size: 28rpx;
		color: #007AFF;

		.link-spacer {
			margin: 0 16rpx;
			color: #999;
		}

		.link {
			color: #007AFF;
		}
	}

	.login-btn {
		background-color: #007AFF;
		color: #fff;
		border-radius: 8rpx;
		height: 88rpx;
		line-height: 88rpx;
		font-size: 34rpx;
	}
</style>