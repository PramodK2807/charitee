import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Swal from 'sweetalert2';
import { productCart } from '../../recoil/todoRecoil';

const ProductsDetails = () => {
  const [data, setData] = useState();
  const [qty, setQty] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const [cartState, setCartState] = useRecoilState(productCart);
  const params = useParams();

  const fetchPoducts = async () => {
    try {
      let response = await axios.get(
        `https://dummyjson.com/products/${params.id}`
      );
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log('error fetching');
    }
  };

  const StarRating = ({ rating }) => {
    const roundedRating = Math.round(rating);
    const stars = Array.from({ length: 5 }, (_, index) => (
      <span
        className='text-warning fw-bold'
        style={{ fontSize: '25px' }}
        key={index}
      >
        {index < roundedRating ? '★' : '☆'}
      </span>
    ));

    return <div>{stars}</div>;
  }

  const handleCart = (cartProduct) => {
    console.log(cartState);
    if (qty < 0 || qty === null) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: `Enter Qty`,
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 2000,
      });
      return false;
    }
    let findExistingItemInCart = cartState.find(
      (items) => items.id === cartProduct.id
    );
    if (findExistingItemInCart) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: `${cartProduct.title} is already in the cart`,
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 2000,
      });
      return false;
    } else {
      const itemToAddInCart = {
        id: cartProduct.id,
        description: cartProduct.description,
        category: cartProduct.category,
        price: cartProduct.price,
        qty: +qty,
        thumbnail: cartProduct.thumbnail,
        title: cartProduct.title,
        discountPercentage: cartProduct.discountPercentage,
      };

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: `${cartProduct.title} is added in the cart`,
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 2000,
      });

      setCartState((oldCartItems) => [itemToAddInCart, ...oldCartItems]);
    }
  };

  useEffect(() => {
    fetchPoducts();
  }, []);

  return (
    <div className='cart_bg'>
      <div className='container'>
        <h1 className='text-center py-5'>
          Watching {data ? data.title : 'Product page'}
        </h1>
        {data ? (
          <div>
            <div className='row gx-5'>
              <div className='col-12 col-md-6'>
                <div>
                  <div
                    className='position-relative'
                    style={{ height: '400px' }}
                  >
                    <img
                      className='w-100 h-100 rounded'
                      src={thumbnail || data.thumbnail}
                      alt={data.title}
                    />
                    <div className='position-absolute end-0 top-0 '>
                      <p
                        style={{
                          background: '#ff00e4',
                          color: 'white',
                          fontWeight: 'bold',
                        }}
                        className='px-2 py-1'
                      >
                        {data.category}
                      </p>
                    </div>
                  </div>
                  <div
                    style={{ gap: '10px' }}
                    className='d-flex align-items-center justify-content-between my-3 '
                  >
                    {data.images.length > 0 ? (
                      data.images.map((image, i) => (
                        <div style={{ height: '100px' }} key={i}>
                          <img
                            style={{ transition: 'all 5s ease' }}
                            className='w-100 h-100 object-fit-fill rounded cursor-pointer'
                            src={image}
                            alt={`Image ${i}`}
                            onMouseEnter={() => setThumbnail(image)}
                            onMouseLeave={() => setThumbnail(null)}
                            key={i}
                          />
                        </div>
                      ))
                    ) : (
                      <h1>No images</h1>
                    )}
                  </div>
                </div>
              </div>
              <div className='col-12 col-md-6'>
                <div>
                  <div className='row bg-light py-4 rounded px-2'>
                    <h1 style={{ fontSize: '30px' }} className='title col-8'>
                      {data.title}
                    </h1>
                    <h4 className='col-4 text-end'>{data.brand}</h4>
                    <div>
                      <StarRating rating={data.rating} />
                    </div>
                  </div>
                  <p style={{ fontSize: '19px' }} className='my-3'>
                    {data.description}
                  </p>
                  <div className='row'>
                    <div className='col-12'>
                      <p style={{ fontSize: '30px', color: 'green' }}>
                        {data.discountPercentage}% Off
                      </p>
                    </div>
                    <p
                      style={{ fontSize: '20px' }}
                      className=' col-6 fw-bold text-decoration-line-through'
                    >
                      Price : ${data.price}
                    </p>
                    <p className='fw-bold text-success col-6 text-end'>
                      Final Price: $
                      {data.price -
                        ((data.discountPercentage / 100) * data.price).toFixed(
                          2
                        )}
                    </p>
                  </div>

                  <div className='row'>
                    <div className='col-6'>
                      <input
                        className='w-100 p-2 rounded'
                        type='number'
                        placeholder='Enter Qty'
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      />
                    </div>
                    <div className='col-6'>
                      <button
                        className='rounded-pill bg-success text-light'
                        onClick={() => handleCart(data)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h1>Loading</h1>
        )}
      </div>
    </div>
  );
};
export default ProductsDetails;
