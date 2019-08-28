// ==UserScript==
// @name         chan 爬虫
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  去除广告放大视图
// @author       无始无名
// @require      http://apps.bdimg.com/libs/jquery/2.1.1/jquery.min.js
// @match        https://chan.sankakucomplex.com/*
// @grant        none
// @run-at       document-end
// @updateURL    https://github.com/ohshitnima/-js/blob/master/chan_sankakucomplex.js
// ==/UserScript==

(function() {
    'use strict';
    var wswm$=jQuery.noConflict();
    //console.log(wswm$('span.thumb a:first')[0]);
    //监听dom
    function mutationEvent() {
        MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
        var obs = new MutationObserver(function(mutations, observer) {
            for (var i = 0; i < mutations.length; ++i) {
                for (var j = 0; j < mutations[i].addedNodes.length; ++j) {
                    if (mutations[i].addedNodes[j].getAttribute('class') === "content-page") {
                        var ad111 =wswm$('.content-page div')[0];
                        ad111.parentNode.removeChild(ad111);
                        wswm$(mutations[i].addedNodes[j]).find("span").each(function(){Addcopyimg(wswm$(this).children("a").attr("href"),wswm$(this).attr("id"));
                                                                                       wswm$(this).css({"width": "330px","height": "320px"});
                                                                                       var tmp = wswm$(this).children("a").children("img");
                                                                                       tmp.css("width",tmp.width()*2);
                                                                                       tmp.css("height",tmp.height()*2);
                                                                                      });
                        removeads();
                    }
                }
            }
        });

        obs.observe((document.querySelector('#post-list > div.content')), {
            childList: true
        });

    }
    function selectimg(element) {
        var doc = document;
        var range;
        if (doc.body.createTextRange) {
            range = document.body.createTextRange();
            range.moveToElementText(element);
            range.select();
        } else if (window.getSelection) {
            var selection = window.getSelection();
            range = document.createRange();
            range.selectNodeContents(element);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
    function copyimg(id){
        alert(1);
    }
    function Addcopyimg(url,id){
        console.log(id);
        var toop = document.getElementById(id);
        var p = document.createElement('p');
        var ul = document.createElement('ul');
        var copy1 = document.createElement('img');
        copy1.onclick=function(){copyimg(id)};
        copy1.setAttribute('src',"data:image/png;base64,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");
        copy1.setAttribute('style','color: #0069b1; background-color:#cceeff; border-radius: 5px; width:20px; height:auto; padding: 0 6px;');
        p.setAttribute('style','margin: 5px 0');
        p.appendChild(copy1);
        if(!toop.getElementsByTagName('p')[0]){
            toop.appendChild(p);
            console.log(toop);
            //toop.setAttribute('style','height:auto; position: absolute;bottom: 0;');
        }
    }
    function firstStart(){
        var toop = document.getElementsByClassName('content')[0].getElementsByClassName('thumb');
        for(var i = 0 ; i < toop.length ; i++){
            var idUrl = "/post/show/" + toop[i].getAttribute('id').split('p')[1];
            Addcopyimg(idUrl, toop[i].getAttribute('id'));
        }
    }

    //移除广告 屏幕闪烁
    function removeads(){
        var test = wswm$(document).height()-wswm$(window).scrollTop();
        if(true||test<900){
            var ads =wswm$('iframe');
            for(var i=0; i<ads.length;i++){
                var a=wswm$(ads)[i];
                a.parentNode.removeChild(a);
            }}
    }

    firstStart();
    mutationEvent();
    removeads();
    wswm$("span.thumb").css({"width": "330px","height": "320px"});
    wswm$("span.thumb a img").each(function(){
        wswm$(this).css("width",wswm$(this).width()*2);
        wswm$(this).css("height",wswm$(this).height()*2);
    });
    // Your code here...
})();
