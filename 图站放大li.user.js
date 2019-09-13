// ==UserScript==
// @name         图站放大li
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yande.re/post*
// @match        https://konachan.com/post*
// @grant        none
// @updateURL    https://ohshitnima.github.io/图站放大li.user.js

// ==/UserScript==

(function() {
    'use strict';
    var scale_wswm = 2;
    var wswm$=jQuery.noConflict();
    wswm$("div.inner").css({"width": "300px","height": "300px"});
    wswm$("ul#post-list-posts li").css("width","310px");
    wswm$("a.thumb img").each(function(){
        wswm$(this).css("width",wswm$(this).width()*2);
         wswm$(this).css("height",wswm$(this).height()*2);
                                        });
    wswm$("a").attr("target","_blank");
    // Your code here...
})();
