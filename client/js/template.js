(function (window) {
    function Template() {
        this.defaultTemplate 
        = '<tr>'
        +        '<td>{{description}}</td>'
        +        '<td>{{amount}}</td>'
        +        '<td>{{category}}</td>'
        +        '<td>{{paymentVoucher}}</td>'
        + '</tr>';
    }
    
    Template.prototype.show = function (data) {
        var i, l;
        var view = '';
        
        for (i = 0, l = data.length; i < l; i++) {
            var template = this.defaultTemplate;
            
            template = template.replace('{{description}}', data[i].description);
            template = template.replace('{{amount}}', data[i].amount);
            template = template.replace('{{category}}', data[i].category);
            template = template.replace('{{paymentVoucher}}', data[i].paymentVoucher);
            
            view = view + template;
        }
        
        return view;
    };
    
    window.app = window.app || {};
    window.app.Template = Template;
})(window);