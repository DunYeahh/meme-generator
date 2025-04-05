'use strict'
let gElCanvas 
let gCtx 
let gIsMouseDown = false
let gIsRectNeeded = true
let gLastPos

function initEditor(){
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    refreshSelectors()
}

function renderMeme(){
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

function drawText(meme, x = gElCanvas.width / 2, y = gElCanvas.height * 0.15) {
    let i = 0
    meme.lines.forEach(function(line){
        gCtx.lineWidth = 2
        if (line.isEmoji) {
            y = gElCanvas.height / 2
        } else {
            gCtx.strokeStyle = line.strokeColor
            gCtx.fillStyle = line.fillColor
        }
        gCtx.font = `${line.size}px ${line.font}`
        gCtx.textAlign = line.align
        gCtx.textBaseline = 'middle'
        gCtx.fillText(line.txt, x + line.x, y + line.y)
        gCtx.strokeText(line.txt, x + line.x, y + line.y)
        if (i === meme.selectedLineIdx && gIsRectNeeded){
            markLineInFocus(line.txt, line.size, x + line.x, y + line.y, line.align)
        }
        y = gElCanvas.height * 0.15
        return i++
    })
    const currLine = meme.lines[meme.selectedLineIdx]
    if (currLine.txt !== 'Add Text Here') document.querySelector('.insert-txt').value = currLine.txt
    if (currLine.isEmoji) document.querySelector('.insert-txt').value = ''
}

function markLineInFocus(txt, size, x, y, align) {
    const padding = 5
    const {left, top, width, height} = getLineArea({txt, size, x, y, align}) 
    gCtx.strokeStyle = 'black'
    gCtx.strokeRect(left , top, width, height)
    gCtx.arc(left + width - padding / 2, top + height - padding / 2, 6, 0, 2 * Math.PI)
    gCtx.fillStyle = 'black'
    gCtx.fill()

}

function getLineArea(line) {
    const padding = 5
    const textWidth = gCtx.measureText(line.txt).width
    const textHeight = line.size
    let left

    if (line.align === 'center') {
        left = line.x - (textWidth / 2) - padding
    } else if (line.align === 'right') {
        left = line.x - textWidth - padding
    } else {
        left = line.x - padding
    }
    const top = line.y - (textHeight / 2) - padding
    const width = textWidth + padding * 2
    const height = textHeight + padding * 2

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
    const meme = getMeme()
    const pos = getEvPos(ev) 
    gLastPos = pos
    let isCorner = false
    
    const clickedLineIdx = meme.lines.findIndex(function(line) {
        let yDiff = line.isEmoji ? gElCanvas.height / 2 : gElCanvas.height * 0.15
        const {left, top, width, height} = getLineArea({
            txt: line.txt, 
            size: line.size, 
            x: line.x + gElCanvas.width / 2, 
            y: line.y + yDiff,
            align: line.align
        })
        if (pos.x >= left + width - 6 && pos.x <= left + width + 6 &&
            pos.y >= top + height - 6 && pos.y <= top + height + 6) {
                isCorner = true
            }
        return (pos.x >= left && pos.x <= left + width && pos.y >= top && pos.y <= top + height)
    })
    if(isCorner) {
        gIsMouseDown = true
        document.body.style.cursor = 'nwse-resize'
    } else if (clickedLineIdx >= 0) {
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

    if (!gIsMouseDown) return

    const pos = getEvPos(ev)

    const dx = pos.x - gLastPos.x
    const dy = pos.y - gLastPos.y

    const currentCursor = document.body.style.cursor
    if (currentCursor === 'grabbing') moveLine(dx, dy)
    else {
        if(dx > 0 && dy >= 0 || dx >= 0 && dy > 0) reSizeLine(0.5)
        if(dx < 0 && dy <= 0 || dx <= 0 && dy < 0) reSizeLine(-0.5)
        // if(dx > 0 && dy <= 0 || dx >= 0 && dy < 0) //rotateLeft
        // if(dx < 0 && dy >= 0 || dx <= 0 && dy > 0) //rotate right
    }    
    renderMeme()
    gLastPos = pos
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

function onScrollLeft() {
    document.querySelector('.emoji-list').scrollBy({ left: -41, behavior: 'smooth' })
}

function onScrollRight() {
    document.querySelector('.emoji-list').scrollBy({ left: 41, behavior: 'smooth' })
}

function onSelectEmoji(emoji) {
    addEmoji(emoji)
    renderMeme()
}

function onShareFB(ev) {
    ev.preventDefault()
    gIsRectNeeded = false
    renderMeme()

    setTimeout(() => {
        const canvasData = gElCanvas.toDataURL('image/jpeg')
        gIsRectNeeded = true
        uploadImg(canvasData, onSuccess)
    }, 500);

    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
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

function refreshSelectors() {
    const meme = getMeme()
    // text
    if (meme.lines[meme.selectedLineIdx].txt === 'Add Text Here') {
        document.querySelector('.insert-txt').value = ''
    } else {
        document.querySelector('.insert-txt').value = meme.lines[meme.selectedLineIdx].txt
    }
    // font
    document.querySelector('.font').value = meme.lines[meme.selectedLineIdx].font.toUpperCase()
    // stoke
    document.querySelector('.stroke-clr').value = meme.lines[meme.selectedLineIdx].strokeColor
    // fill
    document.querySelector('.fill-clr').value = meme.lines[meme.selectedLineIdx].fillColor
}