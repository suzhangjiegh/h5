<template>
	<div class="detail">>
		<detail-header></detail-header>
		<div>
        <h1>这是来自store的信息:{{ message }}</h1>
        <br>
        这是来自全居js的这种方法好像是错误的:
        <input type="text" id="clock" size="35" />
        <br>
        <br>
        <h2>这是来自data的:{{ msg1 }}</h2>
        <br>
        <br>
        <h2>这是来自method1的信息{{ method1(2,3) }}</h2>
        <br>
        <br>
        <h2>这是来自method2的信息{{ method2(4
        ,3) }}</h2>
        <br>
        <br>
         <h2>date:{{ date }}</h2>
        <br>
        <br>
        <!-- <h2>这是来自method3的信息{{ method3() }}</h2> -->
		</div>
	</div>
</template>
<style>
.detail {
	padding: 0.24rem;
	font-size: 12px;
}
</style>
<script>
  import Vue from 'vue'
  import DetailHeader from '../components/DetailHeader'
  import { mapGetters } from 'vuex'

  let a = '1234567'

  export default {
    data () {
      return {
        msg1 : '1234'
      }
    },
    created () {
      console.log('消息分发date')
      this.$store.dispatch('getTime')
    },
    components : {
       DetailHeader
    },
    computed: mapGetters({
      message: 'message',
      date: 'date'
    }),
    methods : {
      method1 : function (a, b) {
        return a + b
      },
      method2 : (a, b) => a + b
    }
  }
  // vm.msg1 = '123456'
  // vm
</script>