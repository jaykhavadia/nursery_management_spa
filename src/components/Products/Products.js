import { useState } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const Products = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const [selectedCategory, setSelectedCategory] = useState("");

  const sample_data = [
    {
      id: 1,
      title: "Lululemon Comfort Tee - White",
      category: "T-shirt",
      price: "79",
      imageUrl:
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1072&q=80",
    },
    {
      id: 2,
      title: "Nike Running Shoes",
      category: "Shoes",
      price: "120",
      imageUrl:
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3f3e7049-5c99-428c-abcd-e246b086f2ed/air-force-1-07-shoes-VWCc04.png",
    },
    {
      id: 3,
      title: "Adidas Soccer Ball",
      category: "Sports",
      price: "45",
      imageUrl:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/68cb5b22233a407599dd948fd959dedc_9366/INDIA_LIMITED_EDITION_SHOE_WOMEN_White_IV4475_02_standard_hover.jpg",
    },
    {
      id: 4,
      title: "Ray-Ban Sunglasses",
      category: "Accessories",
      price: "99",
      imageUrl:
        "https://himalayaoptical.com/cdn/shop/products/8056597625241_1_1024x1024.jpg?v=1656746401",
    },
    {
      id: 5,
      title: "Levi's Denim Jacket",
      category: "Jacket",
      price: "89",
      imageUrl:
        "https://images-cdn.ubuy.co.in/64c95ab7fe82525f6e6e905e-levi-s-boys-denim-trucker-jacket-sizes.jpg",
    },
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

  const addToCart = (product) => {
    if(!token){
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
    console.log('Product', product);
  } 

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
        <div className='container flex flex-row justify-evenly flex-wrap'>
          {sample_data.map((product, index) => (
            <>
              {selectedCategory === product.category ||
              selectedCategory === "" ? (
                <div
                  key={index}
                  className='group my-10 flex w-full max-w-xs flex-col overflow-hidden border border-gray-100 bg-white shadow-md wow fadeIn'
                >
                  <a className='relative flex h-60 overflow-hidden' href='#'>
                    <img
                      className='absolute top-0 right-0 h-full w-full object-cover'
                      src={product.imageUrl}
                      alt='product_image'
                    />
                    {/* {token && (
                      <div className='absolute -right-16 bottom-0 mr-2 mb-4 space-y-2 transition-all duration-300 group-hover:right-0'>
                        <button className='flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                          >
                            <path
                              fillRule='evenodd'
                              d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'
                              clipRule='evenodd'
                            />
                          </svg>
                        </button>
                      </div>
                    )} */}
                  </a>
                  <div className='mt-4 px-5 pb-5'>
                    <a href='#'>
                      <h5 className='text-xl tracking-tight text-slate-900'>
                        {product.title}
                      </h5>
                    </a>
                    <a href='#'>
                      <h5 className='text-xl tracking-tight text-slate-900'>
                        {product.category}
                      </h5>
                    </a>
                    <div className=' mb-3 flex items-center justify-between'>
                      <p>
                        <span className='text-3xl font-bold text-slate-900'>
                          Rs. {product.price}
                        </span>
                      </p>
                    </div>
                    <button className='flex items-center justify-center bg-gray-900 px-2 py-1 text-sm text-white transition hover:bg-gray-700' onClick={()=> addToCart(product) } >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='mr-2 h-5 w-5'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path d='M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z' />
                      </svg>
                      Add to cart
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )}
            </>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default Products;
