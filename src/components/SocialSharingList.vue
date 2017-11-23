<template>
  <div class="o-action__shareSNS">
    <ul class="o-action__shareSNS--items">

      <!-- facebook -->
      <li class="o-action__shareSNS--item">
        <social-sharing
          service-name="facebook"
          :title="title"
          :description="description">
        </social-sharing>
      </li>

      <!-- twitter -->
      <li class="o-action__shareSNS--item">
        <social-sharing
          service-name="twitter"
          :title="title"
          :twitter-hash-tags="twitterHashTags"
          :twitter-user="twitterUser">
        </social-sharing>
      </li>

      <!-- line -->
      <li class="o-action__shareSNS--item">
        <social-sharing
          service-name="line"
          :description="description">
        </social-sharing>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'social-sharing-list',

    mounted() {
      console.log('sharing mounted!!!!');
    },

    props: {
      /**
       * シェアする URL
       */
      url: {
        type: String,
        default: window.location.href,
      },

      /**
       * シェア内容のタイトル
       */
      title: {
        type: String,
      },

      /**
       * シェア内容の文章
       */
      description: {
        type: String,
      },

      /**
       * Twitter用 ハッシュタグ
       */
      twitterHashTags: {
        type: String,
      },

      /**
       * Twitter用 twitter ユーザ
       */
      twitterUser: {
        type: String,
      },
    }
  }
</script>
