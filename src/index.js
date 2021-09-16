import {pageLayout} from './components/pageLayout'
import {form} from './components/form'
import {eventBtns} from './components/btns'
import { table } from './components/table'


$(() => {  // this is the same as $('document').ready(function() { ... })
    pageLayout();  
    form(); 
    eventBtns();
    table(); 
    /**
       @eventBtns 
            There is a BUG with this having to do with css. Read notes for more details   
    **/
    /**
        RFE 
        NOTE 
            The issue at hand is that the table CHANGES size depending on the length of either name, email, etc. A possible fix to this problem would be to have the table comp be of a fixed size so that it does not change, either the table is fixed or the `th` tag for the table comp is fixed. 
    **/
    // _test_ENV( formValidated ) // test unit for dev purposes 
}); 

