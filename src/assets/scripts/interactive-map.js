import axios from 'axios';
import { driver } from 'driver.js';
import gsap from 'gsap';
import Draggable from 'gsap/Draggable';
import { get } from 'lodash';
import tippy, { followCursor } from 'tippy.js';
const { useState } = require("./modules/helpers/helpers");
const { default: placeElemInWrapperNearMouse } = require("./modules/helpers/placeElemNearMouse");
import center from 'svg-polygon-center';

gsap.registerPlugin(Draggable);
//Master_Plan_Irpin

const infoboxesSelectors = {
  standart: '[data-interactive-map-infobox]',
  large: '[data-interactive-map-infobox-large]',
}

const infoboxOpenTriggers = {
  standart: document.documentElement.classList.contains('desktop') ? 'mouseover' : 'touchstart',
  large: document.documentElement.classList.contains('desktop') ? 'click' : 'touchstart',
}

const infoboxesUpdate = {
  standart: (state) => {

    console.log('infoboxesUpdate');
    
    // document.querySelector('[data-interactive-map-infobox-left-label]').textContent = state.data.leftLabel;
    // document.querySelector('[data-interactive-map-infobox-right-label]').textContent = state.data.rightLabel;
    document.querySelector('[data-interactive-map-infobox-image]').src = state.data.logo_url;
    document.querySelector('[data-interactive-map-infobox-title]').textContent = state.data.title;
    // document.querySelector('[data-interactive-map-infobox-sale]').textContent = state.data.sale;
    document.querySelector('[data-interactive-map-infobox-row]').textContent = state.data.row_number;
    document.querySelector('[data-interactive-map-infobox-place]').textContent = state.data.place_number;
    document.querySelector('[data-interactive-map-infobox-link]').href = state.data.link;
    document.querySelector('[data-interactive-map-infobox-phone]').href = 'tel:'+state.data.phone_number;
    document.querySelector('[data-interactive-map-infobox-phone]').textContent = state.data.phone_number;
  },
  large: (data) => {
    console.log('state', data);
    
    document.querySelector('[data-infobox-large-row]').textContent = data.data.row_number;
    document.querySelectorAll('[data-infobox-large-number]').forEach(elem => elem.textContent = data.data.place_number);
    document.querySelector('[data-infobox-large-area]').textContent = data.data.area;
    document.querySelector('[data-infobox-large-price]').textContent = data.data.price;
    document.querySelector('[data-infobox-large-status]').textContent = data.data.sale_text;
  }
}

const container = document.querySelector('.interactive-map-screen__iframe-wrapper');

const infoBoxType = get(container.dataset, 'infoboxType', 'standart');

const infobox = document.querySelector(infoboxesSelectors[infoBoxType]);



const [ appartments, setAppartments ] = useState([]);

const [ infoboxView, setInfoboxView, useInfoboxViewEffect ] = useState({
  show: false,
  coords: { x: 0, y: 0 },
});

const [ infoboxState, setInfoboxState, useInfoboxStateEffect ] = useState({
  data: {
    ...setNewApartmentData({}),
  },
});

container.addEventListener('scroll', (e) => {
  closeInfobox();
});

container.addEventListener(window.screen.width < 1024 ? 'click' : 'mouseover', (e) => {
  const target = e.target.closest('[data-tooltip]');
    if (!target) return;
    const ttt = tippy(target, {
      content: target.dataset.text,
      placement: 'right',
      followCursor: window.screen.width < 1024 ? 'vertical' : false,
      plugins: [followCursor],
      // trigger: window.screen.width < 1024 ? 'touchstart' : 'mouseenter',
      onHide: (e) => {
        console.log('hide');
        
        e.popperInstance.destroy();
      }
    });
    ttt.show();
})

if (infoBoxType === 'large') {
  container.addEventListener(window.screen.width < 1024 ? 'click' : 'mouseover', (e) => {
    
    const target = e.target.closest('[data-sale="0"]');
    if (!target) return;
    console.log(e.target, 'fewfewf');
    const ttt = tippy(target, {
      content: "Здано",
      // trigger: window.screen.width < 1024 ? 'touchstart' : 'mouseenter',
      onHide: (e) => {
        console.log('hide');
        
        e.popperInstance.destroy();
      }
    });
    ttt.show();
    console.log(ttt);
    
    return;
  });
}

