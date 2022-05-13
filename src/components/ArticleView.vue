<template>
  <div>
    <div v-for="article in currentArticle" :key="article.id" class="q-px-lg">
      <h2 class="text-center q-px-lg">{{ article.title }}</h2>
      <div class="text_small text-center q-mb-lg">
        <span
          >By {{ article.author }}
          <span v-if="article.date">on {{ article.date }}</span></span
        >
      </div>

      <div v-html="article.content" class="q-px-md"></div>
    </div>
  </div>
</template>

<script>
import { liveQuery } from "dexie";
import { useObservable } from "@vueuse/rxjs";
import { db } from "../db";
export default {
  data() {
    return {
      currentArticle: useObservable(
        liveQuery(() => db.currentArticle.toArray())
      ),
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Montserrat:wght@500&display=swap");
* {
  font-family: "Lato", sans-serif;
  font-family: "Montserrat", sans-serif;
}

html {
  font-size: 100%;
} /*16px*/

body {
  font-weight: 400;
  line-height: 1.75;
}

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
</style>
