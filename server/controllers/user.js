import { success } from '../utils/apiResponse.js'
import { 
 getUserAddresses as userAddresses,
 createAddress as createUserAddress
} from '../services/address.js';

async function getUserAddresses(req, res) {
 const addresses = await userAddresses(req.user._id);
 return success(res, 'Address fetched', { addresses });
};

async function createAddress(req, res) {
 const { state, district, area, house, pincode, phone } = req.body;
 const newAddress = await createUserAddress({ state, district, area, house, pincode, user: req.user._id, phone });
 return success(res, 'Address created ', { address: newAddress });
};

export { getUserAddresses, createAddress };
