(function (window) {
    function Model(storage) {
        this.storage = storage;
    }
    
    Model.prototype.read = function (query, callback) {
        var queryType = typeof query;
        callback = callback || function () {};
        
        if (queryType === "function") {
            callback = query;
            return this.storage.findAll(callback);
        }
    };
    
    window.app = window.app || {};
    window.app.Model = Model;
})(window);