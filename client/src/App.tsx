import { useState } from "react"
import UserInput from "./Components/UserInput/UserInput"
import Output from "./Components/Output/Output"

function App() {
  const [publicKey, setPublicKey] = useState<string>('')
  const [privateKey, setPrivateKey] = useState<string>('')
  const [standard, setStandard] = useState<string>('')
  const [plaintext, setPlaintext] = useState<string>('')

  const simpleHash = (string: string) => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = (hash << 5) - hash + string.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return hash.toString();
  }
  
  return (


    <div className="flex gap-2 h-screen p-2">
      <UserInput 
        publicKey={publicKey} 
        setPublicKey={setPublicKey}
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
        plaintext={plaintext}
        setPlaintext={setPlaintext}
        setStandardData={setStandard}
      />
      <Output ciphertext={simpleHash(plaintext)}/>
    </div>
  )
}

export default App
