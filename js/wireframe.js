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
    
    /*----------------------------------------------------------------------------------------------------------------*\
        CONTEXT MENU
    \*----------------------------------------------------------------------------------------------------------------*/
    $(document).on("contextmenu", function(event) {
        event.preventDefault();
        
        //select hovered element
        selectElement($(".hover"));
        
        //position context menu
        var xPos = event.pageX;
        var yPos = event.pageY;        
        controls.css({"top": yPos + "px", "left": xPos + "px"}).show();
        
        //if row selected
        if(whatSelected() == "row") {            
            addRowButton.hide();
            removeSelectedButton.show();
            changeBGButton.show();
            addColumnButton.show();
        }
        
        //if column selected
        if(whatSelected() == "column") {            
            addRowButton.hide();
            removeSelectedButton.show();
            changeBGButton.show();
            addColumnButton.hide();
        }
        
        //if nothing selected
        if(whatSelected() == null) {            
            addRowButton.show();
            removeSelectedButton.hide();
            changeBGButton.hide();
            addColumnButton.hide();
        }
    });
    
    //hide menu on click
    $(document).on("click", function (event) {            
        controls.hide();
    });  
    
    
    
    
    
    /*----------------------------------------------------------------------------------------------------------------*\
        BUTTON HANDLERS
    \*----------------------------------------------------------------------------------------------------------------*/
    //change background color of selected
    changeBGButton.on("click", function(event) {
        event.preventDefault();
        
        $(".selected").toggleClass("altBG");
    });
    
    //add a new row
    addRowButton.on("click", function(event) {
        event.preventDefault();
        
        addElement("row");
    });
    
    //remove selected item
    removeSelectedButton.on("click", function(event) {
        event.preventDefault();
        
        $(".selected").remove();        
        bindControls();
    });
    
    //add column, based on size given (1 - 12)
    addColumnButton.on("click", function(event) {
        event.preventDefault();
        
        var size = prompt("Please enter column size (from 1 - 12)", "12");
        
        if(size <= 12 && size >= 1)
        {
            addElement("column", size);
        }
    });
    
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
    
    
    
    
    
    /*----------------------------------------------------------------------------------------------------------------*\
        ADD ELEMENT
    \*----------------------------------------------------------------------------------------------------------------*/
    function addElement(element, size)
    {
        switch (element)
        {
            case "row":
                //add row to the bottom
                $.get("elements/row.html", function(data) {
                    body.append(data);
                    bindControls();
                    selectElement($(".row").last());
                });
                break;
            case "column":
                //add column to selected row
                $.get("elements/column-" + size + ".html", function(data) {
                    $(".row.selected .content").append(data);
                    bindControls();
                });
                break;
        }
    }
    
    
    
    
    
    /*----------------------------------------------------------------------------------------------------------------*\
        SELECT & UNSELECT ELEMENTS
    \*----------------------------------------------------------------------------------------------------------------*/
    //select an element
    function selectElement(element)
    {
        unselectElements();        
        $(element).addClass("selected");        
        controls.hide();
    }
    
    //unselect all elements
    function unselectElements()
    {
        $(".selected").removeClass("selected");        
        controls.hide();
    }
    
    //return what is selected (row or column)
    function whatSelected()
    {
        //if row selected
        if($(".row").hasClass("selected")) {
            return "row";
        }
        
        //if column selected
        if($("[class*='column-']").hasClass("selected")) {
            return "column";
        }
        
        return null;
    }
    
    
    
    
    
    /*----------------------------------------------------------------------------------------------------------------*\
        SAVE & LOAD URL
    \*----------------------------------------------------------------------------------------------------------------*/
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