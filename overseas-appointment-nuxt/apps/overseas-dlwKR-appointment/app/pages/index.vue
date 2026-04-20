<script setup lang="ts">
import { useStore } from "~/stores";

const timeLineArr = [
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
];
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

definePageMeta({
  layout: "default",
  name: "Home",
});

const store = useStore();

function showNav() {
  store.setIsShowNav(true);
}
</script>

<template>
  <div class="apppointment-bg bg-cover-no-repeat h-6235">
    <div
      class="flex-items-center-between pl-18 pr-53 pt-8 bg-black h-86 w-full max-w-750 top-0 fixed z-30"
    >
      <NuxtImg src="/head-logo.png" class="h-70 w-181" />
      <client-only>
        <NuxtImg
          src="/head-nav.png"
          class="h-30 w-56 cursor-pointer"
          @click="showNav"
        />
      </client-only>
    </div>
    <div class="kv-bg bg-cover-no-repeat pt-134 h-1334 w-full">
      <NuxtImg src="/head-title.png" class="ml-19 ml-19 h-50 w-723" />
      <client-only>
        <div class="ml-32 mt-1046 flex">
          <NuxtImg
            src="/appointment-btn.png"
            class="mr-30 h-120 w-330 cursor-pointer"
          />
          <NuxtImg
            src="/google-head.png"
            class="mt-3 h-115 w-330 cursor-pointer"
          />
        </div>
      </client-only>
    </div>
    <div>
      <img src="/animated-png/more-icon.png" class="mx-auto mt-18 h-97 w-88" />
    </div>
    <!-- 第一部分 -->
    <div>
      <div
        class="step-title-1 bg-cover-no-repeat ml-129 mt-15 h-105 w-482 relative"
      >
        <div
          class="text-[35px] text-[#C1D0FF] leading-[35px] font-[NotoSansSC] font-700 text-center w-170 right-[-1%] top-31.1% absolute"
        >
          1,000,000
        </div>
        <NuxtImg
          src="/title-1-icon.png"
          class="h-105 w-106 right--19% top--8% absolute z-1"
        />
      </div>
      <div
        class="prize-list-bg bg-cover-no-repeat ml-5 mt-42 pt-131 h-501 w-731"
      >
        <div class="ml-47 flex gap-35">
          <NuxtImg src="/prize-1.png" class="h-236 w-191" />
          <NuxtImg src="/prize-2.png" class="h-236 w-191" />
          <NuxtImg src="/prize-3.png" class="h-236 w-191" />
        </div>
        <NuxtImg
          src="/google-1.png"
          class="h-105 w-300 mt-15 ml-215 cursor-pointer"
        />
      </div>
      <div
        class="appointment-input-bg bg-cover-no-repeat ml-23 mt-20 pt-310 h-557 w-702 relative"
      >
        <NuxtImg
          src="/people-talk.png"
          class="ml-30 h-185 w-649 top-105 absolute z-1"
        />
        <div
          class="text-[21px] text-[#D0C8FF] leading-[21px] font-500 flex left-33% top-48% absolute z-2"
        >
          <div class="mr-75 flex">
            <client-only>
              <div
                class="flex-items-center-center mr-13 border border-[#D0C8FF] rounded-full h-18 w-18"
              >
                <div class="rounded-full bg-[#D0C8FF] h-10 w-10" /></div
            ></client-only>

            <div>AOS</div>
          </div>
          <div class="flex">
            <client-only>
              <div
                class="flex-items-center-center mr-13 border border-[#D0C8FF] rounded-full h-18 w-18"
              >
                <div class="rounded-full bg-[#D0C8FF] h-10 w-10" />
              </div>
            </client-only>
            <div>IOS</div>
          </div>
        </div>
        <div
          class="download-bg bg-cover-no-repeat h-80 w-621 ml-40 pl-52 font-500 text-[#5C47DD] flex-items-center font-[NotoSansSC]"
        >
          <div class="text-[38px]">010</div>
          <div class="w-2 h-36 bg-[#9189FA] ml-25 mr-25"></div>
          <div class="flex-1">
            <client-only>
              <input
                type="text"
                class="outline-none bg-transparent number-input text-[34px] w-full"
                placeholder="휴대폰 번호 입력"
              />
            </client-only>
          </div>
        </div>
        <div class="flex ml-65 mt-17">
          <client-only>
            <div
              class="flex-items-center-center radio-bg bg-cover-no-repeat w-28 h-28 font-500"
            >
              <NuxtImg src="/tick.png" class="h-17 w-27" />
            </div>
          </client-only>
          <div
            class="text-[#A7AABC] mt-2 text-[22px] leading-[22px] font-[NotoSansSC] font-500 ml-14 tracking-[-1px] underline-offset-[4px]"
          >
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
    <div>
      <div
        class="step-title-2 bg-cover-no-repeat ml-176 mt-54 h-105 w-401 relative"
      >
        <NuxtImg
          src="/title-2-icon.png"
          class="h-96 w-104 absolute z-1 left-[-22%] top-[-7%]"
        />
      </div>
      <div class="mt-42 flex">
        <div
          class="time-line bg-cover-no-repeat h-747 w-15 relative ml-90 mt-94"
        >
          <client-only>
            <div
              v-for="item in timeLineArr"
              :key="item.title"
              :style="{ top: item.style }"
              class="absolute z-1 left-[-40px] h-90 w-91"
            >
              <NuxtImg
                v-if="item.isReached"
                src="/line-reached.png"
                class="w-full h-full"
              />
              <NuxtImg v-else src="/line-mark.png" class="w-full h-full" />
            </div>
          </client-only>
        </div>
        <div class="gap-13 flex flex-col ml-55">
          <NuxtImg
            v-for="item in timeLineArr"
            :key="item.title"
            :src="item.image"
            class="w-517 h-169"
          />
        </div>
      </div>
    </div>
    <!-- 第三部分 -->
    <div class="mt-47">
      <div class="h-30 w-full">
        <img src="/animated-png/line-top.png" class="w-full h-full" />
      </div>
      <div
        class="title-3-bg w-full h-1051 bg-cover-no-repeat pt-33 relative mt-8"
      >
        <div
          class="step-title-3 bg-cover-no-repeat ml-245 h-105 w-257 relative mb-25"
        >
          <NuxtImg
            src="/title-3-icon.png"
            class="h-98 w-91 absolute z-1 right--28% top--8%"
          />
        </div>
        <client-only>
          <div class="absolute left-[45%] top-[12%] w-383 h-155">
            <img src="/animated-png/stone-title.png" class="w-full h-full" />
          </div>
          <div
            class="title-3-decorate bg-cover-no-repeat w-full h-626 relative"
          >
            <NuxtImg
              src="/people/stone.png"
              class="w-468 h-594 absolute z-1 top-6%"
            />
            <NuxtImg
              src="/people/stone-intro.png"
              class="w-477 h-93 absolute z-2 bottom-6% right-1%"
            />
            <NuxtImg
              src="/people/stone-symbel.png"
              class="w-255 h-145 absolute right-6% top-42%"
            />
          </div>
          <div class="pl-51 pr-39 flex-items-between mt-30">
            <div v-for="item in rolesList" :key="item.name" class="w-128 h-184">
              <NuxtImg
                :src="`/roles/${item.name}-selected.png`"
                v-show="item.isSelected"
                class="w-full h-full"
              />
              <NuxtImg
                :src="`/roles/${item.name}.png`"
                v-show="!item.isSelected"
                class="w-full h-full"
              />
            </div>
          </div>
        </client-only>
      </div>
      <div class="h-30 w-full mt-20">
        <img src="/animated-png/line-bottom.png" class="w-full h-full" />
      </div>
    </div>
    <!-- 第四部分 -->
    <div class="mt-30">
      <div class="step-title-4 bg-cover-no-repeat ml-265 h-105 w-221 relative">
        <NuxtImg
          src="/title-4-icon.png"
          class="h-100 w-87 absolute z-1 left-[-34%] top-[-7%]"
        />
      </div>
      <div class="swiper-bg w-579 h-903 relative ml-83 bg-cover-no-repeat pl-81 pt-81">
        <NuxtImg
          src="/swiper-left.png"
          class="w-52 h-78 absolute top-45% left-[-6%] cursor-pointer"
        />
        <NuxtImg
          src="/swiper-right.png"
          class="w-52 h-78 absolute top-45% right-[-6%] cursor-pointer"
        />
        <div class="w-423 h-751">
          <NuxtImg src="/swiper-1.png" class="w-full h-full" />
        </div>
      </div>
    </div>
    <div class="h-128 w-full max-w-750 bottom-0 fixed z-30 flex bottom-bg">
      <NuxtImg src="/bottom-role.png" class="h-255 w-228 absolute left-[5px] top-[-127px]" />
      <NuxtImg src="/bottom-text.png" class="h-41 w-237 ml-226 mt-42" />
      <client-only>
        <NuxtImg
          src="/google-bottom.png"
          class="h-101 w-282 cursor-pointer mt-12"
        />
      </client-only>
    </div>
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
.appointment-input-bg {
  background-image: url("/appointment-input-bg.png");
}
.download-bg {
  background-image: url("/download-bg.png");
}

.number-input::placeholder {
  color: #5c47dd;
  font-size: 34px;
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
</style>
