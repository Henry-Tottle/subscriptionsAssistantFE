import {useRef, useState} from "react";

function LandingPage () {

    const userNameRef = useRef()
    const passwordRef = useRef()
    const [message, setMessage] = useState()

    const passwordHandler = async (e) => {
        e.preventDefault()

        const username = userNameRef.current.value
        const password = passwordRef.current.value

        // try {
        //
        // }
    }





    return (
<div className='bg-gray-200'>
   <button >Generate Test Hash</button>
    <p>{}</p>
    <form >
        <label>username: <input type='text' /></label>
        <label>password: <input type='password' /> </label>
        <button type='submit'>Submit</button>
    </form>
    <p>{}</p>
</div>
    )
}

export default LandingPage