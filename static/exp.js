var loid = 2147483647,
    updating = false;
const getloid = () => {
    const element = document.getElementById("loid");
    if (element) {
        loid = parseInt(element.innerText) - 1;
        element.remove();
    }
};
getloid();
const scheck = () => {
    if (updating || loid == -2) {
        return;
    }
    updating = true;
    var visibleBottom = window.scrollY + document.documentElement.clientHeight;
    const grid = document.getElementById("postsGrid");
    var gridY = grid.offsetTop + grid.clientHeight;
    if (gridY < visibleBottom + 1600) {
        fetch(`/exp/?lo_id=${loid}&headless=1`)
            .then((res) => {
                if (res.status == 200) {
                    return res.text();
                }
                return "";
            })
            .then((html) => {
                document.getElementById("postsGrid").innerHTML += html;
                getloid();
                updating = false;
                scheck();
            });
    } else {
        updating = false;
    }
};
window.onscroll = scheck;
scheck();
