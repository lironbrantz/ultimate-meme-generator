'use strict'

function onInit() {
    gElCanvas = document.querySelector('.meme-canvas')
    gCtx = gElCanvas.getContext('2d')

    renderGallery()
    renderSavedMemes()
    renderMeme()
    renderControls()
    renderStickers()
}

function onNavTo(page) {
    document.querySelectorAll('main > section').forEach(sec => sec.classList.add('hidden'))
    document.getElementById(page).classList.remove('hidden')
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}   