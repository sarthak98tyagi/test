let VH, VW;
function viewport() {
    VW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    VH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
}
$(document).ready( function () {
    viewport();
});
window.onresize = function () {
    viewport();
};



