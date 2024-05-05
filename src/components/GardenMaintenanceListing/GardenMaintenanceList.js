import toast from "react-hot-toast";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { useContext, useEffect, useState } from "react";
import {
  getGardenDetails,
  ME,
  registerGarden,
} from "../../service/api_service";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const GardenMaintenanceList = () => {
  const navigate = useNavigate();
  const { checkLogin } = useContext(AuthContext);

  useEffect(() => {
    checkLogin("/garden/maintenance/list");
    async function getGardenData() {
      //   await me();
      // await setGardenData();
    }
    getGardenData();

    // Zoom in after a delay
    setTimeout(() => {
      //   setZoom("scale-100");
    }, 500); // Adjust the delay as needed
  }, []);

  return (
    <div>
      <Navbar />
      <div
        className='container-fluid page-header py-5 wow fadeIn'
        data-wow-delay='0.1s'
      >
        <div className='container text-center py-5'>
          <h1 className='display-3 text-white mb-4 animated slideInDown'>
            Garden Maintenance
          </h1>
          <nav aria-label='breadcrumb animated slideInDown'>
            <ol className='breadcrumb justify-content-center mb-0'>
              <li className='breadcrumb-item'>Home</li>
              <li className='breadcrumb-item'>Pages</li>
              <li className='breadcrumb-item' aria-current='page'>
                garden / Maintenance / list
              </li>
            </ol>
          </nav>
          {/* ----------------- Form ----------------------- */}
          <div>
            <div className='flex min-h-full flex-col justify-center px-6 pt-12 lg:px-8'>
              <div className='sm:mx-auto sm:w-full p-6  bg-gray-100 border border-gray-100 rounded-lg shadow dark:bg-gray-100 dark:border-gray-200'>
                <div className='sm:mx-auto sm:w-full '>
                  <div className='space-y-6'>
                    <table class='table table-hover'>
                      <thead>
                        <tr>
                          <th scope='col'>#</th>
                          <th scope='col'>Maintenance Name</th>
                          <th scope='col'>Date</th>
                          <th scope='col'>Status</th>
                          <th scope='col'>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope='row'>1</th>
                          <td>Mark</td>
                          <td>10/02/2024</td>
                          <td><span class="badge bg-warning">Pending</span></td>
                          <td>View</td>
                        </tr>
                        <tr>
                          <th scope='row'>2</th>
                          <td>Mark</td>
                          <td>10/02/2024</td>
                          <td><span class="badge bg-warning">Pending</span></td>
                          <td>View</td>
                        </tr>
                        <tr>
                          <th scope='row'>3</th>
                          <td>Mark</td>
                          <td>10/02/2024</td>
                          <td><span class="badge bg-warning">Pending</span></td>
                          <td>View</td>
                        </tr>
                        <tr>
                          <th scope='row'>4</th>
                          <td>Mark</td>
                          <td>10/02/2024</td>
                          <td><span class="badge bg-warning">Pending</span></td>
                          <td>View</td>
                        </tr>
                        <tr>
                          <th scope='row'>5</th>
                          <td>Mark</td>
                          <td>10/02/2024</td>
                          <td><span class="badge bg-warning">Pending</span></td>
                          <td>View</td>
                        </tr>
                        <tr>
                          <th scope='row'>6</th>
                          <td>Mark</td>
                          <td>10/02/2024</td>
                          <td><span class="badge bg-warning">Pending</span></td>
                          <td>View</td>
                        </tr>
                      </tbody>
                    </table>
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

export default GardenMaintenanceList;
