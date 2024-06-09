class Notification{
    static success(message){
        $.notify(message, "success", Notification.getOptions());
    }
    static error(message){
        $.notify(message, "error", Notification.getOptions());
    }
    static warning(message){
        $.notify(message, "warn", Notification.getOptions());
    }
    static getOptions(){
        return {
            zIndex: 9999,
            // whether to hide the notification on click
            clickToHide: true,
            // whether to auto-hide the notification
            autoHide: true,
            // if autoHide, hide after milliseconds
            autoHideDelay: 5000,
            // show the arrow pointing at the element
            arrowShow: true,
            // arrow size in pixels
            arrowSize: 5,
            // position defines the notification position though uses the defaults below
            position: '...',
            // default positions
            elementPosition: 'bottom left',
            globalPosition: 'bottom right',
            // default style
            style: 'bootstrap',
            // default class (string or [string])
            className: 'error',
            // show animation
            showAnimation: 'slideDown',
            // show animation duration
            showDuration: 400,
            // hide animation
            hideAnimation: 'slideUp',
            // hide animation duration
            hideDuration: 200,
            // padding between element and notification
            gap: 2
          }
    }
}