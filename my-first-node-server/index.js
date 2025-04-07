import "dotenv/config";
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import userRoutes from './routes/userRoutes.js';
import platRoute from './routes/platRoute.js';
import ingredientRoute from './routes/ingredientRoute.js';
import authRoute from './routes/authRoute.js';

const app = express();
const PORT = process.env.PORT || 8888;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use('/', userRoutes);
app.use('/', platRoute);
app.use('/', ingredientRoute);
app.use('/', authRoute);



// const users = [
//     {id: 1, name: 'Alice', age : 30},
//     {id: 2, name: 'Beck', age : 25},
//     {id: 3, name: 'Chris', age : 28},
//     {id: 4, name: 'David', age : 27},
//     {id: 5, name: 'Eve', age : 26},
// ];
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// app.get('/users', (req, res) => {
//     res.json(users);
// });

// app.get('/users/:id', (req, res) => {
//     const id = req.params.id;
//     console.log(id);
//     const user = users.find((u) => u.id === parseInt(id));
//     res.send(JSON.stringify(user));
// });

// app.post('/users/', (req, res) => {
//     const {name, age} = req.body;

//     const newUser = {
//         id: users.length + 1,
//         name,
//         age,
//     };

// users.push(newUser);
// res.status(201).json(newUser);

// });

// app.put('/users/:id', (req, res) => {
//     const user = users.find(user => user.id === parseInt(req.params.id));
//     if (!user) {
//         const error = new Error('User not found');
//         error.status = 404;
//         return next(error);
//     }
//     const {name, age} = req.body;
//     if (name) user.name = name;
//     if (age) user.age = age;
//     res.json(user);
// });

// app.delete('/users/', (req, res) => {
//     const userIndex = users.findIndex(user => user.id === parseInt(req.params.id));
//     users.splice(userIndex, 1);
//     res.json({message: 'User deleted'});
// });


//PRODUITS

const products = [
    {id: 1, name: 'Product 1', price : 19.99},
    {id: 2, name: 'Product 2', price : 15.99},
    {id: 3, name: 'Product 3', price : 24.99},
    {id: 4, name: 'Product 4', price : 20.99},
    {id: 5, name: 'Product 5', price : 17.99},
    {id: 6, name: 'Product 6', price : 22.99},
    {id: 7, name: 'Product 7', price : 18.99},
    {id: 8, name: 'Product 8', price : 25.99},
    {id: 9, name: 'Product 9', price : 21.99},
    {id: 10, name: 'Product 10', price : 23.99},
    {id: 11, name: 'Product 11', price : 20.99},
    {id: 12, name: 'Product 12', price : 22.99},
    {id: 13, name: 'Product 13', price : 18.99},
    {id: 14, name: 'Product 14', price : 24.99},
    {id: 15, name: 'Product 15', price : 21.99},
    {id: 16, name: 'Product 16', price : 23.99},
    {id: 17, name: 'Product 17', price : 19.99},
    {id: 18, name: 'Product 18', price : 25.99},
    {id: 19, name: 'Product 19', price : 21.99},
    {id: 20, name: 'Product 20', price : 23.99},
];
app.get('/products', (req, res) => {
    res.json(products);
});

app.get('/products/:id', (req, res) => {
    const id = req.params.id;
    const product = products.find((p) => p.id === parseInt(id));
    res.json(product);
});


app.delete('/products/:id', (req, res) => {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    products.splice(productIndex, 1);
    res.json({ message: 'Product deleted' });
});

app.post('/products', (req, res) => {
    const { name, price } = req.body;

    const newProduct = {
        id: products.length + 1,
        name,
        price,
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
});

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
});