document.body.addEventListener('click', (e) => {
  
  const target = e.target.closest('[data-id]');
  const infobox = e.target.closest('[data-interactive-map-infobox]');
  if (!target && !infobox && infoBoxType === 'standart') {
    closeInfobox();
    return; 
  }

  if (infobox) return;
  if (!target) return;

  const id = target.dataset.id;
  const appartment = appartments().find(appartment => appartment.id == id) || {};

    console.log(appartment);

  setInfoboxState({
    ...infoboxState(),
    coords: { x: e.clientX, y: e.clientY },
    show: true,
    data: {
      ...infoboxState().data,
      ...setNewApartmentData(appartment),
    }
  })
});

infobox.addEventListener('click', (e) => {
  const target = e.target.closest('[data-interactive-map-infobox-close]');
  if (!target) {
    return; 
  }
  closeInfobox();
});

container.addEventListener(infoboxOpenTriggers[infoBoxType], (e) => {
  console.log('fef');
  
  const target = e.target.closest('[data-id]');
  if (!target) return; 
  const { id } = target.dataset;
  if (id == infoboxState().data.id) return;
  const appartment = appartments().find(appartment => appartment.id == id) || {};

  if (target.dataset.sale == 0) return;

  setInfoboxState({
    ...infoboxState(),
    coords: { x: e.clientX, y: e.clientY },
    show: true,
    data: {
      ...infoboxState().data,
      ...setNewApartmentData(appartment),
    }
  });

  if (infoBoxType === 'large' || !document.documentElement.classList.contains('desktop')) {
    setInfoboxView({
      show: true,
    });
  }
});

container.addEventListener('mousemove', (e) => {
  const target = e.target.closest('[data-id]');
  if (!target || infoBoxType === 'large') return;
  setInfoboxView({
    show: true,
    coords: { x: e.clientX, y: e.clientY },
  });

});

useInfoboxViewEffect((view) => {
  console.log('view', view);
  
  infobox.classList.toggle('active', view.show);
  const position = placeElemInWrapperNearMouse(infobox, container, { pageX: view.coords.x, pageY: view.coords.y });
  if (window.matchMedia('(max-width: 1024px)').matches) return;
  infobox.style.transform = `translate(${position.x}px, ${position.y}px)`;
});

useInfoboxStateEffect((state) => {
  infoboxesUpdate[infoBoxType](state);

  window.dispatchEvent(new CustomEvent('interactive-map-infobox-open', {
    detail: state.data,
  }));
});

initInteractiveMap();


function normalizepolygonPoints(points) {
  const splitedPoints = points.split(',');
  const normalized = [`${splitedPoints[0]}`];
  const lastElement = '' + splitedPoints.pop();

  for (let i = 1; i <= splitedPoints.length - 1; i += 2) {
    normalized.push(`${splitedPoints[i]} ${splitedPoints[i + 1]}`);
  }
  normalized.push(lastElement);
  return normalized.join(',');
}

function getPolygons() {
  if (document.documentElement.dataset.status !== 'local') {
    const fd = new FormData();
    fd.append('action', 'getFloor');
    fd.append('floor', 1);
    fd.append('section', 1);
    fd.append('build', 1);
    return axios.post('/wp-admin/admin-ajax.php', fd);
  }
  return axios.get('./static/polygons.txt');

}

function getApartments(id) { 
  if (document.documentElement.dataset.status !== 'local') { 
    const fd = new FormData();
    fd.append('action', 'getFlats');
    return axios.post('/wp-admin/admin-ajax.php', fd);
  }
  return axios.get(`./static/appartments.json`);
}

function closeInfobox() {
  setInfoboxView({
    ...infoboxView(),
    show: false,
  });
}

