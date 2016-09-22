var sammyApp = Sammy("#content", function() {
            var $content = $("#content");

            this.get("#/", function() {
                $content.html("GOsho");
                var loggedUser = users.isUserLogged();
                if (loggedUser) {
                    $content.html(loggedUser.username);

                    books.getBooks()
                        .then(function(response) {
                            console.log(response[1].title + " " + response[1].author);
                        })
                }
            });

            this.get("#/login", function(context) {
                if (users.isUserLogged()) {
                    context.redirect('#/');
                    return;
                }

                templates.get("login")
                    .then(function(template) {
                        $content.html(template());

                        $("#btn-login").on("click", function() {
                            console.log("login");

                            var logUser = {
                                username: $('#username').val(),
                                password: $('#password').val()
                            };

                            users.login(logUser)
                                .then(function(response) {
                                    context.redirect('#/');
                                    document.location.reload(true);
                                });
                        });
                    });
            });

            this.get("#/register", function(context) {
                if (users.isUserLogged()) {
                    context.redirect('#/');
                    return;
                }

                templates.get("register")
                    .then(function(template) {
                        $content.html(template());

                        $("#btn-register").on("click", function() {
                            console.log("register");

                            var newUser = {
                                username: $('#new-username').val(),
                                password: $('#new-username').val()
                            }

                            users.register(newUser)
                                .then(function(response) {
                                    context.redirect('#/');
                                    document.location.reload(true);
                                });
                        });
                    });
            });
        });

        //logout
        $("#nav-btn-logout").on("click", function() {
            users.logout()
                .then(function() {
                    location = "#/";
                    document.location.reload(true);
                });
        });

        $(function() {
            sammyApp.run("#/");
        });