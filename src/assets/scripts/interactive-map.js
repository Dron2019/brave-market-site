import axios from 'axios';
const { useState } = require("./modules/helpers/helpers");
const { default: placeElemInWrapperNearMouse } = require("./modules/helpers/placeElemNearMouse");

//Master_Plan_Irpin

const container = document.querySelector('.home-screen3__iframe-wrapper');
const infobox = document.querySelector('[data-interactive-map-infobox]');


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

document.body.addEventListener('click', (e) => {
  
  const target = e.target.closest('[data-id]');
  const infobox = e.target.closest('[data-interactive-map-infobox]');
  if (!target && !infobox) {
    closeInfobox();
    return; 
  }

  if (infobox) return;

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

container.addEventListener('mouseover', (e) => {
  const target = e.target.closest('[data-id]');
  if (!target) {
    return; 
  }
  const id = target.dataset.id;
  if (id == infoboxState().data.id) return;
  const appartment = appartments().find(appartment => appartment.id == id) || {};

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

container.addEventListener('mousemove', (e) => {
  const target = e.target.closest('[data-id]');
  if (!target) {
    return;
  }
  setInfoboxView({
    show: true,
    coords: { x: e.clientX, y: e.clientY },
  });

});

useInfoboxViewEffect((view) => {
  infobox.classList.toggle('active', view.show);
  const position = placeElemInWrapperNearMouse(infobox, container, { pageX: view.coords.x, pageY: view.coords.y });
  if (window.matchMedia('(max-width: 1024px)').matches) return;
  infobox.style.transform = `translate(${position.x}px, ${position.y}px)`;
});

useInfoboxStateEffect((state) => {
  document.querySelector('[data-interactive-map-infobox-left-label]').textContent = state.data.leftLabel;
  document.querySelector('[data-interactive-map-infobox-right-label]').textContent = state.data.rightLabel;
  document.querySelector('[data-interactive-map-infobox-image]').src = state.data.img;
  document.querySelector('[data-interactive-map-infobox-title]').textContent = state.data.title;
  // document.querySelector('[data-interactive-map-infobox-sale]').textContent = state.data.sale;
  document.querySelector('[data-interactive-map-infobox-area]').textContent = state.data.area;
  document.querySelector('[data-interactive-map-infobox-price]').textContent = state.data.price;
});

initInteractiveMap();


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

    //get image size
    const imgSize = new Image();
    imgSize.src = imgURL;
    imgSize.onload = function() {
        console.log(imgSize.width, imgSize.height);
        container.appendChild(createSvg(imgURL, imgSize.width, imgSize.height, polygons));
        container.scrollTo(container.scrollWidth / 2 - container.getBoundingClientRect().width / 2, 5000);
    }
    const apartmentsRequest = await getApartments();
    const apartments = apartmentsRequest.data;
    setAppartments(apartments);
}

function createSvg(imgURL, width, height, polygons = '') {

  const isPolygonsFromServer = typeof polygons === 'object';
  let polygonsFromServer = '';

  if (isPolygonsFromServer) {
    polygonsFromServer = Object.entries(polygons.cords).reduce((acc, [key, value], index) => {
      return acc + `<polygon data-id="${polygons.flatsIds[index]}" points="${value}" />`;
    }, '');


    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.classList.add('interactive-map');
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
      svg.setAttribute("viewBox", `0 0 ${polygons.size[0]} ${polygons.size[1]}`);
      svg.insertAdjacentHTML('beforeend', `<image href="${document.documentElement.dataset.base}/assets${polygons['url']}" width="${polygons.size[0]}" height="${polygons.size[1]}" />`);
      svg.insertAdjacentHTML('beforeend', isPolygonsFromServer ? polygonsFromServer : polygons);
      container.innerHTML = '';  
    return svg;
  } else {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.classList.add('interactive-map');
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
      svg.insertAdjacentHTML('beforeend', `<image href="${imgURL}" width="${width}" height="${height}" />`);
      svg.insertAdjacentHTML('beforeend', isPolygonsFromServer ? polygonsFromServer : polygons);
      container.innerHTML = '';  
    return svg;

  }



}

