<template>
  <a :href="share.url" @click.prevent="openShareWindow(share.url)">

    <slot>
      <i :class="`i-${serviceName}64`">{{ serviceName }}</i>
    </slot>

  </a>
</template>

<script>

  /**
   * サービス名
   */
  const TWITTER = 'twitter'
  const FACEBOOK = 'facebook'
  const LINE = 'line'

  /**
   * サービスごとのデフォルト設定
   *
   * @type {string} url シェア用 URL
   */
  const SERVICE_INFO = {
    [FACEBOOK]: {
      url: 'https://www.facebook.com/sharer/sharer.php',
    },

    [TWITTER]: {
      url: 'https://twitter.com/intent/tweet',
    },

    [LINE]: {
      url: 'http://line.me/R/msg/text/',
    },
  }

  /**
   * シェアボタンが設定可能なサービス名のリスト
   */
  const ENABLE_LIST = [TWITTER, FACEBOOK, LINE];

  export default {
    name: 'social-sharing',

    props: {
      /**
       * 表示する share ボタンのサービス名。ENABLE_LIST のいずれか。
       */
      serviceName: {
        type: String,
        validator(value) {
          return ENABLE_LIST.includes(value);
        },
      },

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

      /**
       * シェアウィンドウ設定
       *
       * @see https://developer.mozilla.org/ja/docs/Web/API/window.open
       */
      width: {
        type: Number,
        default: 650,
      },

      height: {
        type: Number,
        default: 550,
      },

      top: {
        type: Number,
        default: 0,
      },

      left: {
        type: Number,
        default: 0,
      },

      scrollbars: {
        type: Boolean,
        default: true,
      },

      resizable: {
        type: Boolean,
        default: true,
      },
    },

    computed: {
      share() {
        return buildShareInfo.call(this)
      }
    },

    methods: {
      /**
       * シェア用別ウィンドウを開く
       *
       * @param {string} shareUrl
       *
       */
      openShareWindow(shareUrl) {
        // 既存の window がある場合は閉じる
        if (this.shareWindow) {
          this.shareWindow.close();
        }

        const features = `
           left=${this.left},
           top=${this.top}',
           height=${this.height}',
           width=${this.width}',
           scrollbars=${this.scrollbars ? 'yes' : 'no'},
           resizable=${this.resizable ? 'yes' : 'no'}
          `
        this.shareWindow = window.open(
          shareUrl,
          'sharer',
          features,
        );
      }
    },
  }

  /**
   * シェアボタン用の情報を生成する
   *
   * @return {Object} shareInfo シェアボタン用の情報
   */
  function buildShareInfo() {
    const shareInfo = SERVICE_INFO[this.serviceName];
    const shareUrlQueries = [];

    // サービスごとの share url クエリパラメータを設定する
    switch (this.serviceName) {
      case TWITTER:
        const metaTwitterUser = document.querySelector('[name="twitter:site"]')

        if(!this.twitterUser) {
          // meta から取得
          this.twitterUser = metaTwitterUser ? metaTwitterUser.content.replace('@', ''): null
        }

        this.url && shareUrlQueries.push(`url=${encodeURIComponent(this.url)}`)
        this.title && shareUrlQueries.push(`text=${encodeURIComponent(this.title)}`)
        this.twitterHashTags && shareUrlQueries.push(`hashtags=${encodeURIComponent(this.twitterHashTags)}`)
        this.twitterUser && shareUrlQueries.push(`via=${this.twitterUser}`)
        break;

      case FACEBOOK:
        this.url && shareUrlQueries.push(`u=${encodeURIComponent(this.url)}`)
        this.title && shareUrlQueries.push(`t=${encodeURIComponent(this.title)}`)
        break;

      case LINE:
        shareUrlQueries.push(
          `${this.description ? `${encodeURIComponent(this.description + ' ')}` : ''}${encodeURIComponent(this.url)}`)
        break;
    }

    // url 構築
    shareInfo.url += shareUrlQueries
      .reduce((prev, current, index) => prev + `${current}${index < (shareUrlQueries.length - 1) ? '&' : ''}`, '?');

    return shareInfo;
  }
</script>
