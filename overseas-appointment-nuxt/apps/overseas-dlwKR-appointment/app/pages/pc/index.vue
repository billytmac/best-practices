<script setup lang="ts">
import useCommon from '~/composables/useCommon'
import { useDebounceFn } from '@vueuse/core'
definePageMeta({
  name: "pc",
});

const { bannerArr, openUrl, getPcImageUrl, getImageUrl,initOperation, reservationInitApi, isIos, isAlreadyAppointment, isGoShop, openStoreUrl, toBindOs, toAgree, appointment, roleListRef, activeNav, isShowTipPopup, tipText, initData, showBottomPopup, isShowAppointmentPopup, isShowPhoneAppointmentPopup, isShowPhoneAppointmentSuccessPopup, isShowAppointmentSuccessPopup, isShowAnnouncementsPopup, bindOs, isAgree, inputValue } = useCommon()




const shopList = ['google', 'iphone', 'one', 'sanxing']


const timeLineArr = ref([
  {
    title: "10w",
    image: "/10w.png",
    style: "-8%",
    num: 100000,
  },
  {
    title: "30w",
    image: "/30w.png",
    style: "17%",
    num: 300000,
  },
  {
    title: "50w",
    image: "/50w.png",
    style: "42%",
    num: 500000,
  },
  {
    title: "80w",
    image: "/80w.png",
    style: "67%",
    num: 800000,
  },
  {
    title: "100w",
    image: "/100w.png",
    style: "91%",
    num: 1000000,
  },
]);
const rolesList = ref([
  {
    name: "nvqumo",
    isSelected: true,
    sizeClass: "w-1272 h-779 left--29 bottom--14",
    titleBgClass: 'nvqumo-title-bg'
  },
  {
    name: "nvwu",
    isSelected: false,
    sizeClass: "w-683 h-681 left-10% top-1.2%",
    titleBgClass: 'nvwu-title-bg'
  },
  {
    name: "baihu",
    isSelected: false,
    sizeClass: "w-791 h-719 left-6% top-1.5%",
    titleBgClass: 'baihu-title-bg'
  },
  {
    name: "jiuwei",
    isSelected: false,
    sizeClass: "w-698 h-802 left-7.6% top--15.5%",
    titleBgClass: 'jiuwei-title-bg'
  },
  {
    name: "youxia",
    isSelected: false,
    sizeClass: "w-623 h-690 left-16% ",
    titleBgClass: 'youxia-title-bg'
  },
  {
    name: "stone",
    isSelected: false,
    sizeClass: "w-651 h-698 left-7.6% top--1%",
    titleBgClass: 'stone-title-bg'
  },
  {
    name: "yandou",
    isSelected: false,
    sizeClass: "w-664 h-710 left-7.6% top--2.4%",
    titleBgClass: 'yandou-title-bg'
  },
  {
    name: "nanzhu",
    isSelected: false,
    sizeClass: "w-831 h-674 left-3.6% top-2.4%",
    titleBgClass: 'nanzhu-title-bg'
  },
]);
const navList = ref([
  {
    image: 'main-menu',
    name: '메인',
    isSelected: false,
    mt: 0,
    mr: 90,
    isHover: false,
  },
  {
    image: 'preorder',
    name: '사전예약 ',
    isSelected: false,
    mt: 71,
    mr: 90,
    isHover: false,
  },
  {
    image: 'activity',
    name: '이벤트',
    isSelected: false,
    mt: 70,
    mr: 90,
    isHover: false,
  },
  {
    image: 'role',
    name: '캐릭터',
    isSelected: false,
    mt: 72,
    mr: 91,
    isHover: false,
  },
  {
    image: 'game-features',
    name: '게임특징',
    isSelected: false,
    mt: 85,
    isHover: false,
  },
]);

// 是否正在程序化滚动（避免滚动监听器干扰手动导航）
const isProgrammaticScroll = ref(false)

const currentRoleName = ref(rolesList.value[0])

// 创建防抖版本的滚动处理函数
const debouncedScrollHandler = useDebounceFn(updateActiveNavByScroll, 100)


function selectRole(currentItem) {
  // currentRoleName.value = {}
  // nextTick(() => {
  currentRoleName.value = currentItem
  // })
  currentItem.isSelected = true
  rolesList.value.forEach((item) => {
    if (currentItem.name !== item.name) {
      item.isSelected = false
    }
  })
  if (['baihu', 'jiuwei', 'youxia', 'stone',].includes(currentItem.name)) {
    let left = 0
    switch (currentItem.name) {
      case 'jiuwei':
        left = 70
        break
      case 'youxia':
        left = 141
        break
      case 'stone':
        left = 208
        break
    }
    roleListRef.value?.scrollTo({
      left,
      behavior: 'smooth'
    })
  }

}


