import { homePage } from "./home/home.js";
import { recommendListPage } from "./recommendList/recommendList.js";
import { reactive } from "./util/reactive.js";
import { getRouterOptions } from "./util/util.js";
import { initPlayerControl, initPlayerEvent } from "./home/control.js";

window.addEventListener('load', () => {
    //initControl(),bug，load无法成功
    hashProxy.hash = window.location.hash;
})
const routers = [
    {
        name: 'home',
        path: '/home',
        component: homePage
    },
    {
        name: 'recommendList',
        path: '/recommendList',
        component: recommendListPage
    }
];


const effective = () => changeComponent();

const hashProxy = reactive(
    {
        hash: ''
    },
    effective
)

function changeComponent() {
    const options = getRouterOptions(hashProxy.hash);
    const [{ component }] = routers.filter((router) => router.name === options.name);
    component({params:'' + options.params});
}


window.addEventListener('hashchange', () => {
    hashProxy.hash = window.location.hash;
})

initPlayerControl();
initPlayerEvent();