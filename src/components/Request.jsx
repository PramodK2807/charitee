// import { useEffect } from 'react';
// import JsonContact from '../db.json';
import { useSelector } from 'react-redux';

const Request = () => {
  const data = useSelector(state => state.requestsData)

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  return (
    <div className='request_bg'>
      <div className='container'>
        <h1 className='text-center py-5'>Requests</h1>
        <div className='row my-2'>
          {data.requests &&
            data.requests.length > 0 ? data.requests.map((items, i) => (
              <>
                <div
                  className='col-md-4 border border-success rounded bg-light'
                  key={i}
                >
                  <div className='py-2 px-1'>
                    <div className='row justify-content-between mb-2'>
                      <p className='m-0 fw-bold col-7'>{items.name}</p>
                      <p className='m-0 fw-bold text-end text-success col-5'>
                        {items.createdAt}
                      </p>
                    </div>
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
            ))
            :
            <h1 className='text-center'>No requests found</h1>
            }
        </div>
      </div>
    </div>
  );
};
export default Request;
