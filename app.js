document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    document.querySelector("form").reset();
    if (name !== "") {
        const item = {
            id: new Date().toISOString(),
            name: name.trim(),
        };
        addItemToLS(item);
    } else {
        alert("Tên không thể bỏ trống hoặc chứa toàn khoảng trắng !!!");
    }
});

// Add to Localstorage
const addItemToLS = (item) => {
    const card = document.createElement("div");
    card.className =
        "card p-2 flex-row justify-content-between align-items-center mb-3";
    card.innerHTML = `<span>${item.name}</span>
     <button class='btn btn-sm btn-danger btn-remove' data-id='${item.id}'>
        Remove
     </button>
    `;
    document.querySelector(".list").appendChild(card);
    const list = getList();
    list.push(item);
    localStorage.setItem("list", JSON.stringify(list));
};

// Add to UI
const addItemToUI = (item) => {
    const card = document.createElement("div");
    card.className =
        "card p-2 flex-row justify-content-between align-items-center mb-3";
    card.innerHTML = `<span>${item.name}</span>
     <button class='btn btn-sm btn-danger btn-remove' data-id='${item.id}'>
        Remove
     </button>
    `;
    document.querySelector(".list").appendChild(card);
};

// Remove from Localstorage
const removeItemFromLS = (id) => {
    const list = getList();
    const index = list.findIndex((item) => item.id === id);
    list.splice(index, 1);
    localStorage.setItem("list", JSON.stringify(list));
};

// Listen remove
document.querySelector(".list").addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-remove")) {
        const name = event.target.previousElementSibling.textContent;
        const isConfirmed = confirm(`Bạn có muốn xoá item ' ${name} ' ?`);
        if (isConfirmed) {
            const card = event.target.parentElement;
            const id = event.target.dataset.id;
            // Remove from UI
            card.remove();
            // Remove from LS
            removeItemFromLS(id);
        }
    }
});

// Remove all
document.getElementById("btn-remove-all").addEventListener("click", () => {
    const isConfirmed = confirm("Bạn có muốn xoá tất cả các item không ?");
    if (isConfirmed) {
        // Remove all on UI
        document.querySelector(".list").innerHTML = "";
        // Remove all on Localstorage
        localStorage.removeItem("list");
    }
});

// Filter
document.getElementById("filter").addEventListener("keyup", (event) => {
    const value = event.target.value.trim();
    const list = getList();
    const filteredList = list.filter((item) => {
        return item.name.toLowerCase().includes(value.toLowerCase());
    });
    document.querySelector(".list").innerHTML = "";
    filteredList.forEach((item) => {
        addItemToUI(item);
    });
});

// Get List
const getList = () => JSON.parse(localStorage.getItem("list")) || [];

const init = () => {
    const list = getList();
    list.forEach((item) => {
        addItemToUI(item);
    });
};
init();