function setActiveNav(val: string) {
  activeNav.value = val
  const targetElement = document.getElementById(val)
  console.log(targetElement, 'targetElement')
  if (targetElement) {
    // 计算需要滚动的位置，考虑固定头部的高度（76px）
    const offsetTop = targetElement.offsetTop
    let diffVal = 0
    switch (val) {
      case 'preorder':
        diffVal = 1015
        break;
      case 'activity':
        diffVal = 900
        break;
      case 'role':
        diffVal = 920
        break;
      case 'game-features':
        diffVal = 1000
        break;
    }
    // 平滑滚动到目标位置
    window.scrollTo({
      top: offsetTop + diffVal,
      behavior: 'smooth'
    })
  }
}


function updateActiveNavByScroll() {
  console.log(666666)
  if (isProgrammaticScroll.value) return
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const viewportHeight = window.innerHeight

  // 定义各屏幕区域的ID
  const sectionIds = ['main-menu', 'preorder', 'activity', 'role', 'game-features']
  console.log(sectionIds, 'sectionIds')

  // 遍历各个区域，找到当前在视窗中的区域
  for (let i = sectionIds.length - 1; i >= 0; i--) {
    let diffVal = 0
    const sectionId = sectionIds[i]
    const element = document.getElementById(sectionId)
    if (element) {
      switch (sectionId) {
        case 'preorder':
          diffVal = 1015
          break;
        case 'activity':
          diffVal = 900
          break;
        case 'role':
          diffVal = 920
          break;
        case 'game-features':
          diffVal = 1000
          break;
      }
      const elementTop = element.offsetTop + diffVal
      // 如果滚动位置超过了该区域的顶部，则该区域为当前活跃区域
      if (scrollTop >= elementTop - viewportHeight / 3) {
        console.log(activeNav.value, 'activeNav.value')
        activeNav.value = sectionId
        break
      }
    }
  }
}


// 滚动监听
function handleScroll() {
  debouncedScrollHandler()
}

function clickShop(item) {
  if (['google', 'iphone'].includes(item)) {
    openStoreUrl(undefined, item)
  } else {
    openUrl(item)
  }
}

onMounted(() => {
  // 添加滚动监听器
  window.addEventListener('scroll', handleScroll, { passive: true })
  updateActiveNavByScroll()
  initOperation()
})



</script>

