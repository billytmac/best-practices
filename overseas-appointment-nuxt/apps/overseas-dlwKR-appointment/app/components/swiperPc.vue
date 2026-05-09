<script setup>
import { computed, ref } from 'vue'
// import Swiper core and required modules
import { Autoplay, Navigation } from 'swiper/modules'

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

// 定义组件名称
defineOptions({
  name: 'BannerSwiper',
})

// 定义 props
const props = defineProps({
  className: {
    type: String,
    default: 'swiper-banner-pic',
  },
  slides: {
    type: Array,
    default: () => ['🌟 第一张', '🎯 第二张', '🚀 第三张'],
  },
  pageRouter: {
    type: Function,
    default: () => { },
  },
})

const swiperRef = ref(null)

// 处理slide数据，确保有足够数量支持循环
const processedSlides = computed(() => {
  const originalSlides = props.slides

  // 如果只有一个slide，直接返回，不进行复制
  if (originalSlides.length === 1) {
    return originalSlides
  }

  const minRequiredSlides = 6 // 至少需要6条数据支持3个显示位置的循环

  if (originalSlides.length >= minRequiredSlides) {
    return originalSlides
  }

  // 如果数据不够，重复原始数据直到满足最小需求
  const result = []
  while (result.length < minRequiredSlides) {
    result.push(...originalSlides)
  }

  return result.slice(0, minRequiredSlides) // 只取需要的数量
})

// 自动播放配置 - 总是启用
const autoplayConfig = computed(() => ({
  delay: 2500,
  disableOnInteraction: false,
  pauseOnMouseEnter: true, // 鼠标悬停时暂停
}))

// Swiper配置
const swiperOptions = computed(() => ({
  // 自动切换配置
  autoplay: autoplayConfig.value, // 只有一个slide时禁用自动播放
  loop: true, // 有足够数据时启用loop
  loopAdditionalSlides: 0, // 固定额外slide数量
  centeredSlides: true, // 居中显示
  slidesPerView: 'auto', // 自动宽度，由CSS控制具体尺寸
  spaceBetween: 0, // 无间距，通过transform控制视觉间距
  simulateTouch: processedSlides.value.length > 1, // 只有一个slide时禁用模拟触摸
}))

function onSwiper(swiper) {
  swiperRef.value = swiper
  // 确保 loop 模式正确初始化
  if (swiper && processedSlides.value.length >= 6) {
    setTimeout(() => {
      swiper.update()
      if (swiper.loopCreate) {
        swiper.loopCreate()
      }
    }, 50)
  }
}



function swiperPrev() {
  swiperRef.value?.slidePrev()
}

function swiperNext() {
  swiperRef.value?.slideNext()
}


// 定义模块
const modules = [Autoplay, Navigation]

// 别名 slides 为 processedSlides
const slides = processedSlides
</script>

<template>
  <div class="flex-items-center-between pl-386 pr-385 ">
    <img src="/pc/swiper-left.png" class="w-49 h-74  cursor-pointer  " @click="swiperPrev" />
    <div class="w-820 h-782 relative overflow-hidden mx-auto mt-107">
      <Swiper :modules="modules" :slides-per-view="swiperOptions.slidesPerView"
        :space-between="swiperOptions.spaceBetween" :autoplay="swiperOptions.autoplay" :loop="swiperOptions.loop"
        :centered-slides="swiperOptions.centeredSlides" @swiper="onSwiper">
        <SwiperSlide v-for="(slide, index) in slides" :key="index">
          <div class="swiper-bg w-453 h-782 relative bg-cover-no-repeat pl-27 pt-45 slide-content">
            <div class="w-400 h-710">
              <img :src="slide.bannerImg" class="w-full h-full" />
            </div>
            <!-- <div class="w-full h-full bg-black opacity-50 absolute top-0 left-0">
          </div> -->
          </div>
          <!-- <img class="slide-content" :src="slide.bannerImg"> -->
        </SwiperSlide>
      </Swiper>
    </div>
    <img src="/pc/swiper-right.png" class="w-49 h-74  cursor-pointer   " @click="swiperNext" />
  </div>

