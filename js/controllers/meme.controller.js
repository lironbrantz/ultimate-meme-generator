'use strict'

var gElCanvas
var gCtx
var gIsDragging = false
var gDidDrag = false
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function renderMeme() {
    const img = new Image()
    const meme = getMeme()
    const imgs = getImgs()
    const selectedImg = imgs.find(img => img.id === meme.selectedImgId)

    img.onload = function () {
        gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        meme.lines.forEach((line, idx) => {
            gCtx.font = `${line.size}px ${line.font}`
            gCtx.textAlign = line.align
            gCtx.fillStyle = line.color
            gCtx.strokeStyle = 'black'
            gCtx.lineWidth = 2

            if (idx === meme.selectedLineIdx) {
                const textWidth = gCtx.measureText(line.txt).width
                let boxX = line.x - textWidth / 2

                if (line.align === 'left') boxX = line.x
                if (line.align === 'right') boxX = line.x - textWidth

                gCtx.strokeStyle = 'white'

                gCtx.strokeRect(
                    boxX - 5,
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
    gDidDrag = false

    const pos = getEvPos(ev)

    const rect = gElCanvas.getBoundingClientRect()
    const scaleX = gElCanvas.width / rect.width
    const scaleY = gElCanvas.height / rect.height

    const x = pos.x * scaleX
    const y = pos.y * scaleY

    const meme = getMeme()

    gIsDragging = false

    meme.lines.find((line, idx) => {
        gCtx.font = `${line.size}px ${line.font}`

        const textWidth = gCtx.measureText(line.txt).width

        let boxX = line.x - textWidth / 2

        if (line.align === 'left') boxX = line.x
        if (line.align === 'right') boxX = line.x - textWidth

        const isInside =
            x >= boxX &&
            x <= boxX + textWidth &&
            y >= line.y - line.size &&
            y <= line.y

        if (isInside) {
            setLine(idx)
            gIsDragging = true

            renderMeme()
            renderControls()

            return true
        }
    })
}
function onCanvasDoubleClick(ev) {
    const pos = getEvPos(ev)

    const rect = gElCanvas.getBoundingClientRect()
    const scaleX = gElCanvas.width / rect.width
    const scaleY = gElCanvas.height / rect.height

    const x = pos.x * scaleX
    const y = pos.y * scaleY

    const meme = getMeme()

    meme.lines.find((line, idx) => {
        gCtx.font = `${line.size}px ${line.font}`

        const textWidth = gCtx.measureText(line.txt).width

        let boxX = line.x - textWidth / 2

        if (line.align === 'left') boxX = line.x
        if (line.align === 'right') boxX = line.x - textWidth

        const isInside =
            x >= boxX &&
            x <= boxX + textWidth &&
            y >= line.y - line.size &&
            y <= line.y

        if (isInside) {
            setLine(idx)
            openCanvasTextInput(line)

            return true
        }
    })
}

function openCanvasTextInput(line) {
    const elInput = document.querySelector('.canvas-text-input')

    const rect = gElCanvas.getBoundingClientRect()
    const scale = rect.width / gElCanvas.width

    elInput.value = line.txt
    elInput.style.left = `${line.x * scale}px`
    elInput.style.top = `${(line.y - line.size) * scale}px`

    elInput.classList.remove('hidden')
    elInput.focus()
}

function onCloseCanvasTextInput() {
    document.querySelector('.canvas-text-input').classList.add('hidden')
}

function renderControls() {
    const meme = getMeme()
    const line = meme.lines[meme.selectedLineIdx]

    document.querySelector('.line-input').value = line.txt
    document.querySelector('.line-color').value = line.color
    document.querySelector('.line-font').value = line.font
}

function onSetFont(font) {
    setFont(font)
    renderMeme()
}

function onSetTextAlign(align) {
    setTextAlign(align)
    renderMeme()
}

function onUpTextLine() {
    upTextLine()
    renderMeme()
}

function onDownTextLine() {
    downTextLine()
    renderMeme()
}

function onDeleteLine() {
    deleteLine()
    renderMeme()
    renderControls()
}


function onSaveMeme() {
    saveMeme()
    renderSavedMemes()
}

function onAddSticker(emoji) {
    addSticker(emoji)
    renderMeme()
}

function renderStickers() {
    const emojis = getEmojis()

    const strHTMLs = emojis.map(emoji => {
        return `<span onclick="onAddSticker('${emoji}')">${emoji}</span>`
    })

    document.querySelector('.stickers').innerHTML = strHTMLs.join('')
}

function onNextStickers() {
    nextStickers()
    renderStickers()
}

function onPrevStickers() {
    prevStickers()
    renderStickers()
}



function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }

    if (['touchstart', 'touchmove', 'touchend'].includes(ev.type)) {
        ev.preventDefault()

        ev = ev.changedTouches[0]

        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }

    return pos
}

function onMove(ev) {
    if (!gIsDragging) return

    gDidDrag = true

    const pos = getEvPos(ev)

    const rect = gElCanvas.getBoundingClientRect()
    const scaleX = gElCanvas.width / rect.width
    const scaleY = gElCanvas.height / rect.height

    const x = pos.x * scaleX
    const y = pos.y * scaleY

    moveLine(x, y)
    renderMeme()
}
function onUp(ev) {
    if (ev.type === 'touchend' && gIsDragging && !gDidDrag) {
        const meme = getMeme()
        const line = meme.lines[meme.selectedLineIdx]

        openCanvasTextInput(line)
    }

    gIsDragging = false
    gDidDrag = false
}

function onShareMeme() {
    gElCanvas.toBlob(blob => {
        uploadImg(blob, onSuccess)
    })
}

function onSuccess(uploadedImgUrl) {
    const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)

    window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}`
    )
}

function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()

    reader.onload = function (event) {
        const img = new Image()

        img.onload = () => onImageReady(img)
        img.src = event.target.result
    }

    reader.readAsDataURL(ev.target.files[0])
}