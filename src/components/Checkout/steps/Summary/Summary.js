import { useEffect, useState } from "react";

const Summary = (prams) => {
  const { cartData, removeFromCart, addToCart, grandTotal, cartSize } = prams;
  return (
    <div>
      {cartSize > 0 ? (
        <div className=''>
          {cartData?.map((product, index) => (
            <div key={index}>
              {product.itemCount > 0 && (
                <div className='flex border border-gray-200 rounded-md overflow-hidden shadow-sm p-2 w-full justify-between'>
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
                    <p className='text-xl font-semibold'>Rs. {product.price}</p>
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
                        ({product.category})
                      </span>
                    </div>
                    <div className='items-center pr-4 w-48'>
                      <p className='text-xl font-semibold'>
                        Rs. {product.price}
                      </p>
                    </div>
                    <div className='items-center pr-4 w-48'>
                      <p className='text-xl font-semibold'>
                        Total Rs. {product.price * product.itemCount}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div>
              <hr />
            </div>
            <div className='w-full flex justify-between px-4'>
              <span className='text-lg font-semibold whitespace-nowrap overflow-hidden mr-2'>
                Grand Total
              </span>
              <span className='text-lg font-semibold whitespace-nowrap overflow-hidden'>
                Rs: {grandTotal}
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
