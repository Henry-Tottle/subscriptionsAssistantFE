import {useEffect, useState} from 'react'
import BooksDisplay from "./Components/BooksDisplay/index.jsx";
import CategoryPicker from "./Components/CategoryPicker/index.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import SingleBookDisplay from "./Components/SingleBookDisplay/index.jsx";

function App() {
  const [count, setCount] = useState(0)

    const [books, setBooks] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState()
    const getBooks = async () => {
      let url = selectedCategory ? 'http://0.0.0.0:8081/books/' + selectedCategory :'http://0.0.0.0:8081/books'
      let response = await fetch(url);
      let json = await response.json();
      console.log('url')
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
            <div>
                <h1 className='bg-cyan-500 text-4xl text-center'>Subscriptions Assistant</h1>
                <div className='flex justify-center w-full my-5'>
                    <CategoryPicker categories={categories}
                                    selectedCategory={selectedCategory}
                                    setSelectedCategory={setSelectedCategory}/>
                </div>
                    <Routes>
                        <Route path={`/${bookID}`} element={<SingleBookDisplay bookID={bookID} />} />
                        <Route path={`/`} element={<BooksDisplay books={books} bookID={bookID} setBookID={setBookID}/>}/>
                    </Routes>
            </div>
        </BrowserRouter>
    </>
  )
}

export default App
