/*----------------------------------------------------------------------------------------------------------------*\
Wireframe is a simple tool that aims to make creating wireframes quicker by using the Respond framework.
By doing this, when a wireframe is done, most of the basic mark up of hte page will be done already, saving time.

AUTHOR
Martin Blackburn - www.martinblackburn.co.uk

GITHUB
https://github.com/MartinBlackburn/wireframe
\*----------------------------------------------------------------------------------------------------------------*/

Wireframe = function() 
{   
    //add a new row at the end
    function addRow() {
        
    }
    
    //remove a row, and anything within it
    function removeRow() {
        
    }
    
    //add column, based on size given
    function addColumn(size) {
        
    }
    
    //center all columns in a row
    function centerColumns() {
        
    }
    
    //remove a column, and anything within it
    function removeColumn() {
        
    }
    
    //add heading to column, based on size (1-6)
    function addHeading(size) {
        
    }
    
    //add text to column
    function addText() {
        
    }
    
    //add list to column
    function addList() {
        
    }
    
    //add image (portrait or landscape) to column
    function addImage(type) {
        
    }
    
    //add button to column
    function addButton() {
        
    }
    
    //add nav to column
    function addNav() {
        
    }
    
    //change background of current item (row or column)
    function changeBackground(element) {
        $(element).toggleClass("altBG");
    }
    
    //save to url
    function save() {
        
    }
    
    //load from url
    function load() {
        
    }
};

$(function() 
{
    new Wireframe();
});