import { useContext, useEffect, useState } from "react";
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
import { AuthContext } from "../../context/AuthContext";
import { getCategory, getProductDetails } from "../../service/api_service";

const Products = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const [selectedCategory, setSelectedCategory] = useState();

  const { checkAdmin } = useContext(AuthContext);

  useEffect(() => {
    checkAdmin();
  }, []);

  const [sample_data, setProducts] = useState([]);

  const [sample_category, setCategory] = useState([]);

  useEffect(() => {
    async function getProductAndCategoryListing() {
      const productData = await getProductDetails();
      const productCategory = await getCategory();
      console.log("productData", productData);
      console.log("productCategory", productCategory);
      // setProducts(
      //   productData.map((item) => {
      //     return {
      //       ...item,
      //       itemCount: 0,
      //     };
      //   })
      // );
      setCategory(productCategory);
      await setCartData(productData);
    }
    getProductAndCategoryListing();
  }, []);

  const setCartData = async (productData) => {
    const userCart = localStorage.getItem("cart");
    if (userCart && userCart.length > 0) {
      const cart = JSON.parse(userCart);
      console.log("cart", cart);
      // Update the sample data with item counts from the cart
      const updatedData = productData.map((product) => {
        const cartItem = cart.find((item) => item._id === product._id);
        if (cartItem) {
          return { ...product, itemCount: cartItem.itemCount };
        }
        return {
          ...product,
          itemCount: 0,
        };
      });

      setProducts(updatedData);
    } else {
      setProducts(
        productData.map((item) => {
          return {
            ...item,
            itemCount: 0,
          };
        })
      );
    }
  };

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
        p._id === product._id ? { ...p, itemCount: p.itemCount + 1 } : p
      )
    );
    setToCart();
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
        p._id === product._id && p.itemCount > 0
          ? { ...p, itemCount: p.itemCount - 1 }
          : p
      )
    );
    setToCart();
  };

  const setToCart = () => {
    const cartData = sample_data.filter((product) => {
      return product.itemCount > 0;
    });
    if (cartData.length) {
      localStorage.setItem("cart", JSON.stringify(cartData));
    }
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
                {selectedCategory?.name} Products
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className='container-xxl py-5'>
        <div className='container mx-auto'>
          <div className='flex justify-center items-center py-4'>
            {sample_category.map((category, index) => (
              <div
                key={index}
                className='text-center mr-5'
                onClick={() => setSelectedCategory(category)}
              >
                <div className='block'>
                  {category.imageUrl && (
                    <img
                      className='h-24 w-24 mx-auto'
                      src={category.imageUrl}
                      alt={category.name}
                    />
                  )}
                  <p className='mt-2 text-sm font-medium'>{category.name}</p>
                </div>
              </div>
            ))}
            {selectedCategory && (
              <div
                className='text-center mr-5'
                onClick={() => setSelectedCategory("")}
              >
                <div className='block'>
                  {/* <img
                    className='h-24 w-24 mx-auto'
                    src='https://www.jiomart.com/images/product/original/rvxxiknwa8/shopimoz-microfiber-cloth-12-pcs-thick-lint-streak-free-multipurpose-cloths-mix-colors-product-images-orvxxiknwa8-p597487682-0-202301111715.jpg?im=Resize=(420,420)'
                    alt='all'
                  /> */}
                  <p className='mt-2 text-sm font-medium'>All</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='container px-4 sm:px-6 lg:px-8 py-5'>
          <div className='grid grid-cols-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {sample_data.map((product, index) =>
              selectedCategory ? (
                product.category._id === selectedCategory._id && (
                  <div
                    key={index}
                    className='border border-gray-200 rounded-md overflow-hidden shadow-sm'
                  >
                    <img
                      className='w-full h-60 object-cover'
                      src={product.image}
                      alt={product.title}
                    />
                    <div className='p-4'>
                      <h3 className='text-lg font-semibold whitespace-nowrap overflow-hidden'>
                        {product.title}
                      </h3>
                      <p className='text-gray-600'>{product.category.name}</p>
                      <div className='flex flex-col items-center justify-between mt-2'>
                        <p className='text-xl font-semibold'>
                          Rs. {product.price}
                        </p>
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
                )
              ) : (
                <div
                  key={index}
                  className='border border-gray-200 rounded-md overflow-hidden shadow-sm'
                >
                  <img
                    className='w-full h-60 object-cover'
                    src={product.image}
                    alt={product.title}
                  />
                  <div className='p-4'>
                    <h3 className='text-lg font-semibold whitespace-nowrap overflow-hidden'>
                      {product.title}
                    </h3>
                    <p className='text-gray-600'>{product.category.name}</p>
                    <div className='flex flex-col items-center justify-between mt-2'>
                      <p className='text-xl font-semibold'>
                        Rs. {product.price}
                      </p>
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
              )
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default Products;
