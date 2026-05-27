import fs from 'fs'

const username = 'testUser';
const password = 'test_pass'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZWRiNDMyYWUwYTZkYTVmMDU5Y2Y2NCIsImlhdCI6MTc3NzI3ODg0NCwiZXhwIjoxNzc3MjgyNDQ0fQ.yybtEwXQ8lu_Y2Vz2iJsb5vlgTrzm6p2XPrw6vIUWVQ';
const invalid_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZWRiNDMyYWUwYTZkYTVmMDU5Y2Y2NCIsImlhdCI6MTc3NzE5NjU4MywiZXhwIjoxNzc3MjAwMTgzfQ.1zGy4JFdlsjFLJFLjdl';
const invalid_token2 = 'fsjf;dsj3903rj3';
var admin_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZWRmZTY5NmRhYmU5Y2ViYjJhNDczMCIsImlhdCI6MTc3NzI4NTM1OSwiZXhwIjoxNzc3Mjg4OTU5fQ.4koOcdlJf8TSsE3_NGner4j635QzMxrmBee4WjDnKe8'

async function login(username, password){
const res = await fetch("http://localhost:5000/api/auth/login", {
 method: "POST",
 headers: { "Content-Type": "application/json"},
 body: JSON.stringify({ username, password})
});

const data = await res.json();
console.log(data);
}

async function authApi(token){
 const res = await fetch("http://localhost:5000/admin", {
  method: "GET",
  headers: { "Authorization":"bearer "+ token}
 });

 const data = await res.json();
 console.log(data);
}

async function register(username, email ,password){
const res = await fetch("http://localhost:5000/api/auth/register", {
 method: "POST",
 headers: { "Content-Type": "application/json"},
 body: JSON.stringify({ username, password, email})
});

const data = await res.json();
console.log(data);
}

async function createProduct(token){
 const image_file = await fs.openAsBlob('/home/aani/Downloads/fullstack_book.jpg');
 const formData = new FormData();
 
  formData.append('name', 'The Full Stack Developer')
  formData.append('info', 'The Full Stack Developer: Your Essential Guide to the Everyday Skills Expected of a Modern Full Stack Web Developer')
  formData.append('price', 2800)
  formData.append('image', image_file, 'book.jpg')

 const res = await fetch('http://localhost:5000/api/product/', {
  method: 'POST',
  headers: { "Authorization" : `bearer ${token}`},
  body: formData
 });

 const result = await res.json();
 console.log(result);
}

async function getProducts(token){
 const res = await fetch('http://localhost:5000/api/product?page=1', {
  headers: {'Authorization':`bearer ${token}`}
 });

 const result = await res.json();
 console.log(result.data);
}

async function getProductById(id, token){
 const res = await fetch('http://localhost:5000/api/product/'+id, {
  headers: {'Authorization':`bearer ${token}`}
 });

 const result = await res.json();
 console.log(result);
}

//login('adminUser', 'admin_pass');
//getProducts(admin_token)
createProduct(admin_token);
