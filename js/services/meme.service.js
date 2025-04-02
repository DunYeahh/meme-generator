'use strict'

var gImgs = [
    {id: makeId(), url: 'meme-imgs (square)/1.jpg', keywords: ['Trump']},
    {id: makeId(), url: 'meme-imgs (square)/2.jpg', keywords: ['Dog', 'Cute']},
    {id: makeId(), url: 'meme-imgs (square)/3.jpg', keywords: ['Dog', 'Cute', 'Baby']},
    {id: makeId(), url: 'meme-imgs (square)/4.jpg', keywords: ['Cat', 'Cute']},
    {id: makeId(), url: 'meme-imgs (square)/5.jpg', keywords: ['Baby']},
    {id: makeId(), url: 'meme-imgs (square)/6.jpg', keywords: []},
    {id: makeId(), url: 'meme-imgs (square)/7.jpg', keywords: ['Baby']},
    {id: makeId(), url: 'meme-imgs (square)/8.jpg', keywords: []},
    {id: makeId(), url: 'meme-imgs (square)/9.jpg', keywords: ['Baby']},
    {id: makeId(), url: 'meme-imgs (square)/10.jpg', keywords: ['Obama']},
    {id: makeId(), url: 'meme-imgs (square)/11.jpg', keywords: ['Kiss']},
    {id: makeId(), url: 'meme-imgs (square)/12.jpg', keywords: []},
    {id: makeId(), url: 'meme-imgs (square)/13.jpg', keywords: ['Cheers']},
    {id: makeId(), url: 'meme-imgs (square)/14.jpg', keywords: []},
    {id: makeId(), url: 'meme-imgs (square)/15.jpg', keywords: ['Loser']},
    {id: makeId(), url: 'meme-imgs (square)/16.jpg', keywords: []},
    {id: makeId(), url: 'meme-imgs (square)/17.jpg', keywords: ['Putin']},
    {id: makeId(), url: 'meme-imgs (square)/18.jpg', keywords: []}
]
var gMeme
// var gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2} 

function getMeme() {
    return gMeme
}

function setLineTxt(txt) {
    if (!txt) gMeme.lines[gMeme.selectedLineIdx].txt = 'Add Text Here'
    else gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function getImgById(imgId) {
    return gImgs.find(img => imgId === img.id)
}

function getImgs() {
    return gImgs
}

function setImg(imgId) {
    // gCurrMemeId = imgId
    // gMemes.push(_createMeme(imgId))
    gMeme = _createMeme(imgId)
}

function _createMeme(imgId) {
    return {
        selectedImgId: imgId, 
        selectedLineIdx: 0, 
        lines: [ 
                { 
                    txt: 'Add Text Here', 
                    size: 45,
                    strokeColor: '#000000',
                    fillColor: '#ffffff',
                    font: 'Impact',
                    align: 'center'
                } 
            ]
    }
}

function setStrokeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = color
}

function setFillColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].fillColor = color
}

function setFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

function incrFontSize() {
    gMeme.lines[gMeme.selectedLineIdx].size++
}

function decFontSize() {
    gMeme.lines[gMeme.selectedLineIdx].size--
}

function alignText(dir) {
    switch (dir) {
        case 'L':
            gMeme.lines[gMeme.selectedLineIdx].align = 'right'
            break
        case 'C':
            gMeme.lines[gMeme.selectedLineIdx].align = 'center'
            break
        case 'R':
            gMeme.lines[gMeme.selectedLineIdx].align = 'left'
            break
      }
}