document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login_form');
    const goToRecovery = document.getElementById('go_to_recovery');

    const recoveryForm = document.getElementById('recovery_form');
    const backToLogin = document.getElementById('back_to_login');

    if (goToRecovery) {
        goToRecovery.addEventListener('click', () => {
            loginForm.classList.add('hidden');
            recoveryForm.classList.remove('hidden');
        })
    }

    if (backToLogin) {
        backToLogin.addEventListener('click', () => {
            loginForm.classList.remove('hidden');
            recoveryForm.classList.add('hidden');
        })
    }
})