</template>

<style scoped>
.swiper-banner-pic {
  /* width: 100%;
  height: 320px; */
  /* 1920px屏幕的原始设计高度 */
  /* position: relative;
  overflow: hidden; */
}

.slide-content {
  /* display: flex;
  align-items: center;
  justify-content: center; */
  /* width: 1200px;
  height: 320px;
  max-width: 1200px;
  max-height: 320px; */
  /* min-width: 1200px;
  min-height: 320px; */
  /* border-radius: 12px;
  color: white;
  font-size: 24px;
  font-weight: bold; */
  /* text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  cursor: pointer; */
}

/* 所有slide默认样式 - 模糊效果 */
:deep(.swiper-slide) {
  width: 453px;
  height: 782px;
  flex-shrink: 0;
  transition: all 0.3s ease;
  /* filter: blur(3px); */
  /* opacity: 0.6; */
  margin: 0 10px;
}

/* 激活的slide - 清晰显示 */
:deep(.swiper-slide-active) {
  width: 453px;
  height: 782px;
  filter: blur(0px);
  opacity: 1;
  z-index: 2;
  margin: 0 10px;
  transform: none;
}

/* 保持一致的间距 */
/* transform: none;
  box-sizing: border-box;
}

/* 相邻的slide稍微清晰一些 */
:deep(.swiper-slide-prev),
:deep(.swiper-slide-next) {
  width: 453px;
  height: 782px;
  /* filter: blur(2px); */
  margin: 0 10px;
  transform: 0;
  box-sizing: border-box;
  transform: scale(0.85) translateX(-300px);
  mask: url('/pc/swiper-bg.png') center / 100% 100% no-repeat;
  -webkit-mask: url('/pc/swiper-bg.png') center / 100% 100% no-repeat;

  /* transform: translateX(-30px); */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    pointer-events: none;
    z-index: 10;
  }
}

:deep(.swiper-slide-prev) {
  transform: scale(0.85) translateX(300px);
}

/* 重复slide的样式（loop模式） */
:deep(.swiper-slide-duplicate-active) {
  /* width: 453px;
  height: 782px;
  max-width: 453px;
  max-height: 782px;
  min-width: 453px;
  min-height: 782px;
  filter: blur(0px);
  opacity: 1;
  z-index: 2;
  margin: 0 10px; */
  /* 与激活slide保持一致的间距 */
  /* transform: none;
  box-sizing: border-box; */
}

/* 自定义分页器样式 */
:deep(.swiper-pagination) {
  bottom: 20px;
}

:deep(.swiper-pagination-bullet) {
  /* background: rgba(255, 255, 255, 0.5);
  opacity: 1;
  margin: 0 6px;
  width: 12px;
  height: 12px;
  transition: all 0.3s ease; */
}

:deep(.swiper-pagination-bullet-active) {
  /* background: #fff;
  transform: scale(1.2); */
}

/* 自定义导航按钮样式 */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  /* color: #fff;
  background: rgba(0, 0, 0, 0.3);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  transition: all 0.3s ease;
  opacity: 0;
  visibility: hidden; */
}

/* 鼠标悬停时显示导航按钮 */
.swiper-banner-pic:hover :deep(.swiper-button-next),
.swiper-banner-pic:hover :deep(.swiper-button-prev) {
  /* opacity: 1;
  visibility: visible; */
}

:deep(.swiper-button-next:hover),
:deep(.swiper-button-prev:hover) {
  /* background: rgba(0, 0, 0, 0.5);
  transform: scale(1.1); */
}

:deep(.swiper-button-next::after),
:deep(.swiper-button-prev::after) {
  /* font-size: 18px;
  font-weight: bold; */
}

.swiper-bg {
  background-image: url("/pc/swiper-bg.png");
}
</style>
