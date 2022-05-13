<template>
  <div>
    <q-dialog v-model="articleLinkDialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Link to article</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="articleLink"
            autofocus
            @keyup.enter="fetchArticle"
            color="accent"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-accent">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn
            flat
            label="Fetch Article"
            v-close-popup
            @click="fetchArticle"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
      @click="showArticleInput"
    >
      <q-btn fab icon="add" color="accent" />
    </q-page-sticky>
  </div>
</template>
<script>
import { db } from "../db";
export default {
  data() {
    return {
      articleLinkDialog: false,
      articleLink: "",
      parsedArticle: [],
      status: "",
    };
  },
  methods: {
    showArticleInput() {
      this.articleLinkDialog = true;
    },
    fetchArticle() {
      fetch(`https://article-scrapper.glitch.me?url=${this.articleLink}`)
        .then((response) => response.json())
        .then((formattedArticle) => {
          if (formattedArticle.error === 0) {
            console.log(formattedArticle);
            this.parsedArticle = formattedArticle.data;
            this.addArticle();
          } else {
            console.log("something went wrong");
          }
        });
    },
    async addArticle() {
      try {
        const id = await db.articles.add({
          author: this.parsedArticle.author,
          image: this.parsedArticle.image,
          title: this.parsedArticle.title,
          source: this.parsedArticle.source,
          date: this.parsedArticle.published,
          image: this.parsedArticle.image,
          url: this.parsedArticle.links[0],
          content: this.parsedArticle.content,
          ttr: this.parsedArticle.ttr,
        });

        this.status = `Article ${this.parsedArticle.title}
          successfully added. Got id ${id}`;
        console.log(this.status);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
