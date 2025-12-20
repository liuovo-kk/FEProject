<template>
	<view class="search-result-page">
		<!-- 搜索栏 - 顶部只保留搜索部分 -->
		<view class="search-header">

			<!-- 搜索框 -->
			<view class="search-box">
				<input class="search-input" type="text" :value="searchKeyword" @input="onInput" @confirm="handleSearch"
					placeholder="请输入" placeholder-class="placeholder-style" focus />
				<!-- 清空按钮 - 有内容时显示 -->
				<view v-if="searchKeyword" class="clear-icon" @tap="clearKeyword">
					✕
				</view>
			</view>
			<!-- 搜索按钮 -->
			<view class="search-btn" @tap="handleSearch">搜索</view>
		</view>


		<!-- 排序标签 -->
		<view class="sort-tabs">
			<view class="sort-item" :class="{ active: activeSort === '最新' }" @tap="switchSort('最新')">
				最新
			</view>
			<view class="sort-item" :class="{ active: activeSort === '综合' }" @tap="switchSort('综合')">
				综合
			</view>
			<view class="sort-item" :class="{ active: activeSort === '最热' }" @tap="switchSort('最热')">
				最热
			</view>
		</view>

		<!-- 内容列表 -->
		<scroll-view class="content-scroll" scroll-y>
			<view class="content-grid">
				<!-- 卡片1: 小狗的朋友 -->
				<view class="content-card">
					<view class="card-image">
						<image src="/static/demo/dog1.jpg" mode="aspectFill" class="image-content"></image>
					</view>
					<view class="card-content">
						<view class="card-title">小狗的朋友</view>
						<view class="like-info">
							<view class="heart-icon">❤️</view>
							<view class="like-count">12</view>
						</view>
					</view>
				</view>

				<!-- 卡片2: 森林中的大象 -->
				<view class="content-card">
					<view class="card-image">
						<image src="/static/demo/elephant.jpg" mode="aspectFill" class="image-content"></image>
					</view>
					<view class="card-content">
						<view class="card-title">森林中的大象</view>
						<view class="like-info">
							<view class="heart-icon">❤️</view>
							<view class="like-count">15</view>
						</view>
					</view>
				</view>

				<!-- 卡片3: 沙滩边的小狗 -->
				<view class="content-card">
					<view class="card-image">
						<image src="/static/demo/dog2.jpg" mode="aspectFill" class="image-content"></image>
					</view>
					<view class="card-content">
						<view class="card-title">沙滩边的小狗</view>
						<view class="like-info">
							<view class="heart-icon">❤️</view>
							<view class="like-count">12</view>
						</view>
					</view>
				</view>

				<!-- 卡片4: 小狗之家 -->
				<view class="content-card">
					<view class="card-image">
						<image src="/static/demo/dog3.jpg" mode="aspectFill" class="image-content"></image>
					</view>
					<view class="card-content">
						<view class="card-title">小狗之家</view>
						<view class="like-info">
							<view class="heart-icon">❤️</view>
							<view class="like-count">22</view>
						</view>
					</view>
				</view>

				<!-- 卡片5: 奔跑的小狗 -->
				<view class="content-card">
					<view class="card-image">
						<image src="/static/demo/dog4.jpg" mode="aspectFill" class="image-content"></image>
					</view>
					<view class="card-content">
						<view class="card-title">奔跑的小狗</view>
						<view class="like-info">
							<view class="heart-icon">❤️</view>
							<view class="like-count">18</view>
						</view>
					</view>
				</view>

				<!-- 卡片6: 被人抚摸的小猫 -->
				<view class="content-card">
					<view class="card-image">
						<image src="/static/demo/cat1.jpg" mode="aspectFill" class="image-content"></image>
					</view>
					<view class="card-content">
						<view class="card-title">被人抚摸的小猫</view>
						<view class="like-info">
							<view class="heart-icon">❤️</view>
							<view class="like-count">25</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue'
	import {
		onLoad
	} from '@dcloudio/uni-app'

	const searchKeyword = ref('')
	const activeFilter = ref('全部')
	const activeSort = ref('最新')

	// 使用 uni-app 的 onLoad 生命周期
	onLoad((options) => {
		if (options && options.keyword) {
			// 解码URL编码的关键词
			try {
				searchKeyword.value = decodeURIComponent(options.keyword)
				console.log('搜索关键词：', searchKeyword.value)
			} catch (e) {
				console.error('解码关键词失败：', e)
				searchKeyword.value = options.keyword
			}
		}
	})

	// 输入框输入事件
	const onInput = (event) => {
		searchKeyword.value = event.detail.value
	}

	// 返回上一页
	const goBack = () => {
		uni.navigateBack()
	}

	// 搜索处理
	const handleSearch = () => {
		if (!searchKeyword.value.trim()) {
			return
		}
		console.log('搜索关键词：', searchKeyword.value)
		// 这里可以重新搜索
		// reloadSearchResults()
	}

	// 清空搜索框
	const clearKeyword = () => {
		searchKeyword.value = ''
	}

	// 切换筛选
	const switchFilter = (filter) => {
		activeFilter.value = filter
		console.log('切换到筛选：', filter)
		// 这里可以根据筛选重新搜索
		// reloadSearchResults()
	}

	// 切换排序
	const switchSort = (sort) => {
		activeSort.value = sort
		console.log('切换到排序：', sort)
		// 这里可以根据排序重新搜索
		// reloadSearchResults()
	}
