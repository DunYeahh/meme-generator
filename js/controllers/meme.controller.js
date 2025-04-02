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

function drawText(currMeme, x = gElCanvas.width / 2, y = gElCanvas.height * 0.1) {
    let i = 0
    currMeme.lines.forEach(function(line){
        gCtx.lineWidth = 2
        gCtx.strokeStyle = line.strokeColor
        gCtx.fillStyle = line.fillColor
        gCtx.font = `${line.size}px ${line.font}`
        gCtx.textAlign = line.align
        gCtx.textBaseline = 'middle'
        gCtx.fillText(line.txt, x + line.x, y + line.y)
        gCtx.strokeText(line.txt, x + line.x, y + line.y)
        if (i === currMeme.selectedLineIdx){
            markLineInFocus(line.txt, line.size, x + line.x, y + line.y)
        }
        return i++
    })
}

function markLineInFocus(txt, size, x, y) {
    const textWidth = gCtx.measureText(txt).width
    const padding = 5
    const textHeight = size
    
    gCtx.strokeRect(x - textWidth / 2 - padding, y - textHeight / 2 - padding, 
        textWidth + padding * 2, textHeight + padding * 2);

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

function onAddLine(){
    addLine()
    document.querySelector('.insert-txt').value = ''
    renderMeme()
}

function onSwitchLineFocus(){
    switchLineFocus()
    renderMeme()
    if (getMeme().lines[getMeme().selectedLineIdx].txt === 'Add Text Here') {
        document.querySelector('.insert-txt').value = ''
    } else {
        document.querySelector('.insert-txt').value = getMeme().lines[getMeme().selectedLineIdx].txt
    }
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