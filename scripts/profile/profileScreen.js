import { templates } from '../kinvey/templates.js';
 
const profileScreen = (() => {
    function start() {
        templates.get('profile-screen');
    }

    return {
        start
    };
})();

export { profileScreen };