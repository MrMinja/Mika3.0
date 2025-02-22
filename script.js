document.addEventListener("DOMContentLoaded", function () {
    // 🎨 Komplett lista med bilder
    const imageSources = [
        "https://i.postimg.cc/mgS2HdmZ/1.jpg",
        "https://i.postimg.cc/q7kHH4X4/10.jpg",
        "https://i.postimg.cc/SKDFy3D8/11.jpg",
        "https://i.postimg.cc/SxLbPJ9g/12.jpg",
        "https://i.postimg.cc/sgCRKpMB/13.jpg",
        "https://i.postimg.cc/15qQpW3h/14.png",
        "https://i.postimg.cc/sxtCkWKN/15.jpg",
        "https://i.postimg.cc/VsTw0y1W/16.jpg",
        "https://i.postimg.cc/D0WKp6QG/17.jpg",
        "https://i.postimg.cc/nzSJ1gmZ/18.png",
        "https://i.postimg.cc/9fpVDrFD/19.jpg",
        "https://i.postimg.cc/qB9RV6tr/2.jpg",
        "https://i.postimg.cc/4dxGVsmB/20.jpg",
        "https://i.postimg.cc/k59qMx9r/21.jpg",
        "https://i.postimg.cc/7ZSqyKFM/22.jpg",
        "https://i.postimg.cc/xTw97w41/23.jpg",
        "https://i.postimg.cc/NGPs898T/24.jpg",
        "https://i.postimg.cc/NFLgqBt5/25.jpg",
        "https://i.postimg.cc/1XTyy2RM/26.jpg",
        "https://i.postimg.cc/Gh8cXLzf/27.png",
        "https://i.postimg.cc/j5xxcyk6/28.jpg",
        "https://i.postimg.cc/ZqFY6wjK/29.jpg",
        "https://i.postimg.cc/g2p2r9qB/3.jpg",
        "https://i.postimg.cc/Y9dpsjJ5/30-SELL.jpg",
        "https://i.postimg.cc/DzKyW9rM/31.jpg",
        "https://i.postimg.cc/wjNjjqmN/32.jpg",
        "https://i.postimg.cc/9XxMxN2D/33.jpg",
        "https://i.postimg.cc/fybbzYcW/34.jpg",
        "https://i.postimg.cc/jdLjBQqZ/35.jpg",
        "https://i.postimg.cc/4Nq3G7mZ/36.jpg",
        "https://i.postimg.cc/vHfmQ89V/4.jpg",
        "https://i.postimg.cc/sx0gv1mY/41.png",
        "https://i.postimg.cc/mDjDWmF6/42.jpg",
        "https://i.postimg.cc/G2d2fW9y/43.jpg",
        "https://i.postimg.cc/Dzq0Bvfh/44.jpg",
        "https://i.postimg.cc/1zx4GnQM/45.jpg",
        "https://i.postimg.cc/d0TrvcqN/46.gif",
        "https://i.postimg.cc/P5vPvbBP/48.jpg",
        "https://i.postimg.cc/QxtBhZmg/49.jpg",
        "https://i.postimg.cc/sXNkWSFg/5.jpg",
        "https://i.postimg.cc/HshrLvvq/50.png",
        "https://i.postimg.cc/7PXCFZ3Y/51.jpg",
        "https://i.postimg.cc/2yHVh0kB/52.png",
        "https://i.postimg.cc/pTJ9X23C/53.jpg",
        "https://i.postimg.cc/PJfCCgjj/54.jpg",
        "https://i.postimg.cc/PxjpjLVN/55.png",
        "https://i.postimg.cc/K8C30pnP/56-SELL.png",
        "https://i.postimg.cc/fbXtp7K6/57-SELL.png",
        "https://i.postimg.cc/Z5WyFzyY/58.png",
        "https://i.postimg.cc/wTTNMmqm/59-SELL.png",
        "https://i.postimg.cc/PfMZd4jH/60.png",
        "https://i.postimg.cc/6qzGz90q/61.png",
        "https://i.postimg.cc/XqnCwZ9t/62.png",
        "https://i.postimg.cc/gJVhXyLv/63.png",
        "https://i.postimg.cc/63JRpbqW/64.jpg",
        "https://i.postimg.cc/v877cy5p/65.png"
    ];

    const grid = document.querySelector(".image-grid");

    let isAdmin = localStorage.getItem("isAdmin") === "true";
    let savedOrder = JSON.parse(localStorage.getItem("imageOrder"));

    // Om ingen sparad ordning finns, använd standardordningen
    if (!savedOrder || savedOrder.length !== imageSources.length) {
        savedOrder = [...imageSources];
        localStorage.setItem("imageOrder", JSON.stringify(savedOrder));
    }

    function loadImages() {
        grid.innerHTML = "";
        savedOrder.forEach((src) => {
            const wrapper = document.createElement("div");
            wrapper.classList.add("image-wrapper");
            wrapper.setAttribute("draggable", isAdmin ? "true" : "false");
            wrapper.style.cursor = isAdmin ? "grab" : "default"; // Ingen förbjudet-symbol (🚫)

            const img = document.createElement("img");
            img.src = src;
            img.alt = "Projektbild";
            img.loading = "lazy";

            wrapper.appendChild(img);
            grid.appendChild(wrapper);
        });

        if (isAdmin) addDragAndDropListeners();
    }

    function addDragAndDropListeners() {
        let draggedItem = null;

        document.querySelectorAll(".image-wrapper").forEach((item) => {
            item.addEventListener("dragstart", (e) => {
                if (!isAdmin) {
                    e.preventDefault();
                    return;
                }
                draggedItem = item;
                setTimeout(() => item.classList.add("hidden"), 0);
            });

            item.addEventListener("dragend", () => {
                draggedItem.classList.remove("hidden");
                saveImageOrder();
            });

            item.addEventListener("dragover", (e) => e.preventDefault());

            item.addEventListener("drop", (e) => {
                e.preventDefault();
                if (!isAdmin || draggedItem === item) return;

                const allItems = [...grid.querySelectorAll(".image-wrapper")];
                const droppedIndex = allItems.indexOf(item);
                grid.insertBefore(draggedItem, droppedIndex < allItems.indexOf(draggedItem) ? item : item.nextSibling);
                saveImageOrder();
            });
        });
    }

    function saveImageOrder() {
        const newOrder = [...document.querySelectorAll(".image-wrapper img")].map(img => img.src);
        localStorage.setItem("imageOrder", JSON.stringify(newOrder));
        savedOrder = newOrder; // Uppdatera ordningen så att alla besökare ser den
    }

    function toggleAdminMode() {
        isAdmin = !isAdmin;
        localStorage.setItem("isAdmin", isAdmin);
        alert(`Adminläge ${isAdmin ? "aktiverat" : "avaktiverat"}! Ladda om sidan.`);
        location.reload();
    }

    document.addEventListener("keydown", function (event) {
        if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "h") {
            event.preventDefault();
            toggleAdminMode();
        }
    });

    loadImages();
});