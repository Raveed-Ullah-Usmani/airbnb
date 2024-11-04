import { LocalStorage } from 'node-localstorage';

const localStorage = new LocalStorage('./scratch');

localStorage.setItem('token', 'your_test_token');
localStorage.setItem('user', JSON.stringify({ email: 'test@example.com', role: 'admin' }));

const storedToken = localStorage.getItem('token');
const storedUser = localStorage.getItem('user');

console.log(storedToken);
console.log(storedUser);

localStorage.removeItem('token');
localStorage.removeItem('user');

const removedToken = localStorage.getItem('token');
const removedUser = localStorage.getItem('user');

console.log(removedToken);
console.log(removedUser);