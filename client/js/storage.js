(function (window) {
    function Storage(name) {
        var data,
            dbName;
            
        dbName = this.dbName = name;
        
        if (!localStorage[dbName]) {
            data = {
                transactions: [],
                paymentVouchers: []
            };
            
            localStorage[dbName] = JSON.stringify(data);
        }
    }
    
    Storage.prototype.findAll = function (collection, callback) {
        callback = callback || function () {};
        callback.call(this, JSON.parse(localStorage[this.dbName])[collection]);
    };
    
    Storage.prototype.find = function (collection, query, callback) {
        if (!callback) return;
        
        var data = JSON.parse(localStorage[this.dbName]);
        var col = data[collection];
        
        callback.call(this, col.filter(function (item) {
            var match = true;
            for(var key in query) {
                if (query[key] !== item[key]) {
                    match = false;
                }
            }
            return match;
        }));
    };
    
    Storage.prototype.save = function (id, updateData, callback) {
        var data = JSON.parse(localStorage[this.dbName]);
        var transactions = data.transactions;
        var lastTransaction;
        
        callback = callback || function () {};
        
        if (typeof id === "object") {
            callback = updateData;
            updateData = id;
            
            lastTransaction = transactions[transactions.length - 1];
            updateData.id = lastTransaction && lastTransaction.id + 1 || 1;
            
            transactions.push(updateData);
            localStorage[this.dbName] = JSON.stringify(data);
            callback.call(this, [updateData]);
        } else {
            for(var i = 0, l = transactions.length; i < l; i++) {
                if (id === transactions[i].id) {
                    for (var key in updateData) {
                        transactions[i][key] = updateData[key];
                    }
                }
            }
            localStorage[this.dbName] = JSON.stringify(data);
            callback.call(this, updateData);
        }
    };
    
    Storage.prototype.remove = function (collection, id, callback) {
        var data = JSON.parse(localStorage[this.dbName]);
        var col = data[collection];
        var match;
        
        col.forEach(function (item, index) {
            if (item.id === id) {
                match = index;
            }
        });
        
        if (match !== undefined) {
            col.splice(match, 1);
        }
        
        localStorage[this.dbName] = JSON.stringify(data);
        callback.call(this);
    };
    
    window.app = window.app || {};
    window.app.Storage = Storage;
})(window);