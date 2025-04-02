'use strict'

var gImgs = [{id: 5, url: '/meme-imgs (square)/1.jpg', keywords: ['Trump']}]

var gMeme = { 
    selectedImgId: 5, 
    selectedLineIdx: 0, 
    lines: [ 
            { 
                txt: 'I sometimes eat Falafel', 
                size: 20, 
                color: 'red' 
            } 
        ] 
    } 

function getMeme() {
    return gMeme
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function getImgById(imgId) {
    return gImgs.find(img => imgId === img.id)
}