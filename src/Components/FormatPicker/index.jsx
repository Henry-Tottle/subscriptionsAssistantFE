function FormatPicker ({setFormat}) {

    const changeHandler = (e) => {
        setFormat(e.target.value)
    }

    return (
        <>
            <h3>Format: </h3>
            <select onChange={changeHandler} className='text-black'>
                <option value=''>Both</option>
                <option value='&format=Paperback / softback'>Paperback</option>
                <option value='&format=Hardback'>Hardback</option>
            </select>
        </>

    )
}

export default FormatPicker