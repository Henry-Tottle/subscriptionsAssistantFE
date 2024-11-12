function BooksDisplay({books}) {
        return (
            <div>
                {books.map((book, i) => {
                   return <img alt={book.title + ' book cover'} key={i} src={`https://jackets.dmmserver.com/media/356/${book.image}.jpg`} />
                })}
            </div>
        )


}

export default BooksDisplay;