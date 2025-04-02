'use strict'
let gElCanvas 
let gCtx 

function onInit(){
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()  //address the missing imgId for renderMeme
    window.addEventListener('resize', resizeCanvas)
    renderGallery()
}

function renderMeme(imgId){
    let currMeme = getMemeByImgId(imgId)
    let currImg = getImgById(imgId)
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

function drawText(currMeme, x = gElCanvas.width/2, y = gElCanvas.height*0.1) { //with initial properties for setup
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'brown'
    gCtx.fillStyle = currMeme.lines[currMeme.selectedLineIdx].color
    gCtx.font = `${currMeme.lines[currMeme.selectedLineIdx].size}px Arial`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(currMeme.lines[currMeme.selectedLineIdx].txt, x, y)
    gCtx.strokeText(currMeme.lines[currMeme.selectedLineIdx].txt, x, y)
}

function onUserType(txt) {
    setLineTxt(txt)
    renderMeme(getCurrMemeId())
}

function onImgSelect(imgId) {
    setImg(imgId)
    renderMeme(imgId)
}

function resizeCanvas() { //address the missing imgId for renderMeme
    const elContainer = document.querySelector('.canvas-container') 
    gElCanvas.width = elContainer.clientWidth
    // renderMeme()
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