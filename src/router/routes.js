const routes = [
  {
    path: "/",
    component: () => import("../pages/Index.vue"),
  },
  {
    path: "/About",
    component: () => import("../pages/About.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
