import {useEffect, useState} from 'react'
import BooksDisplay from "./Components/BooksDisplay/index.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import SingleBookDisplay from "./Components/SingleBookDisplay/index.jsx";
import LandingPage from "./Components/LandingPage/index.jsx";
import DisplayQtySelector from "./Components/DisplayQtySelector/index.jsx";
import SearchBar from "./Components/SearchBar/index.jsx";

function App() {

    const [books, setBooks] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState()
    const [selectedTag, setSelectedTag] = useState()
    const [tags, setTags] = useState([])
    const [qty, setQty] = useState(25)

    const getBooks = async () => {
        if (selectedCategory) {
            let url = 'http://0.0.0.0:8081/books/' + selectedCategory + '/' + qty
            let response = await fetch(url);
            let json = await response.json();
            setBooks(json.data);
            console.log('category filter: ', json.data)
        } else if (selectedTag) {
            let url = 'http://0.0.0.0:8081/books/tags/' + selectedTag
            let response = await fetch(url);
            let json = await response.json();
            setBooks(json.data);
            console.log('tags filter: ', json.data)
        } else {
            let url = 'http://0.0.0.0:8081/books/' + qty
            let response = await fetch(url);
            let json = await response.json();
            setBooks(json.data);
            console.log('No filter: ', json.data)
        }
    }

    const getCategories = async () => {
        let response = await fetch('http://0.0.0.0:8081/categories');
        let json = await response.json();
        setCategories(json.data);
    }

    const getDistinctTags = async () => {
        let response = await fetch('http://0.0.0.0:8081/books/tags');
        let json = await response.json();
        setTags(json.data);
        console.log(json.data)
    }

    useEffect(() => {
        console.log(qty)
    }, [qty]);

    useEffect(() => {
        getDistinctTags()
    }, []);


    useEffect(() => {
        getBooks();
        getCategories();
    }, [selectedCategory, selectedTag, qty]);

    const [bookID, setBookID] = useState()
    const [buttonToggle, setButtonToggle] = useState(false)

    const showTagsHandler = () => {
        setButtonToggle(!buttonToggle)
    }

    return (
        <>

            <BrowserRouter>
                <div className='bg-cyan-800 text-neutral-50'>

                    <h1 className='bg-cyan-500 text-4xl text-center'>Subscriptions Assistant</h1>
                    <div>
                        <SearchBar setBooks={setBooks} qty={qty}/>
                    </div>
                    <div className='flex justify-between'>
                        <DisplayQtySelector setQty={setQty}/>
                        <div>
                            <button onClick={showTagsHandler}>Show Tags</button>
                            {buttonToggle && <div>{tags.map((tag, i) => (
                                <p key={i} onClick={() => setSelectedTag(tag.tag)}>{tag.tag}</p>
                            ))}</div>}
                        </div>
                    </div>
                    <Routes>
                        <Route path={'/'} element={<LandingPage/>}/>
                        <Route path={`/book/${bookID}`}
                               element={<SingleBookDisplay bookID={bookID}
                                                           setSelectedTag={setSelectedTag}
                                                           setSelectedCategory={setSelectedCategory}/>}/>
                        <Route path={`/book`} element={<BooksDisplay books={books}
                                                                     bookID={bookID}
                                                                     setBookID={setBookID}
                                                                     categories={categories}
                                                                     setSelectedCategory={setSelectedCategory}
                                                                     setSelectedTags={setSelectedTag}/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </>
    )
}

export default App
