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