<template>
  <div class="h-5938 appointment-bg-wrap bg-black">
    <div class="relative max-w-1920 min-w-1920 mx-auto ">
      <!-- 顶部固定栏 -->
      <div
        class="flex-items-center pl-26 pr-85 max-w-1920   bg-black h-80 w-full  top-0 fixed z-10 font-[DNF_Forged_Blade] font-300 text-[28px] color-white">
        <img src="/assets/images/pc/head-logo.png" class="h-70 w-181" />
        <div class="flex-1">
        </div>
        <div v-for="item in navList" :key="item.name" class="cursor-pointer whitespace-nowrap nav-item"
          @click="setActiveNav(item.image)"
          :class="{ 'mr-90': item.mr === 90, 'mr-91': item.mr === 91, 'text-[#BDEEFF]': activeNav === item.image }">
          <span>{{ item.name }}</span>
        </div>
        <div class="flex-1"></div>
        <div class="flex">
          <img @click="openUrl('loungeUrl')" src="/assets/images/pc/game.png" class="h-83 w-100 cursor-pointer mr-4" />
          <img @click="openUrl('youtubeUrl')" src="/assets/images/pc/video.png" class="h-84 w-92 cursor-pointer   " />
        </div>
      </div>
      <div
        class="w-192 h-229 fixed z-20 right-0 top-[49%] cursor-pointer animate__animated animate__pulse animate__infinite"
        @click="setActiveNav('preorder')" v-show="showBottomPopup">
        <img src="/assets/images/pc/fixed-icon.png" class="w-full h-full" />
      </div>
      <!-- kv图 -->
      <div class="kv-bg bg-cover-no-repeat bg-no-repeat pt-134 h-1098 w-full pt-89" id="main-menu">
        <div class="absolute top-0 left-0 w-full  overflow-hidden z-0 pointer-events-none">
          <video class="w-full h-1098 object-cover" autoPlay loop muted playsInline>
            <source src='/assets/video/pc-kv.mp4' type="video/mp4" />
          </video>
        </div>
        <div class="relative  w-497 h-232">
          <img src="/assets/images/pc/head-title-icon.png" class="w-full h-full ml-729" />
        </div>
        <div class="relative  w-639 h-50">
          <img src="/assets/images/pc/head-title.png" class="ml-625 w-full h-full" />
        </div>
        <div class="ml-504 flex mt-454 gap-60">
          <div v-for="item in shopList" :key="item" :class="`${item}-wrap`" @click="clickShop(item)"
            class="w-183 h-55 cursor-pointer overflow-hidden shine-wrapper relative">
            <img :src="getPcImageUrl(item, '')" class="h-full w-full" />
          </div>
        </div>
        <div class="mt-14 ml-803 relative">
          <img src="/assets/images/pc/appointment-btn.png" class=" h-120 w-330 cursor-pointer"
            @click="setActiveNav('preorder')" />
          <img src="/assets/images/animated-png/more-icon.png"
            class="h-97 w-88 cursor-pointer absolute top-101 left-115" />
        </div>

      </div>
      <div class="apppointment-bg bg-cover-no-repeat h-4884 absolute w-full top-[95%]">
        <!-- 第一部分 -->
        <div id="preorder" class="pt-80 w-full h-943 bg-cover-no-repeat">
          <div class="step-title-1 bg-cover-no-repeat  mt-15 h-105 w-482 relative ml-720">
            <div
              class="text-[35px] text-[#C1D0FF] leading-[35px] font-[NotoSansSC] font-700 text-center w-170 right-[-1%] top-31.1% absolute">
              {{ formatNumber(initData?.reserved_count) }}
            </div>
            <img src="/assets/images/title-1-icon.png" class="h-105 w-106 right--19% top--8% absolute z-1" />
          </div>
          <div class="flex mt-63 ml-282">
            <div class="prize-list-bg bg-cover-no-repeat ml-5 mt-49 pt-121 h-462 w-674">
              <div class="ml-42 flex gap-32">
                <img src="/assets/images/pc/prize-1.png" class="w-177 h-218" />
                <img src="/assets/images/pc/prize-2.png" class="w-177 h-218" />
                <img src="/assets/images/pc/prize-3.png" class="w-176 h-218" />
              </div>
              <div class="mt-12 flex gap-6">
                <div class="shine-wrapper overflow-hidden relative google-1-wrap w-279 h-100 ml-58"
                  @click="openStoreUrl(undefined, 'google')">
                  <img src="/assets/images/pc/google-1.png" class="w-full h-full   cursor-pointer" />
                </div>
                <div class="shine-wrapper overflow-hidden relative iphone-2-wrap w-279 h-100"
                  @click="openStoreUrl(undefined, 'iphone')">
                  <img src="/assets/images/pc/iphone-2.png" class="w-full h-full  cursor-pointer" />
                </div>
              </div>
            </div>
            <div class="appointment-input-bg bg-cover-no-repeat ml-55  pt-268 h-511 w-609 relative">
              <div class="text-[17px] text-[#D0C8FF] font-[NotoSansSC] leading-[17px] font-500 flex ml-211">
                <div class="mr-75 flex cursor-pointer" @click="toBindOs('android')">
                  <div class="flex-items-center-center mr-10 border border-[#D0C8FF] rounded-full h-16 w-16">
                    <div class="rounded-full bg-[#D0C8FF] h-8 w-8" v-show="bindOs === 'android'" />
                  </div>
                  <div class="mt--1">AOS</div>
                </div>
                <div class="flex cursor-pointer" @click="toBindOs('ios')">
                  <div class="flex-items-center-center mr-10 border rgb(150 150 152) rounded-full  h-16 w-16">
                    <div class="rounded-full bg-[#D0C8FF] h-8 w-8" v-show="bindOs === 'ios'" />
                  </div>
                  <div class="mt--1">IOS</div>
                </div>
              </div>
              <div
                class="download-bg bg-cover-no-repeat mt-19 h-67 w-517 ml-49 pl-44 font-500 text-[#5C47DD] flex-items-center font-[NotoSansSC]">
                <div class="text-[32px]">010</div>
                <div class="w-1 h-30 bg-[#9189FA] ml-21 mr-21"></div>
                <div class="flex-1">
                  <input type="tel" pattern="[0-9]*" maxlength="8" inputmode="numeric" v-model="inputValue"
                    class="outline-none bg-transparent number-input text-[28px] w-full" placeholder="휴대폰 번호 입력" />
                </div>
              </div>
              <div class="flex ml-65 mt-17">
                <div
                  class="flex-items-center-center radio-bg bg-cover-no-repeat w-23 h-23 font-500 cursor-pointer relative"
                  @click="toAgree">
                  <img src="/assets/images/pc/tick.png" class="h-15 w-23 absolute right-[-7%]" v-show="isAgree" />
                </div>
                <div
                  class="text-[#A7AABC] mt-1 text-[18px] leading-[18px] font-[NotoSansSC] font-500 ml-12 tracking-[-1px] cursor-pointer">
                  <span @click="toAgree">개인정보 수집, 이용 및 프로모션 알림 수신 동의</span>
                  <span class="ml-10 underline underline-offset-[4px] "
                    @click='isShowAnnouncementsPopup = true'>유의사항</span>
                </div>
              </div>
              <div class="mt-7 ml-193">
                <img src="/assets/images/appointment-btn1.png" class="h-87 w-234 cursor-pointer" @click="appointment" />
              </div>
            </div>
          </div>

        </div>
        <!-- 第二部分 -->
        <div id="activity" class="h-1133 w-full bg-cover-no-repeat pt-130 mt--25">
          <div class="step-title-2 bg-cover-no-repeat mx-auto  h-105 w-401 relative">
            <img src="/assets/images/title-2-icon.png" class="h-96 w-104 absolute z-1 left-[-22%] top-[-7%]" />
          </div>
          <div class='flex mt-111 ml-273'>
            <img src="/assets/images/pc/10w.png" class="w-433 h-142 mr-56" />
            <img src="/assets/images/pc/50w.png" class="w-433 h-142 mr-57" />
            <img src="/assets/images/pc/100w.png" class="w-433 h-142" />
          </div>
          <div class="time-line bg-cover-no-repeat h-18 w-1496 relative ml-238 mt-88  pl-166">
            <div class="flex gap-176 absolute top-[-37px]">
              <div v-for="item in timeLineArr" :key="item.title" class=" z-1  h-90 w-91 ">
                <img v-if="initData?.reserved_count >= item.num" src="/assets/images/pc/line-reached.png"
                  class="w-full h-full" />
                <img v-else src="/assets/images/pc/line-mark.png" class="w-full h-full" />
                <!-- v-else -->
              </div>
            </div>
          </div>
          <div class="ml-546 mt-98 flex gap-84">
            <img src="/assets/images/pc/30w.png" class="w-433 h-142 " />
            <img src="/assets/images/pc/80w.png" class="w-433 h-142" />
          </div>

          <div class="w-775 h-39 mt-135">
            <img src="/assets/images/animated-png/pc-line-top.png" class="w-full h-full" />
          </div>
        </div>
        <!-- 第三部分 -->
        <div id="role" class="  h-1432 w-full bg-cover-no-repeat mt--23 mx-auto pt-113px mt--23px">
          <div class="step-title-3 bg-cover-no-repeat mx-auto h-105 w-257 relative mb-25">
            <img src="/assets/images/title-3-icon.png" class="h-98 w-91 absolute z-1 right--28% top--8%" />
          </div>
          <div class="title-3-bg w-1602 h-735 mt-94 ml-162 relative">
            <div class="absolute left-[827px] top-[-29px]  w-383 h-155">
              <img :src="getImageUrl(currentRoleName.name, 'animated-png')" class="w-full h-full" />
            </div>
            <div class="absolute z-2" :class="currentRoleName.sizeClass">
              <img :src="getPcImageUrl(currentRoleName.name, 'people')" class="w-full h-full top--29 left--29"> </img>
            </div>
            <div class="flex flex-col ml-735 pt-221">
              <div class="w-422 h-239 ml-142 mb-13">
                <img :src="getPcImageUrl(currentRoleName.name + '-symbel', 'people')" class="w-full h-full " />
              </div>
              <div class=" bg-cover-no-repeat " :class="currentRoleName.titleBgClass">
                <div class='w-627 h-112 mt-56 ml-147'>
                  <img :src="getPcImageUrl(currentRoleName.name + '-intro', 'people')" class="max-w-full max-h-full " />
                </div>
              </div>
            </div>
          </div>
          <div class="pl-369 mt-33 flex gap-9 w-full relative border-b-4 border-[#6024F8] pb-53">
            <div v-for="item in rolesList" :key="item.name" class="w-141 h-202 cursor-pointer flex-col-items-center"
              @click="selectRole(item)">
              <img :src="getPcImageUrl(item.name + '-selected', 'roles')" v-show="item.isSelected"
                class="w-full h-full" />
              <img :src="getPcImageUrl(item.name, 'roles')" v-show="!item.isSelected" class="w-full h-full" />
              <img src="/assets/images/pc/line-selected.png" v-show="item.isSelected" class="w-63 h-4 mt-53 mr-15" />
            </div>
          </div>
          <!-- <div class='w-full h-4 bg-[#6024F8] opacity-80 mt-53  z-1 bottom-0'>
          </div> -->
        </div>
        <!-- 第四部分 -->
        <div id="game-features" class=" h-1432 w-full bg-cover-no-repeat mt--40px pt-35">
          <div class="w-909 h-39 ml-1011 mb-48">
            <img src="/assets/images/animated-png/pc-line-bottom.png" class="w-909 h-39" />
          </div>
          <div class="step-title-4 bg-cover-no-repeat ml-846 h-105 w-221 relative">
            <img src="/assets/images/title-4-icon.png" class="h-100 w-87 absolute z-1 left-[-34%] top-[-7%]" />
          </div>
          <swiperPc :slides="bannerArr" />
          <!-- <div class="relative mt-90 ml-386 flex">
            <img src="/assets/images/pc/swiper-left.png" class="w-49 h-74 mr-107 cursor-pointer mt-365" />
            <div class="swiper-bg w-453 h-782 relative ml-83 bg-cover-no-repeat pl-27 pt-45">
              <div class="w-400 h-710">
                <img src="/assets/images/pc/swiper-1.png" class="w-full h-full" />
              </div>
            </div>
            <img src="/assets/images/pc/swiper-right.png" class="w-49 h-74 ml-107  cursor-pointer mt-365" />
          </div> -->
        </div>

        <div
          class="mt-133  pt-83
           w-full h-213 bg-[#08081D]  flex-col-items-center  absolute bottom-0 text-[24px] leading-[24px] text-[#fff]  font-[NotoSansSC]">
          <div class="tracking-[6px] flex ">
            <span @click="openUrl('serviceUrl')" class="cursor-pointer">이용약관</span>
            <span class="w-1 h-24 bg-white ml-20 mr-20"></span>
            <span @click="openUrl('priviateUrl')" class="cursor-pointer">개인정보처리방침</span>
          </div>
          <div class="mt-14">
            ©2026 DAWN BREAKING NETWORK TECHNOLOGY CO., LIMITED. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
      <!-- 预约弹窗(商店和手机) -->
      <div v-show="isShowAppointmentPopup"
        class='h-full bg-black/80  z-40 fixed w-full top-0 left-0 flex-justify-center overflow-auto' z-index="40">
        <div class="">
          <div class="appointment-popup-bg bg-cover-no-repeat h-1050 w-679  ml-49 pt-228">
            <div class=" ml-69 relative">
              <img src="/assets/images/popup/appointment-title.png" class="w-530 h-101" />
              <img src="/assets/images/popup/close.png" class="w-84 h-85 absolute right-[1.3%] top-0 cursor-pointer"
                @click="isShowAppointmentPopup = false" />
            </div>
            <div class='ml-88 mt-42'>
              <img src="/assets/images/popup/step-1.png" class="w-479 h-38" />
            </div>
            <div
              class="popup-prize-list-bg flex-items-between bg-cover-no-repeat h-173 w-491 ml-83 mt-16 pl-32 pr-28 pt-13">
              <div class="flex-col-items-center mt-20">
                <img src="/assets/images/popup/444-icon.png" class="w-100 h-93" />
                <img src="/assets/images/popup/444.png" class="w-105 h-29 mt-13" />
              </div>
              <div class="flex-col-items-center relative">
                <img src="/assets/images/popup/sizheng-icon.png" class="w-155 h-137" />
                <img src="/assets/images/popup/sizheng.png" class="w-145 h-29  absolute top-[126px] left-[11px]" />
              </div>
              <div class="flex-col-items-center mt-18">
                <img src="/assets/images/popup/qianghua-icon.png" class="w-114 h-92" />
                <img src="/assets/images/popup/qianghua.png" class="w-106 h-29 mt-13 mt-16" />
              </div>

            </div>
            <div class="mt-13 ml-70 flex ">
              <div class="mt-13 w-255 h-92 flex cursor-pointer shine-wrapper overflow-hidden relative ">
                <img src="/assets/images/popup/google-appointment.png" class="w-full h-full"
                  @click="openStoreUrl('phoneAndShopPopup', 'google')" />
              </div>
              <div class="mt-13 w-255 h-92 flex cursor-pointer shine-wrapper overflow-hidden relative ">
                <img src="/assets/images/popup/apple-appointment.png" class="w-full h-full"
                  @click="openStoreUrl('phoneAndShopPopup', 'iphone')" />
              </div>
            </div>
            <div class='ml-88 mt-4'>
              <img src="/assets/images/popup/step-2.png" class="w-479 h-38" />
            </div>
            <div class="text-[26px] text-white leading-[26px] font-500 flex ml-190 mt-15">
              <div class="mr-99 flex cursor-pointer" @click="toBindOs('android')">
                <div class="flex-items-center-center mr-16 border border-[#fff] rounded-full h-24 w-24">
                  <div class="rounded-full bg-[#fff] h-16 w-16" v-show="bindOs === 'android'" />
                </div>
                <div>AOS</div>
              </div>
              <div class="flex cursor-pointer" @click="toBindOs('ios')">
                <div class="flex-items-center-center mr-16 border border-[#fff] rounded-full h-24 w-24">
                  <div class="rounded-full bg-[#fff] h-16 w-16" v-show="bindOs === 'ios'" />
                </div>
                <div>IOS</div>
              </div>
            </div>
            <div
              class=" bg-white h-60 w-551 ml-50 pl-48 font-500 text-[#301A72] flex-items-center font-[NotoSansSC] mt-15">
              <div class="text-[38px] mr-115">010</div>
              <div class="flex-1">
                <input type="tel" pattern="[0-9]*" maxlength="8" inputmode="numeric" v-model="inputValue"
                  class="outline-none bg-transparent popup-number-input text-[38px] w-full" placeholder="휴대폰 번호 입력" />
              </div>
            </div>
            <div class="flex ml-65 mt-17">
              <div class="flex-items-center-center popup-radio-bg bg-cover-no-repeat w-25 h-25 font-500 cursor-pointer"
                @click="toAgree">
                <img src="/assets/images/tick.png" class="h-16 w-24" v-show="isAgree" />
              </div>
              <div
                class="text-[#381076] font-500 mt-1 text-[19px] leading-[19px] font-[NotoSansSC] font-500 ml-12 tracking-[-1px] cursor-pointer">
                <span @click="toAgree">개인정보 수집, 이용 및 프로모션 알림 수신 동의</span>
                <span class="ml-10 underline underline-offset-[6px]"
                  @click='isShowAnnouncementsPopup = true'>유의사항</span>
              </div>
            </div>
            <div class='ml-185 mt-8'>
              <img src="/assets/images/popup/appoitment-comfirm.png" class="w-273 h-83 cursor-pointer"
                @click="appointment('phoneAndShopPopup')" />
            </div>
          </div>
        </div>

      </div>
      <!-- 预约弹窗(手机) -->
      <div v-show="isShowPhoneAppointmentPopup"
        class='h-full bg-black/80  z-40 fixed w-full top-0 left-0 flex-items-center-center overflow-auto '>
        <div class="h-full pt-74">
          <div class="ml-46 relative ">
            <img src="/assets/images/popup/phone-title.png" class="w-636 h-94" />
            <img src="/assets/images/popup/close.png" class="w-84 h-85 absolute right-3.9% top--9% cursor-pointer"
              @click="isShowPhoneAppointmentPopup = false" />
          </div>
          <div class="phone-appointment-popup-bg bg-cover-no-repeat h-707 w-683 mt-13 ml-21 pt-54">
            <div class=" ml-340">
              <img src="/assets/images/popup/phone-info.png" class="w-333 h-165" />
            </div>
            <div class="mt-4 ml-324">
              <img src="/assets/images/popup/phone-dialog.png" class="w-339 h-117" />
            </div>
            <div class="text-[26px] text-white leading-[26px] font-500 flex ml-218 mt-85">
              <div class="mr-99 flex cursor-pointer" @click="toBindOs('android')">
                <div class="flex-items-center-center mr-16 border border-[#fff] rounded-full h-24 w-24">
                  <div class="rounded-full bg-[#fff] h-16 w-16" v-show="bindOs === 'android'" />
                </div>
                <div class="mt--1">AOS</div>
              </div>
              <div class="flex cursor-pointer" @click="toBindOs('ios')">
                <div class="flex-items-center-center mr-16 border border-[#fff] rounded-full h-24 w-24">
                  <div class="rounded-full bg-[#fff] h-16 w-16" v-show="bindOs === 'ios'" />
                </div>
                <div class="mt--1">IOS</div>
              </div>
            </div>
            <div
              class=" bg-white h-60 w-551 ml-80 pl-48 font-500 text-[#301A72] flex-items-center font-[NotoSansSC] mt-15">
              <div class="text-[38px] mr-115">010</div>
              <div class="flex-1">
                <input type="tel" pattern="[0-9]*" inputmode="numeric" v-model="inputValue" maxlength="8"
                  class="outline-none bg-transparent popup-number-input text-[38px] w-full" placeholder="휴대폰 번호 입력" />
              </div>
            </div>
            <div class="flex ml-110 mt-14">
              <div class="flex-items-center-center popup-radio-bg bg-cover-no-repeat w-25 h-25 font-500 cursor-pointer"
                @click="toAgree">
                <img src="/assets/images/tick.png" class="h-16 w-24" v-show="isAgree" />
              </div>
              <div
                class="text-[#381076] font-500 mt-1 text-[19px] leading-[19px] font-[NotoSansSC] font-500 ml-12 tracking-[-1px] cursor-pointer">
                <span @click="toAgree">개인정보 수집, 이용 및 프로모션 알림 수신 동의</span>
                <span class="ml-10 underline underline-offset-[6px]"
                  @click='isShowAnnouncementsPopup = true'>유의사항</span>
              </div>
            </div>
            <div class='ml-225 mt-24'>
              <img src="/assets/images/popup/phone-confim.png" class="w-260 h-57 cursor-pointer"
                @click="appointment('phonePopup')" />
            </div>
          </div>
        </div>

      </div>
      <!-- 电话预约成功,商店没点击时弹窗 -->
      <div v-show="isShowPhoneAppointmentSuccessPopup"
        class='overflow-auto h-full bg-black/80  z-40 fixed w-full top-0 left-0  '>
        <div class="w-full">
          <div class="phone-appointment-success-popup-bg bg-cover-no-repeat h-947 w-655  pt-256 mx-auto ">
            <div class="relative">
              <img src="/assets/images/popup/phone-success-title.png" class="w-636 h-94" />
              <img src="/assets/images/popup/close.png" class="w-84 h-85 absolute right--2.9% top--9% cursor-pointer"
                @click="isShowPhoneAppointmentSuccessPopup = false" />
            </div>
            <img src="/assets/images/popup/phone-go-market-title.png" class="w-564 h-42 mt-74 ml-48" />
            <div class='ml-30 mt-42 flex'>
              <img src="/assets/images/popup/phone-prize-1.png" class="w-207 h-224" />
              <img src="/assets/images/popup/phone-prize-2.png" class="w-207 h-224" />
              <img src="/assets/images/popup/phone-prize-3.png" class="w-207 h-224" />
            </div>
            <div class="flex justify-center  mt-47">
              <div class="w-300 h-89 flex cursor-pointer shine-wrapper overflow-hidden relative "
                @click="openStoreUrl('PhoneAppointmentSuccessPopup', 'google')">
                <img src="/assets/images/popup/phone-google.png" class="w-full h-full" />
              </div>
              <div class="w-300 h-89 flex cursor-pointer shine-wrapper overflow-hidden relative "
                @click="openStoreUrl('PhoneAppointmentSuccessPopup', 'iphone')">
                <img src="/assets/images/popup/phone-apple.png" class="w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 注意事项弹窗 -->
      <div v-show="isShowAnnouncementsPopup"
        class='h-full bg-black/80  z-40 fixed w-full top-0 left-0 flex-items-center-center'>
        <div>
          <div class="relative ml-46">
            <img src="/assets/images/popup/announcements-title.png" class="w-636 h-94" />
          </div>
          <div class="announcements-popup-bg bg-cover-no-repeat h-584 w-655  ml-49 pt-51 mt-13">
            <div
              class='font-[NotoSansSC] text-[17px] font-normal color-[#F8F7FF]  leading-[17px] flex-col-items-center '>
              <div>
                Dawn Breaking Network Technology Co., Limited는
              </div>
              <div class=" mt-10 text-center">
                다음과 같이 개인정보를 수집 및 이용하고 있습니다.
              </div>
            </div>
            <div class="font-[NotoSansSC] text-[20px] font-normal color-[#F8F7FF] ">
              <div class='flex-col flex gap-15  ml-40 mt-27'>
                <div class='w-578 h-42 bg-[#8A7ED8] text-center leading-[42px]'>1. 수집 및 이용 목적: 사전예약 진행 및 이벤트/프로모션 알림
                  안내
                </div>
                <div class='w-578 h-42 bg-[#8A7ED8] text-center leading-[42px]'>2. 수집 항목: 휴대폰 번호</div>
                <div class='w-578 h-42 bg-[#8A7ED8] text-center leading-[42px]'>3. 보유 및 이용기간: 수집일로부터 1년</div>
              </div>
              <div class='leading-[20px] mt-17 text-center'>※동의 거부 시 사전예약 및 이벤트 참여가 제한될 수 있습니다. </div>
            </div>
            <div class="font-[NotoSansSC] text-[28px] leading-[28px] font-500 color-[#281378] text-center mt-35 mb-30">
              (선택) 이벤트 및 프로모션 알림 수신 동의
            </div>
            <div class="font-[NotoSansSC] text-[17px] font-normal color-[#281378] mt-27 leading-[17px] text-center">
              <div>
                Dawn Breaking Network Technology Co., Limited가 제공하는 게임 서비스 및 이
              </div>
              <div class="mt-9">
                벤트 관련 프로모션 정보를 문자(SMS) 등으로 수신하는 데 동의합니다.
              </div>
            </div>
            <img src="/assets/images/popup/announcements-confirm.png" class="w-185 h-71 cursor-pointer mt-18 mx-auto"
              @click='isShowAnnouncementsPopup = false' />
          </div>
        </div>

      </div>
      <!-- 系统弹窗 -->
      <div v-show="isShowTipPopup" class='h-full bg-black/80  z-40 fixed w-full top-0 left-0 flex-items-center-center'>
        <div class='relative'>
          <img src="/assets/images/popup/close.png" class="w-84 h-85 absolute right-4.1% top--20% cursor-pointer"
            @click="isShowTipPopup = false" />
          <div class="tip-bg bg-cover-no-repeat h-414 w-657 pt-70">
            <img src="/assets/images/popup/tip-title.png" class="w-98 h-59 mx-auto " />
            <div class="font-500 text-[21px] leading-[21px] font-[NotoSansSC] color-[#281378] text-center mt-97">
              {{ tipText }}</div>
          </div>
        </div>
      </div>
      <!-- 预约成功弹窗 -->
      <div v-show="isShowAppointmentSuccessPopup"
        class='h-full bg-black/80  z-40 fixed w-full top-0 left-0 flex-justify-center overflow-auto' z-index="40">
        <div class="pt-200 h-full">
          <div class="ml-116 flex">
            <img src="/assets/images/popup/success-title.png" class="w-514 h-94" />
            <img src="/assets/images/popup/close.png" class="w-84 h-85 ml-7 mt-1   cursor-pointer"
              @click="isShowAppointmentSuccessPopup = false" />
          </div>
          <div class="success-popup-bg bg-cover-no-repeat h-414 w-657 mt-9 ml-47 pt-31">
            <div class="ml-142">
              <img src="/assets/images/popup/success-icon.png" class="w-380 h-206" />
            </div>
            <div class="text-[24px] text-[#281378] leading-[24px] font-500 font-[NotoSansSC] ml-103 mt-31">공식 라운지에서 더
              많은
              이벤트에 참여하세요!</div>
            <div class="mt-12 ml-180">
              <img src="/assets/images/popup/success-btn.png" class="w-302 h-71 cursor-pointer" @click="openUrl('loungeUrl')" />
            </div>
          </div>
        </div>


      </div>
    </div>
  </div>


</template>

<style scoped>
.apppointment-bg {
  /* background-image: url("/assets/images/pc/bg.png"); */
}

/* .apppointment-bg-wrap {
  overflow: auto;
} */

#preorder {
  background-image: url("/assets/images/pc/bg-1.png");
}

