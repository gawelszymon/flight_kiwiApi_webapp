import React, { useState, useEffect } from 'react';
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

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    const arr: string[] = [];
    arr.push(code);
    setFormData((previousState: FormData) => {
      return {
        ...previousState,
        [where]: arr
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

      document.getElementById('serverResponse').innerText = data.message;
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
        // flight app form content
      </section>
    </div>
  )
}

export default App;
