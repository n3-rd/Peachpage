<template>
  <div>
    <q-list>
      <div
        v-for="article in bookmarks"
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
        <q-popup-proxy context-menu v-if="article.bookmark">
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
        <q-item v-ripple:accent v-if="article.bookmark">
          <q-item-section top avatar>
            <q-avatar color="accent">
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
          <q-item-section side v-if="article.bookmark == false">
            <q-icon name="bookmark" @click="removeBookmark(article.id)" />
          </q-item-section>
          <q-item-section side v-if="article.bookmark == true">
            <q-icon
              name="bookmark"
              color="positive"
              @click="removeBookmark(article.id)"
            />
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

export default {
  data() {
    return {
      bookmarks: useObservable(liveQuery(() => db.articles.toArray())),
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
    deleteArticle(id) {
      db.articles.delete(id);
      Notify.create({
        message: "Article Deleted",
        color: "negative",
        icon: "delete_forever",
      });
    },
    removeBookmark(id) {
      db.articles.update(id, { bookmark: false });
      Notify.create({
        message: "Article Removed from Bookmarks",
        color: "negative",
        icon: "delete_forever",
      });
    },
  },
};
</script>
