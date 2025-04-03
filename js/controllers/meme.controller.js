'use strict'
let gElCanvas 
let gCtx 
let gIsMouseDown = false
let gIsRectNeeded = true

function initEditor(){
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    refreshSelectors()
}

function renderMeme(callback){
    let meme = getMeme()
    let img = getImgById(meme.selectedImgId)
    drawImg(function () {
        drawText(meme)
    }, img.url)
}

function drawImg(callback, src) {
    const elImg = new Image()
    elImg.src = src
    elImg.onload = () => {
        gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        if (callback && getMeme().selectedLineIdx >= 0) callback()
    }
}

function drawText(meme, x = gElCanvas.width / 2, y = gElCanvas.height * 0.1) {
    let i = 0
    meme.lines.forEach(function(line){
        gCtx.lineWidth = 2
        gCtx.strokeStyle = line.strokeColor
        gCtx.fillStyle = line.fillColor
        gCtx.font = `${line.size}px ${line.font}`
        gCtx.textAlign = line.align
        gCtx.textBaseline = 'middle'
        gCtx.fillText(line.txt, x + line.x, y + line.y)
        gCtx.strokeText(line.txt, x + line.x, y + line.y)
        if (i === meme.selectedLineIdx && gIsRectNeeded){
            markLineInFocus(line.txt, line.size, x + line.x, y + line.y)
        }
        return i++
    })
    const currTxt = meme.lines[meme.selectedLineIdx].txt
    if (currTxt !== 'Add Text Here') document.querySelector('.insert-txt').value = currTxt
}

function markLineInFocus(txt, size, x, y) {
    const padding = 5
    const {left, top, width, height} = getLineArea({txt, size, x, y}) 
    gCtx.strokeStyle = 'black'
    gCtx.strokeRect(left - padding, top - padding, width + padding * 2, height + padding * 2)

}

function getLineArea(line) {
    const textWidth = gCtx.measureText(line.txt).width
    const textHeight = line.size
    const left = line.x - (textWidth / 2)
    const top = line.y - (textHeight / 2)
    const width = textWidth
    const height = textHeight

    return {left, top, width, height}
}

function onLineTxt(txt) {
    if (getMeme().selectedLineIdx < 0) return
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
    let txt = undefined
    if (getMeme().selectedLineIdx < 0) {
        txt = document.querySelector('.insert-txt').value
        console.log(txt)
    }
    addLine(txt)
    renderMeme()
    refreshSelectors()
}

function onSwitchLineFocus(lineIdx = getMeme().selectedLineIdx){
    switchLineFocus(gIsMouseDown, lineIdx)
    renderMeme()
    refreshSelectors()
}

function onUpLine() {
    upLine()
    renderMeme()
}

function onDownLine() {
    downLine()
    renderMeme()
}

function onDown(ev) {
    const pos = getEvPos(ev) 
    const meme = getMeme()

    const clickedLineIdx = meme.lines.findIndex(function(line) {
        const {left, top, width, height} = getLineArea({
            txt: line.txt, 
            size: line.size, 
            x: line.x + gElCanvas.width / 2, 
            y: line.y + gElCanvas.height * 0.1
        })
        return (pos.x > left && pos.x < left + width && pos.y > top && pos.y < top + height)
    })
    
    if (clickedLineIdx >= 0) {      
        gIsMouseDown = true
        document.body.style.cursor = 'grabbing'
        onSwitchLineFocus(clickedLineIdx)
    } else {
        gIsRectNeeded = false
        renderMeme()
        setTimeout(() => {
            gIsRectNeeded = true
        }, 500);   
    }
}

function onUp() {
    gIsMouseDown = false
    document.body.style.cursor = 'default'
}

function onDrag(ev) {

}

function onDeleteLine() {
    if (getMeme().selectedLineIdx < 0) return
    deleteLine()
    renderMeme()
    refreshSelectors()
}

function onRandomMeme() {
    setRandomMeme()
    goToEditor()
    renderMeme()
    refreshSelectors()
}

function onSaveMeme() {
    gIsRectNeeded = false
    renderMeme()
    setTimeout(() => {
        const imgContent = gElCanvas.toDataURL('image/jpeg')
        saveMeme(imgContent)
        gIsRectNeeded = true
    }, 500);
    // modal
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container') 
    gElCanvas.width = elContainer.clientWidth * 0.5
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

function refreshSelectors() {
    const meme = getMeme()
    // text
    if (meme.lines[meme.selectedLineIdx].txt === 'Add Text Here') {
        document.querySelector('.insert-txt').value = ''
    } else {
        document.querySelector('.insert-txt').value = meme.lines[meme.selectedLineIdx].txt
    }
    // font
    document.querySelector('.font').value = meme.lines[meme.selectedLineIdx].size
    // stoke
    document.querySelector('.stroke-clr').value = meme.lines[meme.selectedLineIdx].strokeColor
    // fill
    document.querySelector('.fill-clr').value = meme.lines[meme.selectedLineIdx].fillColor
}