import { Input, Selector, Textarea } from "@rewind-ui/core"
import { useState } from "react"

enum StandardType {
	HASHING='HASHING',
	SYMMETRIC='SYMMETRIC',
	ASYMMETRIC='ASYMMETRIC',
}

type Props = {
	plaintext: string
	setPlaintext: (val: string) => void
	publicKey: string
	setPublicKey: (val: string) => void
	privateKey: string
	setPrivateKey: (val: string) => void
	setStandardData: (val: string) => void
	
}

const UserInput = ({plaintext, setPlaintext, publicKey, setPublicKey, privateKey, setPrivateKey, setStandardData}: Props) => {

	const [standard, setStandard] = useState<StandardType>(StandardType.HASHING)
	const [numKeys, setNumKeys] = useState<number>(0)

	// takes any type and checks if it can be converted to a standardtype
	const StringToStandardType = (val: unknown): StandardType => {
		if (typeof val !== 'string') throw Error('Trying to convert a non string into a standard type')
		const stringVal: string = val.toUpperCase()
		return StandardType[stringVal as keyof typeof StandardType] ?? StandardType.HASHING // default
	}



	// sets number of shared / priv keys needed for the standard to work
	const handleHashingChange = (value: string | null | undefined) => {
		console.log(value)
		if (value == 'hmac') {
			setNumKeys(1)
		} else {
			setNumKeys(0)
		}
		setStandardData(value ?? '')
	}

  return (
    <div className="container">
			<h2 className="text-xl m-1 text-center">Cryptographic Standard</h2>
			
			<Selector value="hashing" color="gray" fullWidth={true} className="mt-2 mb-2" onChange={(value) => setStandard(StringToStandardType(value))}>
				<Selector.Tab anchor="hashing" label="Hashing"/>
				<Selector.Tab anchor="symmetric" label="Symmetric" />
				<Selector.Tab anchor="asymmetric" label="Asymmetric" />
			</Selector>

			{
				(standard === StandardType.HASHING) &&
				<Selector value={'md5'} color="gray" fullWidth={true} className="mt-2 mb-2" onChange={(value) => handleHashingChange(value)}>
					<Selector.Tab anchor="md5" label="md5"/>
					<Selector.Tab anchor="sha1" label="sha-1"/>
					<Selector.Tab anchor="sha2" label="sha-2"/>
					<Selector.Tab anchor="hmac" label="hmac"/>
				</Selector>
			}
			{
				(standard === StandardType.SYMMETRIC) &&
				<Selector value={'x'} color="gray" fullWidth={true} className="mt-2 mb-2">
					<Selector.Tab anchor="hmac" label="x"/>
				</Selector>
			}
			{
				(standard === StandardType.ASYMMETRIC) &&
				<Selector value={'y'} color="gray" fullWidth={true} className="mt-2 mb-2">
					<Selector.Tab anchor="hmac" label="y"/>
				</Selector>
			}

			<div className="mt-2 mb-1">
				<label className="text-gray-400 m-0 ml-2">plaintext</label>
				<Textarea radius="md"  className="h-32"  placeholder="The quick brown fox jumped of the lazy dog" style={{resize:'none'}} value={plaintext} onChange={(val) => setPlaintext(val.target.value)} />
			</div>
			<div>
				{
					Array.from({length: numKeys}).map((_,idx) => 
						<div key={idx}>
							<label className="text-gray-400 m-0 ml-2">{idx == 0 ? 'private Key' : 'public Key'}</label>
							<Input placeholder={'enter key here'} value={idx == 0? privateKey : publicKey} onChange={ idx == 0? (val) => setPrivateKey(val.target.value) : (val) => setPublicKey(val.target.value)} />
						</div>
					)
				}
			</div>
		</div>
  )
}

export default UserInput