function setNewApartmentData(apartment) {

  const saleText = {
    '0': 'Продано', 
    '1': 'Вільно', 
    '2': 'Резерв', 
    '3': 'Заброньовано', 
    '4': 'Недоступно', 
    '5': 'Заблоковано'
  }
  

  return {
    title: 'Ряд: ' + apartment.type + ', №' + apartment.number,
    appartment: apartment.number,
    area: apartment.all_room,
    price: apartment.price,
    // img: apartment.img_big,
    img: document.documentElement.dataset.status === 'local' ? apartment.img_big : '/wp-content/themes/3d/assets/images/interactive-map/infobox.jpg',
    sale: apartment.statu_text,
    rightLabel: apartment.statu_text,
    leftLabel: 'Ряд: ' + apartment.type + ', №' + apartment.number,
    row_number: apartment.type,
    sale_text: saleText[apartment.sale],
    place_number: apartment.number,
    phone_number: document.documentElement.dataset.status === 'local' ? '093 111 11 11' : apartment.phone_number,
    link: apartment.url,
    logo_url: apartment.logo_url,
  }
}

async function initInteractiveMap() {
    const imgUrl = document.documentElement.dataset.status === 'local' ? './assets/images/interactive-map/Master_Plan_Irpin.jpg' : '/wp-content/themes/3d/assets/images/interactive-map/Master_Plan_Irpin.jpg';
    const img = await fetch(imgUrl);
    const imgBlob = await img.blob();
    const imgURL = URL.createObjectURL(imgBlob);
    const polygonsRequest = await getPolygons();
    const polygons = polygonsRequest.data;

    console.log(polygons);

    const apartmentsRequest = await getApartments();
    const apartments = apartmentsRequest.data;

    //get image size
    const imgSize = new Image();
    imgSize.src = imgURL;
    imgSize.onload = function() {
        console.log(imgSize.width, imgSize.height);
        container.appendChild(createSvg(imgURL, imgSize.width, imgSize.height, polygons, apartments));
        container.scrollTo(container.scrollWidth / 2 - container.getBoundingClientRect().width / 2, 5000);
        initMiniScroll(imgUrl);
    }
    const driverObj = driver({
      showProgress: true,
      nextBtnText: 'Далі',
      prevBtnText: 'Назад',
      doneBtnText: 'Завершити',
      steps: [
        {
          element: '.interactive-map-screen__iframe-wrapper',
          popover: {
            title: 'Використання інтерактивної карти',
            description: 'Натистіть та переміщуйте карту',
          }
        },
        {
          element: '#miniMap',
          popover: {
            title: 'Використання міні-карти',
            description: 'Для зручності огляду використовуйте міні-карту.',
          }
        },
        {
          element: 'polygon[data-id="97"]',
          popover: {
            title: 'Переглядайте інформацію про приміщення',
            description: 'Натистіть для детальної інформації',
          }
        },
      ]
    });
    
    document.querySelector('[data-map-screen-helper]').addEventListener('click', (e) => {
      driverObj.drive();
    });
    
    setAppartments(apartments);
}

