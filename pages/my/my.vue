<template>
	<view class="my-container">
		<!-- 用户信息区域 -->
		<view class="user-info-section">
			<!-- 左侧：头像和信息 -->
			<view class="user-left">
				<!-- 头像 -->
				<view class="avatar-section">
					<image class="avatar" src="/static/默认头像.png" mode="aspectFill"></image>
				</view>

				<!-- 昵称和专业信息 -->
				<view class="user-details">
					<view class="username">软工第七组</view>
					<view class="major">software engineering</view>
				</view>
			</view>

			<!-- 右侧：功能按钮 -->
			<view class="action-buttons">
				<view class="button-item modify-password" @tap="navigateToModifyPassword">
					<text class="button-text">修改密码</text>
				</view>
				<view class="button-item logout" @tap="handleLogout">
					<text class="button-text">退出登录</text>
				</view>
			</view>
		</view>

		<!-- 选项卡区域 -->
		<view class="tab-section">
			<view class="tab-item" :class="{ active: activeTab === 'published' }" @tap="switchTab('published')">
				我发布的
			</view>
			<view class="tab-item" :class="{ active: activeTab === 'liked' }" @tap="switchTab('liked')">
				赞过
			</view>
		</view>

		<!-- 内容列表区域 -->
		<scroll-view class="content-list" scroll-y :refresher-enabled="true" :refresher-triggered="refreshing"
			@refresherrefresh="onRefresh">
			<!-- 发布内容列表 -->
			<view v-if="activeTab === 'published'" class="content-section">
				<!-- 显示一张图片的内容 -->
				<view v-if="publishedList.length > 0" class="content-item">
					<!-- 内容图片 -->
					<view class="content-image-container">
						<image class="content-image" src="/static/robot-arm.jpg" mode="aspectFill" @tap="previewImage">
						</image>
					</view>

					<!-- 内容描述 -->
					<view class="content-desc">未来科技发展</view>
				</view>

				<!-- 空状态 -->
				<view v-if="publishedList.length === 0" class="empty-state">
					<view class="empty-text">还没有发布内容</view>
				</view>
			</view>

			<!-- 赞过的内容列表 -->
			<view v-if="activeTab === 'liked'" class="content-section">
				<!-- 显示一张图片的内容 -->
				<view v-if="likedList.length > 0" class="content-item">
					<view class="content-image-container">
						<image class="content-image" src="/static/code-matrix.jpg" mode="aspectFill"
							@tap="previewLikedImage"></image>
					</view>

					<view class="content-desc">计算机的未来</view>
				</view>

				<!-- 空状态 -->
				<view v-if="likedList.length === 0" class="empty-state">
					<view class="empty-text">还没有点赞内容</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
	import {
		logout
	} from '@/utils/api.js';
	import {
		ref,
		reactive,
		onMounted
	} from 'vue'

	// 当前激活的选项卡
	const activeTab = ref('published')

	// 加载状态
	const refreshing = ref(false)

	// 发布的内容列表
	const publishedList = ref([{
		id: 1,
		image: '/static/robot-arm.jpg',
		description: '未来科技发展'
	}])

	// 点赞的内容列表
	const likedList = ref([{
		id: 101,
		image: '/static/code-matrix.jpg',
		description: '计算机的未来'
	}])

	// 切换选项卡
	const switchTab = (tab) => {
		activeTab.value = tab
	}

	// 下拉刷新
	const onRefresh = () => {
		refreshing.value = true

		// 模拟数据刷新
		setTimeout(() => {
			refreshing.value = false
			uni.showToast({
				title: '刷新成功',
				icon: 'success'
			})
		}, 1500)
	}

	// 跳转到修改密码页面
	const navigateToModifyPassword = () => {
		uni.navigateTo({
			url: '/pages/modify-password/modify-password'
		})
	}

	// 退出登录
	const handleLogout = () => {
		uni.showModal({
			title: '提示',
			content: '确定要退出登录吗？',
			confirmColor: '#DD514C',
			success: async (res) => {
				if (res.confirm) {
					try {
						// 调用后端退出接口
						await logout(); // 这里会自动带上 token 请求 /api/auth/logout

						// 清除本地存储的用户状态
						uni.removeStorageSync('token');
						uni.removeStorageSync('userInfo');

						// 提示用户
						uni.showToast({
							title: '退出成功',
							icon: 'success',
							duration: 1500
						});

						// 延时跳转到登录页
						setTimeout(() => {
							uni.reLaunch({
								url: '/pages/login/login'
							});
						}, 1500);
					} catch (error) {
						console.error('退出登录请求失败：', error);

						// 即使后端退出接口调用失败，也继续清理本地状态，保证前端退出
						uni.removeStorageSync('token');
						uni.removeStorageSync('userInfo');

						uni.showToast({
							title: '退出成功（本地）',
							icon: 'success',
							duration: 1500
						});

						setTimeout(() => {
							uni.reLaunch({
								url: '/pages/login/login'
							});
						}, 1500);
					}
				}
			}
		})
	}

	// 预览图片
	const previewImage = () => {
		uni.previewImage({
			urls: ['/static/robot-arm.jpg']
		})
	}

	// 预览点赞的图片
	const previewLikedImage = () => {
		uni.previewImage({
			urls: ['/static/code-matrix.jpg']
		})
	}

	// 页面加载
	onMounted(() => {
		console.log('我的页面加载完成')
	})