#activity {
  background-image: url("/assets/images/pc/bg-2.png");
}

#role {
  background-image: url("/assets/images/pc/bg-3.png");
}

#game-features {
  background-image: url("/assets/images/pc/bg-4.png");
}



.kv-bg {
  background-image: url("/assets/images/pc/kv-img.png");
}

.step-title-1 {
  background-image: url("/assets/images/animated-png/step-title-1.png");
}

.prize-list-bg {
  background-image: url("/assets/images/pc/prize-list-bg.png");
}

.popup-prize-list-bg {
  background-image: url("/assets/images/popup/prize-list-bg.png");
}

.appointment-input-bg {
  background-image: url("/assets/images/pc/appointment-input-bg.png");
}

.download-bg {
  background-image: url("/assets/images/download-bg.png");
}

.number-input::placeholder {
  color: #5c47dd;
  font-size: 28px;
  font-weight: 500;
}

.popup-number-input::placeholder {
  color: #301A72;
  font-size: 38px;
  font-weight: 500;
}

.radio-bg {
  background-image: url("/assets/images/pc/radio-bg.png");
}

.step-title-2 {
  background-image: url("/assets/images/animated-png/step-title-2.png");
}

.step-title-3 {
  background-image: url("/assets/images/animated-png/step-title-3.png");
}

