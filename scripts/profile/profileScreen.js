import { TemplatesProvider } from '../kinvey/templates.js';
import { UsersManager } from '../kinvey/users.js';

const ProfileScreen = (() => {
    const users = new UsersManager();
    const templates = new TemplatesProvider();

    class ProfileScreen {
        constructor() {

        }

        start(container) {
            templates.get('profile-screen')
                .then((template) => {
                    const html = template(null);
                    $(container).html(html);
                });
        }

        displayLocationsListForUser(container) {
            Promise.all([
                templates.get('location-list-item'),
                users.getUserLocations()
            ])
                .then(([template, locations]) => {
                    const html = template(locations);
                    return html;
                })
                .then((html) => {
                    $(container).html(html);
                });
        }
    }

    return ProfileScreen;
})();

export { ProfileScreen };