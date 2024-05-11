let navigator;

$(document).ready(function () {
    navigator = new AppNavigator("main_container");

    let last_visited = CookieManager.getCookie("last_visited");
    if (last_visited !== null && last_visited !== "" && last_visited !== "/") {
        console.log("Last visited URL: " + last_visited);
        navigator.display_url(last_visited);
    }
    console.log(window.location.pathname)
    if (window.location.pathname === "/") {
        navigator.go_to("home");
    }
});