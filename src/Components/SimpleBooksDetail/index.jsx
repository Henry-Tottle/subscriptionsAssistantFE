function SimpleBooksDetail ({book}) {
    return (
        <>
            <img className='mx-auto my-5 pt-5' alt={book.title + ' book cover'}
                 src={`https://jackets.dmmserver.com/media/356/${book.image}.jpg`}/>
            <h3 className='mx-auto'>{book.title}</h3>
            <h4 className='mx-auto'>{book.author}</h4>
            <h4 className='mx-auto'>{book.pubDate}</h4>
            <h4 className='mx-auto'>£{book.price}</h4>
            <h4 className='mx-auto'>{book.isbn}</h4>
            <h4 className='mx-auto'>Picked {book.picksCount} times</h4>
        </>
    )
}

export default SimpleBooksDetail;