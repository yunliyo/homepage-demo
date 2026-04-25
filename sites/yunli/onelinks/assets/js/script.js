function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const dropBtn = document.querySelector('.dropbtn');
    if (dropBtn) {
        dropBtn.addEventListener('click', function(e) {
            if (window.innerWidth <= 600) {
                const topnav = document.getElementById('myTopnav');
                if (topnav.classList.contains('responsive')) {
                    const dropdown = document.querySelector('.dropdown');
                    dropdown.classList.toggle('responsive-dropdown');                
                    e.stopPropagation();
                }
            }
        });
        document.addEventListener('click', function(e) {
            const dropdown = document.querySelector('.dropdown');
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('responsive-dropdown');
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const mainFrame = document.getElementById('mainFrame');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-target');
            if(targetPage) {
                mainFrame.src = targetPage;
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
            const topnav = document.getElementById('myTopnav');
            if(topnav.classList.contains('responsive')) {
                topnav.className = "topnav";
            }
        });
    });
});