</script>

<style scoped lang="scss">
	.search-result-page {
		width: 100%;
		min-height: 100vh;
		background-color: #f8f8f8;
		display: flex;
		flex-direction: column;
	}

	/* 搜索栏 - 移除导航栏，搜索栏直接作为顶部 */
	.search-header {
		display: flex;
		align-items: center;
		padding: 20rpx 30rpx;
		background-color: #fff;
		border-bottom: 2rpx solid #f0f0f0;
		height: 100rpx;
		box-sizing: border-box;
	}

	/* 返回按钮 */
	.back-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40rpx;
		height: 60rpx;
		margin-right: 20rpx;
	}

	.back-arrow {
		font-size: 40rpx;
		color: #333;
	}

	/* 搜索框 */
	.search-box {
		flex: 1;
		display: flex;
		align-items: center;
		background-color: #f8f8f8;
		border-radius: 8rpx;
		padding: 0 20rpx;
		margin-right: 20rpx;
		height: 70rpx;
	}

	.search-input {
		flex: 1;
		font-size: 28rpx;
		color: #333;
		height: 100%;
		background-color: transparent;
	}

	.clear-icon {
		padding: 8rpx;
		margin-left: 8rpx;
		font-size: 24rpx;
		color: #999;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* 搜索按钮 */
	.search-btn {
		font-size: 30rpx;
		color: #5F371E;
		font-weight: 500;
		padding: 0 20rpx;
		height: 70rpx;
		line-height: 70rpx;
		white-space: nowrap;
	}

	/* 占位符样式 */
	.placeholder-style {
		color: #999;
		font-size: 28rpx;
	}


	.filter-item {
		flex: 1;
		text-align: center;
		font-size: 28rpx;
		color: #666;
		padding: 15rpx 0;
		border-radius: 8rpx;
		background-color: #f5f5f5;

		&.active {
			background-color: #5F371E;
			color: #fff;
		}
	}

	/* 排序标签 */
	.sort-tabs {
		display: flex;
		padding: 5rpx 30rpx;
		background-color: #fff;
		border-bottom: 2rpx solid #f0f0f0;
	}

	.sort-item {
		flex: 1;
		text-align: center;
		font-size: 28rpx;
		color: #666;
		padding: 15rpx 0;
		position: relative;

		&.active {
			color: #333;
			font-weight: 600;

			&::after {
				content: '';
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
				width: 40rpx;
				height: 4rpx;
				background-color: #5F371E;
				border-radius: 2rpx;
			}
		}
	}

	/* 内容区域 */
	.content-scroll {
		flex: 1;
		background-color: #f8f8f8;
		padding: 20rpx 15rpx;
		box-sizing: border-box;
	}

	.content-grid {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		width: 100%;
	}

	/* 卡片样式 */
	.content-card {
		width: calc(50% - 7.5rpx);
		background-color: #fff;
		border-radius: 12rpx;
		overflow: hidden;
		margin-bottom: 20rpx;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
	}

	.card-image {
		width: 100%;
		height: 320rpx;
		position: relative;
		overflow: hidden;
		background-color: #f0f0f0;
	}

	.image-content {
		width: 100%;
		height: 100%;
		display: block;
	}

	.card-content {
		padding: 20rpx 15rpx;
	}

	.card-title {
		font-size: 28rpx;
		font-weight: 600;
		color: #333;
		line-height: 1.4;
		margin-bottom: 15rpx;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
		min-height: 80rpx;
	}

	/* 点赞信息 */
	.like-info {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 8rpx;
	}

	.heart-icon {
		font-size: 24rpx;
		line-height: 1;
		color: #ff4757;
	}

	.like-count {
		font-size: 24rpx;
		color: #666;
		font-weight: 500;
		line-height: 1;
	}
</style>