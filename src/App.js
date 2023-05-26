import './App.css';
import { useState, useEffect } from 'react'
import QRCode from 'qrcode';

function App() {
  return (
    <div className="App">
      <h1>Wifi QR Code Generator</h1>
      <UserInputs />
    </div>
  );
}

const UserInputs = () => {
  const [name, setName] = useState('')
  const [encryption, setEncryption] = useState('WPA2-EAP')
  const [password, setPassword] = useState('')

  const MECARD = `WIFI:T:${encryption};S:${name};P:${password};;`

  console.log(MECARD)



  const handleSubmit = (event) => {
    event.preventDefault()
  }

  useEffect(() => {
    let canvas = document.getElementById('canvas')
    QRCode.toCanvas(
      canvas, MECARD,
      { color: { dark: '#010599FF', light: '#FFBF60FF' } },
      function (error) {
        if (error) {
          console.log(error)
        } else {
          console.log('success')
        }
      })
  }, [MECARD])

  return (
    <>
      <div className="container">
        <div className="product">
          <canvas id="canvas" style={{ border: '1px solid' }}></canvas>
        </div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <label>Wifi Name
              <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </label>
            <label>Password
              <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <label>Encryption
              <select value={encryption} onChange={e => setEncryption(e.target.value)}>
                <option value='WEP'>WEP</option>
                <option value='WPA'>WPA</option>
                <option value='WPA2-EAP'>WPA2</option>
                <option value='nopass'>None</option>
              </select>
            </label>
          </form>
        </div >
      </div>
    </>
  )
}


export default App;
