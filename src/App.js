import './App.css';
import { useState, useEffect } from 'react'
import QRCode from 'qrcode';
import { CirclePicker } from 'react-color'

function App() {
  return (
    <div className="App">
      <UserInputs />
    </div>
  );
}

const UserInputs = () => {
  const [name, setName] = useState('')
  const [encryption, setEncryption] = useState('WPA2-EAP')
  const [password, setPassword] = useState('')
  const [color, setColor] = useState('#000000')
  const colors = ["#000000", "#BF2525", "#2551BF", "#25BF3E", "#F4E027"]

  const MECARD = `WIFI:T:${encryption};S:${name};P:${password};;`

  console.log(MECARD)

  const handleChange = (event) => {
    setColor(event.hex)
    console.log(event.hex)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  const download = () => {
    const canvas = document.getElementById('canvas')
    let url = canvas.toDataURL('image/png', 1.0)
    let link = document.createElement('a')
    link.download = 'qrcode-wifi.png'
    link.href = url
    link.click();
  }

  useEffect(() => {
    const canvas = document.getElementById('canvas')
    QRCode.toCanvas(
      canvas, MECARD,
      { color: { dark: `${color}FF` }, scale: 12 },
      function (error) {
        if (error) {
          console.log(error)
        } else {
          console.log('success')
        }
      })
  }, [MECARD, color])

  return (
    <>
      <div className="container">
        <div className="product">
          <canvas id="canvas"></canvas>
        </div>
        <div className="form">
          <h1>Wifi QR Code</h1>
          <form onSubmit={handleSubmit}>
            <label id='name'>Wifi Name
              <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </label>
            <div id='password'>
              <label>Encryption
                <select id="encryption-box" value={encryption} onChange={e => setEncryption(e.target.value)}>
                  <option value='WEP'>WEP</option>
                  <option value='WPA'>WPA</option>
                  <option value='WPA2-EAP'>WPA2</option>
                  <option value='nopass'>None</option>
                </select>
              </label>
              <label>Password
                <input  id="password-box" type="text" value={password} onChange={e => setPassword(e.target.value)} />
              </label>
            </div>
          </form>
          <CirclePicker color={color} onChange={handleChange} colors={colors} circleSize={40} circleSpacing={23} width={800}/>
          <button id='download-button' onClick={download}>Download</button>
        </div >
      </div>
    </>
  )
}


export default App;
