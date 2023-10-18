import { useRecoilState, useRecoilValue } from 'recoil';
import { productCart } from '../../../recoil/todoRecoil';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

const ProductsCart = () => {
  const [cartItems, setCartItems] = useRecoilState(productCart);
  console.log(cartItems);

  const handleIncrement = (id) => {
    const dataIndex = cartItems.findIndex((product) => product.id === id);
    if (dataIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart[dataIndex] = {
        ...updatedCart[dataIndex],
        qty: updatedCart[dataIndex].qty + 1,
      };
      setCartItems(updatedCart);
    }
  };

  const handleDecrement = (id) => {
    const dataIndex = cartItems.findIndex((product) => product.id === id);
    if (dataIndex !== -1) {
      const updatedCart = [...cartItems];
      if (updatedCart[dataIndex].qty > 1) {
        // If the quantity is greater than 1, decrement it.
        updatedCart[dataIndex] = {
          ...updatedCart[dataIndex],
          qty: updatedCart[dataIndex].qty - 1,
        };
        setCartItems(updatedCart);
      } else {
        Swal.fire({
          title: 'Minimum 1 Quanity',
        });
        return false;
      }
    }
  };

  const handleRemove = (data) => {
    const dataIndex = cartItems.findIndex((product) => product.id === data.id);

    if (dataIndex !== -1) {
      const updatedCart = [
        ...cartItems.slice(0, dataIndex),
        ...cartItems.slice(dataIndex + 1),
      ];
      setCartItems(updatedCart);

      Swal.fire({
        title: 'Item removed from cart',
        icon: 'success',
      });
    }
  };

  return (
    <div className='container py-5'>
      <h1 className='text-center pb-5'>Cart</h1>
      <div className='row '>
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((data, i) => {
            return (
              <div key={i} className='col-12 my-2 box_shadow'>
                <div className='row align-items-center justify-content-between'>
                  <div className='col-4 col-md-2 position-relative p-0' style={{height:'150px'}}>
                    <img
                      src={data.thumbnail}
                      alt={data.title}
                      className='w-100 h-100 rounded'
                    />
                    <div className='discount position-absolute top-0 start-0'>
                      <p
                        style={{ background: '#b0ffb0' }}
                        className='py-1 px-2 text-success fw-bold'
                      >
                        {data.discountPercentage}% Off
                      </p>
                    </div>
                  </div>
                  <div className='col-3'>
                    <div className='fw-bold' style={{ fontSize: '20px' }}>
                      <p>{data.title}</p>
                    </div>
                    <div className='row align-items-center'>
                      <div
                        onClick={() => handleIncrement(data.id)}
                        className='col-3 cart_btn text-success cursor-pointer'
                      >
                        +
                      </div>
                      <div className='col-3 cart_btn qty'>{data.qty}</div>
                      <div
                        onClick={() => handleDecrement(data.id)}
                        className='col-3 cart_btn text-danger cursor-pointer'
                      >
                        -
                      </div>
                    </div>
                  </div>
                  <div className='col-3'>
                    <div
                      style={{ fontSize: '18px' }}
                      className=' text-danger price fw-bold text-decoration-line-through'
                    >
                      Price: ${data.price} / Qty
                    </div>
                    <div className='price text-success fw-bold' style={{ fontSize: '18px' }}>
                      Discounted Price : $
                      {((data.price -
                        (data.discountPercentage / 100) * data.price) *
                        data.qty).toFixed(2)}
                    </div>
                  </div>
                  <div className='col-3'>
                    <button onClick={() => handleRemove(data)}>Remove</button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No items in cart</h1>
        )}
      </div>
    </div>
  );
};
export default ProductsCart;
