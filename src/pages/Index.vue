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
          <q-btn flat round icon="brightness_3" @click="toggleDarkMode" />
        </div>
        <div v-if="dark">
          <q-btn flat round icon="light_mode" @click="toggleDarkMode" />
        </div>
        <!-- <a href="https://github.com/n3-rd/Peachpage" class="initial-link"> -->
        <q-btn
          flat
          round
          icon="ion-logo-github"
          @click="openUrl('https://github.com/n3-rd/Peachpage')"
        />
        <q-btn
          flat
          round
          icon="ion-information-circle"
          @click="goToPage('/About')"
        />
        <!-- </a> -->
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

// import NoArticles from "../components/content-holders/NoArticles.vue";
import AddArticle from "../components/AddArticle.vue";
import Articles from "../components/Articles.vue";
import ArticleView from "../components/ArticleView.vue";
import { openURL } from "quasar";

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
