'use strict'
let gElCanvas 
let gCtx 

function initEditor(){
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
}

function renderMeme(){
    let currMeme = getMeme()
    let currImg = getImgById(currMeme.selectedImgId)
    drawImg(function () {
        drawText(currMeme)
    }, currImg.url)
    const currTxt = currMeme.lines[currMeme.selectedLineIdx].txt
    if (currTxt !== 'Add Text Here') document.querySelector('.insert-txt').value = currTxt
}

function drawImg(callback, src) {
    const elImg = new Image()
    elImg.src = src
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        if (callback) callback()
    }
}

function drawText(currMeme, x = gElCanvas.width/2, y = gElCanvas.height*0.1) {
    const lineProperties = currMeme.lines[currMeme.selectedLineIdx]
    gCtx.lineWidth = 2
    gCtx.strokeStyle = lineProperties.strokeColor
    gCtx.fillStyle = lineProperties.fillColor
    gCtx.font = `${lineProperties.size}px ${lineProperties.font}`
    gCtx.textAlign = lineProperties.align
    gCtx.textBaseline = 'middle'
    gCtx.fillText(currMeme.lines[currMeme.selectedLineIdx].txt, x, y)
    gCtx.strokeText(currMeme.lines[currMeme.selectedLineIdx].txt, x, y)
}

function onUserType(txt) {
    setLineTxt(txt)
    renderMeme()
}

function onDownloadCanvas(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function onSetStrokeColor (color) {
    setStrokeColor(color)
    renderMeme()
}

function onSetFillColor (color) {
    setFillColor(color)
    renderMeme()
}

function onSetFont(font) {
    setFont(font)
    renderMeme()
}

function onIncrFontSize() {
    incrFontSize(font)
    renderMeme()
}

function onDecFontSize() {
    decFontSize(font)
    renderMeme()
}

function onAlignText(dir) {
    alignText(dir)
    renderMeme()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container') 
    gElCanvas.width = elContainer.clientWidth
    renderMeme()
}

function getEvPos (ev) {
    const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        console.log(ev.type)
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}