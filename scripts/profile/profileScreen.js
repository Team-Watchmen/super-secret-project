import { templates } from '../kinvey/templates.js';

const profileScreen = (() => {
    function start(container) {
        templates.get('profile-screen')
            .then((template) => {
                const html = template(null);
                $(container).html(html);
            });
    }

    return {
        start
    };
})();

export { profileScreen };