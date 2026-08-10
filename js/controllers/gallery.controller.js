'use strict';

function renderGallery() {
    const imgs = getImgs()

    const strHTMLs = imgs.map(img => {
        return `<img src="${img.url}" alt="${img.keywords.join(', ')}" onclick="onImgSelect(${img.id})">`
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
        const altText = meme.lines.map(line => line.txt).join(', ')

        return `
            <img src="${meme.preview}" alt="${altText}" onclick="onSavedMemeSelect(${idx})">
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

function onImgInput(ev) {
    loadImageFromInput(ev, img => {
        setImgFromDevice(img)
        onNavTo('editor')
        renderMeme()
    })
}


function renderKeywords() {
    const keywords = getKeywordSearchCountMap()

    const strHTMLs = Object.keys(keywords).map(keyword => {
        const fontSize = keywords[keyword] * 2 + 10

        return `<span onclick="onKeywordSelect('${keyword}')" style="font-size: ${fontSize}px"> ${keyword} </span>`
    })

    document.querySelector('.keywords').innerHTML = strHTMLs.join(' ')
}

function onKeywordSelect(keyword) {
    increaseKeywordSearchCount(keyword)
    setFilter(keyword)

    document.querySelector('.search-input').value = keyword

    renderKeywords()
    renderGallery()
}
