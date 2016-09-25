const templates = (function () {
    const URL_TEMPLATE = `templates/${name}.handlebars`;

    function get(name) {
        if (window.sessionStorage[name]) {
            return new Promise((resolve, reject) => {
                resolve(window.sessionStorage[name]);
            })
                .then((html) => {
                    const compiled = Handlebars.compile(html);
                    return compiled;
                });
        } else {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `templates/${name}.handlebars`,
                    method: 'GET'
                })
                    .done(resolve)
                    .fail(reject);
            })
                .then((template) => {
                    window.sessionStorage[name] = template;
                    return template;
                })
                .then((html) => {
                    const compiled = Handlebars.compile(html);
                    return compiled;
                });
        }
    }

    return {
        get
    };
} ());

export {templates};