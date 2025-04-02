function goToEditor() {
    const elCurrSection = document.querySelector('.curr-page')
    const elEditor = document.querySelector('.editor')
    toggleSectionClass(elCurrSection)
    toggleSectionClass(elEditor)
    initEditor()
}

function toggleSectionClass(elSection) {
    elSection.classList.toggle('curr-page')
    elSection.classList.toggle('hide')
}