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
import SortAndOrderSelector from "./Components/SortAndOrderSelector/index.jsx";

function App() {

    const [books, setBooks] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState()
    const [selectedTag, setSelectedTag] = useState([])
    const [tags, setTags] = useState([])
    const [qty, setQty] = useState(25)
    const [format, setFormat] = useState('')
    const [titleText, setTitleText] = useState('')
    const [sort, setSort] = useState('')
    const [order, setOrder] = useState('')

    const getBooks = async () => {
        if (selectedCategory) {
            let url = 'http://0.0.0.0:8081/books/category/' + selectedCategory + '/' + qty
            let response = await fetch(url);
            let json = await response.json();
            setBooks(json.data);
            setTitleText(selectedCategory + ' books: ')
        } else {
            let url = 'http://0.0.0.0:8081/books/filter?limit='
                + qty
                + (format ? format : '')
                + (selectedTag ? '&tags=' + selectedTag : '')
                + (sort ? '&sort=' + sort : '')
                + (order ? '&sortOrder=' + order : '')
            let response = await fetch(url);
            let json = await response.json();
            setBooks(json.data);
            if (selectedTag.length > 0)
            {
                setTitleText('Filtered books: ')
            } else {
                setTitleText('All books: ')
            }
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
        getDistinctTags()
    }, []);


    useEffect(() => {
        getBooks();
        getCategories();
        console.log(order)
    }, [selectedCategory, selectedTag, qty, format, sort, order]);

    const [bookID, setBookID] = useState()


    return (
        <>

            <BrowserRouter>
                <div className='bg-cyan-800 text-neutral-50 px-2'>

                    <h1 className='bg-cyan-500 text-4xl text-center'>Subscriptions Assistant</h1>
                    <div className='flex flex-col'>
                        <Link to={'/book'}>
                            <button className='border rounded px-2'>Home</button>
                        </Link>
                        <Link to={'/import'}>
                            <button className='border rounded px-2'>Book Importer</button>
                        </Link>
                    </div>
                    <div>
                        <SearchBar setBooks={setBooks} qty={qty}/>
                    </div>

                    <div className='flex justify-between'>
                        <div className='flex flex-col'>
                            <FormatPicker setFormat={setFormat}/>
                            <DisplayQtySelector setQty={setQty}/>
                        </div>

                        <SortAndOrderSelector setOrder={setOrder} setSort={setSort}/>
                    </div>
                    <div className='flex gap-4'>
                        <div className='w-2/12 mt-32 p-2 bg-cyan-500 rounded'>
                            <TagsCheckboxList tags={tags} setSelectedTag={setSelectedTag}/>
                        </div>
                        <div className='w-10/12 ml-10'>

                            <Routes>
                                <Route path={'/'} element={<LandingPage/>}/>
                                <Route path={'/import'} element={<BookImporter/>}/>
                                <Route path={`/book/:bookID`}
                                       element={<SingleBookDisplay
                                                                   setSelectedTag={setSelectedTag}
                                                                   setSelectedCategory={setSelectedCategory}/>}/>
                                <Route path={`/book`} element={<BooksDisplay books={books}
                                                                             bookID={bookID}
                                                                             titleText={titleText}
                                                                             setBookID={setBookID}
                                                                             categories={categories}
                                                                             setSelectedCategory={setSelectedCategory}
                                                                             setSelectedTag={setSelectedTag}
                                                                             tags={tags}
                                />}/>
                            </Routes>
                        </div>
                    </div>

                </div>
            </BrowserRouter>
        </>
    )
}

export default App
