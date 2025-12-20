<template>
	<view class="home-container">
		<!-- 顶部搜索图标 - 左上角黑色放大镜 -->
		<view class="header-section">
			<view class="search-icon" @tap="navigateToSearch">
				<image src="/static/icons/search_icon.png" mode="widthFix" class="search-image"></image>
			</view>
		</view>

		<!-- 内容卡片区域 - 瀑布流布局 -->
		<scroll-view class="content-list" scroll-y enable-back-to-top @scrolltolower="loadMoreData">
			<!-- 瀑布流容器 -->
			<view class="waterfall-container">
				<!-- 动态渲染瀑布流列 -->
				<view v-for="(column, columnIndex) in waterfall.columnList" :key="columnIndex" class="waterfall-column">
					<!-- 渲染当前列的所有卡片 -->
					<view v-for="item in column" :key="item.id" class="content-card" @tap="navigateToDetail(item.id)">
						<view class="card-image">
							<image v-if="item.imageUrl" :src="item.imageUrl" mode="widthFix" class="card-image-real"
								@load="handleImageLoad($event, item)" @error="handleImageError"></image>
							<view v-else class="image-placeholder">
								{{ item.title }}
							</view>
						</view>
						<view class="card-content">
							<view class="card-title">{{ item.title }}</view>
							<view class="card-bottom">
								<view class="author-info">
									<view class="author-avatar">{{ item.author.charAt(0) }}</view>
									<view class="author-name">{{ item.author }}</view>
								</view>
								<view class="like-info">
									<image class="icon-img" src="/static/icons/like.png"></image>
									<view class="like-count">{{ item.likeCount }}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 加载状态 -->
			<view v-if="loading" class="loading-more">
				<text>加载中...</text>
			</view>

			<!-- 没有更多数据 -->
			<view v-if="noMore && contentList.length > 0" class="no-more">
				<text>没有更多内容了</text>
			</view>
		</scroll-view>

		<!-- 空状态 -->
		<view v-if="contentList.length === 0 && !loading" class="empty-state">
			<text>暂无内容</text>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted,
		nextTick
	} from 'vue'

	// 响应式数据
	const contentList = ref([])
	const loading = ref(false)
	const noMore = ref(false)
	const currentPage = ref(1)
	const pageSize = ref(10)

	// 瀑布流相关数据
	const waterfall = reactive({
		columnList: [
			[],
			[]
		], // 两列的卡片数据，初始为空数组
		columnHeight: [0, 0], // 两列的累计高度
		columnCount: 2, // 列数
		imgHeights: {} // 存储已加载图片的高度 {id: height}
	})

	// 模拟数据
	const mockData = [{
			id: 1,
			title: "小猫的一天",
			author: "小吴",
			imageUrl: "/static/logo.png",
			likeCount: 12,
			createTime: "2024-01-15 10:30"
		},
		{
			id: 2,
			title: "顶级轿跑",
			author: "未知作者",
			imageUrl: "/static/images/头像.png",
			likeCount: 15,
			createTime: "2024-01-14 16:45"
		},
		{
			id: 3,
			title: "逛美术馆欣赏精美艺术作品展览",
			author: "小杨",
			imageUrl: "/static/images/cat.png",
			likeCount: 8,
			createTime: "2024-01-13 14:20"
		},
		{
			id: 4,
			title: "化学实验探索科学奥秘",
			author: "未知作者",
			imageUrl: "/static/images/头像.png",
			likeCount: 22,
			createTime: "2024-01-12 09:15"
		},
		{
			id: 5,
			title: "城市夜景璀璨灯光秀",
			author: "摄影师小王",
			imageUrl: "/static/images/cat.png",
			likeCount: 35,
			createTime: "2024-01-11 20:30"
		},
		{
			id: 6,
			title: "美食探店发现地道美味佳肴",
			author: "吃货小李",
			imageUrl: "/static/images/头像.png",
			likeCount: 18,
			createTime: "2024-01-10 12:00"
		},
		{
			id: 7,
			title: "登山徒步享受自然风光",
			author: "户外达人",
			imageUrl: "/static/images/cat.png",
			likeCount: 28,
			createTime: "2024-01-09 08:30"
		},
		{
			id: 8,
			title: "咖啡时光静谧午后阅读",
			author: "文艺青年",
			imageUrl: "/static/images/头像.png",
			likeCount: 14,
			createTime: "2024-01-08 15:20"
		},
		{
			id: 9,
			title: "时光静谧午后阅读",
			author: "文艺青年",
			imageUrl: "/static/images/头像.png",
			likeCount: 14,
			createTime: "2024-01-08 15:20"
		}
	]

	// 获取内容列表数据
	const fetchContentList = async (page = 1, isLoadMore = false) => {
		if (loading.value) return

		loading.value = true

		try {
			// 模拟网络请求延迟
			await new Promise(resolve => setTimeout(resolve, 500))

			// 模拟API响应数据
			let newData = []
			if (isLoadMore) {
				newData = mockData.slice((page - 1) * pageSize.value, page * pageSize.value)
			} else {
				newData = mockData.slice(0, pageSize.value)
			}

			if (isLoadMore) {
				contentList.value = [...contentList.value, ...newData]
			} else {
				contentList.value = newData
			}

			// 重新计算瀑布流布局
			await nextTick()
			await calculateWaterfallLayout()

			// 判断是否还有更多数据
			noMore.value = contentList.value.length >= mockData.length

			currentPage.value = page

		} catch (error) {
			console.error('获取内容列表失败:', error)
			uni.showToast({
				title: '加载失败，请重试',
				icon: 'none'
			})
		} finally {
			loading.value = false
		}
	}

	// 计算瀑布流布局
	const calculateWaterfallLayout = async () => {
		// 重置瀑布流数据
		waterfall.columnList = Array.from({
			length: waterfall.columnCount
		}, () => [])
		waterfall.columnHeight = Array(waterfall.columnCount).fill(0)

		// 为每张图片获取高度并计算布局
		for (let i = 0; i < contentList.value.length; i++) {
			const item = contentList.value[i]

			// 如果已经有缓存的高度，直接使用
			if (waterfall.imgHeights[item.id]) {
				assignItemToColumn(item, waterfall.imgHeights[item.id])
			} else {
				// 否则尝试获取图片高度
				try {
					const imgInfo = await uni.getImageInfo({
						src: item.imageUrl
					})
					const imgHeight = imgInfo.height
					waterfall.imgHeights[item.id] = imgHeight // 缓存高度
					assignItemToColumn(item, imgHeight)
				} catch (error) {
					console.log('获取图片高度失败:', error)
					// 使用默认高度
					waterfall.imgHeights[item.id] = 300 // 默认高度
					assignItemToColumn(item, 300)
				}
			}
		}
	}

	// 将项目分配到合适的列
	const assignItemToColumn = (item, imgHeight) => {
		// 计算卡片总高度（图片高度 + 内容区域估算高度）
		const contentHeight = 200 // 估算内容区域高度（标题+底部信息）
		const cardTotalHeight = imgHeight + contentHeight

		// 找到高度最小的列
		let minHeightIndex = 0
		let minHeight = waterfall.columnHeight[0]

		for (let j = 1; j < waterfall.columnCount; j++) {
			if (waterfall.columnHeight[j] < minHeight) {
				minHeight = waterfall.columnHeight[j]
				minHeightIndex = j
			}
		}

		// 将卡片添加到高度最小的列
		waterfall.columnList[minHeightIndex].push(item)
		waterfall.columnHeight[minHeightIndex] += cardTotalHeight
	}

	// 图片加载完成处理
	const handleImageLoad = (event, item) => {
		// 可以在这里做一些图片加载后的处理
		console.log('图片加载完成:', item.id)
	}

	// 图片加载失败处理
	const handleImageError = (e) => {
		console.log('图片加载失败:', e)
	}

	// 加载更多数据
	const loadMoreData = () => {
		if (!noMore.value && !loading.value) {
			fetchContentList(currentPage.value + 1, true)
		}
	}

	// 刷新数据
	const refreshData = () => {
		noMore.value = false
		// 清空图片高度缓存
		Object.keys(waterfall.imgHeights).forEach(key => {
			delete waterfall.imgHeights[key]
		})
		fetchContentList(1, false)
	}

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

	// 组件挂载时获取数据
	onMounted(() => {
		fetchContentList(1, false)
	})

	// 暴露方法给父组件使用
	defineExpose({
		refreshData,
		fetchContentList
	})
