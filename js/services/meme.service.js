'use strict'
const STORAGE_KEY = 'memesDB'

let gImgs = [
    {id: 'RB7tD1', url: 'meme-imgs (various aspect ratios)/1.jpg', keywords: ['Trump']},
    {id: 'OVh406', url: 'meme-imgs (various aspect ratios)/2.jpg', keywords: ['Dog', 'Cute']},
    {id: '6zBIQ4', url: 'meme-imgs (various aspect ratios)/3.jpg', keywords: ['Dog', 'Cute', 'Baby']},
    {id: 'KcakpM', url: 'meme-imgs (various aspect ratios)/4.jpg', keywords: ['Cat', 'Cute']},
    {id: 'xLZcOX', url: 'meme-imgs (various aspect ratios)/5.jpg', keywords: ['Baby']},
    {id: 'ADxrLv', url: 'meme-imgs (various aspect ratios)/6.jpg', keywords: []},
    {id: 'uhHYMs', url: 'meme-imgs (various aspect ratios)/7.jpg', keywords: ['Baby']},
    {id: 'Ms5vhY', url: 'meme-imgs (various aspect ratios)/8.jpg', keywords: []},
    {id: '8NfCDg', url: 'meme-imgs (various aspect ratios)/9.jpg', keywords: ['Baby']},
    {id: 'Vmhxjg', url: 'meme-imgs (various aspect ratios)/10.jpg', keywords: ['Obama']},
    {id: 'kKb7dC', url: 'meme-imgs (various aspect ratios)/11.jpg', keywords: ['Kiss']},
    {id: 'YIRMqB', url: 'meme-imgs (various aspect ratios)/12.jpg', keywords: []},
    {id: 'ZYDFMG', url: 'meme-imgs (various aspect ratios)/13.jpg', keywords: ['Cheers']},
    {id: 'MDYFAx', url: 'meme-imgs (various aspect ratios)/14.jpg', keywords: []},
    {id: 'iilu8Y', url: 'meme-imgs (various aspect ratios)/15.jpg', keywords: ['Loser']},
    {id: 'Ehx66N', url: 'meme-imgs (various aspect ratios)/16.jpg', keywords: []},
    {id: 'b7H8Zm', url: 'meme-imgs (various aspect ratios)/17.jpg', keywords: ['Putin']},
    {id: 'HO1w9J', url: 'meme-imgs (various aspect ratios)/18.jpg', keywords: []},
    {id: 'HO1w9J', url: 'meme-imgs (various aspect ratios)/19.jpg', keywords: []},
    {id: 'HO1w9J', url: 'meme-imgs (various aspect ratios)/20.jpg', keywords: []},
    {id: 'HO1w9J', url: 'meme-imgs (various aspect ratios)/21.jpg', keywords: []},
    {id: 'HO1w9J', url: 'meme-imgs (various aspect ratios)/22.jpg', keywords: []},
    {id: 'HO1w9J', url: 'meme-imgs (various aspect ratios)/23.jpg', keywords: ['Trump']},
    {id: 'HO1w9J', url: 'meme-imgs (various aspect ratios)/24.jpg', keywords: []},
    {id: 'HO1w9J', url: 'meme-imgs (various aspect ratios)/25.jpg', keywords: []}
]
let gMeme
let gDiffIdx = 0
let gTxts = [
    `That's what she said`,
    'Meme this img',
    'Coding be like',
    'When you realise you like memes'
]
let gSavedMemes = loadFromStorage(STORAGE_KEY) || []
let gIsEmoji = false
var gKeywordSearchCountMap = {'cute': 12,'cat': 16, 'baby': 2} 

function getMeme() {
    return gMeme
}

function getKeywordSearchCountMap() {
    return gKeywordSearchCountMap
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
    gMeme = _createMeme(imgId)
    console.log('gMeme: ', gMeme)
}

