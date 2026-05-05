import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '₹';
    const delivery_fee = 100;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    // 1. Add to Cart Logic
    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error("Please select product size");
            return;
        }

        let cartData = structuredClone(cartItems) || {};

        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }

        if (cartData[itemId][size]) {
            cartData[itemId][size] += 1;
        } else {
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } });
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    // 2. Get Total Item Count
    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
        return totalCount;
    }

    // 3. Update Quantity (or delete)
    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems) || {};
        if (!cartData[itemId]) cartData[itemId] = {};
        cartData[itemId][size] = quantity;
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } });
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    // 4. Calculate Total Amount
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (!itemInfo) continue;

            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += cartItems[items][item] * itemInfo.price;
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
        return totalAmount;
    }

    // 5. API: Fetch All Products
    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/all');
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    // 6. API: Fetch User Cart (with Product Guard)
    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } });
            if (response.data.success) {
                setCartItems(response.data.cartData || {});
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    // 7. Logout
    const logout = () => {
        navigate('/login');
        setToken('');
        setUserData(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        setCartItems({});
    }

    // --- INITIALIZATION LOGIC ---

    // A. Fetch products as soon as the app starts
    useEffect(() => {
        getProductsData();
    }, [])

    // B. Recover token and user data from localStorage
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (!token && storedToken) {
            setToken(storedToken);
        }

        const storedUser = localStorage.getItem('userData');
        if (storedUser) {
            setUserData(JSON.parse(storedUser));
        }
    }, [])

    // C. SYNC CART: Only fetch cart when BOTH token AND products are ready
    useEffect(() => {
        if (token && products.length > 0) {
            getUserCart(token);
        }
    }, [token, products]) // Listens for both to be fully loaded

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, setCartItems, addToCart,
        getCartCount, updateQuantity,
        getCartAmount, navigate, backendUrl,
        token, setToken, userData, setUserData, logout
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;