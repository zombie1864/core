import {rowSelector4Editing} from '../utils/selectors'
import {webUrl, tableTag} from '../utils/globalConst'
import {tableCss, stylizeCols} from '../style/jqueryCss'


export const table = () => { 
    /**
    @description: table comp, which makes an ajax after mounted on the DOM. See dev notes for details 
    **/
    $.ajax({ 
        type: 'GET', 
        url: webUrl, 
        success: dataFromDB => { // data from db, [{},{},{}] DS, each object is a row 
            if (dataFromDB.length === 0) {
                $('#layoutTable').append('<p class="noData">No Data</P>')
            } else {
                $('#layoutTable').remove('.noData')
                $('.table').append(tableTag)
                generateTableUsing(dataFromDB, tableTag)
                $('#tableContent tr').on('click', rowSelector4Editing); // NOTE ajax is async, see dev notes
                tableCss()
            }            
        }
    })
} 


export const generateTableUsing = (dataFromDB, tableTag) => { 
    /**
    @description: Wrapper function that generates table using params 
    @param {Array[Object]} dataFromDB: list of dict obj containg data pulled from DB via ajax resp 
    @param {JqueryObject} tableTag: An HTML `table` tag 
    **/
    _generateColNameFor(dataFromDB, tableTag) // generates the colNames for the table 
    addTableData(dataFromDB) // generates the data that is display to the table 
} //NOTE dataFromDB is not Array[Object] it is Array[Array[Object]]


export const addTableData = (dataFromDB) => { 
    /**
    @description: Generates data on table taken from HTTP resp from server 
    @param {Array[Object]} dataFromDB: data from DB 
    **/
   let rowID = 1;
   $.each(dataFromDB, (rowIdx, dataObj) => {
       let row = $(`<tr id='${rowIdx}' class="dataElFromDB"/>`); // gives the HTML tr with id attr 
       $.each(dataObj, (key, val) => { 
            row.append(
                $(`<td class='${key + rowID}' />`).text(val) 
            );
        });
        rowID++
        $('#tableContent').append(row);
    });
}


const _generateColNameFor = (dataFromDB, tableTag) => {
    /**
    @description: Generates and stylizes col names for table comp 
    @param {Array[Object]} dataFromDB: list of dict obj containg data pulled from DB via ajax resp 
    @param {JqueryObject} tableTag: An HTML `table` tag 
    **/
    tableTag.append('Table').css('display', 'block') // no obj if there is only one key-value pair 
    $.each(Object.keys(dataFromDB[0]), (_, key) => { /// gives the keys from obj 
        tableTag.append(`<th class="colName">${key}`) // gives each col a category name 
    })
    stylizeCols()
}

/**
   RVD 9/16/21   
**/