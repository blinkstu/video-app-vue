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
    name: 'Login',
    path: '/user/login',
    component: () => import("./pages/Login"),
    props: true
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
    path: "/dynamic-route/blog/:blogId/post/:postId/",
    component: () => import("./pages/dynamic-route")
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

export default router;
