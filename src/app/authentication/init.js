import initJwt from './jwt';
import initLinkedIn from './linkedin';

function initPassport(app) {
  initJwt(app);
  initLinkedIn(app);
}

export default initPassport;
