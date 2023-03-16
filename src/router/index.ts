import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("@/components/QuizInfo.vue"),
  },
  {
    path: "/createquiz",
    name: "createquiz",
    component: () => import("@/components/QuizForm.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
