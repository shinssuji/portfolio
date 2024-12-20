import Vue from 'vue'
import VueRouter from 'vue-router'
import basicRouter from './modules/basicRouter'
import workRouter from './modules/workRouter'
import AOS from 'aos';
import 'aos/dist/aos.css';

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [basicRouter, workRouter],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});

router.afterEach(() => {
  AOS.refresh(); // 페이지 전환 후 AOS 갱신
});

const mixins = {
  install(Vue) {
      // 글로벌 믹스인
      Vue.mixin({
          data() {
              return {
              };
          },
          computed: {
          },
          watch: {
          },
          created() {
          },
          mounted() {
            this.setScreenHeight();
            window.addEventListener('resize', this.setScreenHeight);
          },
          beforeDestroy() {
            window.removeEventListener('resize', this.setScreenHeight);
          },
          methods: {
              /**
               * * 공용: 페이지 이동
               *
               * @param {String} path:
               * @param {Obeject} path:
               *
               */
              goToPage(path, query) {
                  this.$router.push({ path, query }).catch(() => {});
              },
              /**
               * * 공용: 페이지 뒤로가기(-1)
               *
               */
              goBack() {
                  this.$router.go(-1);
              },
              /**
               * * 공용: 새창
               *
               * @param {String} path : URL
               * @param {String} target : window target
               * @param {String} features : window options...
               *
               */
              newWindow(path, target, features) {
                  window.open(path, target, features ? features : '');
              },

              /**
               * 공용: vh 세팅
               * 모바일 브라우저 높이 인식 이슈
               */
              setScreenHeight() {
                const vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', `${vh}px`);
              }
          }
      });
  }
};


Vue.use({ ...mixins });

export default router
