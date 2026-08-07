'use strict';

function renderGallery() { 
    const imgs = getImgs()
    const strHTMLs = imgs.map(img => {
        return `<img src="${img.url}" alt="Meme Image" onclick="onImgSelect(${img.id})">`
    })
    document.querySelector('.meme-gallery').innerHTML = strHTMLs.join('')
}

function onImgSelect(imgId) {
    setImg(imgId)
    renderMeme()
}

function onDownloadMeme() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')

    const downloadLink = document.createElement('a')
    downloadLink.href = imgDataUrl
    downloadLink.download = 'meme.jpg'
    downloadLink.click()
}