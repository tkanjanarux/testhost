/* global $ */
(function (window) {
    function View(template) {
        this.template = template;
        
        this.$transactionList = $('#transaction-list');
        this.$transactionInput = $('#transaction-input');
        this.$addItem = $('#add-transaction');
        this.$addItemDone = $('#add-transaction-done');
        this.$paymentVoucherForm = $('#payment-voucher-form');
        
        this._addItem();
    }
    
    View.prototype._addItem = function () {
        this.$transactionInput.append(this.template.addItemTemplate);
    };
    
    View.prototype._addItemDone = function () {
        this.$transactionInput[0].innerHTML = this.template.addItemTemplate;
        this.$paymentVoucherForm.find('#pay').val('');
        this.$paymentVoucherForm.find('#voucher-id').val('');
    };
    
    View.prototype._editItem = function (item) {
        var $el = this.$transactionList.find('[data-id='+ item[0].id + ']');
        $el.hide();
        $el.after(this.template.show(item, true));
    };
    
    View.prototype._removeEditControl = function (id) {
        var $el = this.$transactionList.find('[data-id='+ id + ']');
        $el.show();
        $el.next().remove();
        
        return $el;
    };
    
    View.prototype._editItemDone = function (data) {
        var $el = this._removeEditControl(data.id);
        $el.replaceWith(this.template.show([data]));
    }
    
    View.prototype.render = function (viewCmd, parameter) {
        var that = this;
        var viewCommands = {
            showEntries: function () {
                that.$transactionList[0].innerHTML = that.template.show(parameter);
            },
            addItem: function () {
                that._addItem();
            },
            addItemDone: function () {
                that._addItemDone();
            },
            editItem: function () {
                that._editItem(parameter);
            },
            editItemDone: function () {
                that._editItemDone(parameter);
            }
        };
        
        viewCommands[viewCmd]();
    };
    
    View.prototype._getInputArray = function (name) {
        var array = [];
        this.$paymentVoucherForm.find('[name*=' + name + ']').each(function (i, el) {
            array.push($(el).val());
        });
        return array;
        
    };
    
    View.prototype._buildPaymentVoucherData = function () {
        var data = {};
        
        var transactions = data.transactions = [];
        data.pay = this.$paymentVoucherForm.find('#pay').val();
        data.voucherId = this.$paymentVoucherForm.find('#voucher-id').val();
        
        var descriptions = this._getInputArray('description');
        var categorys = this._getInputArray('category');
        var amounts = this._getInputArray('amount');
        
        var i, transaction, l = descriptions.length;
        
        for (i = 0; i < l; i++) {
            transaction = {};
            transaction.description = descriptions[i];
            transaction.category = categorys[i];
            transaction.amount = amounts[i];
            
            transactions.push(transaction);
        }
        
        return data;
    };
    
    View.prototype._itemIdForElement = function (el) {
        var $el = $(el);
        var id = $el.parents('tr').data('id') || $el.parents('tr').prev().data('id');
        return id;
    };
    
    View.prototype._buildTransactionData = function (el) {
        var $el = $(el).parents('tr');
        
        var data = {};
        data.id = this._itemIdForElement(el);
        data.description = $el.find('[name=description]').val();
        data.amount = $el.find('[name=amount]').val();
        data.category = $el.find('[name=category]').val();
        data.paymentVoucher = $el.find('[name=payment-voucher]').val();
        
        return data;
    }
    
    View.prototype.bind = function (event, handler) {
        var that = this;
        if (event === "addItem") {
            this.$addItem.on('click', function (e) {
                handler();
            });
        } else if (event === "addItemDone") {
            this.$addItemDone.on('click', function (e) {
                var data = this._buildPaymentVoucherData();
                handler(data);
            }.bind(this));
        } else if (event === "removeItem") {
            this.$transactionList.on('click', '.glyphicon-trash', function (e) {
                if(confirm('Are you sure to remove transaction?')) {
                    var id = that._itemIdForElement(this);
                    handler({id: id});
                }
            });
        } else if (event === "editItem") {
            this.$transactionList.on('click', '.glyphicon-edit', function (e) {
                var id = that._itemIdForElement(this);
                handler({id: id});
            });
        } else if (event === "editItemCancel") {
            this.$transactionList.on('click', '.glyphicon-ban-circle', function (e) {
                var id = that._itemIdForElement(this);
                that._removeEditControl(id);
            });
        } else if (event === "editItemSave") {
            this.$transactionList.on('click', '.glyphicon-check', function (e) {
                var data = that._buildTransactionData(this);
                handler(data);
            });
        }
    };
    
    window.app = window.app || {};
    window.app.View = View;
})(window);