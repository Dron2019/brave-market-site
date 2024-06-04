import markersFromPrevSite from './markersFromPrevSite';

const baseFolder = window.location.href.match(/localhost/)
  ? './assets/images/markers/'
  : '/wp-content/themes/rams/assets/images/markers/';

const markersAdresses = {
  main: `${baseFolder}main.svg`,
  link: `${baseFolder}link.svg`,
  hotel: `${baseFolder}hotel.svg`,
  shop: `${baseFolder}shop.svg`,
  park: `${baseFolder}park.svg`,
  school: `${baseFolder}school.svg`,
  education: `${baseFolder}education.svg`,
  medicine: `${baseFolder}medicine.svg`,
  market: `${baseFolder}market.svg`,
  transport: `${baseFolder}transport.svg`,
  ramsbeyondistanbul: `${baseFolder}ramsbeyondistanbul.svg`,
  ramscity: `${baseFolder}ramscity.svg`,
  quattro: `${baseFolder}quattro.svg`,
  bayramoglu: `${baseFolder}bayramoglu.svg`,
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

export async function fetchMarkersData(google) {

  const sizes = {
    main: new google.maps.Size(215.25,198.75),
    link: new google.maps.Size(240,58),
  };
  const sendData = new FormData();
  sendData.append('action', 'infrastructure');
  const url = window.location.href.match(/localhost/)
    ? 'https://central-park-wp.smarto.com.ua/wp-admin/admin-ajax.php'
    : '/wp-admin/admin-ajax.php';
  // let markersData = window.location.href.match(/localhost|smarto/) ? Promise.resolve(mockData()) : await fetch(url, {
  //   method: 'POST',
  //   body: sendData,
  // });
  let markersData = Promise.resolve(mockData());
  // markersData = window.location.href.match(/localhost|smarto/) ? mockData() : await markersData.json();
  markersData = mockData();
  if (!markersData) {
    console.warn('Wrong data recieved');
    return;
  }

  let formatedMarkersDataForMap = markersData.reduce((acc, el) => {
    if (!el.list) return acc;
    el.list.forEach(marker => {
      acc.push({
        content: `<div ${markerPopupStyle}>${marker.name}</div>`,
        position: {
          lat: marker.coordinations.latitude,
          lng: marker.coordinations.elevation,
        },
        type: el.code,
        id: marker.id,
        zIndex: 2,
        icon: { url: markersAdresses[el.code], scaledSize: sizes[el.code] },
      });
    });
    return acc;
  }, []);

  console.log(formatedMarkersDataForMap);

  markersFromPrevSite().forEach(marker => {
    formatedMarkersDataForMap.push({
      content: marker.description,
      position: {
        lat: marker.lat,
        lng: marker.lng,
      },
      type: marker.category,
      id: marker.id,
      zIndex: 1,
      icon: { url: markersAdresses[marker.category], scaledSize: buildLogoSize },
    });
  });

  return formatedMarkersDataForMap;
}

function mockData() {
  return [
    {
      name: 'Irpyn market',
      code: 'main',
      list: [
        {
          name:
            "<a style='text-decoration:none; color: rgba(122,144,73,1); font-weight: bold' href='#'>Центральний ринок Ірпінь</a>",
          id: '00',
          coordinations: {
            latitude: 50.51227376926132, 
            elevation: 30.25349501396563,
          },
        },
      ],
    },
    {
      name: 'Прокласти маршрут',
      code: 'link',
      list: [
        {
          name:
            "Центральний ринок Ірпінь",
          id: '00',
          coordinations: {
            latitude: 50.50915413939981, 
            elevation: 30.25408674069066, 
          },
        },
      ],
    },
  ];
}
