(function (window) {
    function Template() {
        this.defaultTemplate 
        =   '<tr data-id="{{id}}">'
        +       '<td>{{description}}</td>'
        +       '<td>{{amount}}</td>'
        +       '<td>{{category}}</td>'
        +       '<td>{{paymentVoucher}}</td>'
        +       '<td>'
        +           '<span class="btn glyphicon glyphicon-edit"></span> '
        +           '<span class="btn glyphicon glyphicon-trash"></span>'
        +       '</td>'
        +   '</tr>';
        
        this.addItemTemplate
        =   '<tr>'
        +       '<td><input type="text" class="form-control" name="description[]" placeholder="Description"></td>'
        +       '<td>'
        +           '<select class="form-control" name="category">'
        +               '<option>ค่าเดินทาง</option>'
        +               '<option>ค่าสิ่งพิมพ์</option>'
        +           '</select>'
        +       '</td>'
        +       '<td><input type="text" class="form-control" name="amount[]" placeholder="Amount"></td>'
        +   '</tr>';
        
        this.editItemTemplate 
        =   '<tr>'
        +       '<td><input type="text" class="form-control" name="description" value="{{description}}"></td>'
        +       '<td><input type="text" class="form-control" name="amount" value="{{amount}}"></td>'
        +       '<td>'
        +           '<select class="form-control" name="category">'
        +               '<option>ค่าเดินทาง</option>'
        +               '<option>ค่าสิ่งพิมพ์</option>'
        +           '</select>'
        +       '</td>'
        +       '<td><input type="text" class="form-control" name="payment-voucher" value="{{paymentVoucher}}"></td>'
        +       '<td>'
        +           '<span class="btn glyphicon glyphicon-check"></span> '
        +           '<span class="btn glyphicon glyphicon-ban-circle"></span>'
        +       '</td>'
        +   '</tr>';
    }
    
    Template.prototype.show = function (data, edit) {
        var i, l;
        var view = '';
        
        for (i = 0, l = data.length; i < l; i++) {
            var template = edit ? this.editItemTemplate : this.defaultTemplate;
            
            template = template.replace('{{id}}', data[i].id);
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