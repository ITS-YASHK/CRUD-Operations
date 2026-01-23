let users = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com" },
    { id: 2, name: "Bob Smith", email: "bob@example.com" }
];

const tableBody = document.getElementById('userTableBody');
const nameInput = document.getElementById('userName');
const emailInput = document.getElementById('userEmail');
const idInput = document.getElementById('userId');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');

// READ: Display users in the table
function renderTable() {
    tableBody.innerHTML = "";
    users.forEach(user => {
        const row = `<tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>
                <button class="edit-btn" onclick="editUser(${user.id})">Edit</button>
                <button class="delete-btn" onclick="deleteUser(${user.id})">Delete</button>
            </td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// CREATE / UPDATE
function handleFormSubmit() {
    const name = nameInput.value;
    const email = emailInput.value;
    const id = idInput.value;

    if (!name || !email) return alert("Please fill all fields");

    if (id) {
        // Update existing user logic remains the same
        const index = users.findIndex(u => u.id == id);
        users[index] = { id: parseInt(id), name, email };
    } else {
        // IMPROVED CREATE LOGIC: 
        // Find the maximum ID currently in the array and add 1. 
        // If the array is empty, start at 1.
        const maxId = users.length > 0 ? Math.max(...users.map(u => u.id)) : 0;
        const newUser = { 
            id: maxId + 1, 
            name: name, 
            email: email 
        };
        users.push(newUser);
    }

    resetForm();
    renderTable();
}

// DELETE
function deleteUser(id) {
    users = users.filter(user => user.id !== id);
    renderTable();
}

// EDIT: Move data to form
function editUser(id) {
    const user = users.find(u => u.id === id);
    idInput.value = user.id;
    nameInput.value = user.name;
    emailInput.value = user.email;
    
    submitBtn.innerText = "Update User";
    cancelBtn.style.display = "inline-block";
}

function resetForm() {
    idInput.value = "";
    nameInput.value = "";
    emailInput.value = "";
    submitBtn.innerText = "Add User";
    cancelBtn.style.display = "none";
}

// Initial Load
renderTable();