<template>  
    <div class="container">  
        <!-- 由于html不区分大小写，所以js中驼峰命名方式在html中要改成用短横线连接的形式 -->  
        <home-header></home-header>  
        <div class="content">
            <ul class="cont_ul">  
                <list  
                    v-for="item in items"  
                    :price="item.price"  
                    :title="item.title">  
                </list>  
            </ul>  
        </div>
    </div>  
</template>
<style>
    .container {
        max-width: 640px;
        margin: 0 auto;
        overflow-x: hidden;
    }
    .cont_ul {
        padding-top: 0.05rem;
        margin: 0 -0.12rem;
        height: 100%;
    }
    .cont_ul:after {
        content: "";
        display: block;
        width: 0;
        height: 0;
        clear: both;
    }
</style>
<script>
    import List from '../components/List'
    import HomeHeader from '../components/HomeHeader'

    export default {
        data () {
            return {
                items :[
                    { price: '123.00', title: '小A' },
                    { price: '123.00', title: '小B' },
                    { price: '123.00', title: '小A' },
                    { price: '123.00', title: '小B' },
                    { price: '123.00', title: '小A' },
                    { price: '123.00', title: '小B' },
                    { price: '123.00', title: '小C' },
                    { price: '123.00', title: '小D' },
                    { price: '123.00', title: '小E' }
                ]
            }
        },
        components:{
            List,
            HomeHeader
        }
    }
</script>