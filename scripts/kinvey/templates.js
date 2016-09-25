const TemplatesProvider = (function () {
    class TemplatesProvider {
        constructor() {

        }

        get(name) {
            if (window.sessionStorage[name]) {
            return new Promise((resolve, reject) => {
                const cachedHtml = window.sessionStorage[name];
                resolve(cachedHtml);
            })
                .then((cachedHtml) => {
                    const compiled = Handlebars.compile(cachedHtml);
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
                .then((html) => {
                    window.sessionStorage[name] = html;
                    return html;
                })
                    .then((html) => {
                        const compiled = Handlebars.compile(html);
                        return compiled;
                    });
            }
        }
    }

    return TemplatesProvider;
} ());

export { TemplatesProvider };
