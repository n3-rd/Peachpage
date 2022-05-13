<template>
  <q-layout view="hHh LpR fFf">
    <q-header bordered>
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="peachpage-icon.svg" />
          </q-avatar>
          Peachpage
        </q-toolbar-title>
        <q-space />
        <!-- add a dark mode toggle button -->
        <q-btn dense flat round icon="brightness_3" @click="toggleDarkMode" />
        <q-toggle
          v-model="dark"
          checked-icon="dark-mode"
          color="red"
          unchecked-icon="light_mode"
        />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
      <!-- <NoArticles /> -->
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

import NoArticles from "../components/content-holders/NoArticles.vue";
import AddArticle from "../components/AddArticle.vue";
import Articles from "../components/Articles.vue";
import ArticleView from "../components/ArticleView.vue";

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
    },
    setLightMode() {
      localStorage.setItem("dark", "false");
      Dark.set(false);
    },
  },
  mounted() {
    if (localStorage.getItem("dark") === "true") {
      this.setDarkMode();
    } else {
      this.setLightMode();
    }
  },
});
</script>
