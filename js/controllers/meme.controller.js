let gElCanvas 
let gCtx 

function onInit(){
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
}

function renderMeme(){
    let currMeme = getMeme()
    // const elInputText = document.querySelector('.insert-txt').value
    drawImg(() => drawText(currMeme.lines[currMeme.selectedLineIdx].txt))
    document.querySelector('.insert-txt').value = currMeme.lines[currMeme.selectedLineIdx].txt
}

function drawImg(callback, src = '/meme-imgs (square)/1.jpg') { //initial img load for setup
    const elImg = new Image()
    elImg.src = src
    elImg.onload = () => {
        console.log('** Loading complete! **');
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        if (callback) callback()
    }
}

function drawText(text, x = gElCanvas.width/2, y = gElCanvas.height*0.1) { //with initial properties for setup
    let currMeme = getMeme()
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'brown'
    gCtx.fillStyle = currMeme.lines[currMeme.selectedLineIdx].color
    gCtx.font = `${currMeme.lines[currMeme.selectedLineIdx].size}px Arial`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function onUserType(txt) {
    setLineTxt(txt)
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