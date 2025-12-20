<template>
	<view class="modify-password-container">
		<!-- 猫咪头像 -->
		<view class="avatar-section">
			<image class="cat-avatar" src="/static/默认头像.png" mode="aspectFill"></image>
		</view>

		<!-- 表单区域 -->
		<view class="form-section">
			<!-- 旧密码输入框 -->
			<view class="input-item">
				<input class="password-input" :type="showOldPassword ? 'text' : 'password'" v-model="oldPassword"
					placeholder="请输入旧密码" placeholder-class="placeholder" maxlength="20" />
				<view class="eye-icon" @tap="togglePasswordVisibility('old')">
					<image class="eye-image"
						:src="showOldPassword ? '/static/icons/preview-open.png' : '/static/icons/preview-close.png'"
						mode="aspectFit"></image>
				</view>
			</view>

			<!-- 新密码输入框 -->
			<view class="input-item">
				<input class="password-input" :type="showNewPassword ? 'text' : 'password'" v-model="newPassword"
					placeholder="请输入新密码" placeholder-class="placeholder" maxlength="20" />
				<view class="eye-icon" @tap="togglePasswordVisibility('new')">
					<image class="eye-image"
						:src="showNewPassword ? '/static/icons/preview-open.png' : '/static/icons/preview-close.png'"
						mode="aspectFit"></image>
				</view>
			</view>

			<!-- 确认密码输入框 -->
			<view class="input-item">
				<input class="password-input" :type="showConfirmPassword ? 'text' : 'password'"
					v-model="confirmPassword" placeholder="请再次输入新密码" placeholder-class="placeholder" maxlength="20" />
				<view class="eye-icon" @tap="togglePasswordVisibility('confirm')">
					<image class="eye-image"
						:src="showConfirmPassword ? '/static/icons/preview-open.png' : '/static/icons/preview-close.png'"
						mode="aspectFit"></image>
				</view>
			</view>

			<!-- 忘记密码按钮 -->
			<view class="forgot-password" @tap="handleForgotPassword">
				<text class="forgot-text">忘记密码</text>
			</view>
		</view>

		<!-- 修改按钮 -->
		<view class="button-section">
			<view class="modify-button" :class="{ disabled: !canSubmit }" @tap="handleModify">
				<text class="button-text">修改</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		changePassword
	} from '@/utils/api.js'
	import {
		ref,
		computed
	} from 'vue'
	// 密码数据
	const oldPassword = ref('')
	const newPassword = ref('')
	const confirmPassword = ref('')

	// 控制密码显示/隐藏
	const showOldPassword = ref(false)
	const showNewPassword = ref(false)
	const showConfirmPassword = ref(false)

	// 切换密码可见性
	const togglePasswordVisibility = (type) => {
		if (type === 'old') {
			showOldPassword.value = !showOldPassword.value
		} else if (type === 'new') {
			showNewPassword.value = !showNewPassword.value
		} else if (type === 'confirm') {
			showConfirmPassword.value = !showConfirmPassword.value
		}
	}

	// 验证表单是否可以提交
	const canSubmit = computed(() => {
		return oldPassword.value.trim() !== '' &&
			newPassword.value.trim() !== '' &&
			confirmPassword.value.trim() !== '' &&
			newPassword.value === confirmPassword.value
	})

	// 处理修改密码
	const handleModify = async () => {
		if (!canSubmit.value) {
			if (newPassword.value !== confirmPassword.value) {
				uni.showToast({
					title: '两次输入的新密码不一致',
					icon: 'none',
					duration: 2000
				})
			} else {
				uni.showToast({
					title: '请填写所有密码信息',
					icon: 'none',
					duration: 2000
				})
			}
			return
		}
		// 强化校验 —— 按照后端要求：新密码 8-20 位，包含大小写字母和数字
		const newPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/
		if (!newPasswordRegex.test(newPassword.value)) {
			uni.showToast({
				title: '新密码必须为8-20位，且包含大小写字母和数字',
				icon: 'none',
				duration: 2000
			})
			return
		}

		try {
			uni.showLoading({
				title: '修改中...',
				mask: true
			})
			// 调用修改密码 API
			await changePassword({
				oldPassword: oldPassword.value,
				newPassword: newPassword.value
			})
			uni.hideLoading()
			uni.showToast({
				title: '密码修改成功',
				icon: 'success',
				duration: 2000
			})
			// 清空表单
			oldPassword.value = ''
			newPassword.value = ''
			confirmPassword.value = ''

			// 延迟返回上一页
			setTimeout(() => {
				uni.reLaunch({
					url: '/pages/my/my'
				})
			}, 1500)
		} catch (error) {
			uni.hideLoading()
			// 错误已在 request.js 中统一 toast 提示，比如 400, 401, 403 等
			// 可根据需要在这里额外处理
			console.error('修改密码失败：', error)
		}
	}

	// 处理忘记密码
	const handleForgotPassword = () => {
		uni.navigateTo({
			url: '/pages/forget-passward/forget-passward'
		});
	}
</script>

<style scoped lang="scss">
	.modify-password-container {
		min-height: 100vh;
		background-color: #FAF5F0;
		/* 浅米色背景 */
		padding: 60rpx 40rpx 40rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	/* 猫咪头像样式 */
	.avatar-section {
		width: 200rpx;
		height: 200rpx;
		margin-bottom: 60rpx;
	}

	.cat-avatar {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
		background-color: #FFFFFF;
	}

	/* 表单区域样式 */
	.form-section {
		width: 80%;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		padding: 30rpx 30rpx;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
		margin-bottom: 40rpx;
	}

	.input-item {
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid #E8DCCF;
		padding: 30rpx 0;
		position: relative;

		&:last-child {
			border-bottom: none;
		}
	}

	.password-input {
		flex: 1;
		height: 40rpx;
		font-size: 32rpx;
		color: #333333;
		padding-right: 20rpx;
	}

	.placeholder {
		font-size: 32rpx;
		color: #999999;
	}

	.eye-icon {
		width: 60rpx;
		height: 60rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		transition: all 0.3s;
		cursor: pointer;

		&:active {
			background-color: rgba(0, 0, 0, 0.05);
		}
	}

	.eye-image {
		width: 40rpx;
		height: 40rpx;
	}

	/* 忘记密码按钮 */
	.forgot-password {
		display: flex;
		justify-content: flex-end;
		margin-top: 20rpx;
		padding: 20rpx 0;
	}

	.forgot-text {
		font-size: 28rpx;
		color: #5f371e;
		/* 棕色 */
		font-weight: 500;
		padding: 10rpx 20rpx;
		border-radius: 8rpx;
		transition: all 0.3s;

		&:active {
			background-color: rgba(158, 121, 97, 0.1);
		}
	}

	/* 修改按钮 */
	.button-section {
		width: 90%;
		padding: 0 20rpx;
	}

	.modify-button {
		width: 100%;
		height: 90rpx;
		background-color: #5f371e;
		border-radius: 16rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s;
		box-shadow: 0 4rpx 12rpx rgba(158, 121, 97, 0.3);

		&.disabled {
			background-color: #9b9b9b;
			box-shadow: none;
		}

		&:active:not(.disabled) {
			transform: translateY(2rpx);
			box-shadow: 0 2rpx 8rpx rgba(158, 121, 97, 0.3);
		}
	}

	.button-text {
		font-size: 34rpx;
		color: white;
		font-weight: 500;
		letter-spacing: 2rpx;
	}
</style>