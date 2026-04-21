<script setup lang="ts">
import { useStore } from "~/stores";

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
    name: "stone",
    isSelected: false,
  },
];
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

definePageMeta({
  layout: "default",
  name: "Home",
});




const isShowNav = ref<boolean>(false)
const isShowAppointmentPopup = ref<boolean>(false)
const isShowPhoneAppointmentPopup = ref<boolean>(false)
const isShowAppointmentSuccessPopup = ref<boolean>(true)

const currentNav = ref<string>('main-menu')
function setIsShowNav(val: boolean) {
  isShowNav.value = val
}
function setCurrentNav(val: string) {
  currentNav.value = val

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



</script>

<template>
  <div class="apppointment-bg bg-cover-no-repeat h-6235">
    <!-- 顶部固定栏 -->
    <div class="flex-items-center-between pl-18 pr-53 pt-8 bg-black h-86 w-full max-w-750 top-0 fixed z-30">
      <NuxtImg src="/head-logo.png" class="h-70 w-181" />
      <client-only>
        <NuxtImg src="/head-nav.png" class="h-30 w-56 cursor-pointer" @click="setIsShowNav(true)" />
      </client-only>
    </div>
    <!-- kv图 -->
    <div class="kv-bg bg-cover-no-repeat pt-134 h-1334 w-full" id="main-menu">
      <NuxtImg src="/head-title.png" class="ml-19 ml-19 h-50 w-723" />
      <client-only>
        <div class="ml-32 mt-1046 flex">
          <NuxtImg src="/appointment-btn.png" class="mr-30 h-120 w-330 cursor-pointer" />
          <NuxtImg src="/google-head.png" class="mt-3 h-115 w-330 cursor-pointer" />
        </div>
      </client-only>
    </div>
    <div>
      <img src="/animated-png/more-icon.png" class="mx-auto mt-18 h-97 w-88" />
    </div>
    <!-- 第一部分 -->
    <div id="preorder">
      <div class="step-title-1 bg-cover-no-repeat ml-129 mt-15 h-105 w-482 relative">
        <client-only>
          <div
            class="text-[35px] text-[#C1D0FF] leading-[35px] font-[NotoSansSC] font-700 text-center w-170 right-[-1%] top-31.1% absolute">
            1,000,000
          </div>
        </client-only>
        <NuxtImg src="/title-1-icon.png" class="h-105 w-106 right--19% top--8% absolute z-1" />
      </div>
      <div class="prize-list-bg bg-cover-no-repeat ml-5 mt-42 pt-131 h-501 w-731">
        <div class="ml-47 flex gap-35">
          <NuxtImg src="/prize-1.png" class="h-236 w-191" />
          <NuxtImg src="/prize-2.png" class="h-236 w-191" />
          <NuxtImg src="/prize-3.png" class="h-236 w-191" />
        </div>
        <NuxtImg src="/google-1.png" class="h-105 w-300 mt-15 ml-215 cursor-pointer" />
      </div>
      <div class="appointment-input-bg bg-cover-no-repeat ml-23 mt-20 pt-310 h-557 w-702 relative">
        <NuxtImg src="/people-talk.png" class="ml-30 h-185 w-649 top-105 absolute z-1" />
        <div class="text-[21px] text-[#D0C8FF] leading-[21px] font-500 flex left-33% top-48% absolute z-2">
          <div class="mr-75 flex">
            <client-only>
              <div class="flex-items-center-center mr-13 border border-[#D0C8FF] rounded-full h-18 w-18">
                <div class="rounded-full bg-[#D0C8FF] h-10 w-10" />
              </div>
            </client-only>

            <div>AOS</div>
          </div>
          <div class="flex">
            <client-only>
              <div class="flex-items-center-center mr-13 border border-[#D0C8FF] rounded-full h-18 w-18">
                <div class="rounded-full bg-[#D0C8FF] h-10 w-10" />
              </div>
            </client-only>
            <div>IOS</div>
          </div>
        </div>
        <div
          class="download-bg bg-cover-no-repeat h-80 w-621 ml-40 pl-52 font-500 text-[#5C47DD] flex-items-center font-[NotoSansSC]">
          <div class="text-[38px]">010</div>
          <div class="w-2 h-36 bg-[#9189FA] ml-25 mr-25"></div>
          <div class="flex-1">
            <client-only>
              <input type="text" class="outline-none bg-transparent number-input text-[34px] w-full"
                placeholder="휴대폰 번호 입력" />
            </client-only>
          </div>
        </div>
        <div class="flex ml-65 mt-17">
          <client-only>
            <div class="flex-items-center-center radio-bg bg-cover-no-repeat w-28 h-28 font-500">
              <NuxtImg src="/tick.png" class="h-17 w-27" />
            </div>
          </client-only>
          <div
            class="text-[#A7AABC] mt-2 text-[22px] leading-[22px] font-[NotoSansSC] font-500 ml-14 tracking-[-1px] underline-offset-[4px]">
            <span>개인정보 수집, 이용 및 프로모션 알림 수신 동의</span>
            <client-only>
              <span class="ml-10 underline">유의사항</span>
            </client-only>
          </div>
        </div>
        <div class="mt-11 ml-218">
          <client-only>
            <NuxtImg src="/appointment-btn1.png" class="h-100 w-277" />
          </client-only>
        </div>
      </div>
    </div>
    <!-- 第二部分 -->
    <div id="activity">
      <div class="step-title-2 bg-cover-no-repeat ml-176 mt-54 h-105 w-401 relative">
        <NuxtImg src="/title-2-icon.png" class="h-96 w-104 absolute z-1 left-[-22%] top-[-7%]" />
      </div>
      <div class="mt-42 flex">
        <div class="time-line bg-cover-no-repeat h-747 w-15 relative ml-90 mt-94">
          <client-only>
            <div v-for="item in timeLineArr" :key="item.title" :style="{ top: item.style }"
              class="absolute z-1 left-[-40px] h-90 w-91">
              <NuxtImg v-if="item.isReached" src="/line-reached.png" class="w-full h-full" />
              <NuxtImg v-else src="/line-mark.png" class="w-full h-full" />
            </div>
          </client-only>
        </div>
        <div class="gap-13 flex flex-col ml-55">
          <NuxtImg v-for="item in timeLineArr" :key="item.title" :src="item.image" class="w-517 h-169" />
        </div>
      </div>
    </div>
    <!-- 第三部分 -->
    <div class="mt-47" id="role">
      <div class="h-30 w-full">
        <img src="/animated-png/line-top.png" class="w-full h-full" />
      </div>
      <div class="title-3-bg w-full h-1051 bg-cover-no-repeat pt-33 relative mt-8">
        <div class="step-title-3 bg-cover-no-repeat ml-245 h-105 w-257 relative mb-25">
          <NuxtImg src="/title-3-icon.png" class="h-98 w-91 absolute z-1 right--28% top--8%" />
        </div>
        <client-only>
          <div class="absolute left-[45%] top-[12%] w-383 h-155">
            <img src="/animated-png/stone-title.png" class="w-full h-full" />
          </div>
          <div class="title-3-decorate bg-cover-no-repeat w-full h-626 relative">
            <NuxtImg src="/people/stone.png" class="w-468 h-594 absolute z-1 top-6%" />
            <NuxtImg src="/people/stone-intro.png" class="w-477 h-93 absolute z-2 bottom-6% right-1%" />
            <NuxtImg src="/people/stone-symbel.png" class="w-255 h-145 absolute right-6% top-42%" />
          </div>
          <div class="pl-51 pr-39 flex-items-between mt-30">
            <div v-for="item in rolesList" :key="item.name" class="w-128 h-184">
              <NuxtImg :src="`/roles/${item.name}-selected.png`" v-show="item.isSelected" class="w-full h-full" />
              <NuxtImg :src="`/roles/${item.name}.png`" v-show="!item.isSelected" class="w-full h-full" />
            </div>
          </div>
        </client-only>
      </div>
      <div class="h-30 w-full mt-20">
        <img src="/animated-png/line-bottom.png" class="w-full h-full" />
      </div>
    </div>
    <!-- 第四部分 -->
    <div class="mt-30" id="game-features">
      <div class="step-title-4 bg-cover-no-repeat ml-265 h-105 w-221 relative">
        <NuxtImg src="/title-4-icon.png" class="h-100 w-87 absolute z-1 left-[-34%] top-[-7%]" />
      </div>
      <client-only>
        <div class="swiper-bg w-579 h-903 relative ml-83 bg-cover-no-repeat pl-81 pt-81">
          <NuxtImg src="/swiper-left.png" class="w-52 h-78 absolute top-45% left-[-6%] cursor-pointer" />
          <NuxtImg src="/swiper-right.png" class="w-52 h-78 absolute top-45% right-[-6%] cursor-pointer" />
          <div class="w-423 h-751">
            <NuxtImg src="/swiper-1.png" class="w-full h-full" />
          </div>
        </div>
      </client-only>
    </div>
    <!-- 底部固定栏 -->
    <div class="h-128 w-full max-w-750 bottom-0 fixed z-30 flex bottom-bg">
      <NuxtImg src="/bottom-role.png" class="h-255 w-228 absolute left-[5px] top-[-127px]" />
      <NuxtImg src="/bottom-text.png" class="h-41 w-237 ml-226 mt-42" />
      <client-only>
        <NuxtImg src="/google-bottom.png" class="h-101 w-282 cursor-pointer mt-12" />
      </client-only>
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
            @mouseenter="item.isHover = true" @mouseleave="item.isHover = false" @click="setCurrentNav(item.image)"
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
              <div class="mt-1">AOS</div>
            </div>
            <div class="flex">
              <div class="flex-items-center-center mr-16 border border-[#fff] rounded-full h-24 w-24">
                <div class="rounded-full bg-[#fff] h-16 w-16" />
              </div>
              <div class="mt-1">IOS</div>
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

</template>

<style scoped>
.apppointment-bg {
  background-image: url("/bg.png");
}

.kv-bg {
  background-image: url("/kv-img.png");
}

.step-title-1 {
  background-image: url("/animated-png/step-title-1.png");
}

.prize-list-bg {
  background-image: url("/prize-list-bg.png");
}

.popup-prize-list-bg {
  background-image: url("/popup/prize-list-bg.png");
}

.appointment-input-bg {
  background-image: url("/appointment-input-bg.png");
}

.download-bg {
  background-image: url("/download-bg.png");
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
  background-image: url("/radio-bg.png");
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
  background-image: url("/time-line.png");
}

.title-3-bg {
  background-image: url("/title-3-bg.png");
}

.title-3-decorate {
  background-image: url("/title-3-decorate.png");
}

.swiper-bg {
  background-image: url("/swiper-bg.png");
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
</style>
