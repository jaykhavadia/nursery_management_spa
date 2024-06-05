import toast from "react-hot-toast";

import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../../../context/AuthContext";
import {
  addProduct,
  createCategory,
  getAllMaintenance,
  getCategory,
  getGardenDetails,
  getProductDetailsById,
  ME,
  registerGarden,
  updateGarden,
  updateProduct,
} from "../../../../service/api_service";
import Navbar from "../../../Navbar/Navbar";
import Footer from "../../../Footer/Footer";
import defaultImage from "../../../../assets/img/defaultImage.png";
import { City, State } from "country-state-city";
import Sidebar from "../../../Sidebar/Sidebar";

const AddCoupon = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { checkAdmin, Logout } = useContext(AuthContext);
  const [zoom, setZoom] = useState("scale-0");
  const [userData, setUserData] = useState();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    title: "",
    type: "",
    value: "",
    startTime:'',
    EndTime:''
  });
  const [isDataAvailable, setIsDataAvailable] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    // Reset error message for the field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: "",
    }));
  };

  const isFirstCharCapitalized = (word) => {
    console.log("im in ", word);
    if (!word || typeof word !== "string") {
      return false; // Ensure the input is a valid string
    }
    const firstChar = word.charAt(0); // Get the first character
    return firstChar === firstChar.toUpperCase(); // Check if it is uppercase
  };

  const validateForm = () => {
    const errorMessage = "is required";
    const errors = {};
    if (!formData.title) {
      errors.title = errorMessage;
    }
    if (formData?.title?.length < 3) {
      errors.title = "must have more the 3 character";
    }
    if (formData?.title && !isFirstCharCapitalized(formData?.title)) {
      errors.title = "first letter should be capital";
    }
    if (!formData.description) {
      errors.description = errorMessage;
    }
    if (!formData.price) {
      errors.price = errorMessage;
    }
    if (formData.price < 0) {
      errors.price = "must be between 0";
    }
    if (!formData.category) {
      errors.category = errorMessage;
    }
    if (formData?.category?.length < 3) {
      errors.category = "must have more the 3 character";
    }

    if (!formData.image) {
      errors.image = errorMessage;
    }

    setErrors(errors);
    console.error("err", errors);

    // If errors exist, prevent form submission
    if (Object.keys(errors).length > 0) {
      return false;
    }
    return true;
  };

  const createProduct = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Token Expired");
      navigate("/login");
      return;
    }
    const isValid = validateForm();
    if (isValid) {
      // Perform form submission
      if (!formData.userId) {
        await me();
      }

      try {
        let result;
        console.log("formData", formData);
          // result = await addCoupon(newState);
          if (result) {
            toast.success("Coupon added Successful!");
            // resetFields();
            // navigate("/admin/manage-coupons");
          }
          return;
          // result = await addProduct(formData);
        // if (result) {
        //   toast.success("Product added Successful!");
        //   resetFields();
        //   // await setGardenData();
        // }
      } catch (error) {
        console.error("Error while Login:", error);
        toast.error(error.message);
      }
    }
  };

  const handleUpdatedProduct = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Token Expired");
      navigate("/login");
      return;
    }
    const isValid = validateForm();
    if (isValid) {

      try {
        delete formData.userId;
        console.log('form Data', formData);
        const result = await updateProduct(formData, id); // Call getSomeData function from the API service
        if (result) {
          toast.success(result.message);
          resetFields();
          navigate('/admin/manage-products');
          // await setGardenData();
        }
      } catch (error) {
        console.error("Error while Login:", error);
        toast.error(error.message);
      }
    }
  };

  const resetFields = () => {
    setFormData({
      title: "",
      type: "",
      value: "",
      startTime:'',
      EndTime:''
    });
    setErrors();
  };

  const me = async () => {
    try {
      const user = await ME();
      setUserData(user);
      setFormData((prevData) => ({
        ...prevData,
        userId: user.user?._id,
      }));
      localStorage.setItem("currentUser", JSON.stringify(user));
      return user?.user?.isAdmin || false;
    } catch (error) {
      if (error.message === "jwt expired") {
        Logout();
      }
      throw new Error(error);
    }
  };

  const setCouponData = async () => {
    // const response = await getProductDetailsById(id);

    // if (response === null) {
    //   return;
    // }
    // if (response?.message === "Invalid token") {
    //   toast.error(response?.message);
    //   localStorage.clear();
    //   navigate("/login");
    // }
    // console.log("resonse", response);
    // const transformedObject = {
    //   title: response.title || "",
    //   category: response.category?._id || "",
    //   description: response.description || "",
    //   price: response.price || "",
    //   image: response.image || "",
    //   userId: "",
    // };
    // setFormData(transformedObject);
    setIsDataAvailable(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
      return;
    }
    async function getProductData() {
      try {
        const isAdmin = await me();
        if (!isAdmin) {
          toast.error("You are not a admin");
          Logout();
          return;
        }
        if (id) {
          await checkAdmin(`/admin/edit-product/${id}`);
        } else {
          await checkAdmin("/admin/add-products");
        }
        await me();
        if (id) {
          // await setCouponData();
        }
      } catch (error) {
        console.error("getProductData", error);
        throw error;
      }
    }
    getProductData();

    // Zoom in after a delay
    setTimeout(() => {
      setZoom("scale-100");
    }, 500); // Adjust the delay as needed
  }, []);

  return (
    <div>
      <Sidebar />
      <div
        className='container-fluid page-header py-5 wow fadeIn'
        data-wow-delay='0.1s'
      >
        <div className='container text-center py-5'>
          <h1 className='display-3 text-white mb-4 animated slideInDown'>
            Add Product
          </h1>
          <nav aria-label='breadcrumb animated slideInDown'>
            <ol className='breadcrumb justify-content-center mb-0'>
              <li className='breadcrumb-item'>Home</li>
              <li className='breadcrumb-item'>Pages</li>
              <li className='breadcrumb-item' aria-current='page'>
                admin / add-product
              </li>
            </ol>
          </nav>
          {/* ----------------- Form ----------------------- */}
          <div>
            <div className='flex min-h-full flex-col justify-center px-6 pt-12 lg:px-8'>
              <div className='sm:mx-auto sm:w-full p-6 sm:max-w-xl bg-gray-100 border border-gray-100 rounded-lg shadow dark:bg-gray-100 dark:border-gray-200'>
                <div className='sm:mx-auto sm:w-full sm:max-w-xl'>
                  <div className='space-y-6'>
                    <div>
                      <div className='flex justify-start'>
                        <label className='block text-sm font-medium leading-6 text-gray-900'>
                          Title
                        </label>
                      </div>
                      <div className='mt-2'>
                        <input
                          id='title'
                          name='title'
                          type='text'
                          autoComplete='title'
                          placeholder='Enter your Title'
                          required
                          value={formData?.title}
                          className={`form-control ${
                            errors?.title && "is-invalid"
                          }`}
                          onChange={handleChange}
                        />
                      </div>
                      {errors?.title && (
                        <div
                          style={{ display: "block" }}
                          className='invalid-feedback'
                        >
                          Your title {errors?.title}
                        </div>
                      )}
                    </div>

                    <div>
                      <div className='flex justify-start'>
                        <label className='block text-sm font-medium leading-6 text-gray-900'>
                          Description
                        </label>
                      </div>
                      <textarea
                        placeholder='Enter your product description'
                        id='description'
                        style={{ height: "90px" }}
                        value={formData?.description}
                        className={`form-control ${
                          errors?.description && "is-invalid"
                        }`}
                        onChange={handleChange}
                        required
                      ></textarea>
                      {errors?.description && (
                        <div className='invalid-feedback'>
                          Your product description {errors?.description}
                        </div>
                      )}
                    </div>

                    <div className='flex flex-col sm:flex-row justify-between'>
                      <div className='mr-4'>
                        <div className='flex justify-start'>
                          <label className='block text-sm font-medium leading-6 text-gray-900'>
                            Price
                          </label>
                        </div>
                        <input
                          id='price'
                          name='price'
                          type='number'
                          placeholder='Enter Product Price'
                          value={formData?.price}
                          onChange={handleChange}
                          className={`form-control ${
                            errors?.price && "is-invalid"
                          }`}
                          min={1}
                        />
                        {errors?.price && (
                          <div className='invalid-feedback'>
                            Your Coupon Value {errors?.price}
                          </div>
                        )}
                      </div>

                      {/* <div className=''>
                        <div className='flex justify-start'>
                          <label className='block text-sm font-medium leading-6 text-gray-900'>
                            Category
                          </label>
                        </div>
                        <select
                          id='state'
                          name='state'
                          value={selectedCategory?._id}
                          onChange={handleCategoryChange}
                          className={`form-control ${
                            errors?.category && "is-invalid"
                          }`}
                        >
                          <option value=''>Select Category</option>
                          {categoryList.map((category, index) => (
                            <option key={index} value={category?._id}>
                              {category.name}
                            </option>
                          ))}
                          <option value='other'>other</option>
                        </select>
                        {errors?.category && (
                          <div className='invalid-feedback'>
                            Your product category {errors?.category}
                          </div>
                        )}
                      </div> */}
                    </div>

                    {isDataAvailable ? (
                      <button
                        className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                        onClick={handleUpdatedProduct}
                      >
                        Update your Coupon
                      </button>
                    ) : (
                      <button
                        className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                        onClick={createProduct}
                      >
                        Add Coupon
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ----------------- Form ----------------------- */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddCoupon;
