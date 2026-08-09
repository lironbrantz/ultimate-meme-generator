'use strict';

function renderGallery() {
    const imgs = getImgs()

    const strHTMLs = imgs.map(img => {
        return `<img src="${img.url}" onclick="onImgSelect(${img.id})">`
    })

    document.querySelector('.meme-gallery').innerHTML = strHTMLs.join('')
}
function onImgSelect(imgId) {
    setImg(imgId)
    renderMeme()
    onNavTo('editor')
}

function renderSavedMemes() {
    const savedMemes = getSavedMemes()

    const strHTMLs = savedMemes.map((meme, idx) => {
        const img = getImgs().find(img => img.id === meme.selectedImgId)

        return `
            <img
                src="${img.url}"
                onclick="onSavedMemeSelect(${idx})">
        `
    })

    document.querySelector('.saved-memes-grid').innerHTML = strHTMLs.join('')
}

function onSavedMemeSelect(memeIdx) {
    const savedMemes = getSavedMemes()
    const selectedMeme = savedMemes[memeIdx]

    const memeCopy = JSON.parse(JSON.stringify(selectedMeme))
    setMeme(memeCopy)
    renderControls()
    renderMeme()
    onNavTo('editor')
}

function onSetFilter(filterBy) {
    setFilter(filterBy)
    renderGallery()
}

function renderKeywords() {
    const keywordMap = getKeywordSearchCountMap()
    const keywords = Object.keys(keywordMap)

    const strHTMLs = keywords.map(keyword => {
        return `<option value="${keyword}">`
    })

    document.getElementById('keywords').innerHTML = strHTMLs.join('')
}