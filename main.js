const express = require('express');
const app = express();

app.use(express.json());

let users = [
    { id: 1, name: "Ajay" },
    { id: 2, name: "Sita" }
];

// GET all users
app.get('/users', (req, res) => {
    res.json(users);
});

// GET user by ID
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({
            message: "User not found"
        });
    }
});

// POST create new user
app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        ...req.body
    };

    users.push(newUser);
    res.status(201).json(newUser);   // ✅ FIXED
});

// PUT update user
app.put('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id == req.params.id);

    if (userIndex >= 0) {
        users[userIndex] = {
            id: Number(req.params.id),
            ...req.body
        };
        res.json(users[userIndex]);
    } else {
        res.status(404).json({
            message: "User not found"
        });
    }
});

// DELETE user
app.delete('/users/:id', (req, res) => {
    users = users.filter(u => u.id != req.params.id);
    res.json({
        message: "User deleted!"
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000...");
});
