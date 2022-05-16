<template>
  <div>
    <div v-for="article in currentArticle" :key="article.id" class="q-px-lg">
      <h4 class="text-center q-px-lg article-title" style="font-size: 2.441rem">
        {{ article.title }}
      </h4>
      <div class="text_small text-center q-mb-lg">
        <span
          >By {{ article.author }}
          <span v-if="article.date">on {{ article.date }}</span></span
        >
        <div class="text_small text-center">
          <span v-if="article.source">{{ article.source }}</span>
          <span v-if="article.url" class="q-px-md">
            <a :href="article.url" target="_blank">
              {{ article.url }}
            </a>
          </span>
        </div>
      </div>

      <div v-html="article.content" class="q-px-md article"></div>
    </div>
  </div>
</template>

<script>
import { liveQuery } from "dexie";
import { useObservable } from "@vueuse/rxjs";
import { db } from "../db";
import Prism from "prismjs";

export default {
  data() {
    return {
      currentArticle: useObservable(
        liveQuery(() => db.currentArticle.toArray())
      ),
    };
  },
  methods: {
    // format images
    formatImages() {
      const images = document.querySelectorAll("img");
      images.forEach((image) => {
        image.addEventListener("load", () => {
          //  set explicit height and width for images
          image.style.height = "auto";
          image.style.maxWidth = "100%";
        });
      });
    },
    // format <pre> tags
    formatPreTags() {
      const pre = document.querySelectorAll("pre, code");
      pre.forEach((p) => {
        p.style.overflowX = "auto";
      });
    },
    formatTitles() {
      const h1 = document.querySelectorAll("h1, h2");
      const articleTitle = document.querySelectorAll(".articleTitle");

      console.log(h1.textContent);
      console.log(articleTitle.textContent);
      if (h1.textContent == articleTitle.textContent) {
        console.log(h1);
        h1.forEach((tag) => {
          tag.style.display = "none";
        });
      }
    },
  },
  updated() {
    this.formatImages();
    this.formatPreTags();
    this.formatTitles();
    Prism.highlightAll();
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Montserrat:wght@500&display=swap");
* {
  font-family: "Lato", sans-serif;
  font-family: "Montserrat", sans-serif;
}

html {
  font-size: 100%;
} /*16px*/

.article {
  font-weight: 400;
  line-height: 1.75;
  overflow-x: hidden;
  p {
    margin-bottom: 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    margin: 3rem 0 1.38rem;
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    line-height: 1.3;
  }

  h1 {
    margin-top: 0;
    font-size: 3.052rem;
  }

  h2 {
    font-size: 2.441rem;
  }

  h3 {
    font-size: 1.953rem;
  }

  h4 {
    font-size: 1.563rem;
  }

  h5 {
    font-size: 1.25rem;
  }
  small,
  .text_small {
    font-size: 0.8rem;
  }
  img {
    width: 100% !important;
    max-width: 100%;
    height: auto !important;
  }
  pre,
  code {
    overflow-x: auto !important;
  }
  .article-title {
    font-size: 2.441rem !important;
    font-weight: 600;
  }
}
</style>
