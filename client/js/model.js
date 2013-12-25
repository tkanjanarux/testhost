(function (window) {
    function Model(storage) {
        this.storage = storage;
    }
    
    Model.prototype.create = function (description, amount, category, paymentVoucher, callback) {
        callback = callback || function () {};
        
        var newItem = {
            description: description,
            amount: amount,
            category: category,
            paymentVoucher: paymentVoucher
        };
        
        this.storage.save(newItem, callback);
    };
    
    Model.prototype.update = function (id, data, callback) {
        callback = callback || function () {};
        
        this.storage.save(id, data, callback);
    }
    
    Model.prototype.read = function (query, callback) {
        var queryType = typeof query;
        callback = callback || function () {};
        
        if (queryType === "function") {
            callback = query;
            return this.storage.findAll('transactions', callback);
        } else {
            return this.storage.find('transactions', query, callback);
        }
    };
    
    Model.prototype.remove = function (id, callback) {
        callback = callback || function () {};
        
        return this.storage.remove('transactions', id, callback);
    }
    
    window.app = window.app || {};
    window.app.Model = Model;
})(window);