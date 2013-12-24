/* global $ */
(function (window) {
    function View(template) {
        this.template = template;
        
        this.$transactionList = $('#transaction-list');
    }
    
    View.prototype.render = function (viewCmd, parameter) {
        var that = this;
        var viewCommands = {
            showEntries: function () {
                that.$transactionList[0].innerHTML = that.template.show(parameter);
            }
        };
        
        viewCommands[viewCmd]();
    };
    
    window.app = window.app || {};
    window.app.View = View;
})(window)