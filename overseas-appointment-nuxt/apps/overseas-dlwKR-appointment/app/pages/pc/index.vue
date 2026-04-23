<script setup lang="ts">
definePageMeta({
  name: "pc",
});

const shopList = ['google', 'iphone', 'one', 'sanxing']

const timeLineArr = ref([
  {
    title: "10w",
    image: "/10w.png",
    style: "-8%",
    isReached: false,
  },
  {
    title: "30w",
    image: "/30w.png",
    style: "17%",
    isReached: false,
  },
  {
    title: "50w",
    image: "/50w.png",
    style: "42%",
    isReached: false,
  },
  {
    title: "80w",
    image: "/80w.png",
    style: "67%",
    isReached: false,
  },
  {
    title: "100w",
    image: "/100w.png",
    style: "91%",
    isReached: false,
  },
]);
const rolesList = [
  {
    name: "nvqumo",
    isSelected: false,
  },
  {
    name: "nvwu",
    isSelected: false,
  },
  {
    name: "baihu",
    isSelected: false,
  },
  // {
  //   name: "nvwu",
  //   isSelected: false,
  // },
  {
    name: "jiuwei",
    isSelected: false,
  },
  {
    name: "youxia",
    isSelected: false,
  },
  {
    name: "stone",
    isSelected: false,
  },
  {
    name: "yandou",
    isSelected: false,
  },
  {
    name: "nanzhu",
    isSelected: false,
  },
];
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






const isShowAppointmentPopup = ref<boolean>(false)
const isShowPhoneAppointmentPopup = ref<boolean>(false)
const isShowAppointmentSuccessPopup = ref<boolean>(false)

const currentNav = ref<string>('main-menu')
function setIsShowNav(val: boolean) {
  isShowNav.value = val
}
function setCurrentNav(val: string) {
  currentNav.value = val
  // const targetElement = document.getElementById(val)
  // if (targetElement) {
  //   // 计算需要滚动的位置，考虑固定头部的高度（76px）
  //   const offsetTop = targetElement.offsetTop - 86

  //   // 平滑滚动到目标位置
  //   window.scrollTo({
  //     top: offsetTop,
  //     behavior: 'smooth'
  //   })
  // }
}

const onMouse = (item, flag: boolean) => {
  const isTouchDevice = 'ontouchstart' in window
  if (isTouchDevice) return  // 移动端直接跳过
  item.isHover = flag
}



</script>

