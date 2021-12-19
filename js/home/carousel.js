import { debounce } from "../util/util.js";
const carousel = {

};

const buttonClick = `
<button class='leftClick'>
<svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-arrow-left"></use>
</svg>
</button>
<button class='rightClick'>
<svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-arrow-right"></use>
</svg>
</button>
`



export function initBannerList(data) {
    let active = '';
    let carouselItem = ``,
    indicatorsLi = ``;
    carouselItem += `
        <li><img src="${data[data.length - 1].pic}" data-index="${data.length}" alt="" /></li>
    `
    data.forEach((item, index) => {
        active = index === 0 ? 'active' : '';
        carouselItem += `
        <li><img src="${item.pic}" data-index="${index}" alt="" /></li>
        `;
        indicatorsLi += `<li class='${active}' data-index='${index}'></li>`;
    });
    carouselItem += `
        <li><img src="${data[0].pic}" data-index="${-1}" alt="" /></li>
    `
    const indicatorsAll = `
        <ul class="carousel-indicators display-flex justify-content-between">
            ${indicatorsLi}
        </ul>
    `;
    const poster = `
        <div class="poster">
            <ul>
                ${carouselItem}
            </ul>
        </div>
    `;
    const container = `
        <div class="carousel-container">
            ${buttonClick}
            ${poster}
        </div>
        
    `
    const wrapper = document.querySelector('.carousel-wrapper');
    wrapper.innerHTML = container + indicatorsAll;

    

    const ul = document.querySelector('.poster ul');
    ul.style.width = 100 * (data.length + 2)+ '%';
    ul.style.transform = `translateX(-${100 / (data.length + 2)}%)`;

    const lis = ul.querySelectorAll('li');
    lis.forEach((item) => {item.style.width = (100 / (data.length + 2)) + '%'; });
}






function clickCarousel(dataLength = 12) {
    const ul = document.querySelector('.poster ul');
    const lis = ul.querySelectorAll('li');
    const indicatorUl = document.querySelector('.carousel-indicators');
    const indicatorLis = indicatorUl.querySelectorAll('li');
    indicatorUl.addEventListener('click', function(e) {
        if (e.target.tagName !== 'LI') return false;
        const target = e.target,
              index = target.getAttribute('data-index'),
              len = indicatorLis.length;
        for (let i = 0; i < len; i++) {
            indicatorLis[i].className = '';
        }
        indicatorLis[index].className = 'active';
        ul.style.transform = `translateX(-${(Number(index) + 1) * 100 / (dataLength + 2)}%)`;
    })
}


function getNext(dataLength = 12) {
    const ul = document.querySelector('.poster ul');
    const lis = ul.querySelectorAll('li');
    const indicatorUl = document.querySelector('.carousel-indicators');
    const indicatorLis = indicatorUl.querySelectorAll('li');
    const right = document.querySelector('.rightClick');
    let index = 0;
    right.addEventListener('click', function() {
        for (let i = 0; i < dataLength; i++) {
            if (indicatorLis[i].className.includes('active')) {
                index = i + 1;
            }
            indicatorLis[i].className = '';
        }
        ul.style.transform = `translateX(-${(Number(index) + 1) * 100 / (dataLength + 2)}%)`;
        if (index === dataLength) {
            index = 0;
            ul.style.transform = `translateX(-${(Number(index) + 1) * 100 / (dataLength + 2)}%)`;
            indicatorLis[index].className = 'active'
        }
        indicatorLis[index].className = 'active'
    })
}

function getPrev(dataLength = 12) {
    const ul = document.querySelector('.poster ul');
    const lis = ul.querySelectorAll('li');
    const indicatorUl = document.querySelector('.carousel-indicators');
    const indicatorLis = indicatorUl.querySelectorAll('li');
    const right = document.querySelector('.leftClick');
    let index = 0;
    right.addEventListener('click', function() {
        for (let i = 0; i < dataLength; i++) {
            if (indicatorLis[i].className.includes('active')) {
                index = i - 1;
            }
            indicatorLis[i].className = '';
        }
        ul.style.transform = `translateX(-${(Number(index) + 1) * 100 / (dataLength + 2)}%)`;
        if (index === -1) {
            index = dataLength - 1;
            ul.style.transform = `translateX(-${(Number(index) + 1) * 100 / (dataLength + 2)}%)`;
            indicatorLis[index].className = 'active'
        }
        indicatorLis[index].className = 'active'
    })
}

function autoPlay(dataLength) {
    const right = document.querySelector('.rightClick');
    const wrapper = document.querySelector('.carousel-wrapper');
    let interval = setInterval(function() {
        right.click();
    }, 2000);
    wrapper.addEventListener('mouseenter', function() {
        clearInterval(interval);
    })
    wrapper.addEventListener('mouseleave', function() {
        interval = setInterval(function() {
            right.click();
        }, 2000);
    })
}

export function changeBannerList(dataLength = 12) {
    const ul = document.querySelector('.poster ul');
    const lis = ul.querySelectorAll('li');
    const indicatorUl = document.querySelector('.carousel-indicators');
    const indicatorLis = indicatorUl.querySelectorAll('li');
    clickCarousel(dataLength);
    let debouceNext = debounce(getNext, 2000);
    let debouceLeft = debounce(getPrev, 2000);
    debouceNext();
    debouceLeft();
    autoPlay(dataLength);
}
