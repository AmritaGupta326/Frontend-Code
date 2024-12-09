function showDescription(title, description, thumbnail) {
    // const modalTitle = document.getElementById('modalTitle');
    const modalThumbnail = document.getElementById('modalThumbnail');
    const modalDescription = document.getElementById('modalDescription');

    // modalTitle.textContent = title;
    modalThumbnail.src = thumbnail;
    modalDescription.textContent = description;

    // Show the modal
    document.getElementById('descriptionModal').style.display = 'flex';
}

function closeDescriptionModal() {
    // Hide the modal
    document.getElementById('descriptionModal').style.display = 'none';
}