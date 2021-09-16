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
    // _test_ENV( formValidated ) // test unit for dev purposes 
}); 

