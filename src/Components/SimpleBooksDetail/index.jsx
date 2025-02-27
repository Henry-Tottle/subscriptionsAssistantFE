import {useState} from "react";

function SimpleBooksDetail ({book}) {

    const date = new Date(book.pubDate)
    const month = date.getMonth()
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const copyToClipboard = () => {
        navigator.clipboard.writeText(book.isbn)
        alert('Copied to clipboard')

    }
    return (
        <>
            <img className='mx-auto my-5 pt-5' alt={book.title + ' book cover'}
                 src={`https://jackets.dmmserver.com/media/356/${book.image}.jpg`}/>
            <h3 className='mx-auto'>{book.title}</h3>
            <h4 className='mx-auto'>{book.author}</h4>
            <h4 className='mx-auto'>{months[month] + '-' + date.getFullYear()}</h4>
            <h4 className='mx-auto'>£{book.price}</h4>
            <h4 className='mx-auto'>{book.isbn} <span className='cursor-pointer' onClick={copyToClipboard}>📋</span></h4>
            <h4 className='mx-auto'>Picked {book.picksCount} times</h4>
        </>
    )
}

export default SimpleBooksDetail;