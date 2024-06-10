import deviceInfo from 'current-device';
import { lenis } from './modules/scroll/leniscroll';
import { frontScreenAnim } from './modules/animations/frontScreenAnim';
const { default: googleMap } = require('./modules/map/map');

const scroller = lenis;

if (deviceInfo.type !== 'mobile') {
  frontScreenAnim(scroller, deviceInfo.type);
}
window.addEventListener('DOMContentLoaded', () => {
  googleMap();
});
