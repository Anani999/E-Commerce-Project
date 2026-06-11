import Address from '../models/address.js';

async function createAddress(address) {
 if(typeof address !== 'object') throw new Error('Invalid address type !, it should be object with fields');
 const newAddress = await Address.create(address);
 return newAddress;
};

async function getUserAddresses(id) {
 const addresses = await Address.find({ user: id});
 return addresses;
};

export { createAddress, getUserAddresses };
