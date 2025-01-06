import {Link} from "react-router-dom";
import SimpleBooksDetail from "../SimpleBooksDetail/index.jsx";

function BooksDisplay({books, bookID, setBookID}) {

        return (
            <div className='border-4 rounded-2xl grid grid-cols-3 shadow-2xl '>
                {books.map((book, i) => {
                    const clickHandle = () => {
                        setBookID(book.id)
                    }
                   return (
                       <div key={i} className='border-4  text-center rounded-2xl m-3'>
                            <SimpleBooksDetail book={book} />
                            <Link to={`/book/${book.id}`}>
                                <button className='bg-cyan-300 hover:bg-cyan-500 p-3 border-2 rounded-2xl' onClick={clickHandle}>More details</button>
                            </Link>
                       </div>
                   )
                })}
            </div>
        )


}

export default BooksDisplay;