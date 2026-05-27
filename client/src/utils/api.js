

export const backend_url = 'http://localhost:5000'

export async function apiRequest(method, url, headers, body) {
 const response = await fetch(backend_url+url, {
  method: method,
  credentials: 'include',
  headers: {
   'Content-Type': 'application/json', 
   ...headers
  },
  body: JSON.stringify(body)
 });
 const result = await response.json();
 return result;
}

export async function rawApiRequest(method, url, headers, body) {
 const response = await fetch(url, {
  method: method,
  headers: {
   'Content-Type': 'application/json', 
   ...headers
  },
  body: JSON.stringify(body)
 });
 const result = await response.json();
 return result;
}


export default apiRequest;
