import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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

const steps = ["Checkout", "Address", "Payment"];

const Checkout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const [cartData, setCartData] = useState();

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    console.log("CartData", JSON.parse(cartData));
    setCartData(JSON.parse(cartData));
  }, []);

  useEffect(() => {
    // Save cart data to localStorage
    const cart = cartData?.filter((product) => product.itemCount > 0);
    console.log("set cart", cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cartData]);

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
    setCartData((prevProducts) =>
      prevProducts.map((p) =>
        p.id === product.id && p.itemCount > 0
          ? { ...p, itemCount: p.itemCount - 1 }
          : p
      )
    );
    console.log("Product removed from cart:", product);
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
    setCartData((prevProducts) =>
      prevProducts.map((p) =>
        p.id === product.id ? { ...p, itemCount: p.itemCount + 1 } : p
      )
    );
  };

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    // if (!isStepOptional(activeStep)) {
    //   // You probably want to guard against something like this,
    //   // it should never occur unless someone's actively trying to break something.
    //   throw new Error("You can't skip a step that isn't optional.");
    // }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
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
            Checkout in 3 Steps
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
                <a href='#'>Products</a>
              </li>
              <li
                className='breadcrumb-item active text-white'
                aria-current='page'
              >
                Checkout
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div>
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              // if (isStepOptional(index)) {
              //   labelProps.optional = (
              //     <Typography variant='caption'>Optional</Typography>
              //   );
              // }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                <div className='flex justify-center'>
                  <div className='container px-4 sm:px-6 lg:px-8 py-5'>
                    <div className=''>
                      {cartData?.map((product, index) => (
                        <div
                          key={index}
                          className='flex border border-gray-200 rounded-md overflow-hidden shadow-sm p-2 w-full justify-between'
                        >
                          <img
                            className='w-20 h-20 object-cover'
                            src={product.imageUrl}
                            alt={product.title}
                          />
                          <div className='px-3 pt-2'>
                            <h3 className='text-lg font-semibold whitespace-nowrap overflow-hidden'>
                              {product.title}
                            </h3>
                            <p className='text-gray-600'>{product.category}</p>
                          </div>
                          <div className='flex flex-col items-center pr-4'>
                            <p className='text-xl font-semibold'>
                              Rs. {product.price}
                            </p>
                            <div>
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
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Typography>
              <Box
                className='px-16'
                sx={{ display: "flex", flexDirection: "row", pt: 2 }}
              >
                <Button
                  color='inherit'
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                {/* {isStepOptional(activeStep) && (
                  <Button color='inherit' onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                  </Button>
                )} */}
                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </div>

      <Footer />
    </div>
  );
};
export default Checkout;
