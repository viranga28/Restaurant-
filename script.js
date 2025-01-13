const menu = document.getElementById('menu');
const orderList = document.getElementById('order');
const totalDisplay = document.getElementById('total');
let order = [];

const menuItems = [
    { id: 1, name: "Burger", price: 10.99 },
    { id: 2, name: "Pizza", price: 12.99 },
    { id: 3, name: "Salad", price: 7.99 },
    { id: 4, name: "Fries", price: 4.99 },
    { id: 5, name: "Soda", price: 2.99 }
];

function displayMenu() {
    menuItems.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');
        menuItem.innerHTML = `<h3>${item.name}</h3><p>$${item.price.toFixed(2)}</p>`;
        menuItem.addEventListener('click', () => addToOrder(item));
        menu.appendChild(menuItem);
    });
}

function addToOrder(item) {
    order.push(item);
    updateOrderDisplay();
}

function updateOrderDisplay() {
    orderList.innerHTML = '';
    let total = 0;
    order.forEach(item => {
        const orderItem = document.createElement('li');
        orderItem.classList.add('order-item');
        orderItem.innerHTML = `<span>${item.name}</span><span>$${item.price.toFixed(2)}</span>`;
        orderList.appendChild(orderItem);
        total += item.price;
    });
    totalDisplay.textContent = total.toFixed(2);
}

displayMenu();
