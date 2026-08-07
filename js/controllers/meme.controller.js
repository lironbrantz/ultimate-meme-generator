'use strict'

var gElCanvas
var gCtx

function renderMeme() {
    const img = new Image()
    const meme = getMeme()
    const imgs = getImgs()
    const selectdImg = imgs.find(img => img.id === meme.selectedImgId)

    img.onload = function () {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

        meme.lines.forEach(line => {
            gCtx.font = `${line.size}px Arial`
            gCtx.textAlign = 'center'
            gCtx.fillStyle = line.color
            gCtx.strokeStyle = 'black'
            gCtx.lineWidth = 2

            gCtx.strokeText(line.txt, line.x, line.y)
            gCtx.fillText(line.txt, line.x, line.y)
        })
    }

    img.src = selectdImg.url
}
    function onDownloadMeme() {
        const imgDataUrl = gElCanvas.toDataURL('image/jpeg')

        const downloadLink = document.createElement('a')
        downloadLink.href = imgDataUrl
        downloadLink.download = 'meme.jpg'
        downloadLink.click()
    }


    function onSetLineTxt(txt) {
        setLineTxt(txt)
        renderMeme()
    }

    function onSetLineColor(color) {
        setLineColor(color)
        renderMeme()
    }

    function onIncreaseFontSize() {
        increaseFontSize()
        renderMeme()
    }

    function onDecreaseFontSize() {
        decreaseFontSize()
        renderMeme()
    }


function onAddLine() {
    addLine()
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    renderMeme()
}