<template>
  <div class="bg-black h-5938">
    <div class="relative max-w-1920 mx-auto bg-black">
      <!-- 顶部固定栏 -->
      <div
        class="flex-items-center pl-26 pr-85 max-w-1920   bg-black h-80 w-full  top-0 fixed z-30 font-[DNF_Forged_Blade] font-300 text-[28px] color-white">
        <NuxtImg src="/pc/head-logo.png" class="h-70 w-181" />
        <div class="flex-1">
        </div>
        <client-only>
          <div v-for="item in navList" :key="item.name" class="cursor-pointer whitespace-nowrap nav-item"
            @click="setCurrentNav(item.image)"
            :class="{ 'mr-90': item.mr === 90, 'mr-91': item.mr === 91, 'text-[#BDEEFF]': currentNav === item.image }">
            <span>{{ item.name }}</span>
          </div>
        </client-only>
        <div class="flex-1"></div>
        <div class="flex">
          <NuxtImg src="/pc/game.png" class="h-83 w-100 cursor-pointer mr-4" />
          <NuxtImg src="/pc/video.png" class="h-84 w-92 cursor-pointer   " />
        </div>
      </div>
      <!-- kv图 -->
      <div class="kv-bg bg-cover-no-repeat bg-no-repeat pt-134 h-1098 w-full pt-89" id="main-menu">
        <NuxtImg src="/pc/head-title-icon.png" class=" w-524 h-232 ml-729" />
        <NuxtImg src="/pc/head-title.png" class="ml-625 h-49 w-726" />
        <div class="ml-504 flex mt-454 gap-60">
          <client-only>
            <NuxtImg v-for="item in shopList" :key="item" :src="`/pc/${item}.png`" class="h-55 w-183 cursor-pointer" />
          </client-only>
        </div>
        <div class="mt-14 ml-803 relative">
          <client-only>
            <NuxtImg src="/pc/appointment-btn.png" class=" h-120 w-330 cursor-pointer" />
          </client-only>
          <img src="/animated-png/more-icon.png" class="h-97 w-88 cursor-pointer absolute top-101 left-115" />
        </div>

      </div>
      <div class="apppointment-bg bg-cover-no-repeat h-4884 absolute w-full top-[95%]">
        <!-- 第一部分 -->
        <div id="preorder" class="pt-80">
          <div class="step-title-1 bg-cover-no-repeat  mt-15 h-105 w-482 relative ml-720">
            <client-only>
              <div
                class="text-[35px] text-[#C1D0FF] leading-[35px] font-[NotoSansSC] font-700 text-center w-170 right-[-1%] top-31.1% absolute">
                1,000,000
              </div>
            </client-only>
            <NuxtImg src="/title-1-icon.png" class="h-105 w-106 right--19% top--8% absolute z-1" />
          </div>
          <div class="flex mt-63 ml-282">
            <div class="prize-list-bg bg-cover-no-repeat ml-5 mt-49 pt-121 h-462 w-674">
              <div class="ml-42 flex gap-32">
                <NuxtImg src="/pc/prize-1.png" class="w-177 h-218" />
                <NuxtImg src="/pc/prize-2.png" class="w-177 h-218" />
                <NuxtImg src="/pc/prize-3.png" class="w-176 h-218" />
              </div>
              <div class="mt-12 flex gap-6">
                <NuxtImg src="/pc/google-1.png" class="h-100 w-279  ml-58 cursor-pointer" />
                <NuxtImg src="/pc/iphone-2.png" class="h-100 w-279  cursor-pointer" />
              </div>
            </div>
            <div class="appointment-input-bg bg-cover-no-repeat ml-55  pt-268 h-511 w-609 relative">
              <div class="text-[17px] text-[#D0C8FF] font-[NotoSansSC] leading-[17px] font-500 flex ml-211">
                <div class="mr-75 flex">
                  <client-only>
                    <div class="flex-items-center-center mr-10 border border-[#D0C8FF] rounded-full h-16 w-16">
                      <div class="rounded-full bg-[#D0C8FF] h-8 w-8" />
                    </div>
                  </client-only>

                  <div class="mt--1">AOS</div>
                </div>
                <div class="flex">
                  <client-only>
                    <div class="flex-items-center-center mr-10 border rgb(150 150 152) rounded-full  h-16 w-16">
                      <div class="rounded-full bg-[#D0C8FF] h-8 w-8" />
                    </div>
                  </client-only>
                  <div class="mt--1">IOS</div>
                </div>
              </div>
              <div
                class="download-bg bg-cover-no-repeat mt-19 h-67 w-517 ml-49 pl-44 font-500 text-[#5C47DD] flex-items-center font-[NotoSansSC]">
                <div class="text-[32px]">010</div>
                <div class="w-1 h-30 bg-[#9189FA] ml-21 mr-21"></div>
                <div class="flex-1">
                  <client-only>
                    <input type="text" class="outline-none bg-transparent number-input text-[28px] w-full"
                      placeholder="휴대폰 번호 입력" />
                  </client-only>
                </div>
              </div>
              <div class="flex ml-65 mt-17">
                <client-only>
                  <div class="flex-items-center-center radio-bg bg-cover-no-repeat w-23 h-23 font-500">
                    <NuxtImg src="/pc/tick.png" class="h-15 w-23" />
                  </div>
                </client-only>
                <div
                  class="text-[#A7AABC] mt-1 text-[18px] leading-[18px] font-[NotoSansSC] font-500 ml-12 tracking-[-1px] ">
                  <span>개인정보 수집, 이용 및 프로모션 알림 수신 동의</span>
                  <client-only>
                    <span class="ml-10 underline underline-offset-[4px]">유의사항</span>
                  </client-only>
                </div>
              </div>
              <div class="mt-7 ml-193">
                <client-only>
                  <NuxtImg src="/appointment-btn1.png" class="h-87 w-234" />
                </client-only>
              </div>
            </div>
          </div>

        </div>
        <!-- 第二部分 -->
        <div id="activity">
          <div class="step-title-2 bg-cover-no-repeat ml-751 mt-275 h-105 w-401 relative">
            <NuxtImg src="/title-2-icon.png" class="h-96 w-104 absolute z-1 left-[-22%] top-[-7%]" />
          </div>
          <div class='flex mt-111 ml-273'>
            <NuxtImg src="/pc/10w.png" class="w-433 h-142 mr-56" />
            <NuxtImg src="/pc/50w.png" class="w-433 h-142 mr-57" />
            <NuxtImg src="/pc/100w.png" class="w-433 h-142" />
          </div>
          <div class="time-line bg-cover-no-repeat h-18 w-1496 relative ml-238 mt-88  pl-166">
            <div class="flex gap-176 absolute top-[-37px]">
              <client-only>
                <div v-for="item in timeLineArr" :key="item.title" class=" z-1  h-90 w-91 ">
                  <NuxtImg v-if="item.isReached" src="/pc/line-reached.png" class="w-full h-full" />
                  <NuxtImg v-else src="/pc/line-mark.png" class="w-full h-full" />
                  <!-- v-else -->
                </div>
              </client-only>
            </div>
          </div>
          <div class="ml-546 mt-98 flex gap-84">
            <NuxtImg src="/pc/30w.png" class="w-433 h-142 " />
            <NuxtImg src="/pc/80w.png" class="w-433 h-142" />
          </div>

          <div class="w-775 h-39 mt-135">
            <img src="/animated-png/pc-line-top.png" class="w-full h-full" />
          </div>
        </div>
        <!-- 第三部分 -->
        <div class="mt-209" id="role">
          <div class="step-title-3 bg-cover-no-repeat ml-728 h-105 w-257 relative mb-25">
            <NuxtImg src="/title-3-icon.png" class="h-98 w-91 absolute z-1 right--28% top--8%" />
          </div>
          <div class="title-3-bg w-1602 h-735 mt-94 ml-162 relative">
            <client-only>
              <div class="absolute left-[827px] top-[-29px]  w-373 h-148">
                <img src="/animated-png/qumo-title.png" class="w-full h-full" />
              </div>
              <div class="w-1272 h-779 absolute z-2 left--29 bottom--14">
                <NuxtImg src="/pc/roles/nvqumo-role.png" class="w-full h-full top--29 left--29"> </NuxtImg>
              </div>
              <div class="flex flex-col ml-735 pt-221">
                <div class="w-422 h-239 ml-142 mb-13">
                  <NuxtImg src="/pc/roles/nvqumo-icon.png" class="w-full h-full " />
                </div>
                <div class="nvqumo-title-bg w-757 h-203 bg-cover-no-repeat ">
                  <NuxtImg src="/pc/roles/nvqumo-title.png" class="w-450 h-109 mt-56 ml-246" />
                </div>
              </div>

            </client-only>
          </div>
          <client-only>
            <div class="ml-369 mt-33 flex gap-9">
              <div v-for="item in rolesList" :key="item.name" class="w-141 h-202">
                <NuxtImg :src="`pc/roles/${item.name}-selected.png`" v-show="item.isSelected" class="w-full h-full" />
                <NuxtImg :src="`pc/roles/${item.name}.png`" v-show="!item.isSelected" class="w-full h-full" />
              </div>
            </div>
          </client-only>
        </div>

        <!-- 第四部分 -->
        <div class="mt-150" id="game-features ">
          <div class="w-909 h-39 ml-1011 mb-48">
            <img src="/animated-png/pc-line-bottom.png" class="w-909 h-39" />
          </div>
          <div class="step-title-4 bg-cover-no-repeat ml-846 h-105 w-221 relative">
            <NuxtImg src="/title-4-icon.png" class="h-100 w-87 absolute z-1 left-[-34%] top-[-7%]" />
          </div>
          <div class="relative mt-90 ml-386 flex">
            <client-only>
              <NuxtImg src="/pc/swiper-left.png" class="w-49 h-74 mr-107 cursor-pointer mt-365" />
              <div class="swiper-bg w-453 h-782 relative ml-83 bg-cover-no-repeat pl-27 pt-45">
                <div class="w-400 h-710">
                  <NuxtImg src="/pc/swiper-1.png" class="w-full h-full" />
                </div>
              </div>
              <NuxtImg src="/pc/swiper-right.png" class="w-49 h-74 ml-107  cursor-pointer mt-365" />
            </client-only>
          </div>

        </div>

        <div
          class="mt-133  pt-83
           w-full h-213 bg-[#08081D]  flex-col-items-center  absolute bottom-0 text-[24px] leading-[24px] text-[#fff]  font-[NotoSansSC]">
          <div class="tracking-[6px] flex ">
            <span>이용약관</span>
            <span class="w-1 h-24 bg-white ml-20 mr-20"></span>
            <span>개인정보처리방침</span>
          </div>
          <div class="mt-14">
            ©2026 DAWN BREAKING NETWORK TECHNOLOGY CO., LIMITED. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>

      <!-- 导航弹窗 -->
      <client-only>
        <van-popup v-model:show="isShowNav" class='h-full !bg-transparent !w-full !max-w-750 ' z-index="40"
          overlay-class='!bg-black/80' :close-on-click-overlay="false">
          <div class='text-right pt-5 pr-40 flex flex-row-reverse'>
            <NuxtImg src="/popup/close.png" class="w-84 h-85 cursor-pointer" @click="setIsShowNav(false)" />
          </div>
          <div class="ml-138">
            <NuxtImg src="/popup/nav-icon.png" class="w-481 h-188 " />
          </div>
          <div class="flex flex-col items-center font-500 font-[NotoSansSC] text-[48px]  text-[#fff] pt-71">
            <div class="cursor-pointer relative " v-for="item in navList" :key="item.name"
              @mouseenter="onMouse(item, true)" @mouseleave="onMouse(item, false)" @click="setCurrentNav(item.image)"
              :class="{ 'mt-71': item.mt === 71, 'mt-70': item.mt === 70, 'mt-72': item.mt === 72, 'mt-85': item.mt === 85 }">
              <div class="w-184 h-59 whitespace-nowrap flex-items-center-center"
                v-show="currentNav !== item.image && !item.isHover">
                <span>{{ item.name }}</span>
              </div>
              <NuxtImg v-show="currentNav === item.image || item.isHover" :src="`/popup/${item.image}.png`"
                class="w-184 h-59  " />
            </div>
          </div>
          <div class="mt-73 pl-79">
            <NuxtImg src="/popup/nav-line.png" class="w-583 h-12 " />
          </div>
          <div class="flex ml-219 pt-24">
            <NuxtImg src="/popup/line.png" class="w-143 h-115 mr-26 mt-7 cursor-pointer" />
            <NuxtImg src="/popup/youtube.png" class="w-144 h-126 cursor-pointer" />
          </div>
        </van-popup>
      </client-only>
      <!-- 预约弹窗(商店和手机) -->
      <client-only>
        <van-popup v-model:show="isShowAppointmentPopup" class='h-full !bg-transparent !w-full !max-w-750 ' z-index="40"
          overlay-class='!bg-black/80' :close-on-click-overlay="false">
          <div class="appointment-popup-bg bg-cover-no-repeat h-1050 w-679 mt-129 ml-49 pt-228">
            <div class=" ml-69 relative">
              <NuxtImg src="/popup/appointment-title.png" class="w-530 h-101" />
              <NuxtImg src="/popup/close.png" class="w-84 h-85 absolute right-[1.3%] top-0 cursor-pointer"
                @click="isShowAppointmentPopup = false" />
            </div>
            <div class='ml-88 mt-42'>
              <NuxtImg src="/popup/step-1.png" class="w-479 h-38" />
            </div>
            <div
              class="popup-prize-list-bg flex-items-between bg-cover-no-repeat h-173 w-491 ml-83 mt-16 pl-32 pr-28 pt-13">
              <div class="flex-col-items-center mt-20">
                <NuxtImg src="/popup/444-icon.png" class="w-100 h-93" />
                <NuxtImg src="/popup/444.png" class="w-105 h-29 mt-13" />
              </div>
              <div class="flex-col-items-center relative">
                <NuxtImg src="/popup/sizheng-icon.png" class="w-155 h-137" />
                <NuxtImg src="/popup/sizheng.png" class="w-145 h-29  absolute top-[126px] left-[11px]" />
              </div>
              <div class="flex-col-items-center mt-18">
                <NuxtImg src="/popup/qianghua-icon.png" class="w-114 h-92" />
                <NuxtImg src="/popup/qianghua.png" class="w-106 h-29 mt-13 mt-16" />
              </div>

            </div>
            <div class="mt-13 ml-201">
              <NuxtImg src="/popup/google-appointment.png" class="w-255 h-92" />
            </div>
            <div class='ml-88 mt-4'>
              <NuxtImg src="/popup/step-2.png" class="w-479 h-38" />
            </div>
            <div class="text-[26px] text-white leading-[26px] font-500 flex ml-190 mt-15">
              <div class="mr-99 flex">
                <div class="flex-items-center-center mr-16 border border-[#fff] rounded-full h-24 w-24">
                  <div class="rounded-full bg-[#fff] h-16 w-16" />
                </div>
                <div>AOS</div>
              </div>
              <div class="flex">
                <div class="flex-items-center-center mr-16 border border-[#fff] rounded-full h-24 w-24">
                  <div class="rounded-full bg-[#fff] h-16 w-16" />
                </div>
                <div>IOS</div>
              </div>
            </div>
            <div
              class=" bg-white h-60 w-551 ml-50 pl-48 font-500 text-[#301A72] flex-items-center font-[NotoSansSC] mt-15">
              <div class="text-[38px] mr-115">010</div>
              <div class="flex-1">
                <input type="text" class="outline-none bg-transparent popup-number-input text-[38px] w-full"
                  placeholder="휴대폰 번호 입력" />
              </div>
            </div>
            <div class="flex ml-65 mt-17">
              <div class="flex-items-center-center popup-radio-bg bg-cover-no-repeat w-25 h-25 font-500">
                <NuxtImg src="/tick.png" class="h-16 w-24" />
              </div>
              <div
                class="text-[#381076] font-500 mt-1 text-[19px] leading-[19px] font-[NotoSansSC] font-500 ml-12 tracking-[-1px] ">
                <span>개인정보 수집, 이용 및 프로모션 알림 수신 동의</span>
                <span class="ml-10 underline underline-offset-[6px]">유의사항</span>
              </div>
            </div>
            <div class='ml-185 mt-8'>
              <NuxtImg src="/popup/appoitment-comfirm.png" class="w-273 h-83 cursor-pointer" />
            </div>
          </div>
        </van-popup>
      </client-only>
      <!-- 预约弹窗(手机) -->
      <client-only>
        <van-popup v-model:show="isShowPhoneAppointmentPopup" class='h-full !bg-transparent !w-full !max-w-750 '
          z-index="40" overlay-class='!bg-black/80' :close-on-click-overlay="false">
          <div class="ml-46 relative mt-365">
            <NuxtImg src="/popup/phone-title.png" class="w-636 h-94" />
            <NuxtImg src="/popup/close.png" class="w-84 h-85 absolute right-3.9% top--9% cursor-pointer"
              @click="isShowPhoneAppointmentPopup = false" />
          </div>
          <div class="phone-appointment-popup-bg bg-cover-no-repeat h-707 w-683 mt-13 ml-21 pt-54">
            <div class=" ml-340">
              <NuxtImg src="/popup/phone-info.png" class="w-333 h-165" />
            </div>
            <div class="mt-4 ml-324">
              <NuxtImg src="/popup/phone-dialog.png" class="w-339 h-117" />
            </div>
            <div class="text-[26px] text-white leading-[26px] font-500 flex ml-218 mt-85">
              <div class="mr-99 flex">
                <div class="flex-items-center-center mr-16 border border-[#fff] rounded-full h-24 w-24">
                  <div class="rounded-full bg-[#fff] h-16 w-16" />
                </div>
                <div class="mt--1">AOS</div>
              </div>
              <div class="flex">
                <div class="flex-items-center-center mr-16 border border-[#fff] rounded-full h-24 w-24">
                  <div class="rounded-full bg-[#fff] h-16 w-16" />
                </div>
                <div class="mt--1">IOS</div>
              </div>
            </div>
            <div
              class=" bg-white h-60 w-551 ml-80 pl-48 font-500 text-[#301A72] flex-items-center font-[NotoSansSC] mt-15">
              <div class="text-[38px] mr-115">010</div>
              <div class="flex-1">
                <input type="text" class="outline-none bg-transparent popup-number-input text-[38px] w-full"
                  placeholder="휴대폰 번호 입력" />
              </div>
            </div>
            <div class="flex ml-110 mt-14">
              <div class="flex-items-center-center popup-radio-bg bg-cover-no-repeat w-25 h-25 font-500">
                <NuxtImg src="/tick.png" class="h-16 w-24" />
              </div>
              <div
                class="text-[#381076] font-500 mt-1 text-[19px] leading-[19px] font-[NotoSansSC] font-500 ml-12 tracking-[-1px] ">
                <span>개인정보 수집, 이용 및 프로모션 알림 수신 동의</span>
                <span class="ml-10 underline underline-offset-[6px]">유의사항</span>
              </div>
            </div>
            <div class='ml-225 mt-24'>
              <NuxtImg src="/popup/phone-confim.png" class="w-260 h-57 cursor-pointer" />
            </div>
          </div>
        </van-popup>
      </client-only>
      <!-- 预约成功弹窗 -->
      <client-only>
        <van-popup v-model:show="isShowAppointmentSuccessPopup" class='h-full !bg-transparent !w-full !max-w-750 '
          z-index="40" overlay-class='!bg-black/80' :close-on-click-overlay="false">
          <div class="  mt-449 ml-116 flex">
            <NuxtImg src="/popup/success-title.png" class="w-514 h-94" />
            <NuxtImg src="/popup/close.png" class="w-84 h-85 ml-7 mt-1   cursor-pointer"
              @click="isShowAppointmentSuccessPopup = false" />
          </div>
          <div class="success-popup-bg bg-cover-no-repeat h-414 w-657 mt-9 ml-47 pt-31">
            <div class="ml-142">
              <NuxtImg src="/popup/success-icon.png" class="w-380 h-206" />
            </div>
            <div class="text-[24px] text-[#281378] leading-[24px] font-500 font-[NotoSansSC] ml-103 mt-31">공식 라운지에서 더 많은
              이벤트에 참여하세요!</div>
            <div class="mt-12 ml-180">
              <NuxtImg src="/popup/success-btn.png" class="w-302 h-71 cursor-pointer" />
            </div>
          </div>

        </van-popup>
      </client-only>
    </div>
  </div>


</template>

<style scoped>
.apppointment-bg {
  background-image: url("/pc/bg.png");
}

.kv-bg {
  background-image: url("/pc/kv-img.png");
}

.step-title-1 {
  background-image: url("/animated-png/step-title-1.png");
}

.prize-list-bg {
  background-image: url("/pc/prize-list-bg.png");
}

.popup-prize-list-bg {
  background-image: url("/popup/prize-list-bg.png");
}

.appointment-input-bg {
  background-image: url("/pc/appointment-input-bg.png");
}

.download-bg {
  background-image: url("/download-bg.png");
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
  background-image: url("/pc/radio-bg.png");
}

.step-title-2 {
  background-image: url("/animated-png/step-title-2.png");
}

.step-title-3 {
  background-image: url("/animated-png/step-title-3.png");
}

.step-title-4 {
  background-image: url("/animated-png/step-title-4.png");
}

.time-line {
  background-image: url("/pc/time-line.png");
}

.title-3-bg {
  background-image: url("/pc/title-3-bg.png");
}

.title-3-decorate {
  background-image: url("/title-3-decorate.png");
}

.swiper-bg {
  background-image: url("/pc/swiper-bg.png");
}

.bottom-bg {
  background-image: url("/bottom-bg.png");
}

.appointment-popup-bg {
  background-image: url("/popup/appointment-bg.png");
}

.phone-appointment-popup-bg {
  background-image: url("/popup/phone-bg.png");
}

.popup-radio-bg {
  background-image: url("/popup/radio-bg.png");
}

.success-popup-bg {
  background-image: url("/popup/success-bg.png");
}

.nav-item:hover {
  color: #BDEEFF;
}

.nvqumo-title-bg {
  background-image: url("/pc/roles/nvqumo-title-bg.png");
}
</style>
