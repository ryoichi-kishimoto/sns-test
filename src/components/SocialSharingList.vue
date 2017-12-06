<template>
  <div class="o-action__shareSNS">
    <ul class="o-action__shareSNS--items">

      <!-- facebook -->
      <li class="o-action__shareSNS--item">
        <social-sharing service-name="facebook" />
      </li>

      <!-- twitter -->
      <li class="o-action__shareSNS--item">
        <social-sharing service-name="twitter" />
      </li>

      <!-- line -->
      <li class="o-action__shareSNS--item">
        <social-sharing service-name="line" />
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'social-sharing-list',

    props: {
      /**
       * Twitter用 ハッシュタグ
       */
      twitterHashTags: {
        type: String,
      },
    }
  }
</script>
