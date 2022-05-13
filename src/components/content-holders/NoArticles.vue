<template>
  <div>
    <div class="illustation-container">
      <img src="illustrations/undraw_new_entries_re_cffr.svg" />
      <div class="text">
        No Articles yet, click the button below to add one.
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "NoArticles",
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.illustation-container {
  justify-content: center;
  align-items: center;
  height: 60%;
  width: 80%;
  margin: 27% auto;
  img {
    width: 100%;
  }
  .text {
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: 1rem;
  }
}
</style>
