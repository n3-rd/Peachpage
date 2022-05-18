<template>
  <div>
    <div v-if="showIllustration">
      <NoArticles />
    </div>
    <!-- create a list for articles -->
    <q-list>
      <div
        v-for="article in articles"
        :key="article.id"
        class="article-container q-my-sm q-px-sm cursor-pointer"
        @click="
          setCurrentArticle(
            article.id,
            article.author,
            article.image,
            article.title,
            article.source,
            article.date,
            article.url,
            article.content,
            article.ttr
          )
        "
      >
        <q-popup-proxy context-menu>
          <q-banner>
            <template v-slot:avatar>
              <q-icon name="delete" color="negative" />

              <q-list>
                <q-item
                  clickable
                  v-close-popup
                  @click="deleteArticle(article.id)"
                >
                  <q-item-section>Delete Article</q-item-section>
                </q-item>
              </q-list>
            </template>
          </q-banner>
        </q-popup-proxy>
        <q-item v-ripple:accent>
          <q-item-section top avatar>
            <q-avatar color="primary">
              <img :src="article.image" alt="" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="ellipsis article-title-info">
              <q-tooltip> {{ article.title }} </q-tooltip
              >{{ article.title }}</q-item-label
            >
            <q-item-label class="ellipsis" caption lines="2">
              {{ article.source }}
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>
              <span v-if="article.ttr > 60">
                {{ Math.floor(article.ttr / 60) }}m
              </span>
              <span v-else> {{ article.ttr }}s </span>
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </q-list>
  </div>
</template>

<script>
import { liveQuery } from "dexie";
import { useObservable } from "@vueuse/rxjs";
import { db } from "../db";
import { Notify } from "quasar";
import NoArticles from "../components/content-holders/NoArticles.vue";

export default {
  components: {
    NoArticles,
  },
  data() {
    return {
      articles: useObservable(liveQuery(() => db.articles.toArray())),
      articlesList: "",
      showIllustration: false,
    };
  },
  methods: {
    async setCurrentArticle(
      ID,
      author,
      image,
      title,
      source,
      date,
      url,
      content,
      ttr
    ) {
      try {
        // await db.currentArticle.where("title").equals(title).delete();
        const id = await db.currentArticle.put({
          id: 0,
          author: author,
          image: image,
          title: title,
          source: source,
          date: date,
          image: image,
          url: url,
          content: content,
          ttr: ttr,
        });
        this.status = `current article set to ${this.title}
          successfully added. Got id ${id}`;
      } catch (e) {
        console.log(e);
      }
    },
    async deleteArticle(id) {
      try {
        await db.articles.delete(id);
        Notify.create({
          message: "Article deleted successfully",
          type: "positive",
          timeout: 3000,
        });
      } catch (e) {
        console.log(e);
        Notify.create({
          message: "An Error occured while deleting article",
          type: "negative",
        });
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.articlesList = document.querySelector(".q-list");
      console.log(this.articlesList.children.length);
      setInterval(() => {
        if (this.articlesList.children.length === 0) {
          this.showIllustration = true;
        } else {
          this.showIllustration = false;
        }
      }, 100);
    }, 2000);
  },
  updated() {
    setTimeout(() => {
      this.articlesList = document.querySelector(".q-list");
      console.log(this.articlesList.children.length);
      setInterval(() => {
        if (this.articlesList.children.length === 0) {
          this.showIllustration = true;
        } else {
          this.showIllustration = false;
        }
      }, 100);
    }, 2000);
  },
};
</script>

<style lang="scss" scoped>
.q-list {
  margin-bottom: 0;
}
.article-title-info {
  font-weight: 600;
  opacity: 0.8;
}
.article-container {
  border-radius: 26px;
}
</style>
