
import { reservationPlayerReserve, reservationInit, reservationEvent, reservationAppointmentEvent } from "~/api"
import { useCustomStore } from "~/stores/custom"
import { storeToRefs } from 'pinia'
import { useDebounceFn } from '@vueuse/core'
import { fbe, ga4, ttq, gge, kke, naverWcs } from '@/composables/mediaTagging'
import { mobileSystem } from "~/utils/index.client"


export default function useYpreCommon() {
    const handleCutomStore = useCustomStore()
    const { userInfo, isAlreadyAppointment, isGoShop } = storeToRefs(handleCutomStore)
    const isIos = ref(false)
    // console.log(window.navigator,'mobileSystem')
    const isShowAppointmentPopup = ref<boolean>(false)
    const isShowPhoneAppointmentPopup = ref<boolean>(false)
    const isShowPhoneAppointmentSuccessPopup = ref<boolean>(false)
    const isShowTipPopup = ref<boolean>(false)
    // 当前选中的导航项 (默认选中第一个：main-menu)
    const activeNav = ref('main-menu')

    const urlObj = {
        priviateUrl: 'https://cdn-overseas.dawnbreaking.com/overseasCdn/privacyAgreement/privacy_hanYu_53.html',
        serviceUrl: 'https://cdn-overseas.dawnbreaking.com/overseasCdn/privacyAgreement/operate_hanYu_54.html',
        loungeUrl: 'https://game.naver.com/lounge/ExtraordinaryDemonHunter',
        youtubeUrl: 'https://www.youtube.com/@citydemonhunter',
        one: 'https://m.onestore.co.kr/v2/ko-kr/app/0001004178',
        sanxing:'https://galaxystore.samsung.com/preorder/000008918737?cntyCd=KOR'
    }

    const bannerArr = ['swiper-1', 'swiper-2', 'swiper-3', 'swiper-4', 'swiper-5', 'swiper-6']
    const popupRolesArr = ['heidaoqianjin', 'xiaolanren', 'hanguonvzhu', 'hanguonanzhu', 'jixieqianjin']


    const isShowAppointmentSuccessPopup = ref<boolean>(false)
    const isShowAnnouncementsPopup = ref<boolean>(false)
    const bindOs = ref('android')
    const isAgree = ref(true)
    const inputValue = ref('')
    const tipText = ref('')
    const initData = ref({})
    const roleListRef = ref(null)
    const currentPopupRoleName = ref('hanguonvzhu')
    const storagePhoneInfo = computed(() => ({
        phone: userInfo.value?.phone,
        bind_os: userInfo.value?.bind_os,
    }))

    // 模块顶层定义，只执行一次
   const imageGlobs: Record<string, Record<string, { default: string }>> = {
    'animated-png': import.meta.glob('../assets/images/animated-png/*.png', { eager: true }),
    'people':       import.meta.glob('../assets/images/people/*.png',       { eager: true }),
    'roles':        import.meta.glob('../assets/images/roles/*.png',        { eager: true }),
    'popup':        import.meta.glob('../assets/images/popup/*.png',        { eager: true }),
    'ypre':         import.meta.glob('../assets/images/ypre/*.png',        { eager: true }),
    'default':      import.meta.glob('../assets/images/*.png',              { eager: true }),
  };
  


    // 是否显示底部预约弹窗（只在3,4,5屏显示）
    const showBottomPopup = computed(() => {
        return ['activity', 'role', 'game-features'].includes(activeNav.value)
    })

    const getPcImageUrl = (name, type) => {
        // 第一个参数是相对路径，第二个参数是基础URL
        // return new URL(`../assets/images/${pathName}/${name}.png`, import.meta.url).href;
        // 1. 使用 glob 贪婪匹配 images 文件夹下所有的 png
        // eager: true 表示立即导入，而不是异步导入

        // const images = import.meta.glob(`../assets/images/animated-png/*.png`, { eager: true });
        let images = ''
        let path = ''
        switch (type) {
            case 'people':
                images = import.meta.glob(`../assets/images/pc/people/*.png`, { eager: true });
                path = `../assets/images/pc/people/${name}.png`;
                break;
            case 'roles':
                images = import.meta.glob(`../assets/images/pc/roles/*.png`, { eager: true });
                path = `../assets/images/pc/roles/${name}.png`;
                break;
            default:
                console.log(name, 'name')
                images = import.meta.glob(`../assets/images/pc/*.png`, { eager: true });
                path = `../assets/images/pc/${name}.png`;
                break;
        }

        // 2. 匹配对应的完整路径
        // const pathName = `${path}/${name}.png`;
        // 3. 返回处理后的路径（通常包含 Hash）
        return images[path]?.default ?? '';
    }
    // const getImageUrl = (name, type) => {
    //     // 第一个参数是相对路径，第二个参数是基础URL
    //     // return new URL(`../assets/images/${pathName}/${name}.png`, import.meta.url).href;
    //     // 1. 使用 glob 贪婪匹配 images 文件夹下所有的 png
    //     // eager: true 表示立即导入，而不是异步导入

    //     // const images = import.meta.glob(`../assets/images/animated-png/*.png`, { eager: true });
    //     let images = ''
    //     let path = ''
    //     switch (type) {
    //         case 'animated-png':
    //             images = import.meta.glob(`../assets/images/animated-png/*.png`, { eager: true });
    //             path = `../assets/images/animated-png/${name}.png`;
    //             break;
    //         case 'people':
    //             images = import.meta.glob(`../assets/images/people/*.png`, { eager: true });
    //             path = `../assets/images/people/${name}.png`;
    //             break;
    //         case 'roles':
    //             images = import.meta.glob(`../assets/images/roles/*.png`, { eager: true });
    //             path = `../assets/images/roles/${name}.png`;
    //             break;
    //         case 'popup':
    //             images = import.meta.glob(`../assets/images/popup/*.png`, { eager: true });
    //             path = `../assets/images/popup/${name}.png`;
    //             break;
    //         default:
    //             console.log(name, 'name')
    //             images = import.meta.glob(`../assets/images/*.png`, { eager: true });
    //             path = `../assets/images/${name}.png`;
    //             break;
    //     }
    //     // console.log(images, 'images')
    //     // console.log(path, 'path111')
    //     // console.log(images[path], 'images11')
    //     // 2. 匹配对应的完整路径
    //     // const pathName = `${path}/${name}.png`;
    //     // 3. 返回处理后的路径（通常包含 Hash）
    //     return images[path]?.default ?? '';
    // }
    const getImageUrl = (name: string, type: string): string => {
        console.log(name, type, 'name, type')
        const isKnownType = type in imageGlobs && type !== 'default';
        const folder = isKnownType ? `${type}/` : '';
        const images = imageGlobs[type] ?? imageGlobs['default'];
        const path = `../assets/images/${folder}${name}.png`;
       console.log(path,'path123')
        return images[path]?.default ?? '';
    };





    const openStoreUrl = (type, customStoreType) => {
        reservationEventApi('hw_yry_shopping_count')
        if (isAlreadyAppointment.value) {
            gge(storagePhoneInfo.value?.phone)
        }
        fbe('AddToCart')
        ga4('AddToCart')
        kke('addToCart')
        naverWcs('lead')

        fbe('Lead')
        ga4('Lead')

        ttq('ClickButton')

        const { store_url, store_ios_url } = initData.value?.store_url || {}
        let url = ''
        if (customStoreType) {
            if (customStoreType === 'google') {
                url = store_url
                fbe('MO_gp')
                kke('viewCart')
                ga4('MO_gp')
                naverWcs('view_content')
                ttq('AddToWishlist')
            } else {
                fbe('MO_ios')
                kke('search')
                ga4('MO_ios')
                naverWcs('search')
                url = store_ios_url
            }
        } else {
            if (isIos.value) {
                fbe('MO_ios')
                kke('search')
                ga4('MO_ios')
                naverWcs('search')
                url = store_ios_url
            } else {
                fbe('MO_gp')
                kke('viewCart')
                ga4('MO_gp')
                naverWcs('view_content')
                ttq('AddToWishlist')
                url = store_url
            }
        }
        console.log(url, 'url111')
        window.open(url)

        switch (type) {
            case 'main-menu':
                fbe('MO_1')
                break
            case 'preorder':
                fbe('MO_1_1')
                break
            case 'fixed-bottom':
                fbe('MO_1_2')
                break
            case 'phoneAndShopPopup':
                fbe('MO_2')
                ga4('MO_2')
                ttq('Search')
                break
            case 'PhoneAppointmentSuccessPopup':
                fbe('MO_3')
                ga4('MO_2')
                ttq('Search')
                isShowPhoneAppointmentSuccessPopup.value = false
                break
            case 'PhoneAppointmentPopup':
                isShowAppointmentPopup.value = false
                break
        }

        if (isAlreadyAppointment.value) {
            if (!isGoShop.value) {
                handleCutomStore.setIsGoShop(true)
                isShowAppointmentSuccessPopup.value = true
            }
        } else {
            if (!isGoShop.value) {
                handleCutomStore.setIsGoShop(true)
            }
            isShowPhoneAppointmentPopup.value = true
        }
        if(isShowAppointmentPopup.value) {
            isShowAppointmentPopup.value = false
        }
    }

    function changeRole(item) {
        currentPopupRoleName.value = item
    }


    function openUrl(type) {
        window.open(urlObj[type])
        if (type === 'loungeUrl') {
            reservationEventApi('hw_yry_like_count')
        }
    }

    function openTipPopup(text: string) {
        tipText.value = text
        isShowTipPopup.value = true
    }

    async function appointment(type) {
        reservationAppointmentEvent('hw_yry_reservation_count',inputValue.value)
        if (!/^\d{8}$/.test(inputValue.value)) {
            openTipPopup('올바른 휴대폰 번호를 입력해 주세요.')
            return
        }

        if (!isAgree.value) {
            openTipPopup('개인정보 수집 및 이용 동의에 체크해 주세요.')
            return
        }

        const loadingToast = showLoadingToast({
            message: '로딩 중...',
            forbidClick: true
        })
        const phoneInfo = {
            phone: inputValue.value,
            change_role: currentPopupRoleName.value,
            // bind_os: bindOs.value
        }
        const res = await reservationPlayerReserve(phoneInfo).finally(() => {
            loadingToast.close()
        })
        const isReserve = res.data?.is_reserve
        handleCutomStore.setUserInfo(phoneInfo)
        handleCutomStore.setIsAlreadyAppointment(true)

        if (isReserve === 1) {
            openTipPopup('이미 사전 예약을 완료하셨습니다.')
        } else {
            gge(phoneInfo.phone)
            ga4('CompleteRegistration')
            fbe('CompleteRegistration')
            ttq('CompleteRegistration')
            kke('completeRegistration')
            ttq('Subscribe')
            naverWcs('sign_up')
            reservationInitApi()
        }
        if (isGoShop.value) {
            if (isReserve === 0) {
                isShowAppointmentSuccessPopup.value = true
            }
        } else {
            isShowPhoneAppointmentSuccessPopup.value = true
        }

        switch (type) {
            case 'phonePopup':
                isShowPhoneAppointmentPopup.value = false
                if (isReserve === 0) {
                    fbe('CompleteRegistration4')
                }
                break;
            case 'phoneAndShopPopup':
                isShowAppointmentPopup.value = false
                if (isReserve === 0) {
                    fbe('CompleteRegistration3')
                }
                break;
            default:
                if (isReserve === 0) {
                    fbe('CompleteRegistration2')
                }
                break;
        }

    }


    async function reservationInitApi() {
        allowMultipleToast();
        const loadingToast = showLoadingToast({
            message: '로딩 중...',
            forbidClick: true
        })
        const res = await reservationInit(storagePhoneInfo.value).finally(() => {
            loadingToast.close()
        })
        const resData = res?.data || {}
        console.log(resData, 'resData')
        initData.value = resData
    }

    function toBindOs(system) {
        console.log(system, 'system')
        // if(isAlreadyAppointment.value) return
        bindOs.value = system
    }
    function toAgree() {
        // if(isAlreadyAppointment.value) return
        isAgree.value = !isAgree.value
    }

    function reservationEventApi(eventName) {
        reservationEvent(eventName)
    }

    function initOperation() {
        if (isAlreadyAppointment.value) {
            if (!isGoShop.value) {
                isShowPhoneAppointmentSuccessPopup.value = true
            }
            gge(storagePhoneInfo.value?.phone)
        }
        else {
            if (isGoShop.value) {
                isShowPhoneAppointmentPopup.value = true
            } else {
                isShowAppointmentPopup.value = true
            }
        }
        reservationEventApi('hw_yry_PV')
        kke('pageView')
        isIos.value = mobileSystem() === 'ios'
        if (isIos.value) {
            bindOs.value = 'ios'
        }
        reservationInitApi()
    }

 




    return {
        initOperation,
        reservationEventApi,
        reservationInitApi,
        isGoShop,
        isAlreadyAppointment,
        openStoreUrl,
        toBindOs,
        toAgree,
        appointment,
        roleListRef,
        activeNav,
        isShowTipPopup,
        tipText,
        initData,
        showBottomPopup,
        isShowAppointmentPopup,
        isShowPhoneAppointmentPopup,
        isShowPhoneAppointmentSuccessPopup,
        isShowAppointmentSuccessPopup,
        isShowAnnouncementsPopup,
        bindOs,
        isAgree,
        inputValue,
        isIos,
        useDebounceFn,
        openUrl,
        storagePhoneInfo,
        getImageUrl,
        getPcImageUrl,
        bannerArr,
        popupRolesArr,
        changeRole,
        currentPopupRoleName
    }

}