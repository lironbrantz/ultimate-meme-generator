'use strict';

var gImgs = [
    { id: 1, url: 'img/gallery/1.jpg', keywords: ['funny'] },
    { id: 2, url: 'img/gallery/2.jpg', keywords: ['funny'] },
    { id: 3, url: 'img/gallery/3.jpg', keywords: ['funny'] },
    { id: 4, url: 'img/gallery/4.jpg', keywords: ['funny'] },
    { id: 5, url: 'img/gallery/5.jpg', keywords: ['funny'] },
    { id: 6, url: 'img/gallery/6.jpg', keywords: ['funny'] },
    { id: 7, url: 'img/gallery/7.jpg', keywords: ['funny'] },
    { id: 8, url: 'img/gallery/8.jpg', keywords: ['funny'] },
    { id: 9, url: 'img/gallery/9.jpg', keywords: ['funny'] },
    { id: 10, url: 'img/gallery/10.jpg', keywords: ['funny'] },
    { id: 11, url: 'img/gallery/11.jpg', keywords: ['funny'] },
    { id: 12, url: 'img/gallery/12.jpg', keywords: ['funny'] },
    { id: 13, url: 'img/gallery/13.jpg', keywords: ['funny'] },
    { id: 14, url: 'img/gallery/14.jpg', keywords: ['funny'] },
    { id: 15, url: 'img/gallery/15.jpg', keywords: ['funny'] },
    { id: 16, url: 'img/gallery/16.jpg', keywords: ['funny'] },
    { id: 17, url: 'img/gallery/17.jpg', keywords: ['funny'] },
    { id: 18, url: 'img/gallery/18.jpg', keywords: ['funny'] }
];
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [{ txt: 'Hello', size: 20, color: 'red', x: 250, y: 60, font: 'Arial', align: 'center' },
    { txt: 'World', size: 20, color: 'blue', x: 250, y: 460, font: 'Arial', align: 'center' }]
}

function getMeme() {
    return gMeme
}

function getImgs() {
    return gImgs
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setImg(id) {
    gMeme.selectedImgId = id
}

function setLineColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function increaseFontSize() {
    gMeme.lines[gMeme.selectedLineIdx].size += 5
}

function decreaseFontSize() {
    gMeme.lines[gMeme.selectedLineIdx].size -= 5
}

function addLine() {
    const newLine = { txt: 'New Line', size: 20, color: 'black', x: 250, y: 250, font: 'Arial', align: 'center' }
    gMeme.lines.push(newLine)
}

function switchLine() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx === gMeme.lines.length) gMeme.selectedLineIdx = 0
}

function setLine(idx) {
    gMeme.selectedLineIdx = idx
}

function setFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

function setTextAlign(align) {
    const line = gMeme.lines[gMeme.selectedLineIdx]

    line.align = align

    if (align === 'left') line.x = 20
    if (align === 'center') line.x = 250
    if (align === 'right') line.x = 480
}

function upTextLine() {
    gMeme.lines[gMeme.selectedLineIdx].y -= 5
}

function downTextLine() {
    gMeme.lines[gMeme.selectedLineIdx].y += 5
}

function deleteLine() {
    if (gMeme.lines.length === 1) return

    gMeme.lines.splice(gMeme.selectedLineIdx, 1)

    if (gMeme.selectedLineIdx >= gMeme.lines.length) {
        gMeme.selectedLineIdx = gMeme.lines.length - 1
    }
}