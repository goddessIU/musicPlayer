import { initBannerList, changeBannerList } from "./carousel.js";
import { getBannerList } from "../service/ajax.js";

// 进行index页面初始化
const app = document.querySelector('#app');
const template = `
    <div class="w">
    <!-- 轮播图 -->
    <div class="carousel-wrapper">
        </div>
    <!-- 推荐歌单 -->
    <div class="recommend-playlist">
        <!-- 推荐歌单表头 -->
        <div class="recommend-header">
            <h3>推荐歌单<svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-arrow-right"></use>
                </svg></h3>
        </div>
    </div>
</div>
    `
app.innerHTML = template;


// 制作轮播图


let result = await getBannerList();
let carouselData = result.data.blocks[0].extInfo.banners;
initBannerList(carouselData)
changeBannerList(carouselData.length);




// 制作主页下方推荐歌单栏
function initRecommendData(data) {
    const recommend = document.querySelector('.recommend-playlist');
    let template = '';
    data.forEach((item, index) => {
        template += `
        <a href='#/recommendList/:${item.creativeId}'>
            <li class='display-flex flex-column recommend-body-item  justify-content-start'>
                <div class="recommend-body-item-cover">
                    <img src="${item.uiElement.image.imageUrl}"
                        alt="" /><svg class="recommend-icon icon" aria-hidden="true">
                        <use xlink:href="#icon-zanting"></use>
                    </svg>
                </div>
                <div class="recommend-body-item-text  multi-text-omitted">
                    ${item.uiElement.mainTitle.title}
                </div>
            </li>        
        </a>
        `;
    });
    const finalTemplate = `
        <ul class="recommend-body  display-flex justify-content-between">
            ${template}
        </ul>
    `;
    recommend.innerHTML += finalTemplate;
}
let recommendData = result.data.blocks[1].creatives;
initRecommendData(recommendData);




export async function homePage() {
    app.innerHTML = template;
    
    initBannerList(carouselData);
    
    changeBannerList(carouselData.length);
    initRecommendData(recommendData);
}