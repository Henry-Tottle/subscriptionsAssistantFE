import {Link} from "react-router-dom";
import SimpleBooksDetail from "../SimpleBooksDetail/index.jsx";
import CategoryPicker from "../CategoryPicker/index.jsx";

function BooksDisplay({books, setBookID,titleText, categories, setSelectedCategory, setSelectedTag, setTitleText, handleClearCategories}) {


    return (
        <>
            <div className='rounded-t-2xl text-center flex flex-col w-1/2 mx-auto bg-gray-200 bg-opacity-80'>
                <span>Choose a category: </span>
                <CategoryPicker categories={categories}
                                setSelectedCategory={setSelectedCategory}/>
                <span className='mb-5' onClick={handleClearCategories}> clear x</span>
            </div>
            <h1 className='text-center text-4xl bg-gray-200 bg-opacity-80'>{titleText}</h1>

            <div className='border-4 rounded-1xl grid grid-cols-4 shadow-2xl bg-gray-200 bg-opacity-80'>

                {books.map((book, i) => {
                    const clickHandle = () => {
                        setBookID(book.id)
                    }
                    return (

                        <div key={book.id} className='border-4 text-center rounded m-3 shadow-2xl'>
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