.step-title-4 {
  background-image: url("/assets/images/animated-png/step-title-4.png");
}

.time-line {
  background-image: url("/assets/images/pc/time-line.png");
}

.title-3-bg {
  background-image: url("/assets/images/pc/title-3-bg.png");
}

.title-3-decorate {
  background-image: url("/assets/images/title-3-decorate.png");
}

.swiper-bg {
  background-image: url("/assets/images/pc/swiper-bg.png");
}

.bottom-bg {
  background-image: url("/assets/images/bottom-bg.png");
}

.appointment-popup-bg {
  background-image: url("/assets/images/popup/appointment-bg.png");
}

.phone-appointment-popup-bg {
  background-image: url("/assets/images/popup/phone-bg.png");
}

.popup-radio-bg {
  background-image: url("/assets/images/popup/radio-bg.png");
}

.success-popup-bg {
  background-image: url("/assets/images/popup/success-bg.png");
}

.nav-item:hover {
  color: #BDEEFF;
}

.nvqumo-title-bg {
  background-image: url("/assets/images/pc/people/nvqumo-title-bg.png");
  width: 757px;
  height: 203px;
}

.nvwu-title-bg {
  background-image: url("/pc/people/nvwu-title-bg.png");
  width: 767px;
  height: 204px;
}

