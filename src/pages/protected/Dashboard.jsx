import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [userData, setUserData] = useState();
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('charitee_auth'));
    setUserData(data);
  }, []);
    return (
      <div>
        <div className='text-center my-5'>
          <div className='container'>
            <div>
              <h1>Dashboard</h1>
            </div>
            <div className='row'>
              <div className='col-4 border rounded py-5 text-start'>
                <p>Name : {userData?.name}</p>
                <p>Email : {userData?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};
export default Dashboard;
