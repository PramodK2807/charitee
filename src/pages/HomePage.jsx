import { Helmet } from 'react-helmet';
import Contact from './Contact';

const HomePage = () => {

  return (
    <div>
      {/* SEO */}

      <Helmet>
        <title>Charitee - HomePage</title>
        <meta name='description' content='This is a charitee website' />
        <meta property='og:title' content='Charitee' />
        <meta property='og:description' content='Charitee' />
        <link rel='canonical' href='charitee.com' />
      </Helmet>

      <div>
        <div className='homepage'>
          <div className='position-relative container'>
            <div className='row min_height align-items-center text-light'>
              <div className='col-12 col-md-8 col-lg-6 col-xl-5 col-xxl-4'>
                <h1 className='title'>
                  Give a helping hand to those who need it
                </h1>
                <p className='subtitle'>
                  When a child gets access to good food, it can change just
                  about everything
                </p>
                <button className='bg-info mt-4 p-3 fw-bold text-light'>
                  Ongoing Programs
                </button>
              </div>
              <div className='col-12 col-md-6 d-none d-md-block'></div>
            </div>
          </div>
        </div>
      </div>
      <div id='contact' style={{ marginTop: "44rem", marginBottom:'3rem', overflowX:"hidden" }}>
        <Contact />
      </div>
    </div>
  );
};
export default HomePage;
