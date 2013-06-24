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
    
    //get URL to load, if any
    //EG | #?r:c12:n:r:c6:c6:r:c4:c4:c4:
    var url = window.location.hash.substring(2);
    
    if(url) {
        var loadingElements = url.split(":");
        var isLoading = true;
        
        //load from URL
        load();
    } else {
        var isLoading = false;
    }
    
    
    
    
    
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
                save();
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
    function addElement(element, appendTo)
    {
        //select where to append the element
        if(appendTo) {
            appendTo = appendTo;
        } else if(element == "row") {
            appendTo = body;
        } else if(element.indexOf("column-") !== -1) {
            appendTo = $(".row.selected .content");
        } else {
            appendTo = $(".selected");
        }
        
        //get the element and add it
        $.get("elements/" + element + ".html", function(data) {
            var newElement = $(data);
            
            appendTo.append(newElement);
            bindControls();
            
            if(element == "row") {
                selectElement($(".row").last());
            }
            
            if(isLoading)
            {
                load();
            } else {
                save();
            }
        });
    }
    
    
    
    
    
    /*----------------------------------------------------------------------------------------------------------------*\
        SELECT & UNSELECT ELEMENTS
    \*----------------------------------------------------------------------------------------------------------------*/
    //unselect all elements
    function unselectElements()
    {
        $(".selected").removeClass("selected");        
        controls.hide();
    }
    
    //select an element
    function selectElement(element)
    {
        unselectElements();        
        $(element).addClass("selected");
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
    //save to URL
    function save()
    {
        var url = "?";
        
        //add rows to URL
        var numRows = $('.row').length;
        
        $(".row").each(function(rowIndex)
        {
            var row = $(this);
            
            url += "r:";
            
            //add columns to URL
            var numColumns = row.find("[class*='column-']").length;
            row.find("[class*='column-']").each(function(colIndex)
            {
                var column = $(this);
                
                url += "c";
                
                if(column.hasClass("column-1"))
                {
                    url += "1";
                }
                if(column.hasClass("column-2"))
                {
                    url += "2";
                }
                if(column.hasClass("column-3"))
                {
                    url += "3";
                }
                if(column.hasClass("column-4"))
                {
                    url += "4";
                }
                if(column.hasClass("column-5"))
                {
                    url += "5";
                }
                if(column.hasClass("column-6"))
                {
                    url += "6";
                }
                if(column.hasClass("column-7"))
                {
                    url += "7";
                }
                if(column.hasClass("column-8"))
                {
                    url += "8";
                }
                if(column.hasClass("column-9"))
                {
                    url += "9";
                }
                if(column.hasClass("column-10"))
                {
                    url += "10";
                }
                if(column.hasClass("column-11"))
                {
                    url += "11";
                }
                if(column.hasClass("column-12"))
                {
                    url += "12";
                }
                
                url += ":";
                
                //add element to URL
                var numElements = column.children().length;
                column.children().each(function(elementIndex)
                {
                    var element = $(this);
                    
                    if(element.hasClass("nav"))
                    {
                        url += "n";
                    }
                    
                    url += ":";
                });
            });
        });
        
        window.location.hash = url;
    }
    
    //load from URL
    function load()
    {              
        //get next element, remove it from the array
        var element = loadingElements.shift();
        
        //set loading to false when no element left
        if(!element) {
            isLoading = false;
            unselectElements();
        }
        
        //load it
        switch (element)
        {
            case "r":
                addElement("row");
                break;
            case "c1":
                addElement("column-1");
                break;
            case "c2":
                addElement("column-2");
                break;
            case "c3":
                addElement("column-3");
                break;
            case "c4":
                addElement("column-4");
                break;    
            case "c5":
                addElement("column-5");
                break;
            case "c6":
                addElement("column-6");
                break;
            case "c7":
                addElement("column-7");
                break;
            case "c8":
                addElement("column-8");
                break;
            case "c9":
                addElement("column-9");
                break;
            case "c10":
                addElement("column-10");
                break;
            case "c11":
                addElement("column-11");
                break;
            case "c12":
                addElement("column-12");
                break;
            case "n":
                addElement("nav", $("[class*='column-']").last());
                break;
        }        
    }
};

$(function() 
{
    new Wireframe();
});