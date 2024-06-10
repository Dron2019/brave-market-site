import { fetchMarkersData } from './getMarkers';
import mapStyle from './map-style';

export default function googleMap() {
  global.initMap = initMap;
  console.log(`
    INIT global
  `);
}

async function func() {
  const script = document.createElement('script');
  let key = document.documentElement.dataset.key ? document.documentElement.dataset.key : '';
  // if (window.location.href.match(/localhost|smarto/)) key = '';
  // const key = '';
  script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap&language=${document.documentElement.getAttribute(
    'lang',
  )}`;
  document.getElementsByTagName('head')[0].appendChild(script);
}
// setTimeout(func, 1000);
const maps = document.querySelectorAll('.map');
const options = {
  rootMargin: '0px',
  threshold: 0.1,
};

maps.forEach(image => {
  const callback = (entries, observer) => {
    /* Content excerpted, show below */
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target;
        lazyImage.src = lazyImage.dataset.src;
        observer.unobserve(image);
        func();
      }
    });
  };
  const observer = new IntersectionObserver(callback, options);
  const target = image;
  observer.observe(target);
});

// eslint-disable-next-line no-unused-vars
function initMap() {
  const gmarkers1 = [];
  //28.4600074, 49.2384203
  const center = {
    lat: 50.5224505,
    lng: 30.2385926,
  };
  // lat: 50.5225295,
  // lng: 28.8806902,
  /** Массив, куда записываются выбраные категории */
  const choosedCategories = new Set();
  choosedCategories.add('main');
  /** Елементы, при клике на который будет происходить фильтрация */
  const filterItems = document.querySelectorAll('[data-marker]');
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center,
    scrollwheel: false,
    navigationControl: false,
    mapTypeControl: false,
    scaleControl: false,
    draggable: true,
    gestureHandling: 'cooperative',
    language: document.documentElement.getAttribute('lang') || 'en',
    styles: mapStyle(),
  });
  window.googleMap = map;

  //Добавляем на карту
  // polygon.setMap(map);

  const filterMarkers = function(category, categoriesArray) {
    gmarkers1.forEach(el => {
      if (categoriesArray.has(el.category)) {
        el.setMap(map);
        el.setAnimation(google.maps.Animation.DROP);
      } else {
        el.setMap(null);
      }
    });
  };
  filterItems.forEach(item => {
    item.addEventListener('click', evt => {
      evt.stopImmediatePropagation();
      item.classList.toggle('active');
      if (item.classList.contains('active')) {
        choosedCategories.add(item.dataset.category);
        if (item.dataset.multicategory) {
          const innerCategories = item.dataset.multicategory.split('~');
          innerCategories.forEach(el => choosedCategories.add(el));
        }
      } else {
        choosedCategories.delete(item.dataset.category);
        if (item.dataset.multicategory) {
          const innerCategories = item.dataset.multicategory.split('~');
          innerCategories.forEach(el => choosedCategories.delete(el));
        }
      }
      filterMarkers('main', choosedCategories);
    });
  });

  // var baseFolder = '/wp-content/themes/centower/assets/images/markers/';
  const baseFolder = window.location.href.match(/localhost/)
    ? './assets/images/markers/'
    : '/wp-content/themes/central-park/assets/images/markers/';
  let defaultMarkerSize = new google.maps.Size(56, 56);
  if (document.documentElement.clientWidth < 950) {
    // defaultMarkerSize = new google.maps.Size(40, 53);
  }
  const buildLogoSize = new google.maps.Size(125, 55);
  const markersAdresses = {
    main: `${baseFolder}main.svg`,
    link: `${baseFolder}link.svg`,
    kinder: `${baseFolder}kindergarten.svg`,
    shop: `${baseFolder}shop.svg`,
    sport: `${baseFolder}sport.svg`,
    school: `${baseFolder}school.svg`,
    cafe: `${baseFolder}meal.svg`,
    medicine: `${baseFolder}medicine.svg`,
    bank: `${baseFolder}bank.svg`,
    leisure: `${baseFolder}leisure.svg`,
  };
  const markerPopupStyle = `
          style="
          background: #ffffff;
          color:#000000;
          font-weight: bold;
          padding:5px 10px;
          font-size: 16px;
          line-height: 120%;"
          `;

  const ajaxMarkers = fetchMarkersData(google);

  ajaxMarkers.then(result => {
    putMarkersOnMap(result, map);
  });
  console.log(ajaxMarkers);

  function putMarkersOnMap(markers, map) {
    const infowindow = new google.maps.InfoWindow({
      content: '',
      maxWidth: 200,
    });
    const initedMarkers = [];
    markers.forEach(marker => {
      const category = marker.type;

      const mapMarker = new google.maps.Marker({
        map,
        category,
        zIndex: marker.zIndex || 1,
        icon: marker.icon,
        dataId: +marker.id,
        content: marker.content,
        position: new google.maps.LatLng(marker.position.lat, marker.position.lng),
      });
      mapMarker.dataId = +marker.id;
      initedMarkers.push(mapMarker);

      google.maps.event.addListener(mapMarker, 'click', function() {
        if (mapMarker.category === 'link') {
          // to do ---> get this link from income marker data
          window.open(
            "https://www.google.com/maps/dir//''/@50.5126895,30.2432543,15z/data=!4m9!4m8!1m0!1m5!1m1!1s0x472b33c976ed30eb:0xbbb752ac7aa526de!2m2!1d30.253554!2d50.5126763!3e0?entry=ttu",
            '_blank',
          );
          return;
        }
        infowindow.setContent(marker.content);
        infowindow.open(map, mapMarker);
        map.panTo(this.getPosition());
      });
      mapMarker.name = marker.type;
      gmarkers1.push(mapMarker);
    });
    map.initedMarkers = initedMarkers;
    console.log(initedMarkers[0].getPosition());
    // filterMarkers('main', choosedCategories);
    markersHightlight(google, map, infowindow);

    // const newCenter =

    map.setCenter(initedMarkers[0].getPosition());
    // markersHandler();
  }
  /* beautify preserve:end */
}

function markersHightlight(google, map, infowindow) {
  const $markerLinks = document.querySelectorAll('[data-marker-id]');
  // const infowindow = new google.maps.InfoWindow({
  //   content: '',
  //   maxWidth: 280,
  // });
  querySelectorWithNodeList('[data-marker-id]', item => {
    item.addEventListener('click', () => {
      const marker = map.initedMarkers.find(el => {
        return el.dataId === +item.dataset.markerId;
      });
      if (marker === undefined) return;
      infowindow.setContent(marker.content);
      infowindow.open(map, marker);
      // console.log(marker);
    });
  });
  // console.log(document.querySelectorAll('[data-marker-id]'));
  // console.log(map);
}

function querySelectorWithNodeList(selector, cb = () => {}) {
  const $list = document.querySelectorAll(selector);
  $list.forEach(el => cb(el));
}

function markersHandler() {
  document.querySelector('.map-wrapper').addEventListener('click', ({ target }) => {
    const map = window.googleMap;
    if (target.closest('[data-marker-id]') === null || !map) return;
    const markerId = target.closest('[data-marker-id]').dataset.markerId;
    const marker = map.initedMarkers.find(marker => marker.dataId == markerId);
    marker && map.setCenter(marker.getPosition());
    console.log(map.initedMarkers.find(marker => marker.dataId == markerId));
    console.log(map);
    // console.log(marker);
  });
}
