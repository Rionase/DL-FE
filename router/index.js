import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../page/LoginPage.vue"; // Sesuaikan lokasi file
import PredictPage from "../page/PredictPage.vue";
import PrepocessingPage from "../page/PrepocessingPage.vue";
import WithRoles from "../middleware/WithRoles"

const routes = [
    {
        path: "/login",
        name: "Login",
        component: LoginPage,
    },
    {
        path: "/predict",
        name: "Predict",
        component: PredictPage,
        meta: {
			middleware: [
				{funcName: WithRoles, param: ["user", "admin"]},
			],
		},
    },
    {
        path: "/prepocessing",
        name: "prepocessing",
        component: PrepocessingPage,
        meta: {
			middleware: [
				{funcName: WithRoles, param: ["user", "admin"]},
			],
		},
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    let middleware = to.meta.middleware;
    let nextIsCalled = false;

    if (middleware) {
        for (let i = 0; i < middleware.length; i++) {
            let currentMiddleware = middleware[i];
            console.log(`PATH : ${to.path} | MIDDLEWARE : ${currentMiddleware.funcName.name} | PARAM : ${currentMiddleware.param}`);
            nextIsCalled = await currentMiddleware.funcName(to, from, next, currentMiddleware.param);
            if ( nextIsCalled ) {
                break;
            }
        }
        if ( !nextIsCalled ) {
            next()
        }
    } else {
        next();
    }
});

export default router;
