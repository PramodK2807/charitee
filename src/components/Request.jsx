import { useEffect, useState } from 'react';
import JsonContact from '../db.json';

const Request = () => {
  const [data] = useState(JsonContact.contacts);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className='container'>
      <h1 className='text-center my-5'>Requests</h1>
      <div className='row my-2'>
        {data &&
          data.map((items) => (
            <>
              <div className='col-md-4 border border-success rounded'>
                <div className='py-2 px-1'>
                  <p className='m-0 fw-bold'>{items.name}</p>
                  <p
                    className='m-0 fw-bold'
                    style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '100%',
                    }}
                  >
                    {items.email}
                  </p>
                  <p>{items.message}</p>
                </div>
              </div>
            </>
          ))}
      </div>
    </div>
  );
};
export default Request;
