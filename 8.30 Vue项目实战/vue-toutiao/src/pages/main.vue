<template>
  <article>
    <keep-alive>
      <component
        v-bind:is="page"
        v-bind:tabs="tabs"
        v-bind:curTab.sync="curTab"
        v-on:more="showMoreTab"
      >
        <!-- 单个Tab -->
        <template v-slot:content="{list}">
          <component
            v-bind:is="item.type | formatComponentName"
            v-for="(item, key) in list"
            v-bind:key="key"
            v-bind="item.data"
          ></component>
        </template>
      </component>
    </keep-alive>
  </article>
</template>

<script>
import * as components from "../components/items/index";
import Tab from "../components/tab.vue";
import Loading from "../components/loading.vue";
import Setting from "../pages/setting.vue";
import { TABS } from "../config";

// const convertModuleToObj = moduleObj => {
//   let result = {};
//   for (let moduleName in moduleObj) {
//     result[moduleName] = moduleObj[moduleName];
//   }
//   return result;
// };
const convertModuleToObj = moduleObj =>
  Object.keys(moduleObj).reduce((res, key) => {
    res[key] = moduleObj[key];
    return res;
  }, {});

export default {
  components: {
    ...convertModuleToObj(components),
    Tab,
    Setting,
    Agriculture: () => import("../components/items/agriculture.vue")
  },

  data() {
    const constructTabs = tabs => {
      const result = {};
      for (let name in tabs) {
        result[name] = {
          label: tabs[name],
          index: 0,
          list: []
        };
      }
      return result;
    };

    return {
      content: "这是一个vue的页面",
      listData: [],
      page: "tab",
      curTab: "agriculture",
      tabs: constructTabs(TABS)
    };
  },

  filters: {
    formatComponentName(componentName) {
      return componentName.replace(/^\w/g, name => name.toUpperCase());
    }
  },

  watch: {
    curTab(newVal, oldVal) {
      this.switchTab(newVal);
    }
  },

  created() {
    this.getListData(this.curTab).then(data => {
      this.setTabData(this.curTab, {
        list: data
      });
    });
  },

  methods: {
    onReachBottom() {
      console.log("loading");
      this.getListData(this.curTab).then(data => {
        this.setTabData(this.curTab, {
          list: this.tabs[this.curTab].list.concat(data)
        });
      });
    },

    getListData(tabName) {
      const tab = this.tabs[this.curTab];
      return fetch(`/list?tab=${tabName}&index=${tab.index}`)
        .then(res => res.json())
        .then(res => res.data);
    },

    setTabData(tabName, data) {
      this.$set(this.tabs, tabName, {
        ...this.tabs[tabName],
        ...data
      });
    },

    switchTab(tagName) {
      this.curTab = tagName;
      if (!this.tabs[this.curTab].list.length) {
        this.getListData(this.curTab).then(data => {
          this.setTabData(this.curTab, {
            list: data
          });
        });
      }
    },

    showMoreTab(event) {
      if (event === "hide") {
        this.page = "tab";
      } else {
        // this.page = 'setting';
        this.$router.push("/page/setting");
      }
    }
  }
};
</script>
