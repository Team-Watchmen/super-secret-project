const loadFacebookSDK = (() => {
    function load() {
        // <!-- Load Facebook SDK for JavaScript -->
            (function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5";
                fjs.parentNode.insertBefore(js, fjs);
                d.body.appendChild(js);
            } (document, 'script', 'facebook-jssdk'));
    }

    return { load };
})();

export { loadFacebookSDK };