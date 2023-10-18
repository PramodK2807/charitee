import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { productCart } from '../../../recoil/todoRecoil';
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [keyword, setKeyword] = useState('');

  const [cartState, setCartState] = useRecoilState(productCart);

  const handleSearch = () => {
    const filterData = originalProducts.filter(
      (item) =>
        item.title.toLowerCase().includes(keyword.toLowerCase()) ||
        item.category.toLowerCase().includes(keyword.toLowerCase())
    );
    console.log(filterData);
    setAllProducts(filterData);
  };

  const getProducts = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      setAllProducts(response.data.products);
      setIsFetching(false);
      setOriginalProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
      setIsFetching(false);
    }
  };

  const handleCart = (cartProduct) => {
    console.log(cartState);
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
        qty: 1,
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
    getProducts();
  }, []);

  useEffect(() => {}, [allProducts]);

  //   const toggleReadMore = (index) => {
  //     const updatedProducts = [...allProducts];
  //     updatedProducts[index].readMore = !updatedProducts[index].readMore;
  //     setAllProducts(updatedProducts);
  //   };

  return (
    <div className='products_bg pb-2'>
      <div className='container'>
        <h1 className='text-center py-5 text-dark'>Products</h1>

        <div className='row'>
          <div className='col-12 col-md-6 position-relative mb-5'>
            <input
              className='rounded-pill px-3 py-2 search_icon'
              type='text'
              placeholder='Search Products, Categories'
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <div
              className='icon position-absolute end-0 pb-1 pe-1'
              onClick={handleSearch}
            >
              &#128269;
            </div>
          </div>
        </div>
        <div className='row gy-5 gx-4'>
          {isFetching ? (
            <h1 className='text-center'>Loading products...</h1>
          ) : allProducts && allProducts.length > 0 ? (
            allProducts.map((products, i) => {
              return (
                <div
                  key={i}
                  className=' col-6 col-md-4 col-xxl-3 products_card'
                >
                  {/* <NavLink className="text-dark" to={`/products/${products.id}`}> */}
                  <div
                    data-aos='zoom-in-up'
                    data-aos-offset='300'
                    className='cards bg-light rounded'
                  >
                    <div className='position-relative'>
                      <NavLink
                        className='text-dark'
                        to={`/products/${products.id}`}
                      >
                        <img
                          className='w-100 thumbnail'
                          src={products.thumbnail}
                          alt={products.title}
                        />
                      </NavLink>

                      <div className='category text-end'>
                        {products.category.charAt(0).toUpperCase() +
                          products.category.slice(1)}
                      </div>
                      <div className='position-absolute bottom-0 end-0'>
                        <button
                          style={{
                            fontSize: '30px',
                            background: '#212429',
                            borderRadius: '20px',
                            padding: '5px 8px',
                          }}
                          onClick={() => handleCart(products)}
                        >
                          &#x1F6D2;
                        </button>
                      </div>
                    </div>
                    <div className='px-2'>
                      <NavLink
                        className='text-dark'
                        to={`/products/${products.id}`}
                      >
                        <div className='my-3'>
                          <p className='product_title text-truncate'>
                            {products.title}
                          </p>
                        </div>
                      </NavLink>

                      {/* <div className='position-relative'>
                          <p
                            className={`${
                              products.description.length > 150
                                ? 'text-truncate'
                                : ''
                            }`}
                          >
                            {products.description}
                          </p>
                          {products.description.length > 50 && (
                      <p
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          background: 'white',
                        }}
                        onClick={() => toggleReadMore(i)}
                        className={`text-decoration-none p-0 m-0 text-primary cursor-pointer ${
                          products.readMore ? 'top-50' : ''
                        }`}
                      >
                        {products.readMore ? 'Read Less' : 'Read More'}
                      </p>
                    )}
                        </div> */}
                      <hr />
                      <div className='row align-items-center justify-content-between  bottom-0 pb-2'>
                        <div
                          style={{ fontSize: '14px' }}
                          className='col-4 fw-bold text-nowrap'
                        >
                          Price : ${products.price}
                        </div>
                        <div
                          className='col-4 fw-bold text-nowrap text-center text-success'
                          style={{
                            borderLeft: '2px solid grey',
                            fontSize: '14px',
                          }}
                        >
                          {products.discountPercentage.toFixed(0)}% Off
                        </div>
                        <NavLink
                          style={{
                            borderLeft: '2px solid grey',
                            fontSize: '14px',
                          }}
                          className='d-none d-lg-block text-primary col-4 fw-bold text-nowrap text-end'
                          to={`/products/${products.id}`}
                        >
                          View Details
                        </NavLink>
                        <NavLink
                          className='d-block d-lg-none text-primary fw-bold text-nowrap text-center my-2'
                          to={`/products/${products.id}`}
                        >
                          View Details
                        </NavLink>
                        {/* <div className='col-4'>hi</div> */}
                      </div>
                      {/* <button>Add To cart</button> */}
                    </div>
                    {/* <div className='position-relative bottom-0'>
                    <button className='w-100 rounded-pill'>Add to Cart</button>
                  </div> */}
                  </div>
                  {/* </NavLink> */}
                </div>
              );
            })
          ) : (
            <h1 className='text-center'>No Products</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
