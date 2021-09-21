import {pageLayoutCss} from '../style/jqueryCss'

export const pageLayout = () => { 
    /**
    @description: This func hooks to the HTML div tag containing the class `.id` using jquery selector $(''), which selects tags based on there class or id attr, i.e. $('.className') or $('#id'). This func appends to the div tag a table tag with a unique id attr. This design ensures ease of expansion - by adding `th` tags to insert components.
    **/
    $('.id').append('<table id="layoutTable"/>')
    const th1 = $('<th class="form">');// This is a `th` tag - comps are appended to table 
    const th2 = $('<th class="table">');
    $('#layoutTable').append(th1,th2)
    pageLayoutCss(); 
} 


/**
   RVD 9/16/21   
**/