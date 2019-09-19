<template>
    <article>
        <div class="toolbar">
            <!--<span class="backBtn" v-on:click="$emit('more', 'hide')">
                <a></a>
            </span>-->
            <router-link tag="span" class="backBtn" to="/page/" >
                <a></a>
            </router-link>
            <span class="title">
            <a href="">{{id}}</a>
            </span>
        </div>
        <div class="content">
            这里是详情页！传递的参数是：{{$route.params.id}}
            <router-view></router-view>
        </div>
    </article>
</template>

<script>
export default {

    props: ['id'],

    created() {
        console.log('router:', this.$route);
    }

}
</script>

<style>
.toolbar {
    width: 100%;
    height: 50px;
    position: relative;
    background-color: #d43d3d;
}

.toolbar span {
    display: block;
    text-align: center;
    line-height: 50px;
    font-weight: 700;
}

.toolbar span.backBtn {
    width: 44px;
    height: 50px;
    position: absolute;
    left: 0;
    top: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    cursor: pointer;
}

.toolbar span.backBtn a {
    width: 50%;
    height: 50%;
    background: url(//s3a.pstatp.com/growth/wap_misc/image/header_back_86a065fc5fe6605cd32e26fe9a2c9f37.png) no-repeat 50%;
    background-size: 100%;
    display: block;
}
</style>
