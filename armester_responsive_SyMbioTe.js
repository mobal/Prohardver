// ==UserScript==
// @name         Ármester Responsive 2019
// @version      2.0
// @description  Ármester Responsive 2019
// @author       jim bcs
// @include      *prohardver.hu/tema*
// @include      *mobilarena.hu/tema*
// @include      *gamepod.hu/tema*
// @include      *logout.hu/tema*
// @include      *itcafe.hu/tema*
// @include      *fototrend.hu/tema*
// @include      /^http(s)?://(itcafe|prohardver|mobilarena|fototrend)\.hu/(tema|privat)/
// @updateURL    https://raw.githubusercontent.com/jimbcs/Prohardver/master/armester_responsive.js
// @grant        none
// @require      https://raw.githubusercontent.com/jimbcs/Prohardver/master/armester_responsive_update.js

// ==/UserScript==
(function() {
    'use strict';

    var tgDiv = ph_is_site_responsive(window.location.hostname) ? "thread-users-list" : "thrusers";

    var thrUsers = document.getElementById("right").getElementsByClassName(tgDiv)[0];
    if (thrUsers) {
        var thrList = thrUsers.getElementsByTagName("ul")[0];
        var num = thrList.children.length - 1;

        while (thrList.firstChild) {
            thrList.removeChild(thrList.firstChild);
        }
    }

    function createMarker() {
        var domelement = document.createElement('div');
        domelement.setAttribute('id', 'jimbcsmarker');
        return domelement;
    }

    function createFormattingButton(title, content) {
        var button = document.createElement('input');
        button.setAttribute('type', 'button');
        button.setAttribute('value', title);
        button.onclick = function() {
            tinyMCE.activeEditor.selection.setContent(content);
            var tnode = tinyMCE.activeEditor.dom.select("b._cursor")[0];
            tinyMCE.activeEditor.selection.select(tnode);
            tinyMCE.activeEditor.selection.collapse(true);
            tinyMCE.activeEditor.dom.removeAllAttribs(tnode);
        };
        return button;
    }

    function createFormattingButtonWithQuery(title, format, query, placeholder) {
        var button = document.createElement('input');
        button.setAttribute('type', 'button');
        button.setAttribute('value', title);
        button.onclick = function() {
            var url = prompt(query, placeholder);

            if (!url) {
                return;
            }

            var re = /(\d+)-(\d+)/g
            var linkTitle = '[link]'
            var match = url.match(re)
            if (match) {
                linkTitle = '[#' + match + ']'
            }
            tinyMCE.activeEditor.execCommand('mceInsertContent', !1, format.replace('%URL%', url).replace('%TITLE%', linkTitle));
        };

        return button;
    }

    setInterval(() => {
        var panel = document.querySelector('div.rtif-formats-tmce');
        if (panel) {
            var jimbcsmarker = document.querySelector('div#jimbcsmarker');
            if (!jimbcsmarker)
            {
                panel.appendChild(createMarker());
                panel.appendChild(createFormattingButton('Pontosítás!', '<a href="http://#" target="_blank" rel="noopener"><b>Pontos típus, model? Privátba kérem!</b></a>'));
                panel.appendChild(createFormattingButton('Árazhatatlan!', '<p><a href="http://#" target="_blank" rel="noopener"><b>Árazhatatlan! Összefoglaló szerint! Ne írj új hsz.-t, a pontos adatokat privátba kérem a módosításhoz!</b></a></p>'));
                panel.appendChild(createFormattingButton('Összefoglaló!', '<p><a href="http://#" target="_blank" rel="noopener"><b>Légy oly kedves és az összefoglalót olvasd el, benne van amit nem szeretnénk látni a felvezetéskor és az is ahogyan szeretnénk!</b></a></p>'));
                panel.appendChild(createFormattingButtonWithQuery('Beárazás vége',
                                                                  '<p class="tac"><b><i>Az alábbi linken található beárazások elkészültek:</i></b></p>'+
                                                                  '<p class="tac"><b><i><code><tt><a href="%URL%" target="_blank" rel="noopener">%TITLE%</a></tt></code></i></b></p>'+
                                                                  '<p class="tac"><small>Az árak a hozzászólásaitokba vannak szerkesztve.</small></p>'+
                                                                  '<p></p>'+
                                                                  '<p class="tac"><img src="https://hardverapro.hu/dl/upc/2020-08/162803_symbiote_2.png" alt="" /></p>', 'Add meg a hosszászólás linkjét (URL)'));
                panel.appendChild(createFormattingButton('Beárazva 2018', '<p class="tac"><img src="https://hardverapro.hu/dl/upc/2020-08/162803_symbiote_2.png" /></p>'));
                panel.appendChild(createFormattingButton('~Ár', '<a href="http://#" target="_blank" rel="noopener"><b>~<b class="_cursor">k</b></a>'));
            }
        }
    }, 1000);
})();