function _createMeme(imgId) {
    return {
        selectedImgId: imgId, 
        selectedLineIdx: 0,
        lines: [_createLine()]
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

function addLine(txt) {
    if (!gIsEmoji) gDiffIdx++
    gMeme.lines.push(_createLine(txt))
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function addEmoji(emoji) {
    gIsEmoji = true
    addLine(emoji)
}

function switchLineFocus(isMouseDown, idx) {

    if (isMouseDown) {
            gMeme.selectedLineIdx = idx
    } else {
        if (gMeme.selectedLineIdx === gMeme.lines.length - 1) {
            gMeme.selectedLineIdx = 0
        } else gMeme.selectedLineIdx++
    }
}

function upLine() {
    gMeme.lines[gMeme.selectedLineIdx].y--
}

function downLine() {
    gMeme.lines[gMeme.selectedLineIdx].y++
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    if (gMeme.selectedLineIdx === gMeme.lines.length) {
        if(gMeme.lines.length === 0) {
            gDiffIdx = -1
            // gMeme.lines.push(_createLine())
            gMeme.selectedLineIdx = -1
        } else {
            gDiffIdx--
            gMeme.selectedLineIdx = 0
        } 
    }
}

function _createLine(txt = 'Add Text Here') {
    let diff 
    let line
    if (gIsEmoji) {
        diff = 0 
        gIsEmoji = false
        line = {
            txt, 
            size: 45,
            strokeColor: '#000000',
            fillColor: '#ffffff',
            font: 'Impact',
            align: 'center',
            isEmoji: true,
            x: diff,
            y: diff
        }
    }
    else {
        diff = gDiffIdx*50
        line = {
            txt, 
            size: 45,
            strokeColor: '#000000',
            fillColor: '#ffffff',
            font: 'Impact',
            align: 'center',
            x: diff,
            y: diff
        }
    }
    return line
}

function setRandomMeme() {
    const linesLength = getRandomIntInclusive(1,2)
    gMeme = {
        selectedImgId: gImgs[getRandomInt(0, gImgs.length)].id , 
        selectedLineIdx: 0,
        lines: []
    }
    for (let i = 0; i < linesLength; i++){
       gMeme.lines.push(_createRandomLine())
       gDiffIdx = 300
    }
    gDiffIdx = 0
}

function _createRandomLine() {
    let txt = gDiffIdx === 300 ? getNewTxt() : gTxts[getRandomInt(0, gTxts.length)]

    return {
        txt, 
        size: 45,
        strokeColor: getRandomColor(),
        fillColor: getRandomColor(),
        font: 'Impact',
        align: 'center',
        x: 0,
        y: gDiffIdx
    }
}

function getNewTxt() {
    let txt = gMeme.lines[0].txt
    while (txt === gMeme.lines[0].txt) {
        txt = gTxts[getRandomInt(0, gTxts.length)]
    }
    return txt
}

function saveMeme(data) {
    if (gMeme.savedMemeId) {
        const memeIdx = gSavedMemes.findIndex(meme => gMeme.savedMemeId === meme.id)
        gSavedMemes[memeIdx].meme = gMeme
        gSavedMemes[memeIdx].imgContent = data
    } else {
        gSavedMemes.push(_createSavedMeme(data))
    }
    _saveSavedMemesToStorage()
}

function _createSavedMeme(data) {
    return {
        id: makeId(),
        imgContent: data,
        meme: gMeme
    }
}

function _saveSavedMemesToStorage() {
    saveToStorage(STORAGE_KEY, gSavedMemes)
}

function getSavedMemes() {
    return gSavedMemes
}

function removeSavedMeme(memeId) {
    const memeIdx = gSavedMemes.findIndex(meme => memeId === meme.id)
    if (memeIdx !== -1) gSavedMemes.splice(memeIdx, 1)

    _saveSavedMemesToStorage()
}

function selectSavedMeme(memeId) {
    gMeme = gSavedMemes.find(meme => memeId === meme.id).meme
    gMeme.savedMemeId = memeId
}

function moveLine (dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].x += dx
    gMeme.lines[gMeme.selectedLineIdx].y += dy
}

function _createImg (src) {
    return {
        id: makeId(), 
        url: src, 
        keywords: []
    }
}

function saveImg(img) {
    const newImg = _createImg(img.src)
    gImgs.push(newImg)
    return newImg.id
}

function updateKeyCountMap(keyword) {
    let value = gKeywordSearchCountMap[keyword.toLowerCase()]
    gKeywordSearchCountMap[keyword.toLowerCase()] = value ? value + 1 : 1
}

function reSizeLine(diff) {
    gMeme.lines[gMeme.selectedLineIdx].size += diff
}

