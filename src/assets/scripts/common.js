import './modules/scroll/leniscroll';
import menu from './menu3d';
import Headroom from "headroom.js";

import upArrow from './modules/upArrow';
import { formsHandler } from './modules/form/formsHandler';
import { formsScroll } from './modules/form/formsScroll';


const headeroom = new Headroom(document.querySelector("header"));
headeroom.init();

document.querySelector('.header').addEventListener('mouseenter', (e) => {
    document.querySelector('.header').classList.remove('headroom--unpinned');
});

menu();
upArrow();
formsHandler();
formsScroll();