// plugins/tracking.client.ts
import { kakaoPixelTrackId , wcsAccountId,  tiktokPixelTrackId} from '../constants/index'

export default defineNuxtPlugin(() => {
    // 开发环境跳过
    // if (import.meta.dev) return
     console.log(__BUILD_TARGET__,'__BUILD_TARGET__')
     if(['pc','mobile','xpre','ypre'].includes(__BUILD_TARGET__)) {
      useHead({
        script: [
            // Kakao Pixel
            {
              key: 'kakao-pixel-script',
              src: '//t1.daumcdn.net/kas/static/kp.js',
              type: 'text/javascript',
              onload: `
                window.kakaoPixel('${kakaoPixelTrackId}').pageView();
              `,
            },
           // 第一个：内联提前定义 wcs_add
            {
              key: 'wcs-add-init',
              innerHTML: `
                if (!window.wcs_add) window.wcs_add = {};
                window.wcs_add["wa"] = "${wcsAccountId}";
              `,
            },
            // 第二个：加载脚本，onload 里只做 inflow 和 wcs_do
            {
              key: 'wcs-log-script',
              src: '//wcs.naver.net/wcslog.js',
              type: 'text/javascript',
              onload: `
                if (!window._nasa) window._nasa = {};
                if (window.wcs) {
                  wcs.inflow('khunter.dawnbreaking.com');
                  wcs_do();
                }
              `,
            },
                // ── Google Analytics + Google Ads ──────────────────
            {
              key: 'gtag-script',
              src: 'https://www.googletagmanager.com/gtag/js?id=G-8E354RMPNS',
              async: true,
            },
            {
              key: 'gtag-init',
              innerHTML: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){ dataLayer.push(arguments); }
                gtag('js', new Date());
                gtag('config', 'G-8E354RMPNS');
              `,
            },
        ],
      })
     }
    useHead({
      script: [
        // ── Meta Pixel ─────────────────────────────────────
        {
          key: 'fb-pixel',
          innerHTML: `
            !(function (f, b, e, v, n, t, s) {
              if (f.fbq) return
              n = f.fbq = function () {
                n.callMethod
                  ? n.callMethod.apply(n, arguments)
                  : n.queue.push(arguments)
              }
              if (!f._fbq) f._fbq = n
              n.push = n
              n.loaded = !0
              n.version = '2.0'
              n.queue = []
              t = b.createElement(e)
              t.async = !0
              t.src = v
              s = b.getElementsByTagName(e)[0]
              s.parentNode.insertBefore(t, s)
            })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
            fbq('init', '1703767447303012')
            fbq('track', 'PageView')
          `,
        },
  
        // ── TikTok Pixel ───────────────────────────────────
        {
          key: 'tiktok-pixel',
          innerHTML: `
            !function (w, d, t) {
              w.TiktokAnalyticsObject = t
              var ttq = w[t] = w[t] || []
              ttq.methods = ["page","track","identify","instances","debug","on","off",
                "once","ready","alias","group","enableCookie","disableCookie",
                "holdConsent","revokeConsent","grantConsent"]
              ttq.setAndDefer = function (t, e) {
                t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))) }
              }
              for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i])
              ttq.instance = function (t) {
                for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++)
                  ttq.setAndDefer(e, ttq.methods[n])
                return e
              }
              ttq.load = function (e, n) {
                var r = "https://analytics.tiktok.com/i18n/pixel/events.js"
                ttq._i = ttq._i || {}, ttq._i[e] = [], ttq._i[e]._u = r
                ttq._t = ttq._t || {}, ttq._t[e] = +new Date
                ttq._o = ttq._o || {}, ttq._o[e] = n || {}
                n = document.createElement("script")
                n.type = "text/javascript", n.async = !0
                n.src = r + "?sdkid=" + e + "&lib=" + t
                e = document.getElementsByTagName("script")[0]
                e.parentNode.insertBefore(n, e)
              }
              ttq.load('${tiktokPixelTrackId[__BUILD_TARGET__]}')
              ttq.page()
            }(window, document, 'ttq')
          `,
        },
      ],
  
      // ── noscript 降级（Facebook Pixel）────────────────────
      noscript: [
        {
          key: 'fb-pixel-noscript',
          innerHTML: `<img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=1703767447303012&ev=PageView&noscript=1" />`,
        },
      ],
    })
  })