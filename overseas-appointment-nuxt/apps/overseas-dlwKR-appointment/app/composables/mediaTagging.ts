import { kakaoPixelTrackId } from '../constants/index'

// fb媒体埋点
export const fbe = (event, isCustom = true) => {
    // eslint-disable-next-line no-unused-expressions
    window?.fbq && window?.fbq(isCustom ? 'trackCustom' : 'track', event)
}
// google媒体埋点GA4
export const ga4 = (event, data) => {
    // eslint-disable-next-line no-undef
    window?.gtag && window?.gtag('event', event, data)
}

export const gge = (info) => {
    // eslint-disable-next-line no-undef
    window?.gtag && window?.gtag('set', 'user_data', {
        email: info
    })

}

export const ttq = (event) => {
    // eslint-disable-next-line no-undef
    window?.ttq && window?.ttq.track(event)
}

export const kke = (event) => {
    // eslint-disable-next-line no-undef
    console.log(window.kakaoPixel,'kakaoPixel')
    window?.kakaoPixel &&  window.kakaoPixel?.(kakaoPixelTrackId)[event]()
}


export const naverWcs = (event) => {
    console.log(window.wcs,'wcs')
    if (window.wcs) {
        if (!wcs_add) var wcs_add = {};
        wcs_add["wa"] = "2505984";
        var _conv = {};
        _conv.type = event;
        window.wcs.trans(_conv);
    }
}

