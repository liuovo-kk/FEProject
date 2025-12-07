<template>
  <view class="issue-container">
    <!-- 图片上传区域 -->
    <view class="upload-section">
      <view class="image-preview">
        <!-- 已上传的图片预览 -->
        <view 
          v-for="(img, index) in previewImages" 
          :key="index" 
          class="preview-item"
        >
          <image :src="img" mode="aspectFill" class="preview-image"></image>
          <view class="delete-btn" @tap="deleteImage(index)">
            <text class="iconfont icon-close">×</text>
          </view>
        </view>
        
        <!-- 上传按钮 -->
        <view 
          v-if="previewImages.length < 3" 
          class="upload-btn" 
          @tap="chooseImage"
        >
          <view class="upload-icon">+</view>
          <text class="upload-text">上传</text>
        </view>
      </view>
    </view>
    
    <!-- 表单区域 -->
    <view class="form-section">
      <!-- 标题输入 -->
      <view class="input-item">
        <view class="input-label">标题</view>
        <input 
          v-model="formData.title" 
          class="input-field" 
          placeholder="请输入" 
          maxlength="50"
          placeholder-class="placeholder"
          @input="onTitleInput"
        />
        <view class="char-count">{{ titleLength }}/50</view>
      </view>
      
      <!-- 内容输入 -->
      <view class="input-item">
        <view class="input-label">内容</view>
        <textarea 
          v-model="formData.content" 
          class="textarea-field" 
          placeholder="请输入" 
          maxlength="500"
          placeholder-class="placeholder"
          auto-height
          @input="onContentInput"
        />
        <view class="char-count">{{ contentLength }}/500</view>
      </view>
      
      <!-- 标签选择 -->
      <view class="input-item tag-item" @tap="navigateToTags">
        <view class="input-label">添加标签</view>
        <view class="tag-select">
          <text class="selected-tags" v-if="selectedTags.length > 0">
            {{ selectedTags.join('，') }}
          </text>
          <text class="placeholder" v-else>请选择标签</text>
          <view class="arrow-icon">></view>
        </view>
      </view>
    </view>
    
    <!-- 发布按钮 -->
    <view class="publish-btn-container">
      <button 
        class="publish-btn" 
        :disabled="!canPublish" 
        :class="{ disabled: !canPublish }"
        @tap="handlePublish"
      >
        发布
      </button>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'

// 表单数据
const formData = reactive({
  title: '',
  content: '',
  images: []
})

// 预览图片
const previewImages = ref([])

// 已选标签
const selectedTags = ref([])

// 计算属性
const titleLength = computed(() => formData.title.length)
const contentLength = computed(() => formData.content.length)

// 是否可以发布
const canPublish = computed(() => {
  return formData.title.trim().length > 0 && formData.content.trim().length > 0
})

// 选择图片
const chooseImage = () => {
  const remainingSlots = 3 - previewImages.value.length
  if (remainingSlots <= 0) return
  
  uni.chooseImage({
    count: remainingSlots,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      const tempFilePaths = res.tempFilePaths
      previewImages.value.push(...tempFilePaths)
      formData.images.push(...tempFilePaths)
    },
    fail: (err) => {
      console.error('选择图片失败:', err)
      uni.showToast({
        title: '选择图片失败',
        icon: 'none'
      })
    }
  })
}

// 删除图片
const deleteImage = (index) => {
  previewImages.value.splice(index, 1)
  formData.images.splice(index, 1)
}

// 标题输入处理
const onTitleInput = (e) => {
  // 可以添加额外处理逻辑
}

// 内容输入处理
const onContentInput = (e) => {
  // 可以添加额外处理逻辑
}

// 跳转到标签选择页
const navigateToTags = () => {
  uni.navigateTo({
    url: '/pages/tags/tags',
    events: {
      acceptTags: (tags) => {
        selectedTags.value = tags
      }
    }
  })
}

