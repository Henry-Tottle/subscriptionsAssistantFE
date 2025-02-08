function DisplayQtySelector ({setQty}) {
    return (
        <>
            <h3>Results displayed: </h3>
            <select className='text-black' onChange={(e) => {
                setQty(e.target.value)
            }}>
                <option>25</option>
                <option>50</option>
                <option>75</option>
                <option>100</option>
                <option>200</option>
            </select>
        </>

    )
}

export default DisplayQtySelector