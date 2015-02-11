'use strict';
jQuery(document).ready(function ($) {
    function constructMainSections() {
        var mainContainer = $('#styleguide-container'),
            generatedJsonFile = "/styleguide/scripts/snippets.txt",
            snippet,
            subItems = [],
            subName,
            snippetDescription,
            snippetCode,
            categoryIndex,
            generatedRow,
            categoryCache,
            items,
            href,
            descriptionType,
            linkName,
            activeCategoryTitle,
            snippetTitle,
            titleCode = '';

        // Adding snippets
        $('snippet').each(function () {
            snippet = $(this);
            titleCode = '';
            snippetTitle = $(this).find('title').text();
            if (snippetTitle != '') {
                titleCode = '<h2 class="sg-snippet-title js-code-toggle" id="' + snippetTitle.replace(/ /g, '') + '">' + snippetTitle + '<a><span></span></a></h2>';
            }
            var descriptionContainer = snippet.find('description');
            snippetDescription = descriptionContainer.html();
            descriptionType = descriptionContainer.attr('type');
            snippetCode = snippet.html();

            generatedRow = $('<div class="snippet-container sg-clearfix">' + titleCode + '<div class="sg-snippet-code"><pre><code contenteditable="true"></code></pre></div><div class="sg-snippet-description"></div><div class="sg-snippet-view">' + snippetCode + '</div></div>');
            generatedRow.appendTo(mainContainer);

            var snippetView = generatedRow.find('.sg-snippet-view');
            snippetView
                .find('description, title')
                .remove();

            var codeHtml,
                holder = snippetView.find("holder");
            if (holder.length > 0) {
                codeHtml = holder.html();
            }
            else {
                codeHtml = snippetView.html();
            }
            codeHtml = codeHtml.replace(/^\s*\n/g, "").replace(/\t/g, "    "); // remove empty lines from the beginning and convert tabs to spaces
            var spacesCount = 0; // count first indent spaces
            for (var i = 0; ; i++) {
                if (codeHtml[i] == " ") {
                    spacesCount++;
                }
                else {
                    break;
                }
            }
            var indentSpacesRegex = new RegExp("\n {" + spacesCount + "}", "g"); // regular expression with variable to remove specific amount of spaces from every line but first
            generatedRow
                .find('code')
                .html(codeHtml
                    .replace(indentSpacesRegex, "\n")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .trim());

            if (snippetDescription) {
                generatedRow
                    .find('.sg-snippet-description')
                    .html(snippetDescription);
            }
            else {
                generatedRow
                    .find('.sg-snippet-description')
                    .hide();
            }

            var tempHtml = generatedRow.html();
            tempHtml = tempHtml
                .replace(/<holder/g, '<div')
                .replace(/<\/holder>/g, '</div>');
            generatedRow.html(tempHtml);

            // add custom classes for description message
            if (typeof(descriptionType) != "undefined") {
                generatedRow
                    .find('.sg-snippet-description')
                    .addClass('sg-' + descriptionType + '');
            }
            snippet.remove();
        });

        // add styling for code blocks
        $('pre code').each(function (i, e) {
            hljs.highlightBlock(e);
        });

        // get pagination
        $.when($.getJSON(generatedJsonFile, function (data) {
            items = [];
            $.each(data, function (i, item) {
                linkName = item.filename.replace("-", " ").substr(0, item.filename.lastIndexOf('.'));
                if (linkName.slice(1) != "undefined") {
                    items.push("<li id='" + i + "'><a href='/" + item.location + "'>" + linkName.charAt(0).toUpperCase() + linkName.slice(1) + "</a></li>");
                }
            });

            $(items.join("")).appendTo(".sg-sidebar-list");
        })).then(function () {
            // selecting active link + adding category numbering
            $.when($('.sg-sidebar-list').find('li').each(function () {
                href = $(this).find('a').attr('href');
                if (href === window.location.pathname || href === '..' + window.location.pathname) {
                    $(this).addClass('active');
                    activeCategoryTitle = $(this).text();
                    categoryIndex = $(this).index() + 1;
                    categoryCache = $('.sg-category-container').children('h2');
                    categoryCache.html('<span>' + categoryIndex + '.</span>' + categoryCache.text());
                }
            })).then(function () {

                $.when($('.sg-snippet-title').each(function (i) {
                    subName = $(this).attr('id');
                    subItems.push("<li id='" + i + "'><a href='#" + subName + "'>" + $('.sg-snippet-title').eq(i).text() + "</a></li>");
                })).then(function () {
                    $('<ul />').appendTo(".sg-sidebar .active");
                    $(subItems.join("")).appendTo('.sg-sidebar .active ul');
                });
                $('.sg-sidebar').find('.active ul').find('a').on('click', function (e) {
                    e.preventDefault();
                    scrollToElement($(this));
                });
                counters();
                stickyFix();
                if (activeCategoryTitle && $('.sg-page-title').length === 0) {
                    $('	<h1 class="sg-page-title"><span>' + categoryIndex + '.0</span>' + activeCategoryTitle + '</h1>').prependTo('#styleguide-container');
                }
            });
        });
    }

    function scrollToElement(element) {
        $('html, body').stop(true, true).animate({
            scrollTop: $(element.attr('href')).offset().top
        }, 600);
    }

    // This function does code toggle on snippet title click
    function codeToggle() {
        $('.js-code-toggle').children('a').on('click', function (e) {
            e.preventDefault();
            var elem = $(this).parents('.snippet-container').find('.sg-snippet-code');
            if (elem.length > 0) {
                if (elem.hasClass('active')) {
                    elem
                        .removeClass('active')
                        .children('pre')
                        .height(0);
                    $(this).children('span').removeClass('active');
                } else {
                    elem
                        .addClass('active')
                        .children('pre')
                        .height(elem.children('pre').children('code').outerHeight());
                    $(this).children('span').addClass('active');
                }
            }
        });
    }

    // Defines color palette container font color by background color to make visible and readable
    var pageColorGenerator = (function () {
        var checkHex = function (hexCode) {
            return hexCode.match(/(^#[a-f0-9]{6}$)|(^#[a-f0-9]{3}$)/i) !== null;
        };
        var palette = $('palette'),
            colorsWrapper = palette.find('colors'),
            innersWrapper = palette.find('vars');
        var getData = function () {
            if (palette.length > 0) {
                var clrStructure = [],
                    colors = colorsWrapper.text().split(/;/),
                    inners = innersWrapper.text().split(/;/);

                colors.forEach(function (line) {
                    if (line && line.match(/:{1}/)) {
                        line = line.split(/:/);
                    }
                    var tempName = line[0].replace(/\s/g, ''),
                        tempHex = line[1].replace(/\s/g, '');

                    if (checkHex(tempHex)) {
                        clrStructure[tempName] = {'hex': tempHex, 'name': tempName, 'inner': []};
                    } else {
                        console.log("WARNING: Color hex code is invalid or missing!");
                    }
                });

                inners.forEach(function (line) {
                    if (line && line.match(/:{1}/)) {
                        line = line.split(/:/);
                        var tempName = line[0].replace(/\s/g, ''),
                            tempColor = line[1].replace(/\s/g, '');

                        if (typeof clrStructure[tempColor] != "undefined") {
                            clrStructure[tempColor].inner.push(tempName);
                        } else {
                            console.log('WARNING: Color "' + tempColor + '" declaration is missing!');
                        }
                    }
                });

                return clrStructure;
            } else {
                return false;
            }
        };
        var buildColorTable = function (data) {
            var namingList;

            colorsWrapper.empty().remove();
            innersWrapper.empty().remove();

            for (var tempName in data) {
                if (data.hasOwnProperty(tempName)) {
                    namingList = '';
                    for (var tempInner in data[tempName].inner) {
                        if (data[tempName].inner.hasOwnProperty(tempInner)) {
                            namingList = namingList + '<li contenteditable="true">' + data[tempName].inner[tempInner] + '</li>';
                        }
                    }
                    if (namingList) {
                        palette.append('<div class="sg-color-block"><div class="sg-color-palette js-color-cnt" style="background-color:' + data[tempName].hex + '" contenteditable="true"><div class="sg-palette-inner">' + data[tempName].hex + '<br/>' + data[tempName].name + '</div></div><ul class="sg-color-variables">' + namingList + '</ul></div>');
                    } else {
                        palette.append('<div class="sg-color-block sg-color-block-small"><div class="sg-color-palette js-color-cnt" style="background-color:' + data[tempName].hex + '" contenteditable="true"><div class="sg-palette-inner">' + data[tempName].hex + '<br/>' + data[tempName].name + '</div></div></div>');
                    }
                }
            }
        };
        var contrast = function () {
            var color,
                bgBrightness = 720,   // Color code sum value(max value: 765, default: 720). Higher value, brighter colors will have shadow
                textBrightness = 600; // Color code sum value(max value: 765, default: 500). Higher value, brighter colors will have white text
            $('.js-color-cnt').each(function () {
                color = $(this).css('background-color').replace(')', '').replace('rgb(', '').replace(/ /g, '').split(',');
                if (parseInt(color[0]) + parseInt(color[1]) + parseInt(color[2]) < textBrightness) {
                    $(this).addClass('dark');
                }
                if (parseInt(color[0]) + parseInt(color[1]) + parseInt(color[2]) > bgBrightness) {
                    $(this).addClass('white');
                }
            });
        };
        return {
            init: function () {
                var data = getData();
                if (data) {
                    buildColorTable(data);
                    contrast();
                }
            }
        };
    })();

    var pageFontGenerator = (function () {
        var generate = function () {
            var fonts = $('fonts'),
                fontsWrapper = fonts.parent(),
                fontsSplit = fonts.text().split(/\s*\n/);

            fontsSplit.forEach(function (line) {
                if (line && line.match(/:{1}/)) {
                    var lineStylesSplit = line.split(";"),
                        lineFontSplit = lineStylesSplit[0].split(/:/),
                        fontValue = lineFontSplit[1].trim();

                    var innerDivString = "a b c d e f g h i j k l m n o p q r s t u v w x y z<br/> A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</br> 1 2 3 4 5 6 7 8 9 0 ",
                        outerDivString = (line.trim() + ";").replace(";;", ";");
                    if (fontValue == "") {
                        innerDivString = "Font Value Not Found";
                    }
                    var $outerDiv = $("<div class='sg-font-wrapper'>" + outerDivString + "</div>"),
                        $innerDiv = $("<div class='sg-font-example' contenteditable='true'>" + innerDivString + "</div>");

                    var stylesString = "";
                    if (lineStylesSplit.length > 1) {
                        lineStylesSplit.shift();
                        stylesString = lineStylesSplit.join(";");
                    }

                    $innerDiv
                        .css({
                            "font-family": fontValue
                        })
                        .attr("style", $innerDiv.attr("style") + stylesString)
                        .appendTo($outerDiv);
                    fontsWrapper.append($outerDiv);
                }
            });

            fonts.empty().remove();
        };
        return {
            init: function () {
                generate();
            }
        };
    })();

    function counters() {
        var counterIt,
            paragraph;
        $('.sg-sidebar-list').children('li').each(function () {
            $(this).attr('data-counter', ($(this).index() + 1) + '.0');
            counterIt = $(this).index() + 1;
            $(this).find('li').each(function () {
                $(this).attr('data-counter', counterIt + '.' + ($(this).index() + 1));
                paragraph = $($(this).children('a').attr('href'));
                if (paragraph.length > 0) {
                    paragraph.prepend(counterIt + '.' + ($(this).index() + 1) + ' ');
                }
            });
        });
    }

    function stickyFix() {
        var sticker = $('.js-sg-sticky-sidebar'),
            contentArea = $('.sg-content'),
            lastItem,
            winHeight;
        if (sticker.length > 0) {
            var contentHeight = 0,
                stickerHeight = function () {
                    sticker.children().each(function () {
                        contentHeight = contentHeight + $(this).outerHeight();
                    });

                    contentHeight = contentHeight + sticker.outerHeight() - sticker.height();
                },
                stickerCheck = function () {
                    winHeight = $(window).height();
                    if (winHeight > contentHeight && $(document).height() > winHeight) {
                        sticker.addClass('sg-fixed');
                    }
                    else {
                        sticker.removeClass('sg-fixed');
                    }
                    lastItem = $('.snippet-container').last();
                    contentArea.css({paddingBottom: winHeight - (lastItem.outerHeight(true) + 50)});
                };

            stickerHeight();
            stickerCheck();
            $(window).on('resize.sticker', function () {
                stickerCheck();
            });
        }
    }

    function validateForms() {
        var form = $('form');
        if (form.length > 0) {
            console.log('validating forms');
            form.each(function () {
                $(this).validate({
                    errorElement: 'span',
                    errorClass: 'validation-error',
                    errorPlacement: function (error, element) {
                        $('<span class="field-validation-error"></span>').append(error).insertAfter(element);
                    },
                    success: function (label) {
                        label.parent().remove();
                    }
                });
            });
        }
    }

    // init
    constructMainSections();
    pageColorGenerator.init();
    pageFontGenerator.init();
    codeToggle();
    validateForms();
});