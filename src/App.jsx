import {useEffect, useState} from 'react'
import BooksDisplay from "./Components/BooksDisplay/index.jsx";
import CategoryPicker from "./Components/CategoryPicker/index.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import SingleBookDisplay from "./Components/SingleBookDisplay/index.jsx";
import LandingPage from "./Components/LandingPage/index.jsx";

function App() {

    const [books, setBooks] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState()
    const getBooks = async () => {
      let url = selectedCategory ? 'http://0.0.0.0:8081/books/' + selectedCategory :'http://0.0.0.0:8081/books'
      let response = await fetch(url);
      let json = await response.json();
      setBooks(json.data);
    }

    const getCategories = async() => {
      let response = await fetch('http://0.0.0.0:8081/categories');
      let json = await response.json();
      setCategories(json.data);

    }

    useEffect(() => {
        getBooks();
        getCategories();
    }, [selectedCategory]);

    const [bookID, setBookID] = useState()



    return (
    <>
        <BrowserRouter>
            <div className='bg-cyan-800 text-neutral-50'>
                <h1 className='bg-cyan-500 text-4xl text-center'>Subscriptions Assistant</h1>

                    <Routes>
                        <Route path={'/'} element={<LandingPage/>} />
                        <Route path={`/book/${bookID}`} element={<SingleBookDisplay bookID={bookID} />} />
                        <Route path={`/book`} element={<BooksDisplay books={books} bookID={bookID} setBookID={setBookID}
                                                                     categories={categories}
                                                                     setSelectedCategory={setSelectedCategory}/>}/>
                    </Routes>
            </div>
        </BrowserRouter>
    </>
  )
}

export default App
