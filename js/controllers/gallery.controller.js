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