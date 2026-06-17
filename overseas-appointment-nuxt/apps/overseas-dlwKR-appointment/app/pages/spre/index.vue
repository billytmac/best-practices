<script setup lang="ts">
import { isMobile, mobileSystem, formatNumber } from "~/utils/index.client"
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Autoplay } from 'swiper/modules'
import { useDebounceFn } from '@vueuse/core'
import 'swiper/css'
import 'swiper/css/navigation'
import { useCustomStore } from "~/stores/custom"
import useCommon from '~/composables/usePcCommon'


const { bannerArr, getImageUrl, initOperation, storagePhoneInfo, openUrl, reservationInitApi, isIos, isAlreadyAppointment, isGoShop, openStoreUrl, toBindOs, toAgree, appointment, roleListRef, activeNav, isShowTipPopup, tipText, initData, showBottomPopup, isShowAppointmentPopup, isShowPhoneAppointmentPopup, isShowPhoneAppointmentSuccessPopup, isShowAppointmentSuccessPopup, isShowAnnouncementsPopup, bindOs, isAgree, inputValue } = useCommon()




definePageMeta({
  name: "spre",
});
const modules = [Navigation, Autoplay]
// console.log(window.navigator,'mobileSystem')

const timeLineArr = ref([
  {
    title: "10w",
    image: "10w",
    style: "-8%",
    num: 100000,
  },
  {
    title: "30w",
    image: "30w",
    style: "17%",
    num: 300000,
  },
  {
    title: "50w",
    image: "50w",
    style: "42%",
    num: 500000,
  },
  {
    title: "80w",
    image: "80w",
    style: "67%",
    num: 800000,
  },
  {
    title: "100w",
    image: "100w",
    style: "91%",
    num: 1000000,
  },
]);
const rolesList = ref([
  {
    name: "nvqumo",
    isSelected: true,
    sizeClass: "w-full h-588 top-6%",
  },
  {
    name: "nvwu",
    isSelected: false,
    sizeClass: "w-484 h-576 top-7%",
  },
  {
    name: "baihu",
    isSelected: false,
    sizeClass: "w-516 h-579 top-7%",
  },
  {
    name: "jiuwei",
    isSelected: false,
    sizeClass: "w-458 h-675 top--9%",
  },
  {
    name: "youxia",
    isSelected: false,
    sizeClass: "w-501 h-589 top-5% left-6%",
  },
  {
    name: "stone",
    isSelected: false,
    sizeClass: "w-468 h-594 top-6%",
  },
  {
    name: "yandou",
    isSelected: false,
    sizeClass: "w-444 h-605 top-3%",
  },
  {
    name: "nanzhu",
    isSelected: false,
    sizeClass: "w-516 h-575 top-7%",
  },
]);
const navList = ref([
  {
    image: 'main-menu',
    name: '메인',
    isSelected: false,
    mt: 0,
    isHover: false,
  },
  {
    image: 'preorder',
    name: '사전예약 ',
    isSelected: false,
    mt: 71,
    isHover: false,
  },
  {
    image: 'activity',
    name: '이벤트',
    isSelected: false,
    mt: 70,
    isHover: false,
  },
  {
    image: 'role',
    name: '캐릭터',
    isSelected: false,
    mt: 72,
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
const isShowNav = ref<boolean>(false)

const swiperInstance = ref(null)
const currentRoleName = ref(rolesList.value[0])


// 是否正在程序化滚动（避免滚动监听器干扰手动导航）
// const isProgrammaticScroll = ref(false)


function setIsShowNav(val: boolean) {
  isShowNav.value = val
}
function setActivedNav(val: string) {
  activeNav.value = val
  const targetElement = document.getElementById(val)
  if (targetElement) {
    // 计算需要滚动的位置，考虑固定头部的高度（76px）
    const offsetTop = targetElement.offsetTop - 86

    // 平滑滚动到目标位置
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    })

    // 滚动完成后重置标志
    // setTimeout(() => {
    //   isProgrammaticScroll.value = false
    // }, 1000)
  }
  // 关闭导航弹窗
  isShowNav.value = false
}

const onMouse = (item, flag: boolean) => {
  const isTouchDevice = 'ontouchstart' in window
  if (isTouchDevice) return  // 移动端直接跳过
  item.isHover = flag
}


const updateActiveNavByScroll = () => {
  // if (isProgrammaticScroll.value) return

  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const viewportHeight = window.innerHeight

  // 定义各屏幕区域的ID
  const sectionIds = ['main-menu', 'preorder', 'activity', 'role', 'game-features']

  // 遍历各个区域，找到当前在视窗中的区域
  for (let i = sectionIds.length - 1; i >= 0; i--) {
    const element = document.getElementById(sectionIds[i])
    if (element) {
      const elementTop = element.offsetTop
      // 如果滚动位置超过了该区域的顶部，则该区域为当前活跃区域
      if (scrollTop >= elementTop - viewportHeight / 3) {
        activeNav.value = sectionIds[i]
        break
      }
    }
  }
}

// 创建防抖版本的滚动处理函数
const debouncedScrollHandler = useDebounceFn(updateActiveNavByScroll, 100)

// 滚动监听
const handleScroll = () => {
  debouncedScrollHandler()
}


const onSwiper = (swiper) => {
  swiperInstance.value = swiper
}

const swiperPrev = () => {
  swiperInstance.value?.slidePrev()
}

const swiperNext = () => {
  swiperInstance.value?.slideNext()
}

const selectRole = (currentItem) => {
  // currentRoleName.value = {}
  currentRoleName.value = currentItem
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


onMounted(() => {
  // 添加滚动监听器
  window.addEventListener('scroll', handleScroll, { passive: true })
  updateActiveNavByScroll()
  initOperation()
})



</script>

<template>
  <div class=" bg-cover-no-repeat  " id="apppointment-mobile">
    <!-- 顶部固定栏 -->
    <div class="flex-items-center-between pl-18 pr-53 pt-8 bg-black h-86 w-full max-w-750 top-0 fixed z-30">
      <img src="/assets/images/head-logo.png" class="h-64 w-156" />
    </div>
    <!-- kv图 -->
    <!-- pt-134 -->
    <div class="flex flex-col">
      <div class="kv-bg bg-cover-no-repeat  h-1334 w-full relative " id="main-menu">
        <div>
          <video autoPlay loop muted playsInline>
            <source src='/assets/video/mobile-kv.mp4' type="video/mp4" />
          </video>
        </div>
        <img src="/assets/images/head-title.png" class="ml-66 h-50 w-639 absolute z-1 bottom-67" />

      </div>
      <div class="w-full bg-black h-[calc(100vh-177.86vw)]">
        <!-- <img src="/assets/images/kv-bottom-img.png" class="h-full w-full" /> -->
      </div>
    </div>




    <!-- 预约弹窗(商店和手机) -->
    <van-popup v-model:show="isShowAppointmentPopup" class='h-full !bg-transparent !w-full !max-w-750 ' z-index="40"
      overlay-class='!bg-black/80' :close-on-click-overlay="false">
      <div class="appointment-popup-bg1 bg-cover-no-repeat h-1106 w-679 mt-129 ml-49 pt-300">
        <div class=" ml-69 relative">
          <img src="/assets/images/popup/appointment-title.png" class="w-530 h-101" />
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
        <div class="mt-13 ml-201 w-255 h-92 appointmentPopup-store-wrap shine-wrapper overflow-hidden relative"
          @click="openStoreUrl('phoneAndShopPopup')">
          <img v-show='isIos' src="/assets/images/popup/apple-appointment.png" class="w-full h-full" />
          <img v-show="!isIos" src="/assets/images/popup/google-appointment.png" class="w-full h-full" />
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
        <div class=" bg-white h-60 w-551 ml-50 pl-48 font-500 text-[#301A72] flex-items-center font-[NotoSansSC] mt-15">
          <div class="text-[38px] mr-115">010</div>
          <div class="flex-1">
            <input v-model="inputValue" type="tel" pattern="[0-9]*" maxlength="8"
              class="outline-none bg-transparent popup-number-input text-[38px] w-full" placeholder="휴대폰 번호 입력" />
          </div>
        </div>
        <div class="flex ml-65 mt-17">
          <div @click="toAgree" class="flex-items-center-center popup-radio-bg bg-cover-no-repeat w-25 h-25 font-500">
            <img src="/assets/images/tick.png" class="h-16 w-24" v-show="isAgree" />
          </div>
          <div
            class="text-[#381076] font-500 mt-1 text-[19px] leading-[19px] font-[NotoSansSC] font-500 ml-12 tracking-[-1px] ">
            <span class="cursor-pointer" @click="toAgree">개인정보 수집, 이용 및 프로모션 알림 수신 동의</span>
            <span class="ml-10 underline underline-offset-[6px] cursor-pointer"
              @click='isShowAnnouncementsPopup = true'>유의사항</span>
          </div>
        </div>
        <div class='ml-185 mt-8'>
          <img src="/assets/images/popup/appoitment-comfirm.png" class="w-273 h-83 cursor-pointer"
            @click="appointment('phoneAndShopPopup')" />
        </div>
      </div>
    </van-popup>
    <!-- 预约弹窗(手机) -->
    <van-popup v-model:show="isShowPhoneAppointmentPopup" class='h-full !bg-transparent !w-full !max-w-750 '
      z-index="40" overlay-class='!bg-black/80' :close-on-click-overlay="false">
      <div class="ml-46 relative mt-365">
        <img src="/assets/images/popup/phone-title.png" class="w-636 h-94" />
      </div>
      <div class="phone-appointment-popup-bg bg-cover-no-repeat h-707 w-683 mt-13 ml-21 pt-54">
        <div class=" ml-340">
          <img src="/assets/images/popup/phone-info.png" class="w-333 h-165" />
        </div>
        <div class="mt-4 ml-324">
          <img src="/assets/images/popup/phone-dialog.png" class="w-339 h-117" />
        </div>
        <div class="text-[26px] text-white leading-[26px] font-500 flex ml-218 mt-85">
          <div class="mr-99 flex cursor-pointer" @click="bindOs = 'android'">
            <div class="flex-items-center-center mr-16 border border-[#fff] rounded-full h-24 w-24">
              <div class="rounded-full bg-[#fff] h-16 w-16" v-show="bindOs === 'android'" />
            </div>
            <div class="mt-1">AOS</div>
          </div>
          <div class="flex cursor-pointer" @click="bindOs = 'ios'">
            <div class="flex-items-center-center mr-16 border border-[#fff] rounded-full h-24 w-24">
              <div class="rounded-full bg-[#fff] h-16 w-16" v-show="bindOs === 'ios'" />
            </div>
            <div class="mt-1">IOS</div>
          </div>
        </div>
        <div class=" bg-white h-60 w-551 ml-80 pl-48 font-500 text-[#301A72] flex-items-center font-[NotoSansSC] mt-15">
          <div class="text-[38px] mr-115">010</div>
          <div class="flex-1">
            <input v-model="inputValue" type="tel" maxlength="8" pattern="[0-9]*" inputmode="numeric"
              class="outline-none bg-transparent popup-number-input text-[38px] w-full" placeholder="휴대폰 번호 입력" />
          </div>
        </div>
        <div class="flex ml-110 mt-14">
          <div class="flex-items-center-center popup-radio-bg bg-cover-no-repeat w-25 h-25 font-500" @click="toAgree">
            <img src="/assets/images/tick.png" class="h-16 w-24" v-show="isAgree" />
          </div>
          <div
            class="text-[#381076] font-500 mt-1 text-[19px] leading-[19px] font-[NotoSansSC] font-500 ml-12 tracking-[-1px] cursor-pointer">
            <span @click="toAgree">개인정보 수집, 이용 및 프로모션 알림 수신 동의</span>
            <span class="ml-10 underline underline-offset-[6px]" @click='isShowAnnouncementsPopup = true'>유의사항</span>
          </div>
        </div>
        <div class='ml-225 mt-24'>
          <img src="/assets/images/popup/phone-confim.png" class="w-260 h-57 cursor-pointer"
            @click="appointment('phonePopup')" />
        </div>
      </div>
    </van-popup>
    <!-- 电话预约成功,商店没点击时弹窗 -->
    <van-popup v-model:show="isShowPhoneAppointmentSuccessPopup" class='h-full !bg-transparent !w-full !max-w-750 '
      z-index="40" overlay-class='!bg-black/80' :close-on-click-overlay="false">

      <div class="phone-appointment-success-popup-bg bg-cover-no-repeat h-947 w-655  ml-49 pt-256 mt-109">
        <div class="relative">
          <img src="/assets/images/popup/phone-success-title.png" class="w-636 h-94" />
        </div>
        <img src="/assets/images/popup/phone-go-market-title.png" class="w-564 h-42 mt-74 ml-48" />
        <div class='ml-30 mt-42 flex'>
          <img src="/assets/images/popup/phone-prize-1.png" class="w-207 h-224" />
          <img src="/assets/images/popup/phone-prize-2.png" class="w-207 h-224" />
          <img src="/assets/images/popup/phone-prize-3.png" class="w-207 h-224" />
        </div>
        <div class="w-300 h-89 mt-47 ml-176 phone-store-wrap shine-wrapper overflow-hidden relative"
          @click="openStoreUrl('PhoneAppointmentSuccessPopup')">
          <img v-show="isIos" src="/assets/images/popup/phone-apple.png" class="w-full h-full " />
          <img v-show="!isIos" src="/assets/images/popup/phone-google.png" class="w-full h-full" />
        </div>
      </div>
    </van-popup>
    <!-- 注意事项弹窗 -->
    <van-popup v-model:show="isShowAnnouncementsPopup" class='h-full !bg-transparent !w-full !max-w-750 ' z-index="40"
      overlay-class='!bg-black/80' :close-on-click-overlay="false">
      <div class="relative mt-365 ml-46">
        <img src="/assets/images/popup/announcements-title.png" class="w-636 h-94" />
        <!-- <img src="/popup/close.png" class="w-84 h-85 absolute right-4.1% top--9% cursor-pointer"
            @click="isShowAnnouncementsPopup = false" /> -->
      </div>
      <div class="announcements-popup-bg bg-cover-no-repeat h-584 w-655  ml-49 pt-51 mt-13">
        <div class='font-[NotoSansSC] text-[17px] font-normal color-[#F8F7FF]  leading-[17px] flex-col-items-center '>
          <div>
            Dawn Breaking Network Technology Co., Limited는
          </div>
          <div class=" mt-10 text-center">
            다음과 같이 개인정보를 수집 및 이용하고 있습니다.
          </div>
        </div>
        <div class="font-[NotoSansSC] text-[20px] font-normal color-[#F8F7FF] ">
          <div class='flex-col flex gap-15  ml-40 mt-27'>
            <div class='w-578 h-42 bg-[#8A7ED8] text-center leading-[42px]'>1. 수집 및 이용 목적: 사전예약 진행 및 이벤트/프로모션 알림 안내
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
    </van-popup>
    <!-- 系统弹窗 -->
    <van-popup v-model:show="isShowTipPopup" class='h-full !bg-transparent !w-full !max-w-750 ' z-index="40"
      overlay-class='!bg-black/80' :close-on-click-overlay="false">
      <div class='relative mt-552 ml-47'>
        <img src="/assets/images/popup/close.png" class="w-84 h-85 absolute right-4.1% top--20% cursor-pointer"
          @click="isShowTipPopup = false" />
        <div class="tip-bg bg-cover-no-repeat h-414 w-657 pt-70">
          <img src="/assets/images/popup/tip-title.png" class="w-98 h-59 mx-auto " />
          <div class="font-500 text-[21px] leading-[21px] font-[NotoSansSC] color-[#281378] text-center mt-97">
            {{ tipText }}</div>
        </div>
      </div>
    </van-popup>
    <!-- 预约成功弹窗 -->
    <van-popup v-model:show="isShowAppointmentSuccessPopup" class='h-full !bg-transparent !w-full !max-w-750 '
      z-index="40" overlay-class='!bg-black/80' :close-on-click-overlay="false">
      <div class="  mt-449 ml-116 flex">
        <img src="/assets/images/popup/success-title.png" class="w-514 h-94" />
      </div>
      <div class="success-popup-bg bg-cover-no-repeat h-414 w-657 mt-9 ml-47 pt-31">
        <div class="ml-142">
          <img src="/assets/images/popup/success-icon.png" class="w-380 h-206" />
        </div>
        <div class="text-[24px] text-[#281378] leading-[24px] font-500 font-[NotoSansSC] ml-103 mt-31">공식 라운지에서 더 많은
          이벤트에 참여하세요!</div>
        <div class="mt-12 ml-180">
          <img src="/assets/images/popup/success-btn.png"
            class="w-302 h-71 cursor-pointer animate__animated animate__pulse animate__infinite"
            @click="openUrl('loungeUrl')" />
        </div>
      </div>

    </van-popup>
  </div>

</template>

<style scoped>
#apppointment-mobile {}


.apppointment-bg {
  background-image: url("/assets/images/bg.png");
}

.kv-bg {
  background-image: url("/assets/images/kv-img.png");
}

.step-title-1 {
  background-image: url("/assets/images/animated-png/step-title-1.png");
}

.prize-list-bg {
  background-image: url("/assets/images/prize-list-bg.png");
}

.popup-prize-list-bg {
  background-image: url("/assets/images/popup/prize-list-bg.png");
}

.appointment-input-bg {
  background-image: url("/assets/images/appointment-input-bg.png");
}

.download-bg {
  background-image: url("/assets/images/download-bg.png");
}

.number-input::placeholder {
  color: #5c47dd;
  font-size: 34px;
  font-weight: 500;
}

.popup-number-input::placeholder {
  color: #301A72;
  font-size: 38px;
  font-weight: 500;
}

.radio-bg {
  background-image: url("/assets/images/radio-bg.png");
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
  background-image: url("/assets/images/time-line.png");
}

.title-3-bg {
  background-image: url("/assets/images/title-3-bg.png");
}

.title-3-decorate {
  background-image: url("/assets/images/title-3-decorate.png");
}

.swiper-bg {
  background-image: url("/assets/images/swiper-bg.png");
}

.bottom-bg {
  background-image: url("/assets/images/bottom-bg.png");
}

.appointment-popup-bg {
  background-image: url("/assets/images/popup/appointment-bg.png");
}

.appointment-popup-bg1 {
  background-image: url("/assets/images/popup/appointment-bg1.png");
}

.phone-appointment-popup-bg {
  background-image: url("/assets/images/popup/phone-bg.png");
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

.popup-radio-bg {
  background-image: url("/assets/images/popup/radio-bg.png");
}

.success-popup-bg {
  background-image: url("/assets/images/popup/success-bg.png");
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

.google-head-wrap {
  /* -webkit-mask: url('/assets/images/google-head.png') center / 100% 100% no-repeat; */
  /* -webkit-mask-image: url('/assets/images/google-head.png');
  -webkit-mask-position: center;
  -webkit-mask-size: 100% 100%;
  -webkit-mask-repeat: no-repeat;
  mask-image: url('/assets/images/google-head.png');
  mask-position: center;
  mask-size: 100% 100%;
  mask-repeat: no-repeat; */
  /* mask: url('/assets/images/google-head.png') center / 100% 100% no-repeat; */
}

.apple-head-wrap {
  /* -webkit-mask: url('/assets/images/apple-head.png') center / 100% 100% no-repeat;
  mask: url('/assets/images/apple-head.png') center / 100% 100% no-repeat; */
}

.google-1-wrap {
  /* -webkit-mask: url('/assets/images/google-1.png') center / 100% 100% no-repeat;
  mask: url('/assets/images/google-1.png') center / 100% 100% no-repeat; */
}

.apple-1-wrap {
  /* -webkit-mask: url('/assets/images/apple-1.png') center / 100% 100% no-repeat;
  mask: url('/assets/images/apple-1.png') center / 100% 100% no-repeat; */
}

.google-bottom-wrap {
  /* -webkit-mask: url('/assets/images/google-bottom.png') center / 100% 100% no-repeat;
  mask: url('/assets/images/google-bottom.png') center / 100% 100% no-repeat; */
}

.apple-bottom-wrap {
  /* -webkit-mask: url('/assets/images/apple-bottom.png') center / 100% 100% no-repeat;
  mask: url('/assets/images/apple-bottom.png') center / 100% 100% no-repeat; */
}

.phone-store-wrap {
  /* -webkit-mask: url('/assets/images/popup/phone-apple.png') center / 100% 100% no-repeat;
  mask: url('/assets/images/popup/phone-apple.png') center / 100% 100% no-repeat; */
}

.appointmentPopup-store-wrap {
  /* -webkit-mask: url('/assets/images/popup/google-appointment.png') center / 100% 100% no-repeat;
  mask: url('/assets/images/popup/google-appointment.png') center / 100% 100% no-repeat; */
}
</style>
