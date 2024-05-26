import { useContext, useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faEnvelope,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../context/AuthContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const [selectedCategory, setSelectedCategory] = useState("");

  const { checkAdmin } = useContext(AuthContext);

  useEffect(() => {
    checkAdmin();
  },[]);

  const [sample_data, setProducts] = useState([
    {
      id: 1,
      title: "Lululemon Comfort Tee - White",
      category: "T-shirt",
      description:
        "Elevate your everyday style with our Classic Comfort Cotton T-Shirt. Crafted from 100% premium cotton, this tee offers unparalleled softness and breathability, making it perfect for any season. Its timeless design features a crew neckline and a relaxed fit, providing both comfort and versatility. Whether you're dressing it up with a blazer or keeping it casual with jeans, this t-shirt is a wardrobe essential that combines effortless style with maximum comfort. Available in a variety of colors, it’s the perfect foundation for any outfit.",
      price: "79",
      imageUrl:
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1072&q=80",
      itemCount: 0,
    },
    {
      id: 2,
      title: "Nike Running Shoes",
      category: "Shoes",
      description:
        "Elevate your everyday style with our Classic Comfort Cotton T-Shirt. Crafted from 100% premium cotton, this tee offers unparalleled softness and breathability, making it perfect for any season. Its timeless design features a crew neckline and a relaxed fit, providing both comfort and versatility. Whether you're dressing it up with a blazer or keeping it casual with jeans, this t-shirt is a wardrobe essential that combines effortless style with maximum comfort. Available in a variety of colors, it’s the perfect foundation for any outfit.",
      price: "120",
      imageUrl:
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3f3e7049-5c99-428c-abcd-e246b086f2ed/air-force-1-07-shoes-VWCc04.png",
      itemCount: 0,
    },
    {
      id: 3,
      title: "Adidas Soccer Ball",
      category: "Sports",
      description:
        "Elevate your everyday style with our Classic Comfort Cotton T-Shirt. Crafted from 100% premium cotton, this tee offers unparalleled softness and breathability, making it perfect for any season. Its timeless design features a crew neckline and a relaxed fit, providing both comfort and versatility. Whether you're dressing it up with a blazer or keeping it casual with jeans, this t-shirt is a wardrobe essential that combines effortless style with maximum comfort. Available in a variety of colors, it’s the perfect foundation for any outfit.",
      price: "45",
      imageUrl:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/68cb5b22233a407599dd948fd959dedc_9366/INDIA_LIMITED_EDITION_SHOE_WOMEN_White_IV4475_02_standard_hover.jpg",
      itemCount: 0,
    },
    {
      id: 4,
      title: "Ray-Ban Sunglasses",
      category: "Accessories",
      description:
        "Elevate your everyday style with our Classic Comfort Cotton T-Shirt. Crafted from 100% premium cotton, this tee offers unparalleled softness and breathability, making it perfect for any season. Its timeless design features a crew neckline and a relaxed fit, providing both comfort and versatility. Whether you're dressing it up with a blazer or keeping it casual with jeans, this t-shirt is a wardrobe essential that combines effortless style with maximum comfort. Available in a variety of colors, it’s the perfect foundation for any outfit.",
      price: "99",
      imageUrl:
        "https://himalayaoptical.com/cdn/shop/products/8056597625241_1_1024x1024.jpg?v=1656746401",
      itemCount: 0,
    },
    {
      id: 5,
      title: "Levi's Denim Jacket",
      category: "Jacket",
      description:
        "Elevate your everyday style with our Classic Comfort Cotton T-Shirt. Crafted from 100% premium cotton, this tee offers unparalleled softness and breathability, making it perfect for any season. Its timeless design features a crew neckline and a relaxed fit, providing both comfort and versatility. Whether you're dressing it up with a blazer or keeping it casual with jeans, this t-shirt is a wardrobe essential that combines effortless style with maximum comfort. Available in a variety of colors, it’s the perfect foundation for any outfit.",
      price: "89",
      imageUrl:
        "https://images-cdn.ubuy.co.in/64c95ab7fe82525f6e6e905e-levi-s-boys-denim-trucker-jacket-sizes.jpg",
      itemCount: 0,
    },
    {
      id: 6,
      title: "Lululemon Comfort Tee - White",
      category: "T-shirt",
      description:
        "Elevate your everyday style with our Classic Comfort Cotton T-Shirt. Crafted from 100% premium cotton, this tee offers unparalleled softness and breathability, making it perfect for any season. Its timeless design features a crew neckline and a relaxed fit, providing both comfort and versatility. Whether you're dressing it up with a blazer or keeping it casual with jeans, this t-shirt is a wardrobe essential that combines effortless style with maximum comfort. Available in a variety of colors, it’s the perfect foundation for any outfit.",
      price: "79",
      imageUrl:
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1072&q=80",
      itemCount: 0,
    },
    {
      id: 7,
      title: "Nike Running Shoes",
      category: "Shoes",
      description:
        "Elevate your everyday style with our Classic Comfort Cotton T-Shirt. Crafted from 100% premium cotton, this tee offers unparalleled softness and breathability, making it perfect for any season. Its timeless design features a crew neckline and a relaxed fit, providing both comfort and versatility. Whether you're dressing it up with a blazer or keeping it casual with jeans, this t-shirt is a wardrobe essential that combines effortless style with maximum comfort. Available in a variety of colors, it’s the perfect foundation for any outfit.",
      price: "120",
      imageUrl:
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3f3e7049-5c99-428c-abcd-e246b086f2ed/air-force-1-07-shoes-VWCc04.png",
      itemCount: 0,
    },
    {
      id: 8,
      title: "Adidas Soccer Ball",
      category: "Sports",
      description:
        "Elevate your everyday style with our Classic Comfort Cotton T-Shirt. Crafted from 100% premium cotton, this tee offers unparalleled softness and breathability, making it perfect for any season. Its timeless design features a crew neckline and a relaxed fit, providing both comfort and versatility. Whether you're dressing it up with a blazer or keeping it casual with jeans, this t-shirt is a wardrobe essential that combines effortless style with maximum comfort. Available in a variety of colors, it’s the perfect foundation for any outfit.",
      price: "45",
      imageUrl:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/68cb5b22233a407599dd948fd959dedc_9366/INDIA_LIMITED_EDITION_SHOE_WOMEN_White_IV4475_02_standard_hover.jpg",
      itemCount: 0,
    },
    {
      id: 9,
      title: "Ray-Ban Sunglasses",
      category: "Accessories",
      description:
        "Elevate your everyday style with our Classic Comfort Cotton T-Shirt. Crafted from 100% premium cotton, this tee offers unparalleled softness and breathability, making it perfect for any season. Its timeless design features a crew neckline and a relaxed fit, providing both comfort and versatility. Whether you're dressing it up with a blazer or keeping it casual with jeans, this t-shirt is a wardrobe essential that combines effortless style with maximum comfort. Available in a variety of colors, it’s the perfect foundation for any outfit.",
      price: "99",
      imageUrl:
        "https://himalayaoptical.com/cdn/shop/products/8056597625241_1_1024x1024.jpg?v=1656746401",
      itemCount: 0,
    },
    {
      id: 10,
      title: "Levi's Denim Jacket",
      category: "Jacket",
      description:
        "Elevate your everyday style with our Classic Comfort Cotton T-Shirt. Crafted from 100% premium cotton, this tee offers unparalleled softness and breathability, making it perfect for any season. Its timeless design features a crew neckline and a relaxed fit, providing both comfort and versatility. Whether you're dressing it up with a blazer or keeping it casual with jeans, this t-shirt is a wardrobe essential that combines effortless style with maximum comfort. Available in a variety of colors, it’s the perfect foundation for any outfit.",
      price: "89",
      imageUrl:
        "https://images-cdn.ubuy.co.in/64c95ab7fe82525f6e6e905e-levi-s-boys-denim-trucker-jacket-sizes.jpg",
      itemCount: 0,
    },
  ]);

  const sample_category = [
    {
      id: 6,
      title: "Lululemon Comfort Tee - White",
      category: "T-shirt",
      price: "79",
      imageUrl:
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1072&q=80",
    },
    {
      id: 7,
      title: "Nike Running Shoes",
      category: "Shoes",
      price: "120",
      imageUrl:
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3f3e7049-5c99-428c-abcd-e246b086f2ed/air-force-1-07-shoes-VWCc04.png",
    },
    {
      id: 8,
      title: "Adidas Soccer Ball",
      category: "Sports",
      price: "45",
      imageUrl:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/68cb5b22233a407599dd948fd959dedc_9366/INDIA_LIMITED_EDITION_SHOE_WOMEN_White_IV4475_02_standard_hover.jpg",
    },
    {
      id: 9,
      title: "Ray-Ban Sunglasses",
      category: "Accessories",
      price: "99",
      imageUrl:
        "https://himalayaoptical.com/cdn/shop/products/8056597625241_1_1024x1024.jpg?v=1656746401",
    },
    {
      id: 10,
      title: "Levi's Denim Jacket",
      category: "Jacket",
      price: "89",
      imageUrl:
        "https://images-cdn.ubuy.co.in/64c95ab7fe82525f6e6e905e-levi-s-boys-denim-trucker-jacket-sizes.jpg",
    },
  ];

  useEffect(() => {
    const userCart = localStorage.getItem("cart");
    if (userCart && userCart.length > 0) {
      const cart = JSON.parse(userCart);
      // Update the sample data with item counts from the cart
      const updatedData = sample_data.map((product) => {
        const cartItem = cart.find((item) => item.id === product.id);
        if (cartItem) {
          return { ...product, itemCount: cartItem.itemCount };
        }
        return product;
      });

      setProducts(updatedData);
    }
  }, []);

  useEffect(() => {
    // Save cart data to localStorage
    const cartData = sample_data.filter((product) => product.itemCount > 0);
    console.log("set cart", cartData);
    if (cartData.length) {
      localStorage.setItem("cart", JSON.stringify(cartData));
    }
  }, [sample_data]);

  const addToCart = async (product) => {
    if (!token) {
      toast("Login Before Buying Products!", {
        icon: (
          <FontAwesomeIcon
            className='text-yellow-700'
            icon={faExclamationCircle}
          />
        ),
      });
      navigate("/login");
      return;
    }
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === product.id ? { ...p, itemCount: p.itemCount + 1 } : p
      )
    );
  };

  const removeFromCart = (product) => {
    if (!token) {
      toast("Login Before Removing Products!", {
        icon: (
          <FontAwesomeIcon
            className='text-yellow-700'
            icon={faExclamationCircle}
          />
        ),
      });
      navigate("/login");
      return;
    }

    // Update the product in the state
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === product.id && p.itemCount > 0
          ? { ...p, itemCount: p.itemCount - 1 }
          : p
      )
    );
    console.log("Product removed from cart:", product);
  };

  const setToCart = () => {
    const cart = sample_data.filter((product) => {
      return product.itemCount > 0;
    });
    console.log("setCart", cart);
    // localStorage.setItem("cart", );
  };

  return (
    <div>
      <Navbar />
      <div
        className='container-fluid page-header py-5 mb-5 wow fadeIn'
        data-wow-delay='0.1s'
      >
        <div className='container text-center py-5'>
          <h1 className='display-3 text-white mb-4 animated slideInDown'>
            Product Detail
          </h1>
          <nav aria-label='breadcrumb animated slideInDown'>
            <ol className='breadcrumb justify-content-center mb-0'>
              <li className='breadcrumb-item'>
                <a href='#'>Home</a>
              </li>
              <li className='breadcrumb-item'>
                <a href='#'>Pages</a>
              </li>
              <li className='breadcrumb-item'>
                <a href='#'>Product</a>
              </li>
              <li
                className='breadcrumb-item active text-white'
                aria-current='page'
              >
                Product Detail
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className='container-xxl'>
        <div className='container px-4 sm:px-6 lg:px-8 pb-5'>
          <div className=''>
            <div className='flex flex-col sm:flex-row border border-gray-200 rounded-md overflow-hidden shadow-sm p-4'>
              {/* <div className='w-60' > */}
                <img
                  className='w-60 h-60 object-cover'
                  src={sample_data[0].imageUrl}
                  alt={sample_data[0].title}
                />
              {/* </div> */}
              <div className='p-4'>
                <div className='text-lg font-semibold whitespace-nowrap overflow-hidden mb-2'>
                  {sample_data[0].title}
                </div>
                <div className='text-gray-600 mb-2'>
                  {sample_data[0].category}
                </div>
                <div className='text-md '>{sample_data[0].description}</div>
                <div className='items-center mt-2'>
                  <p className='text-xl font-semibold'>
                    Rs. {sample_data[0].price}
                  </p>
                  <div>
                    {sample_data[0].itemCount === 0 ? (
                      <button
                        className='px-3 py-1 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition duration-300'
                        onClick={() => addToCart(sample_data[0])}
                      >
                        <FontAwesomeIcon
                          icon={faCartShopping}
                          className='mr-2'
                        />
                        Add to Cart
                      </button>
                    ) : (
                      <div className='flex items-center'>
                        <button
                          className='px-2 py-1 bg-gray-300 text-gray-700 rounded-l-md hover:bg-gray-400 transition duration-300'
                          onClick={() => removeFromCart(sample_data[0])}
                        >
                          -
                        </button>
                        <span className='px-3 py-1 bg-gray-200'>
                          {sample_data[0].itemCount}
                        </span>
                        <button
                          className='px-2 py-1 bg-gray-300 text-gray-700 rounded-r-md hover:bg-gray-400 transition duration-300'
                          onClick={() => addToCart(sample_data[0])}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default ProductDetail;