// 发布处理
const handlePublish = async () => {
  if (!canPublish.value) return
  
  if (!formData.title.trim()) {
    uni.showToast({
      title: '请输入标题',
      icon: 'none'
    })
    return
  }
  
  if (!formData.content.trim()) {
    uni.showToast({
      title: '请输入内容',
      icon: 'none'
    })
    return
  }
  
  uni.showLoading({
    title: '发布中...',
    mask: true
  })
  
  try {
    const publishData = {
      title: formData.title.trim(),
      content: formData.content.trim(),
      tags: selectedTags.value,
      images: formData.images
    }
    
    console.log('发布数据:', publishData)
    
    // TODO: 替换为实际API调用
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    uni.hideLoading()
    uni.showToast({
      title: '发布成功',
      icon: 'success',
      duration: 2000
    })
    
    // 重置表单
    formData.title = ''
    formData.content = ''
    formData.images = []
    previewImages.value = []
    selectedTags.value = []
    
    // 返回上一页
    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
    
  } catch (error) {
    uni.hideLoading()
    uni.showToast({
      title: '发布失败，请重试',
      icon: 'none'
    })
    console.error('发布失败:', error)
  }
}
</script>

<style scoped lang="scss">
.issue-container {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 20rpx 20rpx 140rpx; /* 调整padding，底部留出按钮位置 */
  box-sizing: border-box;
}

/* 上传区域样式 */
.upload-section {
  background-color: #ffffff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-top: 0; /* 移除顶部margin */
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
}

.image-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.preview-item {
  width: 200rpx;
  height: 200rpx;
  border-radius: 12rpx;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.preview-image {
  width: 100%;
  height: 100%;
}

.delete-btn {
  position: absolute;
  top: 8rpx;
  right: 8rpx;
  width: 40rpx;
  height: 40rpx;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24rpx;
  z-index: 2;
}

.upload-btn {
  width: 200rpx;
  height: 200rpx;
  border: 2rpx dashed #dcdfe6;
  border-radius: 12rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fafafa;
  color: #c0c4cc;
  transition: all 0.3s;
  
  &:active {
    background-color: #f0f0f0;
    transform: scale(0.98);
  }
}

.upload-icon {
  font-size: 60rpx;
  font-weight: 300;
  margin-bottom: 10rpx;
}

.upload-text {
  font-size: 28rpx;
  color: #606266;
}

/* 表单区域样式 */
.form-section {
  background-color: #ffffff;
  border-radius: 16rpx;
  margin-top: 20rpx;
  padding: 0 30rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
}

.input-item {
  padding: 30rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
  position: relative;
  
  &:last-child {
    border-bottom: none;
  }
}

.input-label {
  font-size: 32rpx;
  color: #303133;
  font-weight: 500;
  margin-bottom: 20rpx;
}

.input-field,
.textarea-field {
  width: 100%;
  font-size: 28rpx;
  color: #303133;
  background-color: transparent;
  border: none;
  outline: none;
}

.textarea-field {
  min-height: 200rpx;
  line-height: 1.5;
  padding-right: 100rpx;
}

.placeholder {
  color: #c0c4cc;
  font-size: 28rpx;
}

.char-count {
  position: absolute;
  right: 0;
  bottom: 30rpx;
  font-size: 24rpx;
  color: #909399;
}

/* 标签选择样式 */
.tag-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30rpx 0;
}

.tag-select {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #606266;
  font-size: 28rpx;
}

.selected-tags {
  color: #303133;
  margin-right: 20rpx;
  max-width: 400rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.arrow-icon {
  color: #c0c4cc;
  font-size: 32rpx;
  font-weight: 300;
  transform: scaleY(1.5);
}

/* 发布按钮样式 */
.publish-btn-container {
  position: fixed;
  bottom: 40rpx; /* 固定在底部，距离底部40rpx */
  left: 40rpx;
  right: 40rpx;
  z-index: 100;
}

.publish-btn {
  width: 100%;
  height: 80rpx;
  background: #5F371E;
  color: #ffffff;
  border: none;
  border-radius: 40rpx;
  font-size: 32rpx;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  
  &:active {
    opacity: 0.9;
    transform: scale(0.98);
  }
  
  &.disabled {
    background: #5F371E;
    color: #ffffff;
    
    &:active {
      opacity: 1;
      transform: none;
    }
  }
}
</style>