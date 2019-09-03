<template>
  <div class="item multiple-image" on:click="aa">
    <h3 class="line3">{{title}}</h3>
    <div class="image-list">
      <img v-for="(imgPath, index) in imageList" :key="index" :src="imgPath" />
    </div>
  </div>
</template>

<script>
export default {

  props: ["title", "imageList"],

  data() {
    return {};
  }
  
};
</script>

<style scoped>
@import './index.css';
.multiple-image .image-list img {
    width: 33%;
}
</style>
