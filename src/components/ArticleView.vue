<template>
  <div>
    <div>
      <q-dialog v-model="newUserDialog">
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="q-pa-md">
              <div class="text-right">
                <q-icon name="ion-close" size="md" v-close-popup />
              </div>
              <h4>Welcome To Peachpage!</h4>
              <div class="text-subtitle">
                Here you can save articles you find interesting to read later.
              </div>
              <div>
                Articles will be saved in your device, so you can access them
                later. You can also share them with your friends.
              </div>
              <div>Right now, you have no articles saved.</div>
              <div>
                Create a new article by clicking the button in the menu.
              </div>
              <div>
                <img src="help/open-menu.png" alt="open menu" /><br />
                <img src="help/add-article.png" alt="open menu" />
              </div>
              <div>Right Click or long press on an article to delete it.</div>
              <div>
                <img src="help/delete-article.png" alt="open menu" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
    <div v-for="article in currentArticle" :key="article.id" class="q-px-lg">
      <q-page-sticky position="bottom-right" :offset="[18, 18]" class="z-max">
        <q-btn fab icon="ion-help" color="info" @click="openForm()" />
      </q-page-sticky>

      <q-dialog v-model="formDialog">
        <q-card style="min-width: 350px">
          <q-card-section>
            <q-form name="Contact Form" @submit="showFormSubmitted" netlify>
              <div class="text-h6">Report error in article</div>
              <p>
                <q-input
                  v-model="formText"
                  type="textarea"
                  name="text"
                  label="Your feedback"
                  color="accent "
                />
              </p>
              <p>
                <q-input
                  v-model="formEmail"
                  type="email"
                  name="email"
                  label="Your Email"
                  color="accent"
                />
              </p>
              <q-input outlined label="link" :dense="dense" readonly>
                {{ article.url }}
              </q-input>
              <p>
                <q-btn
                  class="q-my-md"
                  color="accent"
                  label="Submit"
                  type="submit"
                  v-close-popup
                />
              </p>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>
      <div class="main-article">
        <div
          class="text-center q-px-lg article-title q-mb-md"
          style="font-size: 2.141rem"
        >
          {{ article.title }}
        </div>
        <div class="text_small text-center q-mb-lg">
          <span>
            <span class="article-author" v-if="article.author"
              >By {{ article.author }}
            </span>
            <div v-if="article.date">{{ formatDate(article.date) }}</div></span
          >
          <div class="text_small text-center">
            <span v-if="article.source">{{ article.source }}</span>
            <span v-if="article.url" class="q-px-md">
              <a :href="article.url" class="article-url" target="_blank">
                {{ article.url }}
              </a>
            </span>
          </div>
        </div>
        <div class="q-my-lg action-buttons">
          <q-icon
            name="ion-share"
            class="q-px-sm cursor-pointer"
            size="sm"
            @click="showShareDialog()"
          />
          <q-icon name="ion-link" class="q-px-sm" size="sm" />
          <!-- <q-icon name="ion-share" class="q-px-sm" /> -->
        </div>

        <div v-if="article.image" id="article-image">
          <q-img
            :src="article.image"
            :ratio="16 / 9"
            spinner-color="accent"
            spinner-size="82px"
          />
        </div>

        <div v-html="article.content" class="q-px-md q-mt-lg article"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { liveQuery } from "dexie";
import { useObservable } from "@vueuse/rxjs";
import { db } from "../db";
import { BottomSheet } from "quasar";
import moment from "moment";
import { Notify } from "quasar";

// format 2020-03-23T23:39:13.179Z
function formatDate(date) {
  return moment(date).format("MMMM Do YYYY, h:mm:ss a");
}

export default {
  data() {
    return {
      currentArticle: useObservable(
        liveQuery(() => db.currentArticle.toArray())
      ),
      url: "",
      title: "",
      author: "",
      formText: "",
      formEmail: "",
      formDialog: false,
      newUserDialog: false,
    };
  },
  methods: {
    // format images
    formatImages() {
      const images = document.querySelectorAll("img");
      images.forEach((image) => {
        image.addEventListener("load", () => {
          // remove image height and width attributes
          image.removeAttribute("height");
          image.removeAttribute("width");

          //  set explicit height and width for images
          image.style.height = "auto!important";
          image.style.maxWidth = "100%!important";
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
    formatDate(date) {
      return moment(date).format("MMMM Do YYYY");
    },
    openForm() {
      this.formDialog = true;
    },

    showFormSubmitted() {
      (this.formText = ""),
        (this.formEmail = ""),
        Notify.create("Feedback shared with developer!");
    },
    checkNewUser() {
      if (!localStorage.getItem("newUserDialog")) {
        this.newUserDialog = true;
        localStorage.setItem("newUserDialog", "false");
      } else {
        this.newUserDialog = false;
      }
    },
  },
  updated() {
    this.formatTitles();

    setTimeout(() => {
      (this.url = document.querySelector(".article-url").textContent),
        (this.title = document.querySelector(".article-title").textContent),
        (this.author = document.querySelector(".article-author").textContent);
    }, 1200);
  },
  mounted() {
    this.formatImages();
    this.formatPreTags();
    this.formatTitles();
    this.checkNewUser();
    setTimeout(() => {
      (this.url = document.querySelector(".article-url").textContent),
        (this.title = document.querySelector(".article-title").textContent),
        (this.author = document.querySelector(".article-author").textContent);
      this.formatImages();
      this.formatPreTags();
      this.formatTitles();
    }, 1200);

    // replace img tags with q-img
  },
};
</script>

<style lang="scss">
@import "https://fonts.googleapis.com/css?family=Lato:900,700,400";

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.main-article {
  h1 {
    font-family: "Lato", sans-serif;
    font-size: 28px;
    font-weight: 900;
    line-height: 1.2;
    opacity: 1;
    margin-top: 0px;
    margin-bottom: 10px;
    letter-spacing: -0.72px;
    word-spacing: 0px;
    text-transform: none;
  }

  h2 {
    font-family: "Lato", sans-serif;
    font-size: 24px;
    font-weight: 700;
    line-height: 1.2;
    opacity: 1;
    margin-top: 30px;
    margin-bottom: 5px;
    letter-spacing: -0.72px;
    word-spacing: 0px;
    text-transform: none;
  }

  h3 {
    font-family: "Lato", sans-serif;
    font-size: 20px;
    font-weight: 400;
    line-height: 1.2;
    opacity: 1;
    margin-top: 30px;
    margin-bottom: 5px;
    letter-spacing: 0px;
    word-spacing: 0px;
    text-transform: none;
  }

  p {
    // font-family: "proxima-nova-thin", sans serif;
    font-size: 18px;
    font-weight: 400;
    line-height: 1.6;
    opacity: 1;
    // margin-top: 0px;
    // margin-bottom: 25px;
    margin: 0 2em 25px 2em;
    letter-spacing: -0.3px;
    word-spacing: -0.1px;
    text-transform: none;
  }

  // font-weight: 400;
  // line-height: 1.75;
  // overflow-x: hidden;

  h4 {
    font-size: 1.563rem;
  }

  h5 {
    font-size: 1.25rem;
  }
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

.action-buttons {
  width: 100%;
  opacity: 0.7;
  // set mobile viewport width
  @media (max-width: 576px) {
    width: 100%;
    text-align: center;
  }
}
.main-title {
  @media (max-width: $breakpoint-md-max) {
    margin: 0 2em;
  }
}
</style>
