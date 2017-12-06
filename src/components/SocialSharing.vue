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
       * Twitter用 ハッシュタグ
       * ※ 現在未使用
       */
      twitterHashTags: {
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

    // 共通プロパティ
    const url = getMeta('[property="og:url"]')
    const title = getMeta('[property="og:title"]')
    const description = getMeta('[property="og:description"]')

    // サービスごとの share url クエリパラメータを設定する
    switch (this.serviceName) {
      case TWITTER:
        const metaTwitterUser = getMeta('[name="twitter:site"]')

        // twitter 設定用 meta から取得
        const twitterUser = metaTwitterUser ? metaTwitterUser.content.replace('@', '') : null

        url && shareUrlQueries.push(`url=${encodeURIComponent(url)}`)
        title && shareUrlQueries.push(`text=${encodeURIComponent(title)}`)
        twitterUser && shareUrlQueries.push(`via=${twitterUser}`)
        this.twitterHashTags && shareUrlQueries.push(`hashtags=${encodeURIComponent(this.twitterHashTags)}`)
        break;

      case FACEBOOK:
        url && shareUrlQueries.push(`u=${encodeURIComponent(url)}`)
        title && shareUrlQueries.push(`t=${encodeURIComponent(title)}`)
        break;

      case LINE:
        shareUrlQueries.push(
          `${description ? `${encodeURIComponent(description + ' ')}` : ''}${encodeURIComponent(url)}`)
        break;
    }

    // url 構築
    shareInfo.url += shareUrlQueries
      .reduce((prev, current, index) => prev + `${current}${index < (shareUrlQueries.length - 1) ? '&' : ''}`, '?');

    return shareInfo;
  }

  function getMeta(target) {
    const metaObject = document.querySelector(target)
    return metaObject ? metaObject.content : null;

  }
</script>
