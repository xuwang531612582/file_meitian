$(function() { 
    var $this = $("#news"); 
    var scrollTimer; 
    $this.hover(function() { 
        clearInterval(scrollTimer); 
    }, function() { 
        scrollTimer = setInterval(function() { 
            scrollNews($this); 
        }, 2000); 
    }).trigger("mouseleave"); 
    
    function scrollNews(obj) { 
            var $self = obj.find("ul"); 
            var lineHeight = $self.find("li:first").height(); 
        $self.animate({ 
            "marginTop": -lineHeight + "px" 
        }, 600, function() { 
            $self.css({ 
                marginTop: 0 
            }).find("li:first").appendTo($self); 
        }) 
    } 
}) 