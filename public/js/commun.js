let navigator;
let breadscrum;
let localStorageManager;
$(document).ready(function () {
    navigator = new AppNavigator("main_container");
    breadscrum = new Breadscrum("breadscrum");
    localStorageManager = new LocalStorageManager();
    
    const last_visited = CookieManager.getCookie("last_visited");
    const visiting = window.location.pathname;
    if (last_visited !== null && last_visited !== "" && last_visited !== visiting) {
        console.log("Last visited URL: " + last_visited);
        navigator.display_url(last_visited);
    }
});