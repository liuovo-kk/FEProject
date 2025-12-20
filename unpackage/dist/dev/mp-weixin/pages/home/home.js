"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "home",
  setup(__props, { expose: __expose }) {
    const contentList = common_vendor.ref([]);
    const loading = common_vendor.ref(false);
    const noMore = common_vendor.ref(false);
    const currentPage = common_vendor.ref(1);
    const pageSize = common_vendor.ref(10);
    const waterfall = common_vendor.reactive({
      columnList: [
        [],
        []
      ],
      // 两列的卡片数据，初始为空数组
      columnHeight: [0, 0],
      // 两列的累计高度
      columnCount: 2,
      // 列数
      imgHeights: {}
      // 存储已加载图片的高度 {id: height}
    });
    const mockData = [
      {
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
    ];
    const fetchContentList = async (page = 1, isLoadMore = false) => {
      if (loading.value)
        return;
      loading.value = true;
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        let newData = [];
        if (isLoadMore) {
          newData = mockData.slice((page - 1) * pageSize.value, page * pageSize.value);
        } else {
          newData = mockData.slice(0, pageSize.value);
        }
        if (isLoadMore) {
          contentList.value = [...contentList.value, ...newData];
        } else {
          contentList.value = newData;
        }
        await common_vendor.nextTick$1();
        await calculateWaterfallLayout();
        noMore.value = contentList.value.length >= mockData.length;
        currentPage.value = page;
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/home/home.vue:195", "获取内容列表失败:", error);
        common_vendor.index.showToast({
          title: "加载失败，请重试",
          icon: "none"
        });
      } finally {
        loading.value = false;
      }
    };
    const calculateWaterfallLayout = async () => {
      waterfall.columnList = Array.from({
        length: waterfall.columnCount
      }, () => []);
      waterfall.columnHeight = Array(waterfall.columnCount).fill(0);
      for (let i = 0; i < contentList.value.length; i++) {
        const item = contentList.value[i];
        if (waterfall.imgHeights[item.id]) {
          assignItemToColumn(item, waterfall.imgHeights[item.id]);
        } else {
          try {
            const imgInfo = await common_vendor.index.getImageInfo({
              src: item.imageUrl
            });
            const imgHeight = imgInfo.height;
            waterfall.imgHeights[item.id] = imgHeight;
            assignItemToColumn(item, imgHeight);
          } catch (error) {
            common_vendor.index.__f__("log", "at pages/home/home.vue:230", "获取图片高度失败:", error);
            waterfall.imgHeights[item.id] = 300;
            assignItemToColumn(item, 300);
          }
        }
      }
    };
    const assignItemToColumn = (item, imgHeight) => {
      const contentHeight = 200;
      const cardTotalHeight = imgHeight + contentHeight;
      let minHeightIndex = 0;
      let minHeight = waterfall.columnHeight[0];
      for (let j = 1; j < waterfall.columnCount; j++) {
        if (waterfall.columnHeight[j] < minHeight) {
          minHeight = waterfall.columnHeight[j];
          minHeightIndex = j;
        }
      }
      waterfall.columnList[minHeightIndex].push(item);
      waterfall.columnHeight[minHeightIndex] += cardTotalHeight;
    };
    const handleImageLoad = (event, item) => {
      common_vendor.index.__f__("log", "at pages/home/home.vue:264", "图片加载完成:", item.id);
    };
    const handleImageError = (e) => {
      common_vendor.index.__f__("log", "at pages/home/home.vue:269", "图片加载失败:", e);
    };
    const loadMoreData = () => {
      if (!noMore.value && !loading.value) {
        fetchContentList(currentPage.value + 1, true);
      }
    };
    const refreshData = () => {
      noMore.value = false;
      Object.keys(waterfall.imgHeights).forEach((key) => {
        delete waterfall.imgHeights[key];
      });
      fetchContentList(1, false);
    };
    const navigateToSearch = () => {
      common_vendor.index.navigateTo({
        url: "/pages/search/search"
      });
    };
    const navigateToDetail = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/detail/detail?id=${id}`
      });
    };
    common_vendor.onMounted(() => {
      fetchContentList(1, false);
    });
    __expose({
      refreshData,
      fetchContentList
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$1,
        b: common_vendor.o(navigateToSearch),
        c: common_vendor.f(waterfall.columnList, (column, columnIndex, i0) => {
          return {
            a: common_vendor.f(column, (item, k1, i1) => {
              return common_vendor.e({
                a: item.imageUrl
              }, item.imageUrl ? {
                b: item.imageUrl,
                c: common_vendor.o(($event) => handleImageLoad($event, item), item.id),
                d: common_vendor.o(handleImageError, item.id)
              } : {
                e: common_vendor.t(item.title)
              }, {
                f: common_vendor.t(item.title),
                g: common_vendor.t(item.author.charAt(0)),
                h: common_vendor.t(item.author),
                i: common_vendor.t(item.likeCount),
                j: item.id,
                k: common_vendor.o(($event) => navigateToDetail(item.id), item.id)
              });
            }),
            b: columnIndex
          };
        }),
        d: common_assets._imports_1,
        e: loading.value
      }, loading.value ? {} : {}, {
        f: noMore.value && contentList.value.length > 0
      }, noMore.value && contentList.value.length > 0 ? {} : {}, {
        g: common_vendor.o(loadMoreData),
        h: contentList.value.length === 0 && !loading.value
      }, contentList.value.length === 0 && !loading.value ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-07e72d3c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/home/home.js.map
