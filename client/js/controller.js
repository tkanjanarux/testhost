(function (window) {
    function Controller(model, view) {
        this.model = model;
        this.view = view;
        
        this.view.bind('addItem', function () {
            this.addItem();
        }.bind(this));
        
        this.view.bind('addItemDone', function (data) {
            this.addItemDone(data);
        }.bind(this));
        
        this.view.bind('removeItem', function (item) {
            this.removeItem(item.id);
        }.bind(this));
        
        this.view.bind('editItem', function (item) {
            this.editItem(item.id);
        }.bind(this));
        
        this.view.bind('editItemCancel');
        
        this.view.bind('editItemSave', function (data) {
            this.editItemSave(data);
        }.bind(this));
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
    
    Controller.prototype.addItem = function () {
        this.view.render("addItem");
    };
    
    Controller.prototype.addItemDone = function (data) {
        var count = 0,
            that = this;
            
        data.transactions.forEach(function (transaction) {
            that.model.create(transaction.description, transaction.amount, transaction.category, data.voucherId, function () {
                count = count + 1;
                if (count === data.transactions.length) {
                    that.view.render('addItemDone');
                    that.showAll();
                }
            });
        });
    };
    
    Controller.prototype.removeItem = function (id) {
        this.model.remove(id, function () {
            this.showAll();
        }.bind(this));
    };
    
    Controller.prototype.editItem = function (id) {
        this.model.read({id: id}, function (data) {
            this.view.render('editItem', data);
        }.bind(this));
    };
    
    Controller.prototype.editItemSave = function (updateData) {
        this.model.update(updateData.id, updateData, function (data) {
            this.view.render('editItemDone', data);
        }.bind(this));
    };
    
    window.app = window.app || {};
    window.app.Controller = Controller;
})(window);