'use strict';

var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] }]
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Hello'
            ,
            size: 20,
            color: 'red'
        }
    ]
}

function getMeme() {
    return gMeme
}