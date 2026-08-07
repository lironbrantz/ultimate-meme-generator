'use strict'

var gElCanvas
var gCtx

function renderMeme() {
    const img = new Image();
    img.onload = function () {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        gCtx.font = '40px Arial'
        gCtx.textAlign = 'center'
        gCtx.fillStyle = 'white'
        gCtx.strokeStyle = 'black'
        gCtx.lineWidth = 2

        const x = gElCanvas.width / 2
        const y = 60

        gCtx.strokeText('Test', x, y)
        gCtx.fillText('Test', x, y)
    }
    img.src = 'img/1.jpg'
}