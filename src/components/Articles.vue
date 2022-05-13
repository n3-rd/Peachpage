<template>
  <div>
    <!-- create a list for articles -->
    <q-list>
      <div
        v-for="article in articles"
        :key="article.id"
        class="q-py-md cursor-pointer"
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
        <q-item>
          <q-item-section top avatar>
            <q-avatar color="primary">
              <img :src="article.image" alt="" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ article.title }}</q-item-label>
            <q-item-label caption lines="2">
              {{ article.source }}
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>
              <span v-if="article.ttr > 60">
                {{ Math.floor(article.ttr / 60) }} minutes
              </span>
              <span v-else> {{ article.ttr }} seconds </span>
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

export default {
  data() {
    return {
      articles: useObservable(liveQuery(() => db.articles.toArray())),
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
  },
};
</script>
