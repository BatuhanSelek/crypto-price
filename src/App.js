import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
function App() {
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [price, setPrice] = useState(null);




  useEffect(() => {
    if (selectedCrypto) {
      axios
        .get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${selectedCrypto}`)
        .then((response) => {
          const cryptoData = response.data[0]; 
          setPrice(cryptoData.current_price);
        })
        .catch((error) => {
          console.error('API isteği başarısız oldu:', error);
        });
    }
  }, [selectedCrypto]);

  const handleCryptoChange = (event) => {
    setSelectedCrypto(event.target.value);
  };

  return (
    <div className="container h-100 rounded-4" id='position'>
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-md-4">
          <div className="text-center p-4  custom-box">
            <h1 className="mb-4 text-warning font-weight-bold ;">Crypto Price App</h1>
            <div className="form-group">

              <select className="form-control" onChange={handleCryptoChange}>
                <option value="">Token Seçiniz</option>
                <option value="bitcoin">Bitcoin</option>
                <option value="ethereum">Ethereum</option>
                <option value="tether">USDT</option>
              </select>

              

            </div>
            {price && (
              <p className=" mt-3">
                Mevcut Fiyat: <span className="foot "><span className="pri">${price}</span></span>
              </p> 
            )}
          </div>
        </div>
      </div>
    </div >
  );
}

export default App;


