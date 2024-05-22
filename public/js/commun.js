let navigator;
let breadscrum;
let dataStore;
let authentification;
$(document).ready(function () {
    dataStore = new DataStore();
    dataStore.init();
    navigator = new AppNavigator("main_container");
    breadscrum = new Breadscrum("breadscrum");
    authentification = new AuthentificationManager();
    authentification.is_authenticated();
    
});