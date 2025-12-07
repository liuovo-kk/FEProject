"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "issue",
  setup(__props) {
    const formData = common_vendor.reactive({
      title: "",
      content: "",
      images: []
    });
    const previewImages = common_vendor.ref([]);
    const selectedTags = common_vendor.ref([]);
    const titleLength = common_vendor.computed(() => formData.title.length);
    const contentLength = common_vendor.computed(() => formData.content.length);
    const canPublish = common_vendor.computed(() => {
      return formData.title.trim().length > 0 && formData.content.trim().length > 0;
    });
    const chooseImage = () => {
      const remainingSlots = 3 - previewImages.value.length;
      if (remainingSlots <= 0)
        return;
      common_vendor.index.chooseImage({
        count: remainingSlots,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          const tempFilePaths = res.tempFilePaths;
          previewImages.value.push(...tempFilePaths);
          formData.images.push(...tempFilePaths);
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/issue/issue.vue:128", "选择图片失败:", err);
          common_vendor.index.showToast({
            title: "选择图片失败",
            icon: "none"
          });
        }
      });
    };
    const deleteImage = (index) => {
      previewImages.value.splice(index, 1);
      formData.images.splice(index, 1);
    };
    const onTitleInput = (e) => {
    };
    const onContentInput = (e) => {
    };
    const navigateToTags = () => {
      common_vendor.index.navigateTo({
        url: "/pages/tags/tags",
        events: {
          acceptTags: (tags) => {
            selectedTags.value = tags;
          }
        }
      });
    };
    const handlePublish = async () => {
      if (!canPublish.value)
        return;
      if (!formData.title.trim()) {
        common_vendor.index.showToast({
          title: "请输入标题",
          icon: "none"
        });
        return;
      }
      if (!formData.content.trim()) {
        common_vendor.index.showToast({
          title: "请输入内容",
          icon: "none"
        });
        return;
      }
      common_vendor.index.showLoading({
        title: "发布中...",
        mask: true
      });
      try {
        const publishData = {
          title: formData.title.trim(),
          content: formData.content.trim(),
          tags: selectedTags.value,
          images: formData.images
        };
        common_vendor.index.__f__("log", "at pages/issue/issue.vue:198", "发布数据:", publishData);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "发布成功",
          icon: "success",
          duration: 2e3
        });
        formData.title = "";
        formData.content = "";
        formData.images = [];
        previewImages.value = [];
        selectedTags.value = [];
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 1500);
      } catch (error) {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "发布失败，请重试",
          icon: "none"
        });
        common_vendor.index.__f__("error", "at pages/issue/issue.vue:228", "发布失败:", error);
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(previewImages.value, (img, index, i0) => {
          return {
            a: img,
            b: common_vendor.o(($event) => deleteImage(index), index),
            c: index
          };
        }),
        b: previewImages.value.length < 3
      }, previewImages.value.length < 3 ? {
        c: common_vendor.o(chooseImage)
      } : {}, {
        d: common_vendor.o([($event) => formData.title = $event.detail.value, onTitleInput]),
        e: formData.title,
        f: common_vendor.t(titleLength.value),
        g: common_vendor.o([($event) => formData.content = $event.detail.value, onContentInput]),
        h: formData.content,
        i: common_vendor.t(contentLength.value),
        j: selectedTags.value.length > 0
      }, selectedTags.value.length > 0 ? {
        k: common_vendor.t(selectedTags.value.join("，"))
      } : {}, {
        l: common_vendor.o(navigateToTags),
        m: !canPublish.value,
        n: !canPublish.value ? 1 : "",
        o: common_vendor.o(handlePublish)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-065b927f"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/issue/issue.js.map
