import './modules/scroll/leniscroll';
import menu from './menu3d';
import Headroom from "headroom.js";

import upArrow from './modules/upArrow';
import { formsHandler } from './modules/form/formsHandler';
import { formsScroll } from './modules/form/formsScroll';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

global.gsap = gsap;

const headeroom = new Headroom(document.querySelector("header"));
headeroom.init();

document.querySelector('.header').addEventListener('mouseenter', (e) => {
    document.querySelector('.header').classList.remove('headroom--unpinned');
});

menu();
upArrow();
formsHandler();
formsScroll();


document.body.addEventListener('click', (evt) => {
    const target = evt.target.closest('[data-video-popup-wrapper-open]');
    if (!target) return;
    const videoPopup = document.querySelector('[data-video-popup-wrapper]');
    videoPopup.classList.add('active');
    videoPopup.querySelector('video').play();
});

document.body.addEventListener('click', (evt) => {
    const target = evt.target.closest('[data-video-popup-wrapper-close]');
    if (!target) return;
    const videoPopup = document.querySelector('[data-video-popup-wrapper]');
    videoPopup.classList.remove('active');
    videoPopup.querySelector('video').pause();
});

document.body.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
        const videoPopup = document.querySelector('[data-video-popup-wrapper]');
        if (!videoPopup.classList.contains('active')) return;
        videoPopup.classList.remove('active');
        videoPopup.querySelector('video').pause();
    }
});