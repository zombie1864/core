$("document").ready(function() {
    $('.id').append("<table border='2'><thread><tr><th>data1</th><th>data2</th><th>data3</th></tr></thread><tbody></tbody><tfoot><tr><td><input type='button' value='new row' id='newRow'></td></tr></tfoot></table>")
    $('#newRow').on('click', onClick); 
    function onClick() {
        var addRow = '<tr>'
        addRow += "<td> <input type='text' name='test1'></td>"
        addRow += "<td> <input type='text' name='test2'></td>"
        addRow += "<td> <input type='text' name='test3'></td>"
        addRow += '</tr>';

        $('table tbody').append(addRow)
    }
}); 

