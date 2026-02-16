document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});
document.onkeydown = function (e) {
    if (e.keyCode === 123) {
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
        e.preventDefault();
    }
    if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
    }
};
document.addEventListener('copy', function (e) {
    e.preventDefault();
});
document.addEventListener('paste', function (e) {
    e.preventDefault();
});
document.addEventListener('cut', function (e) {
    e.preventDefault();
});
document.addEventListener('dragstart', function (e) {
    e.preventDefault();
});
document.addEventListener('mousedown', function (e) {
    if (e.button === 1) {
        e.preventDefault();
    }
});
document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && (e.keyCode === 80 || e.keyCode === 83)) {
        e.preventDefault();
    }
});
document.addEventListener('keydown', function (e) {
    if (e.keyCode >= 112 && e.keyCode <= 123 && e.keyCode !== 116) {
        e.preventDefault();
    }
});
document.addEventListener('keydown', function (e) {
    if (e.key === 'F12') {
        e.preventDefault();
    }
});