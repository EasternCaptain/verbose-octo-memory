import { useEffect, useState, useMemo } from 'react'; 
import Select from 'react-select'; 

export default function ExchangeRate() {
  const [ data, setData ] = useState('');
  const [ amount, setAmount ] = useState(1); 
  const [ currentCurrency, setCurrentCurrency ] = useState('USD'); 
  const [ currentCurrencyLabel, setCurrentCurrencyLabel ] = useState('United States Dollar'); 
  const [ convertCurrency, setConvertCurrency ] = useState('TZS'); 
  const [ convertCurrencyLabel, setConverteCurrencyLabel ] = useState('Tanzanian Shilling');
  const [ rateExchange, setRateExchange ] = useState({}); 


  const apiKey = "4887aa75e7a41ef4f73b2de0" 
  useEffect(() => {
      async function getRate() {
      try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`); 
        const supportedCurrency = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/codes`); 

        const supportedCurrencyData = await supportedCurrency.json(); 
        const data = await response.json();  

        setRateExchange(data.conversion_rates); 
        setData(supportedCurrencyData.supported_codes);    

      } catch(e) {
        console.log(e); 
      }
        }
    getRate(); 
  }, []) 

    const options = []; 

  if ( data instanceof Array ) {
    data.map((dat, i) => {
      options.push({value: dat[0], label: dat[1]}) 
    })
  } 

  const conversion = useMemo(() => {

    return amount *  (rateExchange[convertCurrency]/rateExchange[currentCurrency])

  }, [amount, currentCurrency, convertCurrency])

  return (
    <div className="container" >
      <h1 className="heading">RATE EXCHANGE</h1>
      <div className="amount-input">
        <label>Enter your amount</label><br></br>
        <input type="number" value={amount} min="1" onChange={(e) => {
          setAmount(e.target.value) 
        }}/>
      </div>
      <div class="container-currency">
        <div className="current-currency">
        <label className="currency-label">Convert from: {currentCurrency}</label><br></br><br></br>
        <Select 
        options={options} 
        onChange={(e) => {
        setCurrentCurrency(e.value)
        setCurrentCurrencyLabel(e.label) 
        }}
        defaultValue={options[148]}
        />
      </div>

      <div className="convert-currency">
        <label className="currency-label">Convert to: {convertCurrency}</label><br></br><br></br>
        <Select 
        options={options} 
        onChange={(e) => {
          setConvertCurrency(e.value) 
          setConverteCurrencyLabel(e.label) 
        }} 
        defaultValue={options[145]}
        />
        </div>
      </div>
      

      <p class="output-display">{conversion ? conversion.toLocaleString(): rateExchange['TZS']} {convertCurrency}</p>
    </div>
  )
}