console.log('app!!');

import Vue from 'vue';
import SocialSharing from './components/SocialSharing.vue'
import SocialSharingList from './components/SocialSharingList.vue'
import Test from './components/Test.vue'

Vue.component('social-sharing', SocialSharing);
Vue.component('social-sharing-list', SocialSharingList);
Vue.component('test', Test);


new Vue({
  el: '#app',
  data: {
  },
});
