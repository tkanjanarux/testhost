(function (window) {
    function Controller(model, view) {
        this.model = model;
        this.view = view;
    }
    
    Controller.prototype.setView = function (locationHash) {
        //var route = locationHash.split('/')[1];
        //var page = route || '';
        this.showAll();
    };
    
    Controller.prototype.showAll = function () {
        this.model.read(function (data) {
            this.view.render('showEntries', data);
        }.bind(this));
    };
    
    window.app = window.app || {};
    window.app.Controller = Controller;
})(window);