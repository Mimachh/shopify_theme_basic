document.addEventListener('DOMContentLoaded', function() {
    const openAddressModal = document.getElementById('openAddressModal');
    const closeAddressModal = document.getElementById('closeAddressModal');
    const addressModal = document.getElementById('addressModal');

    // ouverture sur le click
    openAddressModal.addEventListener('click', () => {
        addressModal.classList.remove('hidden');
    })
    // fermeture sur le click
    // fermeture click en dehors
    // fermeture après submit
})