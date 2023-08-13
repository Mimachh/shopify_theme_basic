document.addEventListener('DOMContentLoaded', function() {
    const openSearchBar = document.querySelectorAll('.button-search');
    console.log(openSearchBar);
    const closeSearchBar = document.getElementById('close-search');
    const searchBar = document.getElementById('search-bar');

    openSearchBar.forEach(button => {
        button.addEventListener('click', () => {
            searchBar.classList.remove('hidden');
        });
    });

        closeSearchBar.addEventListener('click', () => {
        searchBar.classList.add('hidden');
    })
})