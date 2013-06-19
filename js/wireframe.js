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
    var body = $("body");
    var addRowButton = $(".addRowButton");
    var removeRowButton = $(".removeRowButton");
    
    //add a new row at the end
    addRowButton.click(function(event) {
        event.preventDefault()
        
        addRow();
        
        bindControls();
    });
    
    function addRow() {
        console.log("adding row");
        
        //row and content elements
        var row = $("<div class='row'></div>");
        var content = $("<div class='content'></div>");
        
        //add content to the row
        row.prepend(content);
        
        //add row to the bottom
        body.append(row);
        
        //selected the new row
        selectElement(row);
    }
    
    //remove a row, and anything within it
    removeRowButton.click(function(event) {
        event.preventDefault()
        
        removeRow();
        
        bindControls();
    });
    
    function removeRow() {
        $(".row.selected").remove();
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
    
    //make all columns the same height within a row
    function equaliseColumns() {
        
    }
    
    //update all controls
    function bindControls() {
        //unbind all current controls
        $('.row, .column-[class*="column-"]').unbind();
        
        //add all new controls
        $('.row, .column-[class*="column-"]').click(function(event) {
            event.preventDefault()
            
            selectElement($(this));
        });
    }
    
    //select an element, update main controls with new options
    function selectElement(element) {
        //unselect all elements
        $(".selected").removeClass("selected");
        
        //add selected class
        $(element).addClass("selected");
        
        updateMainControls();
    }
    
    //update main controls, with new controls, depending what is selected
    function updateMainControls() {
        //if row selected
        
        //if column selected
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