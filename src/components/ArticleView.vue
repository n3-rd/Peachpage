<template>
  <div>
    <div v-for="article in currentArticle" :key="article.id" class="q-px-lg">
      <h4 class="text-center q-px-lg article-title" style="font-size: 2.441rem">
        {{ article.title }}
      </h4>
      <div class="text_small text-center q-mb-lg">
        <span
          >By <span class="article-author">{{ article.author }} </span>
          <span v-if="article.date">on {{ article.date }}</span></span
        >
        <div class="text_small text-center">
          <span v-if="article.source">{{ article.source }}</span>
          <span v-if="article.url" class="q-px-md">
            <a :href="article.url" target="_blank">
              {{ article.url }}
            </a>
            <div class="article-url">{{ article.url }}</div>
          </span>
        </div>
      </div>
      <div class="q-my-lg action-buttons">
        <q-icon
          name="ion-share"
          class="q-px-sm"
          size="sm"
          @click="showShareDialog()"
        />
        <q-icon name="ion-link" class="q-px-sm" size="sm" />
        <!-- <q-icon name="ion-share" class="q-px-sm" /> -->
      </div>

      <div v-html="article.content" class="q-px-md article"></div>
    </div>
  </div>
</template>

<script>
import { liveQuery } from "dexie";
import { useObservable } from "@vueuse/rxjs";
import { db } from "../db";
import { BottomSheet } from "quasar";

export default {
  data() {
    return {
      currentArticle: useObservable(
        liveQuery(() => db.currentArticle.toArray())
      ),
      url: "",
      title: "",
      author: "",
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
      if (h1.textContent == articleTitle.textContent) {
        h1.forEach((tag) => {
          tag.style.display = "none";
        });
      }
    },
    copyLink() {
      const url = document.querySelector(".article-url").textContent;
      navigator.clipboard.writeText(url);
    },
    shareTwitter() {
      window.open(
        `https://twitter.com/intent/tweet?text=Checkout this article, ${this.title} by ${this.author}.&url=${this.url}`,
        "_blank"
      );
    },
    shareFacebook() {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${this.url}&quote=Checkout this article, ${this.title} by ${this.author}.`,
        "_blank"
      );
    },
    shareWhatsapp() {
      window.open(
        `https://wa.me/?text=Checkout this article, ${this.title} by ${this.author}.%5Cn%20${this.url}`,
        "_blank"
      );
    },
    shareTelegram() {
      window.open(
        `https://telegram.me/share/url?url=${this.url}&text=Checkout this article, ${this.title} by ${this.author}.`,
        "_blank"
      );
    },
    shareEmail() {
      window.open(
        `mailto:?subject=Checkout this article, ${this.title} by ${this.author}.&body=${this.url}`,
        "_blank"
      );
    },
    shareReddit() {
      window.open(
        `https://www.reddit.com/submit?url=${this.url}&title=Checkout this article, ${this.title} by ${this.author}.`,
        "_blank"
      );
    },
    showShareDialog() {
      BottomSheet.create({
        // title: "Share",
        message: "share",
        actions: [
          {
            img: "socials/5296514_bird_tweet_twitter_twitter logo_icon.svg",
            label: "Twitter",
            handler: () => this.shareTwitter(),
          },
          {
            img: "socials/5296499_fb_facebook_facebook logo_icon.svg",
            label: "Facebook",
            handler: () => this.shareFacebook(),
          },
          {
            img: "socials/5296520_bubble_chat_mobile_whatsapp_whatsapp logo_icon.svg",
            label: "Whatsapp",
            handler: () => this.shareWhatsapp(),
          },
          {
            img: "socials/3787425_telegram_logo_messanger_social_social media_icon.svg",
            label: "Telegram",
            handler: () => this.shareTelegram(),
          },
          {
            img: "socials/4202011_email_gmail_mail_logo_social_icon.svg",
            label: "Email",
            handler: () => this.shareEmail(),
          },
          {
            img: "socials/3225187_app_logo_media_popular_reddit_icon.svg",
            label: "Reddit",
            handler: () => this.shareReddit(),
          },
        ],
      }).onOk((action) => {
        action.handler();
      });
    },
  },
  updated() {
    this.formatTitles();
    if (localStorage.getItem("addedArticle?") == "true") {
      setTimeout(() => {
        (this.url = document.querySelector(".article-url").textContent),
          (this.title = document.querySelector(".article-title").textContent),
          (this.author = document.querySelector(".article-author").textContent);
      }, 3000);
    }
  },
  mounted() {
    this.formatImages();
    this.formatPreTags();
    this.formatTitles();
    if (localStorage.getItem("addedArticle?") == "true") {
      setTimeout(() => {
        (this.url = document.querySelector(".article-url").textContent),
          (this.title = document.querySelector(".article-title").textContent),
          (this.author = document.querySelector(".article-author").textContent);
      }, 3000);
    }
  },
};
</script>

<style lang="scss" scoped>
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
.action-buttons {
  width: 100%;
  opacity: 0.7;
  // set mobile viewport width
  @media (max-width: 576px) {
    width: 100%;
    text-align: center;
  }
}
</style>
