"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "searchresult",
  setup(__props) {
    const searchKeyword = common_vendor.ref("");
    common_vendor.ref("全部");
    const activeSort = common_vendor.ref("最新");
    common_vendor.onLoad((options) => {
      if (options && options.keyword) {
        try {
          searchKeyword.value = decodeURIComponent(options.keyword);
          common_vendor.index.__f__("log", "at pages/searchresult/searchresult.vue:143", "搜索关键词：", searchKeyword.value);
        } catch (e) {
          common_vendor.index.__f__("error", "at pages/searchresult/searchresult.vue:145", "解码关键词失败：", e);
          searchKeyword.value = options.keyword;
        }
      }
    });
    const onInput = (event) => {
      searchKeyword.value = event.detail.value;
    };
    const handleSearch = () => {
      if (!searchKeyword.value.trim()) {
        return;
      }
      common_vendor.index.__f__("log", "at pages/searchresult/searchresult.vue:166", "搜索关键词：", searchKeyword.value);
    };
    const clearKeyword = () => {
      searchKeyword.value = "";
    };
    const switchSort = (sort) => {
      activeSort.value = sort;
      common_vendor.index.__f__("log", "at pages/searchresult/searchresult.vue:187", "切换到排序：", sort);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: searchKeyword.value,
        b: common_vendor.o(onInput),
        c: common_vendor.o(handleSearch),
        d: searchKeyword.value
      }, searchKeyword.value ? {
        e: common_vendor.o(clearKeyword)
      } : {}, {
        f: common_vendor.o(handleSearch),
        g: activeSort.value === "最新" ? 1 : "",
        h: common_vendor.o(($event) => switchSort("最新")),
        i: activeSort.value === "综合" ? 1 : "",
        j: common_vendor.o(($event) => switchSort("综合")),
        k: activeSort.value === "最热" ? 1 : "",
        l: common_vendor.o(($event) => switchSort("最热")),
        m: common_assets._imports_0$5,
        n: common_assets._imports_1$4,
        o: common_assets._imports_2$2,
        p: common_assets._imports_3,
        q: common_assets._imports_4,
        r: common_assets._imports_5
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b6187c50"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/searchresult/searchresult.js.map
