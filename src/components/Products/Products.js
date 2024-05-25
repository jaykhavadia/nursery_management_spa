import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faEnvelope,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";

const Products = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [sample_data, setProducts] = useState([
    {
      id: 1,
      title: "Lululemon Comfort Tee - White",
      category: "T-shirt",
      price: "79",
      imageUrl:
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1072&q=80",
      itemCount: 0,
    },
    {
      id: 2,
      title: "Nike Running Shoes",
      category: "Shoes",
      price: "120",
      imageUrl:
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3f3e7049-5c99-428c-abcd-e246b086f2ed/air-force-1-07-shoes-VWCc04.png",
      itemCount: 0,
    },
    {
      id: 3,
      title: "Adidas Soccer Ball",
      category: "Sports",
      price: "45",
      imageUrl:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/68cb5b22233a407599dd948fd959dedc_9366/INDIA_LIMITED_EDITION_SHOE_WOMEN_White_IV4475_02_standard_hover.jpg",
      itemCount: 0,
    },
    {
      id: 4,
      title: "Ray-Ban Sunglasses",
      category: "Accessories",
      price: "99",
      imageUrl:
        "https://himalayaoptical.com/cdn/shop/products/8056597625241_1_1024x1024.jpg?v=1656746401",
      itemCount: 0,
    },
    {
      id: 5,
      title: "Levi's Denim Jacket",
      category: "Jacket",
      price: "89",
      imageUrl:
        "https://images-cdn.ubuy.co.in/64c95ab7fe82525f6e6e905e-levi-s-boys-denim-trucker-jacket-sizes.jpg",
      itemCount: 0,
    },
    {
      id: 6,
      title: "Lululemon Comfort Tee - White",
      category: "T-shirt",
      price: "79",
      imageUrl:
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1072&q=80",
      itemCount: 0,
    },
    {
      id: 7,
      title: "Nike Running Shoes",
      category: "Shoes",
      price: "120",
      imageUrl:
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3f3e7049-5c99-428c-abcd-e246b086f2ed/air-force-1-07-shoes-VWCc04.png",
      itemCount: 0,
    },
    {
      id: 8,
      title: "Adidas Soccer Ball",
      category: "Sports",
      price: "45",
      imageUrl:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/68cb5b22233a407599dd948fd959dedc_9366/INDIA_LIMITED_EDITION_SHOE_WOMEN_White_IV4475_02_standard_hover.jpg",
      itemCount: 0,
    },
    {
      id: 9,
      title: "Ray-Ban Sunglasses",
      category: "Accessories",
      price: "99",
      imageUrl:
        "https://himalayaoptical.com/cdn/shop/products/8056597625241_1_1024x1024.jpg?v=1656746401",
      itemCount: 0,
    },
    {
      id: 10,
      title: "Levi's Denim Jacket",
      category: "Jacket",
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
    // Save cart data to localStorage
    const cartData = sample_data.filter((product) => product.itemCount > 0);
    console.log("set cart", cartData);
    localStorage.setItem("cart", JSON.stringify(cartData));
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
            Products
          </h1>
          <nav aria-label='breadcrumb animated slideInDown'>
            <ol className='breadcrumb justify-content-center mb-0'>
              <li className='breadcrumb-item'>
                <a href='#'>Home</a>
              </li>
              <li className='breadcrumb-item'>
                <a href='#'>Pages</a>
              </li>
              <li
                className='breadcrumb-item active text-white'
                aria-current='page'
              >
                {selectedCategory} Products
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className='container-xxl py-5'>
        <div className='container mx-auto'>
          <div className='flex justify-center items-center py-4'>
            {sample_category.map((product, index) => (
              <>
                <div
                  key={index}
                  className='text-center mr-5'
                  onClick={() => setSelectedCategory(product.category)}
                >
                  <div className='block'>
                    <img
                      className='h-24 w-24 mx-auto'
                      src={product.imageUrl}
                      alt={product.name}
                    />
                    <p className='mt-2 text-sm font-medium'>
                      {product.category}
                    </p>
                  </div>
                </div>
              </>
            ))}
            {selectedCategory !== "" && (
              <div
                className='text-center mr-5'
                onClick={() => setSelectedCategory("")}
              >
                <div className='block'>
                  <img
                    className='h-24 w-24 mx-auto'
                    src='https://www.jiomart.com/images/product/original/rvxxiknwa8/shopimoz-microfiber-cloth-12-pcs-thick-lint-streak-free-multipurpose-cloths-mix-colors-product-images-orvxxiknwa8-p597487682-0-202301111715.jpg?im=Resize=(420,420)'
                    alt='all'
                  />
                  <p className='mt-2 text-sm font-medium'>All</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='container px-4 sm:px-6 lg:px-8 py-5'>
          <div className='grid grid-cols-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {sample_data.map((product, index) => (
              <div
                key={index}
                className='border border-gray-200 rounded-md overflow-hidden shadow-sm'
              >
                <img
                  className='w-full h-60 object-cover'
                  src={product.imageUrl}
                  alt={product.title}
                />
                <div className='p-4'>
                  <h3 className='text-lg font-semibold whitespace-nowrap overflow-hidden'>{product.title}</h3>
                  <p className='text-gray-600'>{product.category}</p>
                  <div className='flex flex-col items-center justify-between mt-2'>
                    <p className='text-xl font-semibold'>Rs. {product.price}</p>
                    <div>
                      {product.itemCount === 0 ? (
                        <button
                          className='px-3 py-1 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition duration-300'
                          onClick={() => addToCart(product)}
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
                            onClick={() => removeFromCart(product)}
                          >
                            -
                          </button>
                          <span className='px-3 py-1 bg-gray-200'>
                            {product.itemCount}
                          </span>
                          <button
                            className='px-2 py-1 bg-gray-300 text-gray-700 rounded-r-md hover:bg-gray-400 transition duration-300'
                            onClick={() => addToCart(product)}
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default Products;
