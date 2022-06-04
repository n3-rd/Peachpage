<template>
  <q-layout view="hHh LpR fFf">
    <q-header bordered>
      <q-toolbar>
        <q-btn dense flat round icon="ion-menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="toolbar-title">
          <q-avatar class="gt-sm app-icon">
            <img src="peachpage-icon.svg" />
          </q-avatar>
          Peachpage
        </q-toolbar-title>
        <!-- add a dark mode toggle button -->
        <div v-if="!dark">
          <q-btn flat round icon="brightness_3" @click="toggleDarkMode">
            <q-tooltip> Switch to Dark Mode </q-tooltip>
          </q-btn>
        </div>
        <div v-if="dark">
          <q-btn flat round icon="light_mode" @click="toggleDarkMode">
            <q-tooltip> Switch to Light Mode </q-tooltip>
          </q-btn>
        </div>
        <!-- <a href="https://github.com/n3-rd/Peachpage" class="initial-link"> -->
        <q-btn
          flat
          round
          icon="ion-logo-github"
          @click="openUrl('https://github.com/n3-rd/Peachpage')"
        >
          <q-tooltip> Go to Github repo </q-tooltip>
        </q-btn>

        <!-- ###### Future export database function -->
        <!-- <q-btn flat round icon="cloud" @click="exportDB()" /> -->
        <!-- </a> -->

        <q-btn
          flat
          round
          icon="ion-information-circle"
          @click="goToPage('/About')"
        >
          <q-tooltip> About the Developer </q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left">
      <!-- drawer content -->

      <Articles />
      <AddArticle />
    </q-drawer>

    <q-page-container>
      <ArticleView />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import { Dark } from "quasar";
import { db } from "../db";
import {
  importDB,
  exportDB,
  importInto,
  peakImportFile,
} from "dexie-export-import";

// import NoArticles from "../components/content-holders/NoArticles.vue";
import AddArticle from "../components/AddArticle";
import Articles from "../components/Articles.vue";
import ArticleView from "../components/ArticleView.vue";
import { openURL } from "quasar";
import download from "downloadjs";

export default defineComponent({
  name: "PageIndex",
  components: {
    // NoArticles,
    AddArticle,
    Articles,
    ArticleView,
  },
  data() {
    return {
      leftDrawerOpen: false,
      dark: Dark.isActive,
      noArticlesIllustration: false,
      appJson: [],
    };
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
    toggleDarkMode() {
      if (Dark.isActive) {
        this.setLightMode();
      } else {
        this.setDarkMode();
      }
      // Dark.toggle();
      console.log(Dark);
    },
    setDarkMode() {
      localStorage.setItem("dark", "true");
      Dark.set(true);
      this.dark = Dark.isActive;
    },
    setLightMode() {
      localStorage.setItem("dark", "false");
      Dark.set(false);
      this.dark = Dark.isActive;
    },
    openUrl(link) {
      openURL(link);
    },
    goToPage(page) {
      this.$router.push(page);
    },
    async checkIfArticleExists() {
      await console.log(db.articles);
    },
    removenoArticlesIllustration() {
      db.articles.count().then((count) => {
        if (!count === 0) {
          this.noArticlesIllustration = false;
          console.log(count);
        }
      });
    },
    async exportDB() {
      try {
        const blob = await exportDB(db, { prettyJson: true });
        // convert blob to JSON
        const json = await blob.text();
        console.log(json);
        // download JSON

        this.appJson = json;
        // download(blob, "Peachpage.json", "application/json");
      } catch (e) {
        console.log(e);
      }
    },
    sendJson() {
      fetch(`http://192.168.43.235:3000/savejson?appJson`);
    },
  },
  mounted() {
    if (localStorage.getItem("dark") === "true") {
      this.setDarkMode();
    } else {
      this.setLightMode();
    }
    this.checkIfArticleExists();
  },
  updated() {},
});
</script>
<style lang="scss" scoped>
.toolbar-title {
  font-weight: 600;
  opacity: 0.9;
}
.q-toolbar {
  opacity: 0.9;
}
.app-icon {
  vertical-align: bottom;
}
</style>
