function DisplayQtySelector ({setQty}) {
    return (
        <div className='bg-gray-200 p-3'>
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
        </div>

    )
}

export default DisplayQtySelector