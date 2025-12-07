<template>
	<view class="home-container">
		<!-- 顶部搜索图标 - 左上角黑色放大镜 -->
		<view class="header-section">
			<!-- 使用绝对定位放在右侧 -->
			<view class="search-icon" @tap="navigateToSearch">
				<image src="/static/icons/search_icon.png" mode="widthFix" class="search-image"></image>
			</view>
		</view>

		<!-- 内容卡片区域 - 双列布局 -->
		<scroll-view class="content-list" scroll-y enable-back-to-top>
			<view class="content-grid">
				<!-- 卡片1: 小猫的一天 -->
				<view class="content-card" @tap="navigateToDetail(1)">
					<view class="card-image">
						<view class="image-placeholder"></view>
					</view>
					<view class="card-content">
						<view class="card-title">小猫的一天</view>
						<view class="card-bottom">
							<view class="author-info">
								<view class="author-avatar">吴</view>
								<view class="author-name">小吴</view>
							</view>
							<view class="like-info">
								<view class="heart-icon">❤️</view>
								<view class="like-count">12</view>
							</view>
						</view>
					</view>
				</view>

				<!-- 卡片2: 顶级轿跑 -->
				<view class="content-card" @tap="navigateToDetail(2)">
					<view class="card-image">
						<view class="image-placeholder"></view>
					</view>
					<view class="card-content">
						<view class="card-title">顶级轿跑</view>
						<view class="card-bottom">
							<view class="author-info">
								<view class="author-avatar">未</view>
								<view class="author-name">未知作者</view>
							</view>
							<view class="like-info">
								<view class="heart-icon">❤️</view>
								<view class="like-count">15</view>
							</view>
						</view>
					</view>
				</view>

				<!-- 卡片3: 逛美术馆 -->
				<view class="content-card" @tap="navigateToDetail(3)">
					<view class="card-image">
						<view class="image-placeholder"></view>
					</view>
					<view class="card-content">
						<view class="card-title">逛美术馆</view>
						<view class="card-bottom">
							<view class="author-info">
								<view class="author-avatar">杨</view>
								<view class="author-name">小杨</view>
							</view>
							<view class="like-info">
								<view class="heart-icon">❤️</view>
								<view class="like-count">8</view>
							</view>
						</view>
					</view>
				</view>

				<!-- 卡片4: 化学实验 -->
				<view class="content-card" @tap="navigateToDetail(4)">
					<view class="card-image">
						<view class="image-placeholder"></view>
					</view>
					<view class="card-content">
						<view class="card-title">化学实验</view>
						<view class="card-bottom">
							<view class="author-info">
								<view class="author-avatar">未</view>
								<view class="author-name">未知作者</view>
							</view>
							<view class="like-info">
								<view class="heart-icon">❤️</view>
								<view class="like-count">22</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
	// 跳转到搜索页面
	const navigateToSearch = () => {
		uni.navigateTo({
			url: '/pages/search/search'
		})
	}

	// 跳转到详情页
	const navigateToDetail = (id) => {
		uni.navigateTo({
			url: `/pages/detail/detail?id=${id}`
		})
	}
</script>

<style scoped lang="scss">
	.home-container {
		width: 100%;
		min-height: 100vh;
		background-color: #f5f5f7;
		/* 浅米色背景 */
		padding-top: 100rpx;
		/* 为顶部搜索图标留出空间 */
		box-sizing: border-box;
		position: relative;
	}

	/* 顶部搜索图标 */
	.header-section {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 100rpx;
		/* 高度减小，更简洁 */
		background-color: #f5f5f7;
		/* 浅米色背景 */
		display: flex;
		justify-content: flex-end;
		/* 改为左对齐 */
		align-items: center;
		z-index: 1000;
		box-sizing: border-box;
		padding-right: 30rpx;
		/* 左侧内边距 */
	}

	.search-icon {
		width: 60rpx;
		/* 适当放大 */
		height: 60rpx;
		background: none;
		/* 移除蓝色背景 */
		border: none;
		/* 移除边框 */
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 40rpx;
		/* 放大图标 */
		color: #000000;
		/* 改为纯黑色 */
		font-weight: bold;
		/* 加粗 */
		box-shadow: none;
		/* 移除阴影 */
		transition: all 0.2s ease;
		cursor: pointer;
		/* 鼠标手势 */

		&:active {
			transform: scale(0.9);
			/* 按压时稍微缩小 */
			opacity: 0.7;
			/* 按压时变透明 */
		}
	}

	/* 内容区域 - 双列布局 */
	.content-list {
		width: 100%;
		height: calc(100vh - 100rpx);
		background-color: #f5f5f7;
		padding: 0 15rpx;
		box-sizing: border-box;
	}

	.content-grid {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		width: 100%;
		padding-bottom: 20rpx;
	}

	/* 卡片样式 */
	.content-card {
		width: calc(50% - 7.5rpx);
		background-color: #ffffff;
		border-radius: 12rpx;
		overflow: hidden;
		margin-bottom: 20rpx;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
		transition: transform 0.2s ease, box-shadow 0.2s ease;

		&:active {
			transform: translateY(-2rpx);
			box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
		}
	}

	.card-image {
		width: 100%;
		height: 320rpx;
		background-color: #e8e8e8;
		position: relative;
		overflow: hidden;
		border-bottom: 1rpx solid #f0f0f0;
	}

	.image-placeholder {
		width: 100%;
		height: 100%;
		background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		color: #999;
		font-size: 28rpx;
	}

	.card-content {
		padding: 20rpx 15rpx;
	}

	.card-title {
		font-size: 32rpx;
		font-weight: 600;
		color: #333333;
		line-height: 1.4;
		margin-bottom: 20rpx;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
		min-height: 90rpx;
	}

	/* 卡片底部 - 作者和点赞在同一行 */
	.card-bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 50rpx;
	}

	/* 作者信息 */
	.author-info {
		display: flex;
		align-items: center;
		gap: 12rpx;
	}

	.author-avatar {
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
		background-color: #f0f0f0;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		color: #666666;
		font-weight: 500;
		flex-shrink: 0;
	}

	.author-name {
		font-size: 28rpx;
		color: #666666;
		font-weight: 400;
		line-height: 1.2;
		max-width: 150rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	/* 点赞信息 */
	.like-info {
		display: flex;
		align-items: center;
		gap: 8rpx;
		padding: 8rpx 12rpx;
		border-radius: 20rpx;
		background-color: #f8f8f8;
		min-width: 80rpx;
		justify-content: center;
	}

	.heart-icon {
		font-size: 28rpx;
		line-height: 1;
		color: #ff4757;
	}

	.like-count {
		font-size: 28rpx;
		color: #333333;
		font-weight: 500;
		line-height: 1;
		min-width: 40rpx;
		text-align: center;
	}
</style>