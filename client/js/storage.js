(function (window) {
    function Storage(name) {
        var data,
            dbName;
            
        dbName = this.dbName = name;
        
        if (!localStorage[dbName]) {
            data = {
                transactions: []
            };
            
            localStorage[dbName] = JSON.stringify(data);
        }
    }
    
    Storage.prototype.findAll = function (callback) {
        callback = callback || function () {};
        callback.call(this, JSON.parse(localStorage[this.dbName]).transactions);
    };
    
    window.app = window.app || {};
    window.app.Storage = Storage;
})(window);