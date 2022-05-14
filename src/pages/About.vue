<template>
  <div>
    <!-- add an about me  -->
    <div class="q-pa-lg">
      <!-- add a back button -->
      <q-btn dense flat round icon="arrow_back" @click="goToPage('/')" />
      <h1 class="q-mb-lg">About Me</h1>
      <p>
        Hi, I'm Godwin Jemegah. Iam a full-stack web developer and Designer with
        a passion for creating beautiful and functional web applications with
        the latest tech known to man. <br />
        I am based in the lovely city of Lagos, Nigeria.
      </p>
      <p>
        I am currently a student at the
        <a href="https://unilag.edu.ng">University of Lagos</a>, studying
        History.
      </p>
      <!-- add social icons -->
      <div class="q-flex q-mt-lg">
        <q-btn
          dense
          flat
          round
          icon="ion-logo-github"
          @click="openUrl('https://github.com/n3-rd')"
        />
        <q-btn
          dense
          flat
          round
          icon="ion-logo-linkedin"
          @click="
            openUrl('https://www.linkedin.com/in/godwin-jemegah-759866203')
          "
        />
        <q-btn
          dense
          flat
          round
          icon="ion-logo-twitter"
          @click="openUrl('https://twitter.com/web_n3rd')"
        />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    goToPage(page) {
      this.$router.push(page);
    },
    openUrl(url) {
      openURL(url);
    },
  },
};
</script>
