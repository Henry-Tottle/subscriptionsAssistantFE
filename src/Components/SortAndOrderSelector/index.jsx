function SortAndOrderSelector ({setSort, setOrder}) {

    const sortHandler = (e) => {
        setSort(e.target.value)
    }

    const orderHandler = (e) => {
        setOrder(e.target.value)
    }
    return (
        <div className='flex flex-col'>
            <h3>Sort by:</h3>
            <select onChange={sortHandler} className='text-black'>
                <option value='picksCount'>Total Picks</option>
                <option value='pubDate'>Publication Date</option>
            </select>
            <h3>Order: </h3>
            <select onChange={orderHandler} className='text-black'>
                <option value='DESC'>High to Low / New to Old</option>
                <option value='ASC'>Low to High / Old to New</option>
            </select>


        </div>

    )
}

export default SortAndOrderSelector