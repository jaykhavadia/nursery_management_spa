import { useContext, useEffect, useState } from "react";
import bgImage from "../../assets/img/backgroundImage.png";
import emailImage from "../../assets/img/emailVerification.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
const EmailVerification = () => {
  const [zoom, setZoom] = useState("scale-0");
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const { checkLogin } = useContext(AuthContext);
  const { token } = useParams();

  useEffect(() => {
    if (token) {
      // call me api verify user
      localStorage.setItem("token", token);
      navigate("/dashboard");
    }
    const email = localStorage.getItem("userEmail");
    setUserEmail(email);
    checkLogin();
    setTimeout(() => {
      setZoom("scale-100");
    }, 500); // Adjust the delay as needed
  }, []);

  const resetFields = async () => {
    localStorage.removeItem("verifyEmail");
    navigate("/login");
  };

  return (
    <div
      className='bg-cover bg-center h-screen'
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div
        className={`flex min-h-full flex-col justify-center h-full px-4 py-8 lg:px-8`}
      >
        <div
          className={`${zoom} transition-transform duration-500 ease-in-out sm:mx-auto sm:w-full sm:max-w-sm p-6 bg-grey-100 border border-gray-100 rounded-lg shadow dark:bg-gray-100 dark:border-gray-200`}
        >
          <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
            {/* <img
              className='mx-auto h-10 w-auto'
              src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
              alt='Your Company'
            ></img> */}
          </div>

          <div className=' sm:mx-auto sm:w-full sm:max-w-md'>
            <div className=''>
              <div>
                <img
                  className=' h-full w-auto'
                  src={emailImage}
                  alt='Your Company'
                ></img>
              </div>
              <div>
                <h2 className='text-center text-2xl font-semibold leading-9 tracking-tight text-gray-900'>
                  Verify your account
                </h2>
              </div>
              <div className='text-center flex flex-col mt-4'>
                <span>Thanks for signup with us.</span>
                <span>
                  Click on the button below to verify your email address.
                </span>
              </div>
            </div>
            <div className=' sm:mx-auto sm:w-full sm:max flex justify-center mt-4'>
              <Button color='green' className='flex items-center gap-3'>
                <FontAwesomeIcon icon={faEnvelope} />
                Verify your email
              </Button>
            </div>
            {/* <div className='text-sm text-center mt-2'> */}
            {/* <span>{userEmail}</span> */}
            {/* </div> */}
            <p className='mt-2 text-center  text-sm text-gray-500'>
              <span>{userEmail} Not your email ?</span>
              <span
                onClick={resetFields}
                className='ml-2 font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer'
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
