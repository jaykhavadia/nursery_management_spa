import toast from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import {
  getAllGardenMaintenance,
  ME,
  updateMaintenance,
} from "../../service/api_service";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Moment from "react-moment";
import Sidebar from "../Sidebar/Sidebar";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
const ManageMaintenance = () => {
  const navigate = useNavigate();
  const [maintenanceList, setMaintenanceList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedList, setSelectedList] = useState();
  const { Logout } = useContext(AuthContext);

  // const setGardenData = async () => {
  //   const response = await getAllMaintenance();
  //   if (response === null) {
  //     // toast('', {
  //     //   icon: <FontAwesomeIcon className="text-yellow-700" icon={faExclamationCircle} />,
  //     // });
  //     // navigate("/garden/registration");
  //     return;
  //   }
  //   if (response?.message === "Invalid token") {
  //     toast.success(response?.message);
  //     localStorage.clear();
  //     navigate("/login");
  //   }
  // };
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

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
      return;
    }
    async function getMaintenanceData() {
      const isAdmin = await me();
      if (!isAdmin) {
        toast.error("You are not a admin");
        Logout();
        return;
      }
      const maintenanceData = await getAllGardenMaintenance();
      setMaintenanceList(maintenanceData);
    }
    getMaintenanceData();

    setTimeout(() => {
      //   setZoom("scale-100");
    }, 500); // Adjust the delay as needed
  }, []);

  const selected = async (event, data) => {
    console.log("event", event, data);
    await updateMaintenance({ status: event.value }, data._id);

    const maintenanceData = await getAllGardenMaintenance();
    setMaintenanceList(maintenanceData);
  };

  return (
    <div className='h-screen'>
      <Sidebar />
      <div className='page-header wow fadeIn h-full' data-wow-delay='0.1s'>
        <div className='container text-center py-5'>
          <h1 className='display-3 text-white mb-2 animated slideInDown'>
            Garden Maintenance Listing
          </h1>
          {/* ----------------- Form ----------------------- */}
          <div>
            <div className='flex min-h-full flex-col justify-center px-6 pt-12 lg:px-8'>
              <div className='sm:mx-auto sm:w-full p-6  bg-gray-100 border border-gray-100 rounded-lg shadow dark:bg-gray-100 dark:border-gray-200'>
                <div className='sm:mx-auto sm:w-full '>
                  <div className='space-y-6'>
                    {/* <div className='flex justify-end mr-5 '>
                      {maintenanceList?.length === 0 ||
                      maintenanceList[maintenanceList.length - 1].status !==
                        "pending" ? (
                        <button
                          className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center'
                          onClick={() => navigate("/garden/maintenance")}
                        >
                          Create Maintenance
                        </button>
                      ) : (
                        ""
                      )}
                    </div> */}
                    <table className='table table-hover'>
                      <thead>
                        <tr>
                          <th scope='col'>#</th>
                          <th scope='col'>Garden Name</th>
                          <th scope='col'>Maintenance Name</th>
                          <th scope='col'>Date</th>
                          <th scope='col'>Status</th>
                          <th scope='col'>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {maintenanceList?.length ? (
                          maintenanceList?.map((maintenanceData, index) => (
                            <tr key={index}>
                              <th scope='row'>{index + 1}</th>
                              <td>{maintenanceData.gardenId.name}</td>
                              <td>{maintenanceData.maintenanceName}</td>
                              <td>
                                <Moment
                                  className='py-2 px-4'
                                  format='DD/MM/YYYY'
                                  data={maintenanceData.createdAt}
                                />
                              </td>
                              <td>
                                <div className='flex justify-center'>
                                  <Dropdown
                                    className='w-[150px]'
                                    options={[
                                      "Completed",
                                      "Pending",
                                      "Processing",
                                      "Canalled",
                                    ]}
                                    onChange={(e) =>
                                      selected(e, maintenanceData)
                                    }
                                    value={maintenanceData.status}
                                    placeholder={maintenanceData.status}
                                  />
                                </div>
                                {/* <span
                                  className={`py-2 px-4 badge ${
                                    maintenanceData.status === "completed"
                                      ? "bg-success"
                                      : "bg-warning"
                                  }`}
                                >
                                  {maintenanceData.status}
                                </span> */}
                              </td>
                              <td>
                                <button
                                  className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded inline-flex items-center'
                                  onClick={() => {
                                    setSelectedList(maintenanceData);
                                    setIsOpen(true);
                                  }}
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan='5'>No Data Found </td>
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
                    <p>
                      <strong>Maintenance Name:</strong>{" "}
                      {selectedList.maintenanceName}
                    </p>
                    <p>
                      <strong>Design Change:</strong>{" "}
                      {selectedList.designChange ? "Yes" : "No"}
                    </p>
                    <p>
                      <strong>Garden:</strong> {selectedList.garden}
                    </p>
                    <p>
                      <strong>Pot Change:</strong>{" "}
                      {selectedList.potChange ? "Yes" : "No"}
                    </p>
                    <p>
                      <strong>Status:</strong> {selectedList.status}
                    </p>
                    <p>
                      <strong>Water Supply:</strong>{" "}
                      {selectedList.waterSupply ? "Yes" : "No"}
                    </p>
                    <p>
                      <strong>Description:</strong> {selectedList.description}
                    </p>
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
      {/* <Footer /> */}
    </div>
  );
};

export default ManageMaintenance;