

// data-location-tab
// data-location-container

const { useState } = require("./modules/helpers/helpers");
const { default: googleMap } = require("./modules/map/map");


const [ currentTab, setCurrentTab, useCurrentTabEffect ] = useState(0);

useCurrentTabEffect((tab) => {
    document.querySelectorAll('[data-location-container]').forEach((container, index) => {
        container.style.display = container.dataset.locationContainer === tab ? '' : 'none';
    });
    document.querySelectorAll('[data-location-tab]').forEach((tabElement, index) => {
        tabElement.classList.toggle('active', tabElement.dataset.locationTab === tab);
    });
});


document.body.addEventListener('click',function(evt){
    const target = evt.target.closest('[data-location-tab]');
    if (!target) return;

    setCurrentTab(target.dataset.locationTab);
});

setCurrentTab(document.querySelector('[data-location-tab]').dataset.locationTab);

googleMap();