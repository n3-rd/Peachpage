<template>
  <q-layout view="hHh LpR fFf">
    <q-header class="bg-white light-text" bordered>
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="peachpage-icon.svg" />
          </q-avatar>
          Peachpage
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
      <NoArticles />
      <AddArticle />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import NoArticles from "../components/content-holders/NoArticles.vue";
import AddArticle from "../components/addArticle.vue";

export default defineComponent({
  name: "PageIndex",
  components: {
    NoArticles,
    AddArticle,
  },
  data() {
    return {
      leftDrawerOpen: false,
    };
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
  },
});
</script>
