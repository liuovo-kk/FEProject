"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "search",
  setup(__props) {
    const searchKeyword = common_vendor.ref("");
    const historyList = common_vendor.ref([
      "最美校园实况",
      "长白山照片",
      "清开灵颗粒",
      "电影解说",
      "NBA最新赛况",
      "联机游戏"
    ]);
    const hotWords = common_vendor.ref([
      "校园live音乐节",
      "旅行视频",
      "享受祖国大好河山",
      "今年的第一场雪",
      "南方的冬天",
      "AI最近进展"
    ]);
    const handleSearch = () => {
      if (!searchKeyword.value.trim()) {
        common_vendor.index.showToast({
          title: "请输入搜索内容",
          icon: "none"
        });
        return;
      }
      addToHistory(searchKeyword.value);
      common_vendor.index.navigateTo({
        url: `/pages/searchresult/searchresult?keyword=${encodeURIComponent(searchKeyword.value)}`
      });
    };
    const searchFromHistory = (keyword) => {
      searchKeyword.value = keyword;
      handleSearch();
    };
    const searchFromHotwords = (keyword) => {
      searchKeyword.value = keyword;
      handleSearch();
    };
    const clearKeyword = () => {
      searchKeyword.value = "";
    };
    const addToHistory = (keyword) => {
      historyList.value = historyList.value.filter((item) => item !== keyword);
      historyList.value.unshift(keyword);
      if (historyList.value.length > 6) {
        historyList.value = historyList.value.slice(0, 6);
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(handleSearch),
        b: searchKeyword.value,
        c: common_vendor.o(($event) => searchKeyword.value = $event.detail.value),
        d: searchKeyword.value
      }, searchKeyword.value ? {
        e: common_vendor.o(clearKeyword)
      } : {}, {
        f: common_vendor.o(handleSearch),
        g: historyList.value.length > 0
      }, historyList.value.length > 0 ? {
        h: common_assets._imports_0$4,
        i: common_vendor.f(historyList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index,
            c: common_vendor.o(($event) => searchFromHistory(item), index)
          };
        })
      } : {}, {
        j: common_assets._imports_1$3,
        k: common_vendor.f(hotWords.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index,
            c: common_vendor.o(($event) => searchFromHotwords(item), index)
          };
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c10c040c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/search/search.js.map
