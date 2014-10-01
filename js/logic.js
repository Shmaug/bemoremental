$(document).ready(function() {
    var isMobile = (screen.width > screen.height && screen.width <= 780) || (screen.height > screen.width && screen.height <= 780);
    console.log("Mobile: " + isMobile);
    
    $('#btnHome').click(function()
    {
        if (!($('#btnHome').hasClass("active")))
        {
            if (isMobile)
                $('#divHome').show();
            else
                $('#divHome').fadeIn(600);
            $('#divDesigns').hide();
            $('#divContact').hide();

            $('#btnHome').addClass("active");
            $('#btnDesigns').removeClass("active");
            $('#btnContact').removeClass("active");
        }
    });
    
    $('#btnDesigns').click(function()
    {
        if (!($('#btnDesigns').hasClass("active")))
        {
            $('#divHome').hide();
            if (isMobile)
                $('#divDesigns').show();
            else
                $('#divDesigns').fadeIn(600);
            $('#divContact').hide();
            
            $('#btnHome').removeClass("active");
            $('#btnDesigns').addClass("active");
            $('#btnContact').removeClass("active");
        }
    });
    
    $('#btnContact').click(function()
    {
        if (!($('#btnContact').hasClass("active")))
        {
            $('#divHome').hide();
            $('#divDesigns').hide();
            if (isMobile)
                $('#divContact').show();
            else
                $('#divContact').fadeIn(600);

            $('#btnHome').removeClass("active");
            $('#btnDesigns').removeClass("active");
            $('#btnContact').addClass("active");
        }
    });
});
