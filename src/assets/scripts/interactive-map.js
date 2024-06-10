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
  show: false,
  coords: { x: 0, y: 0 },
  data: {
    ...setNewApartmentData({}),
  },
});

container.addEventListener('scroll', (e) => {
  setInfoboxView({
    ...infoboxView(),
    show: false,
  });
});

document.body.addEventListener('click', (e) => {
  const target = e.target.closest('[data-id]');
  if (!target) {
    setInfoboxView({
      ...infoboxView(),
      show: false,
    });
    return; 
  }
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
  const position = placeElemInWrapperNearMouse(infobox, container, { pageX: view.coords.x, pageY: view.coords.y })
  infobox.style.transform = `translate(${position.x}px, ${position.y}px)`;
});

useInfoboxStateEffect((state) => {
  document.querySelector('[data-interactive-map-infobox-left-label]').textContent = state.data.leftLabel;
  document.querySelector('[data-interactive-map-infobox-right-label]').textContent = state.data.rightLabel;
  document.querySelector('[data-interactive-map-infobox-image]').src = state.data.img;
  document.querySelector('[data-interactive-map-infobox-title]').textContent = state.data.title;
  document.querySelector('[data-interactive-map-infobox-sale]').textContent = state.data.sale;
  document.querySelector('[data-interactive-map-infobox-area]').textContent = state.data.area;
  document.querySelector('[data-interactive-map-infobox-price]').textContent = state.data.price;
});

initInteractiveMap();

function getApartments(id) { 
  return axios.get(`./static/appartments.json`);
}

function setNewApartmentData(apartment) {
  return {
    title: apartment.title,
    appartment: apartment.number,
    area: apartment.all_room,
    price: apartment.price,
    img: apartment.img_big,
    sale: apartment.sale,
    rightLabel: apartment.statu_text,
  }
}

async function initInteractiveMap() {
    const img = await fetch('./assets/images/interactive-map/Master_Plan_Irpin.jpg');
    const imgBlob = await img.blob();
    const imgURL = URL.createObjectURL(imgBlob);
    const polygonsRequest = await axios.get('./static/polygons.txt');
    const polygons = polygonsRequest.data;

    //get image size
    const imgSize = new Image();
    imgSize.src = imgURL;
    imgSize.onload = function() {
        console.log(imgSize.width, imgSize.height);
        container.appendChild(createSvg(imgURL, imgSize.width, imgSize.height, polygons));
        container.scrollTo(0, 5000);
    }
    const apartmentsRequest = await getApartments();
    const apartments = apartmentsRequest.data;
    setAppartments(apartments);
}

function createSvg(imgURL, width, height, polygons = '') {
  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.classList.add('interactive-map');
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.insertAdjacentHTML('beforeend', `<image href="${imgURL}" width="${width}" height="${height}" />`);
    svg.insertAdjacentHTML('beforeend', polygons);
    container.innerHTML = '';  
  return svg;
}

