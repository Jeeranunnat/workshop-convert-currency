import './App.css';
import money from './img/money.png';
import Currency from './components/Currency';
import { useEffect, useState } from 'react';
function App() {
  const [currencyChoice, setCurrentcyChoice] = useState([]);

  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('THB');

  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState(0);

  const [checkFromCurrency, setCheckfromCurrency] = useState(true);
  let fromAmount, toAmount;

  const amountFromCurrency = (e) => {
    setAmount(e.target.value);
    setCheckfromCurrency(true);
  };
  const amountToCurrency = (e) => {
    setAmount(e.target.value);
    setCheckfromCurrency(false);
  };

  if (checkFromCurrency) {
    fromAmount = amount;
    toAmount = (amount * exchangeRate).toFixed(2);
  } else {
    toAmount = amount;
    fromAmount = (amount / exchangeRate).toFixed(2);
  }

  useEffect(() => {
    const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCurrentcyChoice([...Object.keys(data.rates)]);
        setExchangeRate(data.rates[toCurrency]);
      });
  }, [fromCurrency, toCurrency]);

  return (
    <div>
      <img src={money} alt="logo" className="money-img" />
      <h1>แอพแปลงสกุลเงิน (API)</h1>
      <div className="container">
        <Currency
          currencyChoice={currencyChoice}
          selectCurrency={fromCurrency}
          changeCurrency={(e) => setFromCurrency(e.target.value)}
          amount={fromAmount}
          onChangeAmount={amountFromCurrency}
        />
        <div className="equal">=</div>
        <Currency
          currencyChoice={currencyChoice}
          selectCurrency={toCurrency}
          changeCurrency={(e) => setToCurrency(e.target.value)}
          amount={toAmount}
          onChangeAmount={amountToCurrency}
        />
      </div>
    </div>
  );
}

export default App;
