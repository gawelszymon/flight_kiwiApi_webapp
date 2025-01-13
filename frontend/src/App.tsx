import React, { useState } from 'react';
import './App.css';
import ComboBox from './components/ComboBox';
import data from "./data/iata_codes.json";

function App() {

  // const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    city_from: "",
    city_to: "",
    data_from: "",
    data_to: "",
    max_days_at_destination: 0,
    currency: "EUR",
    max_flight_price: 0,
    accept_stopovers: true,
  });

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value} = event.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  interface FormData {
    city_from: string;
    city_to: string;
    data_from: string;
    data_to: string;
    max_days_at_destination: number;
    currency: string;
    max_flight_price: number;
    accept_stopovers: boolean;
  }

  interface SetCityCodeParams {
    code: string;
    where: keyof FormData;
  }

  const setCityCode = ({ code, where }: SetCityCodeParams) => {
    setFormData((previousState: FormData) => {
      return {
        ...previousState,
        [where]: code
      };
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/submit_form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Success: ', data);
      console.log('Api message: ', data.message);

      const serverResponseElement = document.getElementById('serverResponse');
      if (serverResponseElement) {
        serverResponseElement.innerText = data.message;
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  return (
    <div>
      <section id="home" className="welcome-area">
        <div className = "top-area">
          <div className = "header-area">
            <nav className="navbar navbar-default bootsnav  navbar-sticky navbar-scrollspy" data-minus-value-desktop={70} data-minus-value-mobile={55} data-speed={1000}>
              <div className="container">
                <div className = "navbar-header">
                  <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
                    <i className="fa fa-bars" />
                  </button>
                  <a className = "navbar-brand" href="/">FlightApp Search<span /></a>
                </div>
                <div className = "collapse navbar-collapse menu-ui-design" id="navbar-menu">
                  <ul className = "nav navbar-nav navbar-right" data-in="fadeInDown" data-out="fadeOutUp">
                    <li className = "scroll"><a href="/">Home</a></li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
          <div className = "clearfix" />
        </div>
        <div className="container" id="form">
          <div className='row'>
            <div className='col-md-12'>
              <div className="model-search-content">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-offset-1 col-md-2 col-sm-12">
                      <div className="signle-model-search">
                        <h2>City from:</h2>
                        <div className="model-input">
                          <ComboBox data={data} setCityCode={(code) => setCityCode({ code, where: "city_from" })} where="city_from" />
                        </div>
                        <div className="model-select-date">
                          <input style={{ padding: '6px 12px' }} type="date" id="date_to" name="date_to" pattern="\d{1,2}/\d{1,2}/\d{4}" onChange={handleFormChange} required />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-offset-1 col-md-2 col-sm-12">
                      <div className="single-model-search">
                        <h2>Max Days on site:</h2>
                        <div className="model-input">
                          <input type="number" id="max_days_at_destination" name="max_days_at_destination" step={1} min={2} onChange={handleFormChange} required />
                        </div>
                      </div>
                      <div className="single-model-search">
                        <h2>Currency:</h2>
                        <div className="model-select-icon">
                          <select className="form-control" name='currency' onChange={handleFormChange}>
                            <option value="EUR">EUR</option>
                            <option value="PLN">PLN</option>
                            <option value="USD">USD</option>
                            <option value="GBP">GBP</option>
                            <option value="JPY">JPY </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-offset-1 col-md-2 col-sm-12">
                      <div className="single-model-search">
                        <h2>Max price for flight:</h2>
                        <div className="model-input">
                          <input type="number" id="max_flight_prices" name="max_flight_prices" min={10} step="1" onChange={handleFormChange} required />
                        </div>
                        <div className="single-model-search">
                          <h2>Accept Stopover:</h2>
                          <div className="model-select-icon">
                            <select className="form-control" name="accept_stopovers" onChange={handleFormChange}>
                              <option value="true">Yes</option>
                              <option value="false">No</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 col-sm-12">
                      <div className="single-model-search text-center">
                        <button className="welcome-btn model-search-btn" type='submit' >
                          search
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="welcome-hero-txt">
              <div id="serverResponse" className="animated fadeInUp"></div>
              <h2>get your desired flight in reasonable price</h2>
              <p>
                Choose cities, dates and currency to search!
              </p>
              <button className="welcome-btn">Get a subscription!</button>
            </div>
          </div>
        </div>
      </section>
      <footer id="contact" className="contact">
        <div className="container">
          <div className="footer-top">
          </div>
          <div className="footer-copyright">
            <div className="row">
              <div className="col-sm-6">

              </div>
              <div className="col-sm-6">
              </div>
            </div>
          </div>
        </div>
        <div id="scroll-Top">
          <div className="return-to-top">
            <i className="fa fa-angle-up " id="scroll-top" data-toggle="tooltip" data-placement="top" data-original-title="Back to Top" aria-hidden="true" />
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App;
