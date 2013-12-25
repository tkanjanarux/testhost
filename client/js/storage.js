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
    
    Storage.prototype.save = function (id, updateData, callback) {
        var data = JSON.parse(localStorage[this.dbName]);
        var transactions = data.transactions;
        
        callback = callback || function () {};
        
        if (typeof id === "object") {
            callback = updateData;
            updateData = id;
            
            updateData.id = new Date().getTime();
            
            transactions.push(updateData);
            localStorage[this.dbName] = JSON.stringify(data);
            callback.call(this, [updateData]);
        }
    };
    
    window.app = window.app || {};
    window.app.Storage = Storage;
})(window);