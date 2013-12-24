/* global app */
(function () {
    function Account(name) {
        this.storage = new app.Storage(name);
        this.model = new app.Model(this.storage);
        this.template = new app.Template();
        this.view = new app.View(this.template);
        this.controller = new app.Controller(this.model, this.view);
    }
    
    var account = new Account('mideo-transaction');
    
    window.addEventListener('load', function () {
        account.controller.setView(document.location.hash);
    }.bind(this));
    window.addEventListener('hashchange', function() {
        account.controller.setView(document.location.hash);
    }.bind(this));
})();