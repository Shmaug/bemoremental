$(document).ready(function() {
    $('#btnHome').click(function()
    {
        if (!($('#btnHome').hasClass("active")))
        {
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
            $('#divContact').fadeIn(600);

            $('#btnHome').removeClass("active");
            $('#btnDesigns').removeClass("active");
            $('#btnContact').addClass("active");
        }
    });
});
