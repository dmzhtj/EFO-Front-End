var loid = 2147483647,
    updating = false;
const filterStrip = document.querySelector(".filter-strip");
let activeCategory = "all";
const getloid = () => {
    const element = document.getElementById("loid");
    if (element) {
        loid = parseInt(element.innerText) - 1;
        element.remove();
    }
};
getloid();
const applyCategoryFilter = () => {
    document.querySelectorAll(".post-card").forEach((card) => {
        const category = card.querySelector(".card-category")?.textContent.trim().toLowerCase();
        card.hidden = activeCategory !== "all" && category !== activeCategory;
    });
};
filterStrip.addEventListener("click", (event) => {
    const button = event.target.closest(".filter-btn");
    if (!button) {
        return;
    }
    activeCategory = button.dataset.filter;
    filterStrip.querySelectorAll(".filter-btn").forEach((filterButton) => {
        const active = filterButton === button;
        filterButton.classList.toggle("active", active);
        filterButton.setAttribute("aria-pressed", active);
    });
    applyCategoryFilter();
});
filterStrip.querySelectorAll(".filter-btn").forEach((button) => {
    button.setAttribute("aria-pressed", button.classList.contains("active"));
});
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
                applyCategoryFilter();
                updating = false;
                scheck();
            });
    } else {
        updating = false;
    }
};
window.onscroll = scheck;
scheck();
