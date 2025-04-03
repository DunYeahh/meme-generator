function goToEditor() {
    const elCurrSection = document.querySelector('.curr-page')
    const elEditor = document.querySelector('.editor')
    toggleSectionClass(elCurrSection)
    toggleSectionClass(elEditor)
    initEditor()
}

function onGoToSaved() {
    const elCurrSection = document.querySelector('.curr-page')
    const elSaved = document.querySelector('.saved-memes')
    toggleSectionClass(elCurrSection)
    toggleSectionClass(elSaved)
    initSaved()
}

function onGoToGallery() {
    const elCurrSection = document.querySelector('.curr-page')
    const elGallery = document.querySelector('.gallery')
    toggleSectionClass(elCurrSection)
    toggleSectionClass(elGallery)
    onInitGallery()
}

function toggleSectionClass(elSection) {
    elSection.classList.toggle('curr-page')
    elSection.classList.toggle('hide')
}