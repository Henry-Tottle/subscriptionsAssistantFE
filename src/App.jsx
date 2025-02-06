import {useEffect, useState} from 'react'
import BooksDisplay from "./Components/BooksDisplay/index.jsx";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import SingleBookDisplay from "./Components/SingleBookDisplay/index.jsx";
import LandingPage from "./Components/LandingPage/index.jsx";
import DisplayQtySelector from "./Components/DisplayQtySelector/index.jsx";
import SearchBar from "./Components/SearchBar/index.jsx";
import TagsList from "./Components/TagsList/index.jsx";
import BookImporter from "./Components/BookImporter/index.jsx";
import FormatPicker from "./Components/FormatPicker/index.jsx";
import TagsCheckboxList from "./Components/TagsCheckboxList/index.jsx";

function App() {

    const [books, setBooks] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState()
    const [selectedTag, setSelectedTag] = useState([])
    const [tags, setTags] = useState([])
    const [qty, setQty] = useState(25)
    const [format, setFormat] = useState('')
    const [titleText, setTitleText] = useState()

    const getBooks = async () => {
        if (selectedCategory) {
            let url = 'http://0.0.0.0:8081/books/category/' + selectedCategory + '/' + qty
            let response = await fetch(url);
            let json = await response.json();
            setBooks(json.data);
            setTitleText(selectedCategory + ' books: ')
        } else {
            let url = 'http://0.0.0.0:8081/books/filter?limit=' + qty + (format ? format : '') + (selectedTag ? '&tags=' + selectedTag : '')
            let response = await fetch(url);
            let json = await response.json();
            setBooks(json.data);
            setTitleText('All books: ')
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
        console.log(format)
    }, [selectedCategory, selectedTag, qty, format]);

    const [bookID, setBookID] = useState()



    return (
        <>

            <BrowserRouter>
                <div className='bg-cyan-800 text-neutral-50'>

                    <h1 className='bg-cyan-500 text-4xl text-center'>Subscriptions Assistant</h1>
                    <Link to={'/book'}><h6>Home</h6></Link>
                    <Link to={'/import'}><h6>Book Importer</h6></Link>
                    <div>
                        <SearchBar setBooks={setBooks} qty={qty}/>
                    </div>

                    <div className='flex justify-between'>
                        <div className='flex flex-col gap-1'>
                            <FormatPicker setFormat={setFormat}/>
                            <DisplayQtySelector setQty={setQty}/>
                        </div>
                        {/*<TagsList tags={tags} setSelectedTag={setSelectedTag}/>*/}
                        <TagsCheckboxList tags={tags} setSelectedTag={setSelectedTag}/>
                    </div>
                    <Routes>
                        <Route path={'/'} element={<LandingPage/>}/>
                        <Route path={'/import'} element={<BookImporter/>}/>
                        <Route path={`/book/${bookID}`}
                               element={<SingleBookDisplay bookID={bookID}
                                                           setSelectedTag={setSelectedTag}
                                                           setSelectedCategory={setSelectedCategory}/>}/>
                        <Route path={`/book`} element={<BooksDisplay books={books}
                                                                     bookID={bookID}
                                                                     titleText={titleText}
                                                                     setBookID={setBookID}
                                                                     categories={categories}
                                                                     setSelectedCategory={setSelectedCategory}
                                                                     setSelectedTag={setSelectedTag}/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </>
    )
}

export default App
