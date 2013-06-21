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
    var actions = $(".action");
    var rowActions = $(".rowRelated");
    var columnActions = $(".columnRelated");
    var defaultAction = $(".defaultAction");
    
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
            columnActions.hide();
            defaultAction.hide();
            rowActions.show();
        }
        
        //if column selected
        if(whatSelected() == "column") {  
            rowActions.hide();
            defaultAction.hide();
            columnActions.show();
        }
        
        //if nothing selected
        if(whatSelected() == null) {   
            columnActions.hide();
            rowActions.hide();
            defaultAction.show();
        }
    });
    
    //hide menu on click
    $(document).on("click", function (event) {            
        controls.hide();
    });  
    
    
    
    
    
    /*----------------------------------------------------------------------------------------------------------------*\
        BUTTON HANDLERS
    \*----------------------------------------------------------------------------------------------------------------*/
    actions.on("click", function(event) {
        var actionType = $(this).data("action");
                
        switch (actionType)
        {
            case "add":
                //add an element
                addElement($(this).data("element"));
                break;
            case "remove":
                //remove selected element
                $(".selected").remove();
                break;
            case "toggleBG":
                //change background color of selected
                $(".selected").toggleClass("altBG");
                break;
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
    function addElement(element)
    {
        //select where to append the element
        if(element == "row") {
            var addToEnd = body;
        } else if(element.indexOf("column-") !== -1) {
            var addToEnd = $(".row.selected .content");
        } else {
            var addToEnd = $(".selected");
        }
        
        //get the element and add it
        $.get("elements/" + element + ".html", function(data) {
            addToEnd.append(data);
            bindControls();
            
            if(element == "row") {
                $(".row").last().addClass("selected");
            }
        });
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