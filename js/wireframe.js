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
    var controls = $(".mainControls").hide();
    var addRowButton = $(".addRowButton");
    var removeSelectedButton = $(".removeSelectedButton").hide();
    var changeBGButton = $(".changeBGButton").hide();
    var addColumnButton = $(".addColumnButton").hide();
    
    //context menu on right click
    //select what was right clicked, if anything
    //show menu
    $(document).on("contextmenu", function(event) {
        event.preventDefault();
        
        console.log("showing context menu");
        
        //select hovered element
        selectElement($(".hover"));
        
        //position context menu
        var xPos = event.pageX;
        var yPos = event.pageY;        
        controls.css({"top": yPos + "px", "left": xPos + "px"}).show();
        
        //if row selected
        if(whatSelected() == "row") {
            console.log("showing row controls");
            
            addRowButton.hide();
            removeSelectedButton.show();
            changeBGButton.show();
            addColumnButton.show();
        }
        
        //if column selected
        if(whatSelected() == "column") {
            console.log("showing column controls");
            
            addRowButton.hide();
            removeSelectedButton.show();
            changeBGButton.show();
            addColumnButton.hide();
        }
        
        //if nothing selected
        if(whatSelected() == null) {
            console.log("showing no controls");
            
            addRowButton.show();
            removeSelectedButton.hide();
            changeBGButton.hide();
            addColumnButton.hide();
        }
    });
    
    //hide menu on click
    $(document).click(function (event) {            
        controls.hide();
    });  
    
    //change background colour of select element
    changeBGButton.click(function(event) {
        event.preventDefault();
        
        $(".selected").toggleClass("altBG");
    });
    
    //add a new row at the end
    addRowButton.click(function(event) {
        event.preventDefault();
        
        addRow();
        
        bindControls();
    });
    
    function addRow()
    {
        console.log("adding row");
        
        //row and content elements
        var row = $("<div class='row'></div>");
        var content = $("<div class='content'></div>");
        
        //add content to the row
        row.prepend(content);
        
        //add row to the bottom
        body.append(row);
        
        //select the new row
        selectElement(row);
    }
    
    //remove selected item, and anything within it
    removeSelectedButton.click(function(event) {
        event.preventDefault();
        
        removeSelected();
        
        bindControls();
    });
    
    function removeSelected()
    {
        if(whatSelected() == "row") {
            console.log("removing selected row");
        }
        
        if(whatSelected() == "column") {
            console.log("removing selected column");
        }
        
        $(".selected").remove();
    }
    
    //add column, based on size given (1 - 12)
    addColumnButton.click(function(event) {
        event.preventDefault();
        
        var size = prompt("Please enter column size (from 1 - 12)", "12");
        
        if(size <= 12 && size >= 1)
        {
            addColumn(size);
        
            bindControls();
        }
    });
    
    function addColumn(size)
    {
        console.log("adding column");
        
        //column element
        var column = " <div class='column-" + size + "'></div>";
        
        //add column to selected row
        $(".row.selected .content").append(column);
    }
    
    //center all columns in a row
    function centerColumns()
    {
        
    }
    
    //add heading to column, based on size (1-6)
    function addHeading(size)
    {
        
    }
    
    //add text to column
    function addText()
    {
        
    }
    
    //add list to column
    function addList()
    {
        
    }
    
    //add image (portrait or landscape) to column
    function addImage(type)
    {
        
    }
    
    //add button to column
    function addButton()
    {
        
    }
    
    //add nav to column
    function addNav()
    {
        
    }
    
    //make all columns the same height within a row
    function equaliseColumns() {
        
    }
    
    //update all controls
    function bindControls()
    {
        //unbind all current controls
        $('.row, [class*="column-"]').off();
        
        //add all new controls
        $('.row, [class*="column-"]').on("click", function(event) {
            event.preventDefault()
            
            event.stopImmediatePropagation();
            
            if($(event.delegateTarget).hasClass("selected"))
            {
                unselectElements();
            } else {
                selectElement($(event.delegateTarget));
            }
        });
        
        //add hover effects
        $('.row, [class*="column-"]').on("mouseover", function(event) {
            event.stopImmediatePropagation();
            
            $(event.delegateTarget).addClass("hover");
        });
        
        //remove hover effect
        $('.row, [class*="column-"]').on("mouseout", function(event) {
            event.stopImmediatePropagation();
            
            $(event.delegateTarget).removeClass("hover");
        });
    }
    
    //select an element, hide controls
    function selectElement(element)
    {
        //unselect all elements
        unselectElements();
        
        //add selected class
        $(element).addClass("selected");
        
        controls.hide();
    }
    
    //unselect all elements, hide controls
    function unselectElements()
    {
        //unselect all elements
        $(".selected").removeClass("selected");
        
        controls.hide();
    }
    
    //return what is selected (row or column)
    function whatSelected()
    {
        //if row selected
        if($(".row").hasClass("selected")) {
            console.log("row selected");
            return "row";
        }
        
        //if column selected
        if($("[class*='column-']").hasClass("selected")) {
            console.log("column selected");
            return "column";
        }
        
        return null;
    }
    
    //save to url
    function save()
    {
        
    }
    
    //load from url
    function load()
    {
        
    }
};

$(function() 
{
    new Wireframe();
});