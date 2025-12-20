<template>
	<view class="search-page">
		<!-- 搜索框区域 - 完全按照图片 -->
		<view class="search-header">
			<!-- 搜索框 -->
			<view class="search-box">
				<input class="search-input" type="text" placeholder="请输入" v-model="searchKeyword"
					@confirm="handleSearch" placeholder-class="placeholder-style" focus />
				<view v-if="searchKeyword" class="clear-icon" @tap="clearKeyword">
					✕
				</view>
			</view>
			<view class="search-btn" @tap="handleSearch">搜索</view>
		</view>

		<!-- 内容区域 -->
		<scroll-view class="content-scroll" scroll-y>
			<!-- 历史记录 - 6条 -->
			<view class="history-section" v-if="historyList.length > 0">
				<view class="section-header">
					<view class="section-title">
						<image src="/static/icons/history.png" mode="widthFix" class="icon"></image>
						<text>历史记录</text>
					</view>
				</view>
				<view class="history-list">
					<view class="history-item" v-for="(item, index) in historyList" :key="index"
						@tap="searchFromHistory(item)">
						{{ item }}
					</view>
				</view>
			</view>

			<!-- 分割线 -->
			<view class="divider"></view>

			<!-- 今日热词 - 8个，两列四行 -->
			<view class="hotwords-section">
				<view class="section-header">
					<view class="section-title">
						<image src="/static/icons/fire.png" mode="widthFix" class="icon"></image>
						<text>今日热词</text>
					</view>
				</view>
				<view class="hotwords-list">
					<view class="hotword-item" v-for="(item, index) in hotWords" :key="index"
						@tap="searchFromHotwords(item)">
						{{ item }}
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'

	const searchKeyword = ref('')

	// 历史记录
	const historyList = ref([
		'最美校园实况',
		'长白山照片',
		'清开灵颗粒',
		'电影解说',
		'NBA最新赛况',
		'联机游戏'
	])

	// 今日热词
	const hotWords = ref([
		'校园live音乐节',
		'旅行视频',
		'享受祖国大好河山',
		'今年的第一场雪',
		'南方的冬天',
		'AI最近进展',
	])

	// 搜索处理 - 修改这个方法
	const handleSearch = () => {
		if (!searchKeyword.value.trim()) {
			uni.showToast({
				title: '请输入搜索内容',
				icon: 'none'
			})
			return
		}

		// 添加到历史记录
		addToHistory(searchKeyword.value)

		// 跳转到搜索结果页面
		uni.navigateTo({
			url: `/pages/searchresult/searchresult?keyword=${encodeURIComponent(searchKeyword.value)}`
		})
	}

	// 从历史记录搜索
	const searchFromHistory = (keyword) => {
		searchKeyword.value = keyword
		handleSearch()
	}

	// 从热词搜索
	const searchFromHotwords = (keyword) => {
		searchKeyword.value = keyword
		handleSearch()
	}

	// 清空搜索框
	const clearKeyword = () => {
		searchKeyword.value = ''
	}

	// 添加到历史记录
	const addToHistory = (keyword) => {
		historyList.value = historyList.value.filter(item => item !== keyword)
		historyList.value.unshift(keyword)
		// 保持6条记录
		if (historyList.value.length > 6) {
			historyList.value = historyList.value.slice(0, 6)
		}
	}
</script>

<style scoped lang="scss">
	.search-page {
		height: 100vh;
		background-color: #f5f5f7;
		/* 浅米色背景 */
		display: flex;
		flex-direction: column;
	}

	/* 搜索头部 */
	.search-header {
		display: flex;
		align-items: center;
		padding: 20rpx 30rpx;
		background-color: #f5f5f7;
		border-bottom: 2rpx solid #e8e8e8;
		height: 100rpx;
		box-sizing: border-box;
	}

	/* 搜索框 */
	.search-box {
		flex: 1;
		display: flex;
		align-items: center;
		background-color: #fff;
		border-radius: 35rpx;
		padding: 0 20rpx;
		margin: 0 20rpx;
		height: 70rpx;
		border: 1rpx solid #ddd;
	}

	.search-input {
		flex: 1;
		font-size: 28rpx;
		color: #333;
		height: 100%;
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
		color: #000;
		font-weight: 400;
		padding: 0 8rpx;
		height: 70rpx;
		line-height: 70rpx;
		background-color: transparent;
		border: none;
	}

	/* 内容区域 */
	.content-scroll {
		flex: 1;
		padding: 0 30rpx;
		background-color: #f5f5f7;
	}

	/* 分割线 */
	.divider {
		height: 1rpx;
		background-color: #e8e8e8;
		margin: 10rpx 0 30rpx 0;
	}

	/* 区域标题 */
	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 40rpx 0 30rpx 0;
		padding-bottom: 10rpx;
	}

	.section-title {
		font-size: 32rpx;
		color: #5F371E;
		font-weight: 600;
		display: flex;
		align-items: center;
	}

	/* 历史记录列表 */
	.history-list {
		display: flex;
		flex-wrap: wrap;
		gap: 20rpx;
		margin-bottom: 10rpx;
	}

	.history-item {
		background-color: #fff;
		border-radius: 36rpx;
		padding: 14rpx 28rpx;
		font-size: 26rpx;
		color: #666;
		max-width: calc(50% - 10rpx);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		box-sizing: border-box;
	}

	.icon {
		width: 20px;
		height: 20px;
		margin-right: 4px;
	}

	/* 今日热词网格 */
	.hotwords-list {
		display: flex;
		flex-wrap: wrap;
		gap: 20rpx;
		margin-bottom: 40rpx;
	}

	.hotword-item {
		width: calc(40% - 10rpx);
		background-color: #fff;
		border-radius: 8rpx;
		padding: 24rpx 20rpx;
		font-size: 24rpx;
		color: #333;
		border: 1rpx solid #e8e8e8;
		box-sizing: border-box;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: left;
	}

	/* 点击效果 */
	.history-item:active,
	.hotword-item:active {
		opacity: 0.7;
		transform: scale(0.98);
		transition: all 0.1s ease;
	}

	/* 占位符样式 */
	.placeholder-style {
		color: #999;
		font-size: 28rpx;
	}
</style>