</script>

<style scoped lang="scss">
	.my-container {
		min-height: 100vh;
		background-color: #f5f5f7;
	}

	/* 用户信息区域样式 - 修改为左右布局 */
	.user-info-section {
		background-color: #ffffff;
		padding: 40rpx 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1rpx solid #f0f0f0;
	}

	.user-left {
		display: flex;
		align-items: center;
		flex: 1;
	}

	.avatar-section {
		width: 120rpx;
		height: 120rpx;
		margin-right: 30rpx;
	}

	.avatar {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		border: 2rpx solid #f0f0f0;
	}

	.user-details {
		flex: 1;
	}

	.username {
		font-size: 40rpx;
		font-weight: bold;
		color: #333333;
		margin-bottom: 10rpx;
	}

	.major {
		font-size: 28rpx;
		color: #666666;
	}

	/* 功能按钮区域样式 - 修改为垂直排列 */
	.action-buttons {
		display: flex;
		flex-direction: column;
		gap: 20rpx;
		width: 130rpx;
	}

	.button-item {
		width: 100%;
		height: 60rpx;
		border-radius: 8rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		font-weight: 500;
		transition: all 0.2s;

		&:active {
			opacity: 0.8;
		}
	}

	.modify-password {
		background-color: #5f371e;
		color: #fff;
		// border: 1rpx solid #e0e0e0;
	}

	.logout {
		background-color: #5f371e;
		color: white;

	}

	.button-text {
		font-size: 24rpx;
		font-weight: 500;
	}

	/* 选项卡样式 - 修改为棕色 */
	.tab-section {
		display: flex;
		background-color: #ffffff;

	}

	.tab-item {
		flex: 1;
		text-align: center;
		padding: 30rpx 0;
		font-size: 32rpx;
		color: #666666;
		position: relative;
		transition: all 0.3s;
		border-radius: 8rpx 8rpx 0 0;

		&.active {
			color: #ffffff;
			/* 棕色 */
			font-weight: 500;
			background-color: #5F371E;

			&::after {
				content: '';
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 6rpx;
				/* 棕色下划线 */
				border-radius: 3rpx 3rpx 0 0;
			}
		}

		&:not(.active) {
			background-color: #f5f5f5;
			color: #999;
		}
	}

	/* 内容列表区域样式 - 修改为双列流式布局 */
	.content-list {
		height: calc(100vh - 320rpx);
		background-color: #f5f5f7;
	}

	.content-section {
		padding: 20rpx 15rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.content-item {
		background-color: white;
		border-radius: 16rpx;
		overflow: hidden;
		box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
		width: calc(50% - 10rpx);
		margin-bottom: 20rpx;
	}

	.content-image-container {
		width: 100%;
		height: 320rpx;
		overflow: hidden;
	}

	.content-image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.content-desc {
		padding: 20rpx 20rpx;
		font-size: 28rpx;
		color: #333333;
		line-height: 1.4;
		min-height: 80rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	/* 空状态样式 */
	.empty-state {
		padding: 100rpx 30rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		background-color: white;
		border-radius: 16rpx;
		min-height: 200rpx;
		width: 100%;
	}

	.empty-text {
		font-size: 32rpx;
		color: #999999;
		font-weight: 400;
	}
</style>