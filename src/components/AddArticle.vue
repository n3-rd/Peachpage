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
      <q-btn fab icon="add" color="accent">
        <q-tooltip> Add article </q-tooltip>
      </q-btn>
    </q-page-sticky>
  </div>
</template>
<script>
import { db } from "../db";
import { Notify } from "quasar";

export default {
  name: "AddArticle",
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
      this.articleLinkDialog = false;
      const fetching = Notify.create({
        message: "Fetching article...",
        type: "info",
      });
      fetch(
        `https://n3rd-article-scraper.herokuapp.com/?url=${this.articleLink}`
      )
        .then((response) => response.json())
        .then((formattedArticle) => {
          if (formattedArticle.error === 0) {
            console.log(formattedArticle);
            this.parsedArticle = formattedArticle.data;
            this.addArticle();
            fetching();
            setTimeout(() => {
              Notify.create({
                message: "Article fetched successfully",
                type: "positive",
              });
            }, 3000);
            this.articleLink = "";
            localStorage.setItem("addedArticle?", "true");
          } else {
            console.log("something went wrong");
            setTimeout(() => {
              Notify.create({
                message: "An Error occured",
                type: "negative",
              });
            }, 3000);
            Notify.create({
              message: "Article may be invalid or mostly dynamic or web based",
              type: "negative",
              timeout: 3000,
            });
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
          bookmark: false,
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
