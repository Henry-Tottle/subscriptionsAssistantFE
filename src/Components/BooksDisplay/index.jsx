function BooksDisplay({books}) {
        return (
            <div>
                {books.map((book, i) => {
                   return (
                       <div key={i}>
                        <img alt={book.title + ' book cover'}  src={`https://jackets.dmmserver.com/media/356/${book.image}.jpg`} />
                        <h3>{book.title}</h3>
                        <h4>{book.author}</h4>
                        <h4>£{book.price}</h4>
                       </div>
                   )
                })}
            </div>
        )


}

export default BooksDisplay;