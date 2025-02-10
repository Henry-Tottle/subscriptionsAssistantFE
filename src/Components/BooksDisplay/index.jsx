import {Link} from "react-router-dom";
import SimpleBooksDetail from "../SimpleBooksDetail/index.jsx";
import CategoryPicker from "../CategoryPicker/index.jsx";

function BooksDisplay({books, setBookID,titleText, categories, setSelectedCategory, setSelectedTag}) {

    const handleClearCategories = () => {
        setSelectedCategory(null)
        setSelectedTag([null])
    }
    return (
        <>
            <div className='text-center'>
                <span>Choose a category: </span>
                <CategoryPicker categories={categories}
                                setSelectedCategory={setSelectedCategory}/>
                <span onClick={handleClearCategories}> clear x</span>
            </div>
            <h1 className='text-center text-4xl'>{titleText}</h1>

            <div className='border-4 rounded-2xl grid grid-cols-4 shadow-2xl '>

                {books.map((book, i) => {
                    const clickHandle = () => {
                        setBookID(book.id)
                    }
                    return (

                        <div key={i} className='border-4  text-center rounded-2xl m-3'>
                            <SimpleBooksDetail book={book}/>
                            <Link to={`/book/${book.id}`}>
                                <button className='bg-cyan-300 hover:bg-cyan-500 p-3 border-2 rounded-2xl'
                                        onClick={clickHandle}>More details
                                </button>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </>
    )


}

export default BooksDisplay;