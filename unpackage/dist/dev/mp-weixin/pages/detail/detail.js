"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const postData = common_vendor.ref({
      images: [
        "/static/images/头像.png",
        "/static/images/cat.png",
        "/static/images/bird.png"
      ],
      title: "周末与朋友欢聚",
      description: "这个周末和朋友们一起度过了愉快的时光！美食、欢笑、美好的回忆，一切都太棒了！",
      likeCount: 13,
      shareCount: 7,
      comments: [
        {
          avatar: "/static/images/头像.png",
          username: "小王",
          text: "哇哇哇好丰盛！！！",
          likeCount: 0,
          isLiked: false,
          isDisliked: false
        },
        {
          avatar: "/static/images/头像.png",
          username: "小王",
          text: "哇哇哇好丰盛！！！",
          likeCount: 0,
          isLiked: false,
          isDisliked: false
        },
        {
          avatar: "/static/images/头像.png",
          username: "小王",
          text: "哇哇哇好丰盛！！！",
          likeCount: 0,
          isLiked: false,
          isDisliked: false
        },
        {
          avatar: "/static/images/头像.png",
          username: "小王",
          text: "哇哇哇好丰盛！！！",
          likeCount: 0,
          isLiked: false,
          isDisliked: false
        },
        {
          avatar: "/static/images/头像.png",
          username: "小王",
          text: "哇哇哇好丰盛！！！\n哇哇哇好丰盛！！！",
          likeCount: 0,
          isLiked: false,
          isDisliked: false
        },
        {
          avatar: "/static/images/头像.png",
          username: "小张",
          text: "看起来太好吃了！",
          likeCount: 0,
          isLiked: false,
          isDisliked: false
        }
      ]
    });
    const currentImageHeight = common_vendor.ref(200);
    const loadedImages = common_vendor.reactive({});
    const imageDimensions = common_vendor.reactive({});
    const currentSwiperIndex = common_vendor.ref(0);
    const isDisliked = common_vendor.ref(false);
    const isLiked = common_vendor.ref(false);
    function onImageLoad(e, index) {
      const {
        height,
        width
      } = e.detail;
      const screenWidth = common_vendor.index.getSystemInfoSync().windowWidth;
      const displayHeight = screenWidth / width * height;
      imageDimensions[index] = displayHeight;
      loadedImages[index] = true;
      if (index === 0 || index === currentSwiperIndex.value) {
        currentImageHeight.value = displayHeight;
      }
    }
    function onSwiperChange(e) {
      const currentIndex = e.detail.current;
      currentSwiperIndex.value = currentIndex;
      if (imageDimensions[currentIndex]) {
        currentImageHeight.value = imageDimensions[currentIndex];
      } else {
        currentImageHeight.value = 200;
      }
    }
    function replyComment(index) {
      common_vendor.index.__f__("log", "at pages/detail/detail.vue:216", "回复评论", index);
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
    function handleLikePost() {
      if (isLiked.value) {
        postData.value.likeCount--;
      } else {
        postData.value.likeCount++;
      }
      isLiked.value = !isLiked.value;
    }
    function toggleDislike() {
      if (isDisliked.value) {
        isDisliked.value = false;
      } else {
        isDisliked.value = true;
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$2,
        b: common_vendor.f(postData.value.images, (imageUrl, index, i0) => {
          return {
            a: imageUrl,
            b: common_vendor.o(($event) => onImageLoad($event, index), index),
            c: loadedImages[index] ? 1 : 0,
            d: index
          };
        }),
        c: currentImageHeight.value + "px",
        d: common_vendor.o(onSwiperChange),
        e: common_vendor.t(postData.value.title),
        f: common_vendor.t(postData.value.description),
        g: isDisliked.value ? "/static/icons/dislike1.png" : "/static/icons/dislike.png",
        h: common_vendor.o(toggleDislike),
        i: common_vendor.f(postData.value.comments, (comment, index, i0) => {
          return {
            a: comment.avatar,
            b: common_vendor.t(comment.username),
            c: common_vendor.t(comment.text),
            d: common_vendor.o(($event) => replyComment(index), index),
            e: comment.isLiked ? "/static/icons/like1.png" : "/static/icons/like.png",
            f: common_vendor.t(comment.likeCount),
            g: common_vendor.o(($event) => handleLike(index), index),
            h: comment.isLiked ? 1 : "",
            i: comment.isDisliked ? "/static/icons/dislike1.png" : "/static/icons/dislike.png",
            j: common_vendor.o(($event) => handleDislike(index), index),
            k: comment.isDisliked ? 1 : "",
            l: index
          };
        }),
        j: common_assets._imports_1$1,
        k: isLiked.value ? "/static/icons/like1.png" : "/static/icons/like.png",
        l: common_vendor.t(postData.value.likeCount),
        m: common_vendor.o(handleLikePost),
        n: common_assets._imports_2,
        o: common_vendor.t(postData.value.shareCount)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-eca06f3c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/detail/detail.js.map
