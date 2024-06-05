import { useEffect, useState } from "react";

const Summary = (prams) => {
  const { cartData, removeFromCart, addToCart, grandTotal, cartSize } = prams;

  const [couponErrors, setCouponErrors] = useState();
  const [couponErrorMessage, setCouponErrorMessage] = useState();
  const [coupon, setCoupon] = useState();
  const [activeCoupon, setActiveCoupon] = useState(0);

  const handleCouponChange = (e) => {
    setCoupon(e.target.value);
    setCouponErrorMessage();
    setCouponErrors(false);
  };

  const checkCoupon = (e) => {
    // check coupon
    console.log("Checking coupon", coupon);
    if (coupon === "test") {
      setActiveCoupon(10);
    } else {
      setCouponErrors(true);
      setCouponErrorMessage("Invalid Token");
    }
  };

  const clearCoupon = () => {
    setCoupon("");
    setActiveCoupon(0);
    setCouponErrorMessage();
    setCouponErrors(false);
  };

  return (
    <div>
      {cartSize > 0 ? (
        <div className=''>
          {cartData?.map((product, index) => (
            <div key={index}>
              {product.itemCount > 0 && (
                <div className='flex border border-gray-200 rounded-md overflow-hidden shadow-sm p-2 w-full justify-between mb-2'>
                  <div className='flex'>
                    <img
                      className='w-20 h-20 object-cover mr-3'
                      src={product.image}
                      alt={product.title}
                    />
                    <div className='px-3 pt-2'>
                      <h3 className='text-lg font-semibold whitespace-nowrap overflow-hidden'>
                        {product.title}
                      </h3>
                      <span className='text-gray-600'>
                        {product.category.name}
                      </span>
                    </div>
                  </div>
                  <div className='flex flex-col items-center pr-4'>
                    <span className='text-xl font-semibold'>
                      Rs. {product.price}
                    </span>
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
              )}
            </div>
          ))}
          <br />
          <div>
            Payment Details
            {cartData?.map((product, index) => (
              <div key={index}>
                {product.itemCount > 0 && (
                  <div className='flex w-full justify-between'>
                    <div className='flex px-3 pt-1 w-50'>
                      <span className='text-lg font-semibold whitespace-nowrap overflow-hidden mr-2'>
                        {product.title}
                      </span>
                      <span className='text-lg font-semibold whitespace-nowrap overflow-hidden'>
                        ({product.category.name})
                      </span>
                    </div>
                    <div className='items-center pr-4 w-48'>
                      <span className='text-xl font-semibold'>
                        Rs. {product.price}
                      </span>
                    </div>
                    <div className='items-center pr-4 w-48'>
                      <span className='text-xl font-semibold'>
                        Rs. {product.price * product.itemCount}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div className='my-4 border-t border-gray-300'></div>
            <div>
              <div className='flex justify-start'>
                <label className='block text-sm font-medium leading-6 text-gray-900'>
                  Coupon
                </label>
              </div>
              <div className='flex'>
                <div className='mt-2 mr-5 relative'>
                  <input
                    id='coupon'
                    name='coupon'
                    type='text'
                    autoComplete='coupon'
                    placeholder='Enter Coupon'
                    required
                    value={coupon}
                    disabled={activeCoupon}
                    className={`form-control ${
                      couponErrors ? "border-red-500" : ""
                    } p-2 border rounded`}
                    onChange={handleCouponChange}
                  />
                  {coupon && (
                    <button
                      type='button'
                      className='absolute right-2 top-1/2 transform -translate-y-4 text-xl text-gray-500 hover:text-red-500 focus:outline-none'
                      onClick={clearCoupon}
                    >
                      &times;
                    </button>
                  )}
                </div>
                <button
                  type='button'
                  className='btn btn-primary pb-2 my-2 text-white'
                  disabled={activeCoupon}
                  onClick={checkCoupon}
                >
                  Apply Coupon
                </button>
              </div>
              {couponErrors && (
                <div style={{ display: "block" }} className='invalid-feedback'>
                  {couponErrorMessage}
                </div>
              )}
            </div>
            <div className='my-4 border-t border-gray-300'></div>
            {activeCoupon ? (
              <div>
                <div className='w-full flex justify-between px-4'>
                  <span className='text-lg font-semibold whitespace-nowrap overflow-hidden mr-2'>
                    Total
                  </span>
                  <span className='text-lg font-semibold whitespace-nowrap overflow-hidden'>
                    Rs: {grandTotal}
                  </span>
                </div>
                <div className='w-full flex justify-between px-4'>
                  <span className='text-lg font-semibold whitespace-nowrap overflow-hidden mr-2'>
                    Coupon Added
                  </span>
                  <span className='text-lg font-semibold whitespace-nowrap overflow-hidden'>
                    - {activeCoupon}
                  </span>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className='w-full flex justify-between px-4'>
              <span className='text-lg font-semibold whitespace-nowrap overflow-hidden mr-2'>
                Grand Total
              </span>
              <span className='text-lg font-semibold whitespace-nowrap overflow-hidden'>
                Rs: {grandTotal - activeCoupon}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className='w-full flex justify-center'>Add products to cart</div>
      )}
    </div>
  );
};
export default Summary;
