import { TemplatesProvider } from '../kinvey/templates.js';
import { UsersManager } from '../kinvey/users.js';

const ProfileScreen = (() => {
    class ProfileScreen {
        constructor() {
            this.users = new UsersManager();
            this.templates = new TemplatesProvider();
        }

        start(container) {
            this.templates.get('profile-screen')
                .then((template) => {
                    const html = template(null);
                    $(container).html(html);
                })
                .then(() => FB.XFBML.parse());
        }

        displayLocationsListForUser(container) {
            Promise.all([
                this.templates.get('location-list-item'),
                this.users.getUserLocations()
            ])
                .then(([template, locations]) => {
                    locations = locations.filter(loc => {
                        return loc.length > 0;
                    });

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