function createSvg(imgURL, width, height, polygons = '', apartments = []) {

  const isPolygonsFromServer = typeof polygons === 'object';
  let polygonsFromServer = '';

  if (isPolygonsFromServer) {
    polygonsFromServer = Object.entries(polygons.cords).reduce((acc, [key, value], index) => {
      const apartment = apartments.find(apartment => apartment.id == polygons.flatsIds[index]);
      const sale = apartment ? apartment.sale : 0;
      const { x, y } = center(normalizepolygonPoints(value));
      return acc + `
        <polygon data-sale="${sale}" data-id="${polygons.flatsIds[index]}" points="${value}" />
        <text x="${x}" y="${y}" fill="black" style="transform-origin: center;transform-box: fill-box;transform: translate(-50%, 40%);font-size: 10px;">${apartment['number']}</text>
        `
    }, '');


    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.classList.add('interactive-map');
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
      svg.setAttribute("viewBox", `0 0 ${polygons.size[0]} ${polygons.size[1]}`);
        
      svg.insertAdjacentHTML('beforeend', `<image href="/wp-content/themes/3d/assets/img/projects/1/1/_____plan-2222.jpg" width="${polygons.size[0]+1}" height="${polygons.size[1]+1}" />`);
      svg.insertAdjacentHTML('beforeend', isPolygonsFromServer ? polygonsFromServer : polygons);
      container.innerHTML = '';  
      
      
      svg.insertAdjacentHTML('beforeend', $rowTitles());
      // svg.insertAdjacentHTML('beforeend', `
      //   <polygon data-tooltip data-text="Відкриття 3 квартал 2025 року" points="461,691,884.5,694.5,885.33333333333,741.33333333333,920,741.5,920,694.5,953.5,695.5,955.5,526,920,525.5,922,439,957.5,439.5,958,282,924.5,280.5,924.5,196.5,959.5,197,960,38,569,35.5,569.5,192,822.5,193.5,820,279.5,500,278,498,435.5,818.5,438.5,818,523,462.5,521.5"/>
      //   <polygon data-tooltip data-text="Відкриття 3 квартал 2025 року" points="1025,38,1250,37,1253,76,1245,82,1034,82,1025,73"/>
      // `);
      svg.insertAdjacentHTML('beforeend', `
        <polygon data-tooltip data-text="Відкриття 3 квартал 2025 року" points="448,985 946,988 945.5,1191.5 901,1190 901,1297.5 944,1300 942.5,1501.5 898,1500.5 896,1610.5 940.5,1611.5 940.5,1829 907,1828.5 908.5,1850.5 313.5,1846.5 314.5,1821.5 308.5,1821.5 311.5,1605 765,1608 766.5,1501 355,1495.5 358.5,1294 769,1298 771.5,1188 446.5,1186"/>
        <polygon data-tooltip data-text="Відкриття 3 квартал 2025 року" points="1025,38,1250,37,1253,76,1245,82,1034,82,1025,73"/>
      `);
      
    return svg;
  } else {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.classList.add('interactive-map');
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
      svg.insertAdjacentHTML('beforeend', `<image href="${imgURL}" width="${width}" height="${height}" />`);
      svg.insertAdjacentHTML('beforeend', isPolygonsFromServer ? polygonsFromServer : polygons);
      svg.insertAdjacentHTML('beforeend', `
        <polygon data-tooltip data-text="Відкриття 3 квартал 2025 року" points="461,691,884.5,694.5,885.33333333333,741.33333333333,920,741.5,920,694.5,953.5,695.5,955.5,526,920,525.5,922,439,957.5,439.5,958,282,924.5,280.5,924.5,196.5,959.5,197,960,38,569,35.5,569.5,192,822.5,193.5,820,279.5,500,278,498,435.5,818.5,438.5,818,523,462.5,521.5"/>
        <polygon data-tooltip data-text="Відкриття 3 квартал 2025 року" points="1025,38,1250,37,1253,76,1245,82,1034,82,1025,73"/>
      `);
      container.innerHTML = '';  
    return svg;
  }
}

function isDevFeatures() {
  const search = new URLSearchParams(window.location.search);
  return localStorage.getItem('dev') || search.get('dev') === 'true';
}

function initMiniScroll(imageUrl) {
  let bigImage = document.querySelector(".interactive-map"),
    smallImage = document.querySelector("#miniMap"),
    marker = document.querySelector("#mapMarker"),
    smallX = gsap.quickSetter(marker, "x", "px"),
    smallY = gsap.quickSetter(marker, "y", "px"),
    bigX = gsap.quickSetter(bigImage, "x", "px"),
    bigY = gsap.quickSetter(bigImage, "y", "px"),
    imageScale;
  const container = document.querySelector('.interactive-map-screen__iframe-wrapper');

    smallImage.style.backgroundImage = `url(${imageUrl})`;
  function setupSizing() {
    const bigImageWidth = bigImage.getBoundingClientRect().width;

    imageScale = smallImage.offsetWidth / bigImageWidth;
    let screenToBigRatio = container.offsetWidth / bigImageWidth,
      aspectRatio = container.offsetWidth / container.getBoundingClientRect().height;
    gsap.set(marker, {
      width: screenToBigRatio * smallImage.offsetWidth,
      height: screenToBigRatio * smallImage.offsetWidth / aspectRatio
    });
  }
  setupSizing();
  window.addEventListener("resize", setupSizing);

  let bigDraggable = Draggable.create(bigImage, {
    bounds: container,
    onDrag: alignSmall,
    force3D: true,
    onThrowUpdate: alignSmall,
    inertia: true
  })[0];

  function alignSmall() {
    smallX(-bigDraggable.x * imageScale);
    smallY(-bigDraggable.y * imageScale);
  }

  let smallDraggable = Draggable.create(marker, {
    bounds: smallImage,
    onDrag: alignBig,
    onThrowUpdate: alignBig,
    inertia: true
  })[0];

  function alignBig() {
    bigX(-smallDraggable.x / imageScale);
    bigY(-smallDraggable.y / imageScale);
  }

  // align center initially
  gsap.set(bigImage, {
    x: (bigDraggable.minX + bigDraggable.maxX) / 2,
    y: (bigDraggable.minY + bigDraggable.maxY) / 2
  });
  bigDraggable.update();
  alignSmall();
}



