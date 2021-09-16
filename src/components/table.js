import {rowSelector4Editing} from '../utils/selectors'
import {webUrl, tableTag} from '../utils/globalConst'

let rowID = null // each row on table has an ID

export const table = () => { // table that deals with [{}, {}, {}] DS with each obj being a row 
    $.ajax({
        type: 'GET', 
        url: webUrl, 
        success: dataFromDB => { // data taken from db in the form of [{},{},{}
            if (dataFromDB.length === 0) {
                _emptyDB_CSS(tableTag)
            } else {
                tableTag.remove('.noData2')
                tableGeneratorFunc(dataFromDB, tableTag)
                $('#tableId tr').on('click', rowSelector4Editing); // selects row data from table to populate on form, placed after ajax call IMPORTANT 
            }            
        }
    })
    $('.table').append(tableTag)
    // $('#tableId').on('click', rowSelector4Editing); // selects row data from table to populate on form, placed after ajax call IMPORTANT 

} 


export const tableGeneratorFunc = (dataFromDB, tableTag) => { // data comes from db [ {}, {}, {} ]
    _colNameGenerator(dataFromDB, tableTag) // generates the colNames for the table 
    tableDataGenerator(dataFromDB) // generates the data that is display to the table 
} 


export const tableDataGenerator = (dataFromDB) => { // data is [ {}, {}, {} ]
    let rowID = 1;
    $.each(dataFromDB, (rowIdx, rowElObj) => {
        let row = $(`<tr id='${rowIdx}' class="dataElFromDB"/>`); // gives the HTML tr with id attr 
        $.each(rowElObj, (key, val) => { 
            row.append(
                $(`<td class='${key + rowID}' />`).text(val) 
            );
        });
        rowID++
        $('#tableId').append(row);
    });
}


const _emptyDB_CSS = tableTag => {
    tableTag.append('<p id="noData" class="noData2">No data').css(
        {
            'display': 'block'
        }
    )
    $('.table').css(
        {
            'position': 'relative', 
            'left': '200px'
        }
    )
}


const _colNameGenerator = (dataFromDB, tableTag) => {
    if ( $('.table').find('th').length === 0) {
        let keys = Object.keys(dataFromDB[0]) // gives the keys from obj 
        tableTag.append('Table').css('display', 'block')
        $.each(keys, (_, key) => {
            tableTag.append(`<th class="colName">${key}`) // gives each col a category name 
        })
        $('.colName').css( // stylized col
            {
                'text-decoration': 'underline', 
                'font-style': 'italic',
            }
        );
    }
}

