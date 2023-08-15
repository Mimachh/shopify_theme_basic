document.addEventListener('DOMContentLoaded', function() {
    const openAddressModal = document.getElementById('openAddressModal');
    const closeAddressModal = document.getElementById('closeAddressModal');
    const addressModal = document.getElementById('addressModal');

    // ouverture sur le click
    openAddressModal.addEventListener('click', () => {
        addressModal.classList.remove('hidden');
    })
    // fermeture sur le click
    closeAddressModal.addEventListener('click', () => {
        addressModal.classList.add('hidden');
    })
    // fermeture click en dehors
    document.addEventListener('click', (event) => {
        if (event.target === addressModal && event.target !== openAddressModal) {
            addressModal.classList.add('hidden');
        }
    });
    // fermeture après submit
})