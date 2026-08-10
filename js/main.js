'use strict'

function onInit() {
    gElCanvas = document.querySelector('.meme-canvas')
    gCtx = gElCanvas.getContext('2d')

    renderGallery()
    renderKeywords()
    renderSavedMemes()
    renderMeme()
    renderControls()
    renderStickers()
}

function onToggleMenu() {
    document.querySelector('.main-nav').classList.toggle('open')
}

function onNavTo(page) {
    document.querySelectorAll('main > section').forEach(sec => sec.classList.add('hidden'))
    document.getElementById(page).classList.remove('hidden')

    document.querySelector('.main-nav').classList.remove('open')
}

