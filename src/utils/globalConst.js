export const webUrl = 'http://127.0.0.1:5000/attr'
export const tableTag = $('<table id="tableContent"/>');
export const formLabels = ['Name', 'Age', 'Email', 'Feedback', 'Gender']
export let dataIDFromDB = null // the ID stored in db to each obj entry in db 

export const seedDB = [ // seeds the db with some dummy data  
    {
        'Age': '27', 
        'Email': "jeff@gmail.com",
        'Feedback': "demo test",
        'Gender': '0',
        'Name': "jeff"
    }, 
    {
        'Age': '25', 
        'Email': "jessie@gmail.com",
        'Feedback': "demo test again",
        'Gender': '1',
        'Name': "jessie"
    }, 
    {
        'Age': '29', 
        'Email': "mark@gmail.com",
        'Feedback': "mark's demo",
        'Gender': '0',
        'Name': "mark"
    }, 
    {
        'Age': '22', 
        'Email': "amy@gmail.com",
        'Feedback': "a-demo-trick",
        'Gender': '1',
        'Name': "amy"
    }
]