</script>

<style scoped lang="scss">
	.home-container {
		width: 100%;
		min-height: 100vh;
		background-color: #f5f5f7;
		padding-top: 100rpx;
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
		background-color: #f5f5f7;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		z-index: 1000;
		box-sizing: border-box;
		padding-right: 30rpx;
	}

	.search-icon {
		width: 60rpx;
		height: 60rpx;
		background: none;
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 40rpx;
		color: #000000;
		font-weight: bold;
		box-shadow: none;
		transition: all 0.2s ease;
		cursor: pointer;

		&:active {
			transform: scale(0.9);
			opacity: 0.7;
		}
	}

	/* 内容区域 - 瀑布流布局 */
	.content-list {
		width: 100%;
		height: calc(100vh - 100rpx);
		background-color: #f5f5f7;
		padding: 0 15rpx;
		box-sizing: border-box;
	}

	/* 瀑布流容器 */
	.waterfall-container {
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding-top: 20rpx;
	}

	/* 瀑布流列 */
	.waterfall-column {
		width: calc(50% - 7.5rpx);
		display: flex;
		flex-direction: column;
	}

	/* 卡片样式 - 移除固定宽度，让内容自适应 */
	.content-card {
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
		background-color: #e8e8e8;
		position: relative;
		overflow: hidden;
		border-bottom: 1rpx solid #f0f0f0;
	}

	.card-image-real {
		width: 100%;
		display: block;
	}

	.image-placeholder {
		width: 100%;
		padding-bottom: 66.67%;
		/* 3:2 宽高比占位 */
		background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		color: #999;
		font-size: 28rpx;
		padding: 20rpx;
		text-align: center;
		box-sizing: border-box;
		position: relative;
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

	/* 卡片底部 */
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
		background-color: #007AFF;
		background: linear-gradient(135deg, #007AFF, #5AC8FA);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		color: #ffffff;
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
		padding: 8rpx 12rpx;
		border-radius: 20rpx;
		background-color: #f8f8f8;
		min-width: 80rpx;
		justify-content: center;
	}

	.icon-img {
		width: 20px;
		height: 20px;
		margin-right: 4px;
	}

	.like-count {
		font-size: 24rpx;
		color: #333333;
		font-weight: 500;
		line-height: 1;
		min-width: 40rpx;
		text-align: center;
	}

	/* 加载状态 */
	.loading-more {
		width: 100%;
		text-align: center;
		padding: 40rpx 0;
		color: #999;
		font-size: 28rpx;
	}

	/* 没有更多数据 */
	.no-more {
		width: 100%;
		text-align: center;
		padding: 40rpx 0;
		color: #ccc;
		font-size: 28rpx;
	}

	/* 空状态 */
	.empty-state {
		width: 100%;
		text-align: center;
		padding: 200rpx 0;
		color: #999;
		font-size: 32rpx;
	}
</style>