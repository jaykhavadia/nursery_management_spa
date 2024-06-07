import toast from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../../Footer/Footer";
import { AuthContext } from "../../../../context/AuthContext";
import { getProductDetails, ME } from "../../../../service/api_service";
import Sidebar from "../../../Sidebar/Sidebar";
import Dropdown from "react-dropdown";
import "./CouponListing.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

const CouponListing = () => {
  const navigate = useNavigate();
  const { checkAdmin, Logout } = useContext(AuthContext);
  // const [maintenanceList, setMaintenanceList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedList, setSelectedList] = useState();

  const [sampleCoupon, setCoupon] = useState([
    {
      id: 1,
      title: "Summer Sale",
      type: "Percentage",
      value: 20,
      starting_date: "2024-06-01",
      ending_date: "2024-06-30",
      status: "Active",
    },
    {
      id: 2,
      title: "Holiday Discount",
      type: "Fixed Amount",
      value: 50,
      starting_date: "2024-12-01",
      ending_date: "2024-12-31",
      status: "Active",
    },
    {
      id: 3,
      title: "Black Friday Special",
      type: "Percentage",
      value: 30,
      starting_date: "2024-11-25",
      ending_date: "2024-11-29",
      status: "Expire",
    },
    {
      id: 4,
      title: "Back to School",
      type: "Percentage",
      value: 15,
      starting_date: "2024-08-15",
      ending_date: "2024-09-15",
      status: "Active",
    },
    {
      id: 5,
      title: "New Year Offer",
      type: "Fixed Amount",
      value: 100,
      starting_date: "2024-01-01",
      ending_date: "2024-01-31",
      status: "Expire",
    },
  ]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
      return;
    }
    async function getProductListing() {
      const isAdmin = await me();
      if (!isAdmin) {
        toast.error("You are not a admin");
        Logout();
        return;
      }
      await checkAdmin("/admin/manage-coupons");
      // await setProductData();
      const productData = await getProductDetails();
      console.log("productData", productData);
      setProductList(productData);
    }
    getProductListing();

    setTimeout(() => {
      //   setZoom("scale-100");
    }, 500); // Adjust the delay as needed
  }, []);

  const me = async () => {
    try {
      const user = await ME();
      localStorage.setItem("currentUser", JSON.stringify(user));
      console.log("user =>>", user.user);
      return user?.user?.isAdmin || false;
    } catch (error) {
      if (error.message === "jwt expired") {
        Logout();
      }
      throw new Error(error);
    }
  };

  const editCoupon = (coupon) => {
    navigate(`/admin/edit-coupon/${coupon._id}`);
  };

  const selected = async (event, data) => {
    console.log("event", event, data);
    // await updateMaintenance({ status: event.value }, data._id);

    // const maintenanceData = await getAllGardenMaintenance();
    // setMaintenanceList(maintenanceData);
    setCoupon((prevCoupons) =>
      prevCoupons.map((coupon) =>
        coupon.id === data.id ? { ...coupon, status: event.value } : coupon
      )
    );
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success(`${text} Copied to clipboard!`);
      })
      .catch((err) => {
        toast.error("Failed to copy: ", err);
      });
  };

  return (
    <div>
      <Sidebar />
      <div
        className='container-fluid page-header py-5 wow fadeIn'
        data-wow-delay='0.1s'
      >
        <div className='container text-center py-5'>
          <h1 className='display-3 text-white mb-4 animated slideInDown'>
            Coupons Listing
          </h1>
          <nav aria-label='breadcrumb animated slideInDown'>
            <ol className='breadcrumb justify-content-center mb-0'>
              <li className='breadcrumb-item'>Home</li>
              <li className='breadcrumb-item'>Pages</li>
              <li className='breadcrumb-item' aria-current='page'>
                garden / Coupons / list
              </li>
            </ol>
          </nav>
          {/* ----------------- Form ----------------------- */}
          <div>
            <div className='flex min-h-full flex-col justify-center px-6 pt-12 lg:px-8'>
              <div className='sm:mx-auto sm:w-full p-6  bg-gray-100 border border-gray-100 rounded-lg shadow dark:bg-gray-100 dark:border-gray-200'>
                <div className='sm:mx-auto sm:w-full '>
                  <div className='space-y-6'>
                    <div className='flex justify-end mr-5 '>
                      <button
                        className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center'
                        onClick={() => navigate("/admin/add-coupon")}
                      >
                        Add Coupon
                      </button>
                    </div>
                    <table className='table table-hover'>
                      <thead>
                        <tr>
                          <th scope='col'>#</th>
                          <th scope='col'>Coupon Title</th>
                          <th scope='col' className='price-column'>
                            CODE
                          </th>
                          <th scope='col' className='price-column'>
                            Value
                          </th>
                          <th scope='col' className='price-column'>
                            Starting Date
                          </th>
                          <th scope='col' className='price-column'>
                            Ending Date
                          </th>
                          <th scope='col' className=''>
                            Status
                          </th>
                          <th scope='col'>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sampleCoupon?.length ? (
                          sampleCoupon?.map((couponData, index) => (
                            <tr key={index}>
                              <th scope='row'>{index + 1}</th>
                              <td>{couponData.title}</td>
                              <td
                                className='cursor-pointer price-column  hover:text-green-600 hover:text-bold active:text-yellow-500'
                                onClick={() => {
                                  copyToClipboard(
                                    `${couponData.title
                                      .slice(0, 3)
                                      .toUpperCase()}${couponData.value}`
                                  );
                                }}
                              >
                                {couponData.title.slice(0, 3).toUpperCase()}
                                {couponData.value}
                                <FontAwesomeIcon
                                  className='ml-2'
                                  icon='fa-regular fa-copy'
                                />
                              </td>
                              <td className='price-column'>
                                <span className='py-2 px-4'>
                                  {couponData.type !== "Percentage"
                                    ? "Rs."
                                    : ""}
                                  {couponData.value}
                                  {couponData.type === "Percentage" ? "%" : ""}
                                </span>
                              </td>
                              <td className='price-column'>
                                <span className='py-2 px-4'>
                                  {couponData.starting_date}
                                </span>
                              </td>
                              <td className='price-column'>
                                <span className='py-2 px-4'>
                                  {couponData.ending_date}
                                </span>
                              </td>
                              <td className=''>
                                <div className='flex justify-center'>
                                  <Dropdown
                                    className='w-[90px]'
                                    options={["Expire", "Active"]}
                                    onChange={(e) => selected(e, couponData)}
                                    value={couponData.status}
                                    placeholder={couponData.status}
                                  />
                                </div>
                              </td>
                              <td>
                                <button
                                  className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded inline-flex items-center mr-2'
                                  onClick={() => {
                                    setSelectedList(couponData);
                                    setIsOpen(true);
                                  }}
                                >
                                  View
                                </button>
                                <button
                                  className='bg-yellow-500 hover:bg-yellow-700 text-gray-800 font-bold py-1 px-2 rounded inline-flex items-center mr-2'
                                  onClick={() => {
                                    editCoupon(couponData);
                                  }}
                                >
                                  Update
                                </button>
                                {/* Uncomment if Delete functionality is needed */}
                                {/* <button
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded inline-flex items-center'
              onClick={() => {
                setSelectedList(productData);
                setIsOpen(true);
              }}
            >
              Delete
            </button> */}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan='5'>No Data Found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ----------------- Form ----------------------- */}
          <>
            {isOpen && (
              <div className='fixed inset-0 flex items-center justify-center z-50'>
                <div className='fixed inset-0 bg-black opacity-50'></div>
                <div className='bg-white p-8 rounded-lg shadow-lg z-10'>
                  <h2 className='text-xl mb-4'>Maintenance Data</h2>
                  <div className='flex flex-col justify-start items-start'>
                    <span>
                      <strong className='mr-2'>Title:</strong>{" "}
                      {selectedList.title}
                    </span>
                    <span>
                      <strong className='mr-2'>CODE:</strong>
                      <span
                        className='cursor-pointer hover:text-green-600 hover:text-bold active:text-yellow-500'
                        onClick={() =>
                          copyToClipboard(
                            `${selectedList.title.slice(0, 3).toUpperCase()}${
                              selectedList.value
                            }`
                          )
                        }
                      >
                        {selectedList.title.slice(0, 3).toUpperCase()}
                        {selectedList.value}
                        <FontAwesomeIcon
                          className='ml-2'
                          icon='fa-regular fa-copy'
                        />
                      </span>
                    </span>
                    <span>
                      <strong className='mr-2'>Value:</strong>{" "}
                      {selectedList.type !== "Percentage" ? "Rs." : ""}
                      {selectedList.value}
                      {selectedList.type === "Percentage" ? "%" : ""}
                    </span>
                    <span>
                      <strong className='mr-2'>Start Date:</strong>{" "}
                      {selectedList.starting_date}
                    </span>
                    <span>
                      <strong className='mr-2'>End Date:</strong>{" "}
                      {selectedList.ending_date}
                    </span>
                    <span>
                      <strong className='mr-2'>Status:</strong>{" "}
                      {selectedList.status}
                    </span>
                  </div>

                  <button
                    className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center'
                    onClick={() => setIsOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CouponListing;
