//   This program is free software: you can redistribute it and/or modify
//   it under the terms of the GNU General Public License as published by
//   the Free Software Foundation, either version 3 of the License, or
//   (at your option) any later version.
//   This program is distributed in the hope that it will be useful,
//   but WITHOUT ANY WARRANTY; without even the implied warranty of
//   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//   GNU General Public License for more details.
//   You should have received a copy of the GNU General Public License
//   along with this program.  If not, see <http://www.gnu.org/licenses/>
//   
//   
// @author : pascal.fautrero@ac-versailles.fr


/*
 * 
 * @constructor init specific hooks
 */
function hooks() {
    "use strict";
}
/*
 * @param array layers
 * @param iaScene mainScene
 */
hooks.prototype.beforeMainConstructor = function(mainScene, layers) {

    // Load datas - only useful for themes debugging
    if ($("#content").html() === "{{CONTENT}}") {
        var menu = "";
        menu += '<article class="detail_content" id="general">';
        menu += '<img class="article_close" src="img/close.png" alt="close"/>';
        menu += '<h1>'+scene.intro_title+'</h1>';
        menu += '<p>' + scene.intro_detail + '</p>';
        menu += '</article>';

        for (var i in details) {
            if (details[i].options.indexOf("direct-link") == -1) {
                if ((details[i].detail.indexOf("Réponse:") != -1) || (details[i].detail.indexOf("réponse:") != -1)) {
                    var question = details[i].detail.substr(0,details[i].detail.indexOf("Réponse:"));
                    var answer = details[i].detail.substr(details[i].detail.indexOf("Réponse:")+8);
                    menu += '<article class="detail_content" id="article-'+i+'">';
                    menu += '<img class="article_close" src="img/close.png" alt="close"/>';
                    if (details[i].title !== "") {
                        menu += '<h1>'+details[i].title+'</h1>';
                    }
                    menu += '<p>' + question + '<div style="margin-top:5px;margin-bottom:5px;"><a class="button" href="#response_'+i+'">Réponse</a></div>' + '<div class="response" id="response_'+ i +'">' + answer + '</div>' + '</p>';
                    menu += '</article>';            
                }

                else {
                    menu += '<article class="detail_content" id="article-'+i+'">';
                    menu += '<img class="article_close" src="img/close.png" alt="close"/>';
                    if (details[i].title !== "") {
                        menu += '<h1>'+details[i].title+'</h1>';
                    }
                    menu += '<p>'+details[i].detail+'</p>';
                    menu += '</article>';                        
                }
            }
        }
        $("#content").html(menu);
    }
    if ($("#title").html() === "{{TITLE}}") $("#title").html(scene.title);

};

/*
 * @param iaScene mainScene
 * @param array layers
 */
hooks.prototype.afterMainConstructor = function(mainScene, layers) {

    // some stuff to manage popin windows

    var viewportHeight = $(window).height();

    $(".meta-doc").on("click", function(){
        $("#content").show();
        $(".detail_content").hide();
        $("#general").show();
        //var general_border = $("#general").css("border-top-width").substr(0,$("#general").css("border-top-width").length - 2);
        //var general_offset = $("#general").offset();
        //var content_offset = $("#content").offset();
        //$("#general").css({'max-height':(viewportHeight - general_offset.top - content_offset.top - 2 * general_border)});
    });

    $(".overlay").hide();

    $(".infos").on("click", function(){
        $("#rights").show();
    });
    $("#popup_close").on("click", function(){
        $("#rights").hide();
    });

    $(".article_close").on("click", function(){
        $(".detail_content").hide();
        $("#content").hide();
    });


};
/*
 *
 *  
 */
hooks.prototype.afterIaObjectConstructor = function(iaScene, idText, detail, iaObject) {

};
/*
 *
 *  
 */
hooks.prototype.afterIaObjectZoom = function(iaScene, idText, iaObject) {

};
    
/*
 *
 *  
 */
hooks.prototype.afterIaObjectFocus = function(iaScene, idText, iaObject) {
    $("#content").show();
    $(".detail_content").hide();
    $('#' + idText).show();
    $('#' + idText + " audio").each(function(){
        if ($(this).data("state") === "autostart") {
            $(this)[0].play();
        }
    });
};