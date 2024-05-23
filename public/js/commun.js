let navigator;
let breadscrum;
let dataStore;
let authentification;
$(document).ready(function () {
    dataStore = new DataStore();
    dataStore.init();

    authentification = new AuthentificationManager();
    authentification.is_authenticated();
    navigator = new AppNavigator("main_container");
    breadscrum = new Breadscrum("breadscrum");
    
});