function $rowTitles() {
  const rowTitleStyle = `font-size: 12px; font-weight: 600;`;
  return `
      <path id="map_foodcourt"d="M 1042 1148 L 1285 1151" fill="none"></path>
      <text class="ff2">
        <textPath href="#map_foodcourt" startOffset="50%" text-anchor="middle">Фуд зона</textPath>
      </text>
      <path id="map_poslygy"d="M 1042 1235 L 1285 1238" fill="none"></path>
      <text class="ff2">
        <textPath href="#map_poslygy" startOffset="50%" text-anchor="middle">Послуги</textPath>
      </text>
      <path id="map_remont" d="M 1042 1330 L 1320 1333" fill="none"></path>
      <text class="ff2">
        <textPath href="#map_remont" startOffset="50%" text-anchor="middle">Все для ремонту</textPath>
      </text>
      <path id="map_khymia"d="M 1042 1420 L 1350 1423" fill="none"></path>
      <text class="ff2">
        <textPath href="#map_khymia" startOffset="50%" text-anchor="middle">Все для дому та хімія</textPath>
      </text>
      <path id="map_kids-wear" d="m1042.37 1500 304.53 2.7875" fill="none"></path>
      <text class="ff2">
        <textPath href="#map_kids-wear" startOffset="50%" text-anchor="middle">Дитячий одяг</textPath>
      </text>
      <path id="map_mans-wear" d="m1042 1595 335.2 4.8781" fill="none"></path>
      <text class="ff2">
        <textPath href="#map_mans-wear" startOffset="50%" text-anchor="middle">Чоловічий одяг</textPath>
      </text>
      <g xmlns="http://www.w3.org/2000/svg" id="layer1" transform="translate(144.98 -10.849)">
        <path id="path20" d="m833 1181.31 52.738 1.2265"/>
        <text style="${rowTitleStyle}">
          <textPath startOffset="50%" text-anchor="middle" href="#path20">Ряд 20</textPath>
        </text>
        <path id="path19" d="m833 1205.65h50.285"/>
        <text style="${rowTitleStyle}">
          <textPath startOffset="50%" text-anchor="middle" href="#path19">Ряд 19</textPath>
        </text>
        <path id="path18" d="m835.46 1272.27 42.926.98117"/>
        <text style="${rowTitleStyle}">
          <textPath startOffset="50%" text-anchor="middle" href="#path18">Ряд 18</textPath>
        </text>
        <path id="path17" d="m835.46 1295.12 42.926.2453"/>
        <text style="${rowTitleStyle}">
          <textPath startOffset="50%" text-anchor="middle" href="#path17">Ряд 17</textPath>
        </text>
        <path id="path16" d="m835.46 1358.18 42.926.73589"/>
        <text style="${rowTitleStyle}">
          <textPath startOffset="50%" text-anchor="middle" href="#path16">Ряд 16</textPath>
        </text>
        <path id="path15" d="m835.46 1383.84 42.926.24534"/>
        <text style="${rowTitleStyle}">
          <textPath startOffset="50%" text-anchor="middle" href="#path15">Ряд 15</textPath>
        </text>
        <path id="path14" d="m835.46 1445.13 42.926.7359"/>
        <text style="${rowTitleStyle}">
          <textPath startOffset="50%" text-anchor="middle" href="#path14">Ряд 14</textPath>
        </text>
        <path id="path13" d="m835.46 1470.54 40.964.98119"/>
        <text style="${rowTitleStyle}">
          <textPath startOffset="50%" text-anchor="middle" href="#path13">Ряд 13</textPath>
        </text>
        <path id="path12" d="m835.46 1540.34 40.964.73589"/>
        <text style="${rowTitleStyle}">
          <textPath startOffset="50%" text-anchor="middle" href="#path12">Ряд 12</textPath>
        </text>
        <path id="path11" d="m835.46 1565 42.926 1.2265"/>
        <text style="${rowTitleStyle}">
          <textPath startOffset="50%" text-anchor="middle" href="#path11">Ряд 11</textPath>
        </text>
        <path id="path10" d="m835.46 1628.27 42.926.73589"/>
        <text style="${rowTitleStyle}">
          <textPath startOffset="50%" text-anchor="middle" href="#path10">Ряд 10</textPath>
        </text>
        <path id="path9" d="m835.46 1653.4 42.926.73589"/>
        <text style="${rowTitleStyle}">
          <textPath startOffset="50%" text-anchor="middle" href="#path9">Ряд 9</textPath>
        </text>
        <path id="path8" d="m835.46 1720.42 44.153.98115"/>
        <text style="${rowTitleStyle}">
          <textPath startOffset="50%" text-anchor="middle" href="#path8">Ряд 8</textPath>
        </text>
        <path id="path7" d="m835.46 1745.14 42.926.24534"/>
        <text style="${rowTitleStyle}">
          <textPath startOffset="50%" text-anchor="middle" href="#path7">Ряд 7</textPath>
        </text>
        <path id="path6" d="m835.46 1806 42.926.86725"/>
        <text style="${rowTitleStyle}">
          <textPath startOffset="50%" text-anchor="middle" href="#path6">Ряд 6</textPath>
        </text>
        <path id="path5" d="m835.46 1830.76 42.926.86725"/>
        <text style="${rowTitleStyle}">
          <textPath startOffset="50%" text-anchor="middle" href="#path5">Ряд 5</textPath>
        </text>
        <path id="path4" d="m837.61 1895.54 37.812 1.2141"/>
        <text style="${rowTitleStyle}">
          <textPath startOffset="50%" text-anchor="middle" href="#path4">Ряд 4</textPath>
        </text>
        <path id="path3" d="m837.61 1920 37.812 1.2142"/>
        <text style="${rowTitleStyle}">
          <textPath startOffset="50%" text-anchor="middle" href="#path3">Ряд 3</textPath>
        </text>
        <path id="path2" d="m115.49 1920.22 39.247.98115"/>
        <text style="${rowTitleStyle}">
          <textPath startOffset="50%" text-anchor="middle" href="#path2">Ряд 2</textPath>
        </text>
        <path id="path1" d="m80 1980.34 44.153-.98115"/>
        <text style="${rowTitleStyle}">
          <textPath startOffset="50%" text-anchor="middle" href="#path1">Ряд 1</textPath>
        </text>
          <path id="path27" d="m893.37 1695 335.2 4.1812"/>
          <text>
            <textPath startOffset="50%" text-anchor="middle" href="#path27">Жіночий одяг</textPath>
          </text>
          <path id="path28" d="m893.37 1784 335.2 4.1812"/>
          <text>
            <textPath startOffset="50%" text-anchor="middle" href="#path28">Мобільні аксесуари</textPath>
          </text>
          <path id="path29" d="m875.42 1875 378.93 1.3938"/>
          <text>
            <textPath startOffset="50%" text-anchor="middle" href="#path29">Краса та догляд + алкоголь</textPath>
          </text>
          <path id="path29_1" d="m893.37 1945 335.2 4.1812"/>
          <text>
            <textPath startOffset="50%" text-anchor="middle" href="#path29_1">Продукти</textPath>
          </text>
          <path id="path30" d="m130.99 1955 675.27 1.3938"/>
          <text>
            <textPath startOffset="50%" text-anchor="middle" href="#path30">Всі види бізнесу</textPath>
          </text>
          <path id="path31" d="m875.42 1965 570.93 1.3938"/>
          <text>
            <textPath startOffset="50%" text-anchor="middle" href="#path31">Продукти</textPath>
          </text>
          <path id="druga_cherga" d="m175.42 1420 600.93 1.3938"/>
          <text style="${rowTitleStyle}">
            <textPath startOffset="50%" text-anchor="middle" href="#druga_cherga">Друга Черга</textPath>
          </text>
      </g>
      <style>
        text {
        pointer-events: none;
        }
        .ff2,
        #layer1 text {
          font-family: "Cormorant Unicase";
        }
      </style>
  
  `;
}