.baihu-title-bg {
  background-image: url("/assets/images/pc/people/baihu-title-bg.png");
  width: 768px;
  height: 203px;
}

.jiuwei-title-bg {
  background-image: url("/assets/images/pc/people/jiuwei-title-bg.png");
  width: 575px;
  height: 203px;
}

.youxia-title-bg {
  background-image: url("/assets/images/pc/people/youxia-title-bg.png");
  width: 575px;
  height: 204px;
}

.stone-title-bg {
  background-image: url("/assets/images/pc/people/stone-title-bg.png");
  width: 774px;
  height: 203px;
}

.yandou-title-bg {
  background-image: url("/assets/images/pc/people/yandou-title-bg.png");
  width: 562px;
  height: 204px;
}

.nanzhu-title-bg {
  background-image: url("/assets/images/pc/people/nanzhu-title-bg.png");
  width: 774px;
  height: 203px;
}

@media (min-width: 1700px) {
  .appointment-bg-wrap {
    overflow: hidden;
  }
}

.shine-wrapper::after {
  content: "";
  position: absolute;
  inset: -20%;
  background: linear-gradient(45deg,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0) 60%);
  animation: shark-wrap 2s infinite;
  transform: translateX(-100%);
}

@keyframes shark-wrap {
  to {
    transform: translateX(100%);
  }
}


