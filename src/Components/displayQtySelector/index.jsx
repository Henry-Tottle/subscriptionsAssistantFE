function DisplayQtySelector ({setQty}) {
    return (
        <select className='text-black' onChange={(e) => {
            setQty(e.target.value)
        }}>
            <option>25</option>
            <option>50</option>
            <option>75</option>
            <option>100</option>
        </select>
    )
}

export default DisplayQtySelector