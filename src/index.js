import {pageLayout} from './components/pageLayout'
import {form} from './components/form'
import {addEventBtns} from './components/btns'
import { pageTable } from './components/table'


$(() => {  // this is the same as $('document').ready(function() { ... })
    pageLayout();  
    form(); 
    addEventBtns();
    pageTable(); 
    // _test_ENV( formValidated ) // test unit for dev purposes 
}); 