.google-wrap {
  -webkit-mask: url('/assets/images/pc/google.png') center / 100% 100% no-repeat;
  mask: url('/assets/images/pc/google.png') center / 100% 100% no-repeat;
}

.iphone-wrap {
  -webkit-mask: url('/assets/images/pc/iphone.png') center / 100% 100% no-repeat;
  mask: url('/assets/images/pc/iphone.png') center / 100% 100% no-repeat;
}

.one-wrap {
  -webkit-mask: url('/assets/images/pc/one.png') center / 100% 100% no-repeat;
  mask: url('/assets/images/pc/one.png') center / 100% 100% no-repeat;
}

.sanxing-wrap {
  -webkit-mask: url('/assets/images/pc/sanxing.png') center / 100% 100% no-repeat;
  mask: url('/assets/images/pc/sanxing.png') center / 100% 100% no-repeat;
}

.phone-appointment-success-popup-bg {
  background-image: url("/assets/images/popup/phone-success-bg.png");
}

.announcements-popup-bg {
  background-image: url("/assets/images/popup/announcements-bg.png");
}

.tip-bg {
  background-image: url("/assets/images/popup/tip-bg.png");
}

.shop-appointment-wrap {
  -webkit-mask: url('/assets/images/pc/google-appointment.png') center / 100% 100% no-repeat;
  mask: url('/assets/images/pc/google-appointment.png') center / 100% 100% no-repeat;
}
</style>
