'use strict'

var gCurrMemeId

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

// var gMeme = { 
//     selectedImgId: 5, 
//     selectedLineIdx: 0, 
//     lines: [ 
//             { 
//                 txt: 'I sometimes eat Falafel', 
//                 size: 20, 
//                 color: 'red' 
//             } 
//         ] 
//     } 

var gMemes = []

function getMemeByImgId(imgId) {
    return gMemes.find(meme => imgId === meme.selectedImgId)
}

function setLineTxt(txt) {
    const meme = getMemeByImgId(gCurrMemeId)
    meme.lines[meme.selectedLineIdx].txt = txt
}

function getImgById(imgId) {
    imgId = imgId
    return gImgs.find(img => imgId === img.id)
}

function getImgs() {
    return gImgs
}

function getCurrMemeId() {
    return gCurrMemeId
}

function setImg(imgId) {
    gCurrMemeId = imgId
    gMemes.push(_createMeme(imgId))
}

function _createMeme(imgId) {
    return {
        selectedImgId: imgId, 
        selectedLineIdx: 0, 
        lines: [ 
                { 
                    txt: 'Add Text Here', 
                    size: 45,
                    color: ''
                } 
            ]
    }
}