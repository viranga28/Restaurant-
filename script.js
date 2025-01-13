const menu = document.getElementById('menu');
const orderList = document.getElementById('order');
const totalDisplay = document.getElementById('total');
let order = [];

// Simulated backend data and functions
const backend = {
    menuItems: [
        { id: 1, name: "Burger", price: 10.99 },
        { id: 2, name: "Pizza", price: 12.99 },
        { id: 3, name: "Salad", price: 7.99 },
        { id: 4, name: "Fries", price: 4.99 },
        { id: 5, name: "Soda", price: 2.99 }
    ],
    getMenuItems: function() {
        return new Promise(resolve => {
            setTimeout(() => resolve(this.menuItems), 500); // Simulate API delay
        });
    },
    submitOrder: function(orderData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log("Order submitted:", orderData);
                resolve({ success: true, message: "Order placed successfully!" });
            }, 1000);
        });
    }
};

async function displayMenu() {
    const menuItems = await backend.getMenuItems();
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

async function submitOrder() {
    if (order.length === 0) {
        alert("Your order is empty!");
        return;
    }

    const orderData = order.map(item => ({ id: item.id, name: item.name, price: item.price }));
    const response = await backend.submitOrder(orderData);
    if (response.success) {
        alert(response.message);
        order = [];
        updateOrderDisplay();
    } else {
        alert("Error placing order.");
    }
}

// Add submit button
const submitButton = document.createElement('button');
submitButton.textContent = "Submit Order";
submitButton.addEventListener('click', submitOrder);
document.body.appendChild(submitButton);

displayMenu();
