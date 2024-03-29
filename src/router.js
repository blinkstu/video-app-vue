const nprogress = require("nprogress");
import { Toast } from "vant";
require("nprogress/nprogress.css");

var routes = [
  {
    path: "/",
    component: () => import("./pages/Main"),
    keepAlive: true,
    children: [
      {
        path: "",
        component: () => import("./pages/Home"),
        keepAlive: true
      },
      {
        path: "channel",
        component: () => import("./pages/Channel"),
        keepAlive: true
      },
      {
        path: "bookmark",
        component: () => import("./pages/Bookmark"),
        keepAlive: true
      },
      {
        path: "my",
        component: () => import("./pages/My"),
        keepAlive: true
      }
    ]
  },
  {
    path: "/detail/:id",
    component: () => import("./pages/Detail")
  },
  {
    name: "Login",
    path: "/user/login",
    component: () => import("./pages/Login"),
    props: true
  },
  {
    path: "/user/promotion",
    component: () => import("./pages/Promotion")
  },
  {
    path: "/user/register",
    component: () => import("./pages/Register")
  },
  {
    path: "/user/settings",
    component: () => import("./pages/Settings")
  },
  {
    name: 'Recharge',
    path: '/user/recharge',
    component: () => import("./pages/Recharge"),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/user/promotion/reward_log',
    component: () => import ('./pages/RewardLog')
  },
  {
    path: '/user/distribution',
    component: () => import('./pages/Distribution')
  },
  {
    path: '/user/distribution/commission',
    component: () => import('./pages/Commission')
  },
  {
    path: '/user/orders',
    component: () => import("./pages/Orders")
  },
  {
    path: '/user/pay_order/:out_trade_no',
    component: () => import('./pages/PayOrder')
  },
  {
    path: "(.*)",
    component: () => import("./pages/not-found")
  }
];

import VueRouter from "vue-router";
const router = new VueRouter({
  routes
});

var toastPageLoading;

router.beforeEach((from, to, next) => {
  toastPageLoading = Toast.loading({
    duration: 0
  });
  next();
});
router.afterEach(() => {
  if (toastPageLoading) {
    toastPageLoading.clear();
  }
  window.scrollTo(0, 0);
});

export default router;
