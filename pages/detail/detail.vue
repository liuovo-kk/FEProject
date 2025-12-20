<template>
	<view class="container">
		<!-- 顶部导航栏 -->
		<view class="header">
			<!-- <view class="back-icon" @click="goBack">
				<text class="icon">←</text>
			</view> -->
			<view class="user-info">
				<image class="avatar" src="/static/images/头像.png"></image>
				<text class="username">小李</text>
			</view>
		</view>

		<!-- 修改：使用 scroll-view 替换原来的 scroll-view，并调整结构 -->
		<view class="page-content">
			<!-- 图片展示区 - 修改开始 -->
			<view class="swiper-container">
				<swiper class="swiper" indicator-dots="{{true}}" autoplay="{{false}}"
					:style="{height: currentImageHeight + 'px'}" @change="onSwiperChange">
					<swiper-item v-for="(imageUrl, index) in postData.images" :key="index">
						<image class="post-image" :src="imageUrl" mode="widthFix" @load="onImageLoad($event, index)"
							:style="{opacity: loadedImages[index] ? 1 : 0}">
						</image>
					</swiper-item>
				</swiper>
			</view>
			<!-- 图片展示区 - 修改结束 -->

			<!-- 文字内容区域 -->
			<view class="content">
				<text class="title">{{postData.title}}</text>
				<text class="description">{{postData.description}}</text>
			</view>

			<!-- 底部互动区域 -->
			<view class="footer">
				<!-- 不喜欢按钮 -->
				<view class="dislike-btn" @click="toggleDislike">
					<image class="dislike-icon"
						:src="isDisliked ? '/static/icons/dislike1.png' : '/static/icons/dislike.png'">
					</image>
					<text class="dislike-text">不喜欢</text>
				</view>
			</view>
			<!-- 用户评论列表 -->
			<view class="comments-section">
				<view class="comment-item" v-for="(comment, index) in postData.comments" :key="index">
					<image class="comment-avatar" :src="comment.avatar"></image>
					<view class="comment-right">
						<text class="comment-username">{{comment.username}}</text>
						<text class="comment-text">{{comment.text}}</text>
						<!-- 操作按钮区（横向排列） -->
						<view class="comment-actions">
							<view class="reply-btn" @click="replyComment(index)">
								<text>回复</text>
							</view>
							<view class="like-dislike-area">
								<view class="like-btn" @click="handleLike(index)" :class="{ 'liked': comment.isLiked }">
									<image class="action-icon-img"
										:src="comment.isLiked ? '/static/icons/like1.png' : '/static/icons/like.png'">
									</image>
									<text class="like-count">{{comment.likeCount}}</text>
								</view>
								<view class="dislike-btn" @click="handleDislike(index)"
									:class="{ 'disliked': comment.isDisliked }">
									<image class="action-icon-img"
										:src="comment.isDisliked ? '/static/icons/dislike1.png' : '/static/icons/dislike.png'">
									</image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部操作栏 -->
		<view class="bottom-bar">
			<view class="input-container">
				<image class="action-icon-img" src="/static/icons/edit.png"></image>
				<input class="comment-input" placeholder="评论..." />
			</view>
			<view class="action-icons">
				<view class="like-btn" @click="handleLikePost">
					<image class="bottom-icon-img"
						:src="isLiked ? '/static/icons/like1.png' : '/static/icons/like.png'">
					</image>
					<text class="like-count">{{postData.likeCount}}</text>
				</view>
				<view class="comment-btn">
					<image class="bottom-icon-img" src="/static/icons/comment.png"></image>
					<text class="comment-count">{{postData.shareCount}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue';

	// 帖子数据
	const postData = ref({
		images: [
			'/static/images/头像.png',
			'/static/images/cat.png',
			'/static/images/bird.png'
		],
		title: '周末与朋友欢聚',
		description: '这个周末和朋友们一起度过了愉快的时光！美食、欢笑、美好的回忆，一切都太棒了！',
		likeCount: 13,
		shareCount: 7,
		comments: [{
				avatar: '/static/images/头像.png',
				username: '小王',
				text: '哇哇哇好丰盛！！！',
				likeCount: 0,
				isLiked: false,
				isDisliked: false
			},
			{
				avatar: '/static/images/头像.png',
				username: '小王',
				text: '哇哇哇好丰盛！！！',
				likeCount: 0,
				isLiked: false,
				isDisliked: false
			},
			{
				avatar: '/static/images/头像.png',
				username: '小王',
				text: '哇哇哇好丰盛！！！',
				likeCount: 0,
				isLiked: false,
				isDisliked: false
			},
			{
				avatar: '/static/images/头像.png',
				username: '小王',
				text: '哇哇哇好丰盛！！！',
				likeCount: 0,
				isLiked: false,
				isDisliked: false
			},
			{
				avatar: '/static/images/头像.png',
				username: '小王',
				text: '哇哇哇好丰盛！！！\n哇哇哇好丰盛！！！',
				likeCount: 0,
				isLiked: false,
				isDisliked: false
			},
			{
				avatar: '/static/images/头像.png',
				username: '小张',
				text: '看起来太好吃了！',
				likeCount: 0,
				isLiked: false,
				isDisliked: false
			}
		]
	});

	// 新增：动态高度相关变量
	const currentImageHeight = ref(200); // 默认高度
	const loadedImages = reactive({}); // 记录哪些图片已加载完成
	const imageDimensions = reactive({}); // 存储图片尺寸
	const currentSwiperIndex = ref(0); // 当前swiper索引
	const isDisliked = ref(false); // 全局不喜欢状态
	const isLiked = ref(false); // 点赞状态

	// 新增：图片加载处理函数
	function onImageLoad(e, index) {
		const {
			height,
			width
		} = e.detail;
		const screenWidth = uni.getSystemInfoSync().windowWidth;

		// 计算图片显示高度
		const displayHeight = (screenWidth / width) * height;

		// 存储图片尺寸
		imageDimensions[index] = displayHeight;
		loadedImages[index] = true;

		// 如果是第一张或当前显示的图片，更新swiper高度
		if (index === 0 || index === currentSwiperIndex.value) {
			currentImageHeight.value = displayHeight;
		}
	}

	// 新增：swiper切换处理
	function onSwiperChange(e) {
		const currentIndex = e.detail.current;
		currentSwiperIndex.value = currentIndex;

		// 如果新索引的图片已经加载过，直接设置高度
		if (imageDimensions[currentIndex]) {
			currentImageHeight.value = imageDimensions[currentIndex];
		} else {
			// 否则设置一个默认高度，等待图片加载
			currentImageHeight.value = 200;
		}
	}

	// 返回上一页
	function goBack() {
		uni.navigateBack();
	}

	// 回复评论
	function replyComment(index) {
		console.log('回复评论', index);
		// 实现回复功能
	}

	function handleLike(commentIndex) {
		const comment = postData.value.comments[commentIndex];

		if (comment.isDisliked) {
			comment.isDisliked = false;
			comment.likeCount += 1;
		}

		comment.isLiked = !comment.isLiked;
		comment.likeCount += comment.isLiked ? 1 : -1;
	}

	function handleDislike(commentIndex) {
		const comment = postData.value.comments[commentIndex];

		if (comment.isLiked) {
			comment.isLiked = false;
			comment.likeCount -= 1;
		}

		comment.isDisliked = !comment.isDisliked;
	}
	// 帖子点赞
	function handleLikePost() {
		if (isLiked.value) {
			postData.value.likeCount--;
		} else {
			postData.value.likeCount++;
		}
		isLiked.value = !isLiked.value;
	}
	// 全局不喜欢帖子
	function toggleDislike() {
		if (isDisliked.value) {
			isDisliked.value = false;
			// 可以在这里添加取消不喜欢的逻辑
		} else {
			isDisliked.value = true;
			// 可以在这里添加不喜欢帖子的逻辑
			// 例如：帖子作者可能会收到通知
		}
	}
</script>

<style scoped>
	page {
		background-color: #f8f8f8;
	}

	.container {
		display: flex;
		flex-direction: column;
		height: 100vh;
		width: 100%;
	}

	/* 头部样式 */
	.header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 60px;
		padding: 0 15px;
		background-color: #f8f8f8;
		z-index: 100;
		display: flex;
		align-items: center;
	}

	.back-icon {
		font-size: 24px;
		color: #333;
		width: 30px;
	}

	.user-info {
		flex: 1;
		display: flex;
		align-items: center;
		/* margin-left: 40px; */
	}

	.avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		margin-right: 8px;
	}

	.username {
		font-size: 16px;
		color: black;
	}

	/* 修改：页面内容区域 */
	.page-content {
		flex: 1;
		overflow-y: auto;
		padding-bottom: 50px;
		/* 为底部操作栏留出空间 */
	}

	/* 修改：swiper容器样式 */
	.swiper-container {
		background-color: #f8f8f8;
		margin-top: 44px;
		/* 为fixed header留出空间 */
	}

	.swiper {
		width: 100%;
		transition: height 0.3s ease;
		/* 添加过渡效果 */
	}

	.post-image {
		width: 100%;
		display: block;
		transition: opacity 0.3s ease;
		/* 图片加载淡入效果 */
	}

	/* 内容区域样式 */
	.content {
		padding: 15px;
		/* background-color: #fff; */
	}

	.title {
		font-size: 18px;
		font-weight: bold;
		color: #333;
		margin-bottom: 8px;
		display: block;
	}

	.description {
		font-size: 15px;
		color: black;
		line-height: 1.7;
		display: block;
	}

	/* 底部互动区域样式 */
	.footer {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		padding-right: 15px;
		position: relative;
	}

	/* 在底部互动区下方添加分割线 */
	.footer::after {
		content: '';
		position: absolute;
		bottom: -5px;
		left: 15px;
		right: 15px;
		height: 1rpx;
		background-color: #eee;
	}

	.dislike-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10px 0;
		border-bottom: 1rpx solid #eee;
	}

	.dislike-icon {
		width: 20px;
		height: 20px;
		margin-right: 5px;
	}

	.action-icon-img {
		width: 20px;
		height: 20px;
		margin-right: 4px;
	}

	.dislike-text {
		font-size: 14px;
		color: #999;
	}

	.comments-section {
		flex: 1;
		overflow-y: auto;
		padding: 10px 10px;
	}

	.comment-item {
		display: flex;
		align-items: flex-start;
		margin-bottom: 15px;
		padding: 5px;
		position: relative;
		/* 为伪元素定位做准备 */
	}

	/* 在每条评论下方添加分割线（最后一条评论不显示） */
	.comment-item:not(:last-child)::after {
		content: '';
		position: absolute;
		bottom: -5px;
		/* 调整位置，在评论项外部 */
		left: 46px;
		/* 从头像右侧开始 */
		right: 0;
		height: 1rpx;
		background-color: #eee;
	}

	.comment-avatar {
		width: 38px;
		height: 38px;
		border-radius: 50%;
		margin-right: 10px;
	}

	/* 右侧内容区：竖向排列 */
	.comment-right {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.comment-username {
		font-size: 14px;
		color: #666;
		/* font-weight: bold; */
	}

	/* 评论内容 */
	.comment-body {
		/* margin-bottom: 6px; */
	}

	.comment-text {
		font-size: 14px;
		color: black;
		margin-top: 3px;
	}

	/* 操作按钮区：横向排列 */
	.comment-actions {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: 20px;
	}

	.reply-btn {
		padding: 0 10px;
		color: #999;
		font-size: 12px;
	}

	.like-dislike-area {
		display: flex;
		align-items: center;
	}

	.like-btn,
	.dislike-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0px 4px;
		margin-left: 8px;
		cursor: pointer;
	}

	.like-btn.liked {
		color: red;
	}

	.dislike-btn.disliked {
		color: #999;
	}



	.like-count {
		font-size: 12px;
		margin-left: 2px;
	}

	/* 底部操作栏 */
	.bottom-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 60px;
		background-color: #fff;
		display: flex;
		align-items: center;
		border-top: 1rpx solid #eee;
		padding: 0 15px;
		z-index: 100;
	}

	.input-container {
		flex: 1;
		display: flex;
		align-items: center;
		background-color: #f5f5f5;
		padding: 5px 10px;
		border-radius: 20px;
		margin-right: 10px;
	}

	.input-icon {
		color: #999;
		font-size: 16px;
		margin-right: 5px;
	}

	.comment-input {
		flex: 1;
		font-size: 14px;
		color: #333;
	}

	.action-icons {
		display: flex;
		align-items: center;
	}

	.like-btn,
	.comment-btn {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin: 0 15px;
	}

	.like-icon,
	.comment-icon {
		font-size: 20px;
		margin-bottom: 3px;
	}

	.like-count,
	.comment-count {
		font-size: 12px;
		color: #999;
	}

	.bottom-icon-img {
		width: 30px;
		height: 30px;
		margin-right: 4px;
	}
</style>