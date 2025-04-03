
function initSaved(){
    renderSavedMemes()
}

function renderSavedMemes(){
    let memes = getSavedMemes()
    if (!memes || !memes.length) {
        document.querySelector('.saved-memes-container').innerHTML = 'There are no saved memes...'
    } else {
        var strHTMLs = memes.map (meme =>
            `<div class="saved-memes-container">
                <button class="btn-remove" onclick="onRemoveSavedMeme('${meme.id}')">X</button>
                <img class="saved-meme" onclick="onSelectSavedMeme('${meme.id}')" src="${meme.imgContent}">
            </div>`
        )
        document.querySelector('.saved-memes-container').innerHTML = strHTMLs.join('')
    }
}


function onRemoveSavedMeme(memeId){
    removeSavedMeme(memeId)
    renderSavedMemes()
}

function onSelectSavedMeme(memeId){
    selectSavedMeme(memeId)
    goToEditor()
}