'use strict'

var gElCanvas
var gCtx

function renderMeme() {
    const img = new Image()
    const meme = getMeme()
    const imgs = getImgs()
    const selectedImg = imgs.find(img => img.id === meme.selectedImgId)

    img.onload = function () {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

        meme.lines.forEach((line, idx) => {
            gCtx.font = `${line.size}px Arial`
            gCtx.textAlign = 'center'
            gCtx.fillStyle = line.color
            gCtx.strokeStyle = 'black'
            gCtx.lineWidth = 2

            if (idx === meme.selectedLineIdx) {
                const textWidth = gCtx.measureText(line.txt).width

                gCtx.strokeStyle = 'white'

                gCtx.strokeRect(
                    line.x - textWidth / 2 - 5,
                    line.y - line.size,
                    textWidth + 10,
                    line.size + 10
                )
            }

            gCtx.strokeStyle = 'black'

            gCtx.strokeText(line.txt, line.x, line.y)
            gCtx.fillText(line.txt, line.x, line.y)
        })
    }

    img.src = selectedImg.url
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
    renderControls()
}

function onCanvasClick(ev) {
    const rect = gElCanvas.getBoundingClientRect()

    const scaleX = gElCanvas.width / rect.width
    const scaleY = gElCanvas.height / rect.height

    const x = ev.offsetX * scaleX
    const y = ev.offsetY * scaleY
    const meme = getMeme()

    meme.lines.forEach((line, idx) => {
        gCtx.font = `${line.size}px Arial`

        const textWidth = gCtx.measureText(line.txt).width

        const isInside =
            x >= line.x - textWidth / 2 &&
            x <= line.x + textWidth / 2 &&
            y >= line.y - line.size &&
            y <= line.y

        if (isInside) {
            setLine(idx)
            renderMeme()
            renderControls()
        }
    })
}

function renderControls() {
    const meme = getMeme()
    const line = meme.lines[meme.selectedLineIdx]

    document.querySelector('.line-input').value = line.txt
    document.querySelector('.line-color').value = line.color
}