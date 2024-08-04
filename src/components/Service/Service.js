import { useContext, useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../context/AuthContext";
import { getProductDetailsById } from "../../service/api_service";

const Service = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const [service, setService] = useState();
  const { checkAdmin } = useContext(AuthContext);

  useEffect(() => {
    checkAdmin();
    setServiceData();
  }, []);

  const setServiceData = async () => {
    try {
      console.log('ID', id);
      const response = await getServiceById(id);
  
      if (response === null) {
        return;
      }
      if (response?.message === "Invalid token") {
        toast.error(response?.message);
        localStorage.clear();
        navigate("/login");
      }
      console.log("resonse ->>", response);
  
      setService(response);
    } catch (error) {
      console.log('[setServiceData] Error:', error);
      throw error;
    }
  };

  const getServiceById = (key) => {


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
            Service Page
          </h1>
          <nav aria-label='breadcrumb animated slideInDown'>
            <ol className='breadcrumb justify-content-center mb-0'>
              <li className='breadcrumb-item'>
                <span >Home</span>
              </li>
              <li className='breadcrumb-item'>
                <span >Pages</span>
              </li>
              <li className='breadcrumb-item'>
                <span >Service</span>
              </li>
              <li
                className='breadcrumb-item active text-white'
                aria-current='page'
              >
                {id}
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
              {/* <img
                className='w-60 h-60 object-cover'
                src={sample_data?.image}
                alt={sample_data?.title}
              /> */}
              {/* </div> */}
              {/* <div className='p-4'>
                <div className='text-lg font-semibold whitespace-nowrap overflow-hidden mb-2'>
                  {sample_data?.title}
                </div>
                <div className='text-gray-600 mb-2'>
                  {sample_data?.category?.name}
                </div>
                <div className='text-md '>{sample_data?.description}</div>
                <div className='items-center mt-2'>
                  <p className='text-xl font-semibold'>
                    Rs. {sample_data?.price}
                  </p>
                  <div>
                    {sample_data?.itemCount === 0 ? (
                      <button
                        className='px-3 py-1 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition duration-300'
                        onClick={() => addToCart()}
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
                          onClick={() => removeFromCart()}
                        >
                          -
                        </button>
                        <span className='px-3 py-1 bg-gray-200'>
                          {sample_data?.itemCount}
                        </span>
                        <button
                          className='px-2 py-1 bg-gray-300 text-gray-700 rounded-r-md hover:bg-gray-400 transition duration-300'
                          onClick={() => addToCart()}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default Service;
