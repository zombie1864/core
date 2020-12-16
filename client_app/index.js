$("document").ready(function() {
    $('.id').append("\
        <table border='2'>\
            <thread>\
                <th>form\
                    <form>\
                        <input id='name' type='text'>\
                        <br>\
                        <br>\
                        <input id='age' type='text'>\
                        <br>\
                        <br>\
                        <input id='gender' type='text'>\
                        <br>\
                        <br>\
                        <input id='email' type='text'>\
                        <br>\
                        <br>\
                        <input id='feedback' type='text'>\
                    </form>\
                    <th>table\
                    <table border='1'>\
                        <tr>\
                            <th>col_1</th>\
                            <th>col_2</th>\
                            <th>col_3</th>\
                        </tr>\
                        <tr>\
                            <td>data</td>\
                            <td>data</td>\
                            <td>data</td>\
                        </tr>\
                        <tr>\
                            <td>data</td>\
                            <td>data</td>\
                            <td>data</td>\
                        </tr>\
                        <tr>\
                            <td>data</td>\
                            <td>data</td>\
                            <td>data</td>\
                        </tr>\
                   </table>\
                    </th>\
                </th>\
            </thread>\
            <tbody></tbody>\
            <tfoot>\
                <tr>\
                    <td>\
                        <input type='button' value='new row' id='newRow'>\
                    </td>\
                </tr>\
            </tfoot>\
        </table>")
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

