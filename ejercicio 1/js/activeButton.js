document.querySelectorAll('.button-nav').forEach(function(link){
    link.addEventListener('click', function() {
        document.querySelector('.button-nav.active')?.classList.remove('active');
        this.classList.add('active');
    });
});