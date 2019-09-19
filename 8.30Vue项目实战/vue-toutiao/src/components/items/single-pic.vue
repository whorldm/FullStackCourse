<template>
  <div class="item single-pic">
    <div class="content">
      <span class="line3">{{title}}</span>
    </div>
    <img :src="imgUrl" />
  </div>
</template>

<script>
export default {

  props: ["title", "imageList"],

  computed: {
    imgUrl() {
      return this.imageList[0];
    }
  }

};
</script>

<style scoped>
@import './index.css';
.single-pic {
    display: flex;
    justify-content: space-around;
}

.single-pic .content {
    flex: 1;
    padding-right: 24px;
}

.single-pic img {
    width: 35%;
    display: block;
}
</style>
