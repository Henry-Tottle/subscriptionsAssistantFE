import {useEffect, useState} from 'react'
import BooksDisplay from "./Components/BooksDisplay/index.jsx";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import SingleBookDisplay from "./Components/SingleBookDisplay/index.jsx";
import LandingPage from "./Components/LandingPage/index.jsx";
import DisplayQtySelector from "./Components/DisplayQtySelector/index.jsx";
import SearchBar from "./Components/SearchBar/index.jsx";
import BookImporter from "./Components/BookImporter/index.jsx";
import FormatPicker from "./Components/FormatPicker/index.jsx";
import TagsCheckboxList from "./Components/TagsCheckboxList/index.jsx";
import SortAndOrderSelector from "./Components/SortAndOrderSelector/index.jsx";
import Footer from "./Components/Footer/index.jsx";


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
    const [submit, setSubmit] = useState(false)
    const [tickBoxChanger, setTickBoxChanger] = useState(false)
    const [searchResetTrigger, setSearchResetTrigger] = useState(false)

    const apiURL = import.meta.env.VITE_API_URL

    const getBooks = async () => {

            let url = apiURL +
                'books/filter?limit='
                + qty
                + (selectedCategory ? '&category=' + selectedCategory : '')
                + (format ? format : '')
                + (selectedTag.length ? '&tags=' + selectedTag.join(',') : '')
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

    const getCategories = async () => {
        let response = await fetch(apiURL +
            'categories');
        let json = await response.json();
        setCategories(json.data);
    }

    const getDistinctTags = async () => {
        let response = await fetch(apiURL +
            'books/tags');
        let json = await response.json();
        setTags(json.data);
    }

    const handleClearCategories = () => {
        setSelectedCategory(null)
        setSelectedTag([null])
        setTitleText('')
        setTickBoxChanger(!tickBoxChanger)
        setSearchResetTrigger(!searchResetTrigger)

    }


    useEffect(() => {
        getDistinctTags()
    }, [submit]);


    useEffect(() => {
        getBooks();
        getCategories();
    }, [selectedCategory, selectedTag, qty, format, sort, order]);

    const [bookID, setBookID] = useState()


    return (
        <>

            <BrowserRouter>
                <div className='font-sans text-black px-2 bg-[url(https://i.guim.co.uk/img/media/c3bc9f1361dd62ddd08f8ee9d0c7a463c2474d62/0_12_4016_2410/master/4016.jpg?width=1020&dpr=2&s=none&crop=none)] bg-fixed'>

                    <h1 className='mx-auto bg-gray-200 bg-opacity-80 text-8xl italic text-center w-3/4 rounded-b-2xl'>Subscriptions Assistant</h1>
                    <div className='flex gap-10 mt-10 mx-auto w-max'>
                        <Link to={'/book'}>
                            <button className='border rounded px-2 bg-cyan-500'>Home</button>
                        </Link>
                        <Link to={'/import'}>
                            <button className='border rounded px-2 bg-cyan-500'>Book Importer</button>
                        </Link>
                    </div>
                    <div>
                        <SearchBar setBooks={setBooks} qty={qty} apiURL={apiURL} searchResetTrigger={searchResetTrigger}/>
                    </div>

                    <div className='flex justify-between'>
                        <div className='flex flex-col'>
                            <FormatPicker setFormat={setFormat}/>
                            <DisplayQtySelector setQty={setQty}/>
                        </div>

                        <div>
                            <SortAndOrderSelector setOrder={setOrder} setSort={setSort}/>
                        </div>

                    </div>
                    <div className='flex gap-4'>
                            <TagsCheckboxList tags={tags} setSelectedTag={setSelectedTag} tickBoxChanger={tickBoxChanger}/>
                        <div className='w-10/12 ml-5'>

                            <Routes>
                                <Route path={'/'} element={<LandingPage/>}/>
                                <Route path={'/import'} element={<BookImporter apiURL={apiURL}/>}/>
                                <Route path={`/book/:bookID`}
                                       element={<SingleBookDisplay
                                                                   setSelectedTag={setSelectedTag}
                                                                   setSelectedCategory={setSelectedCategory}
                                                                   apiURL={apiURL}

                                                                   submit={submit}
                                                                   setSubmit={setSubmit}/>}/>
                                <Route path={`/book`} element={<BooksDisplay books={books}
                                                                             bookID={bookID}
                                                                             titleText={titleText}
                                                                             setBookID={setBookID}
                                                                             categories={categories}
                                                                             setSelectedCategory={setSelectedCategory}
                                                                             setSelectedTag={setSelectedTag}
                                                                             tags={tags}
                                                                             setTitleText={setTitleText}
                                                                             handleClearCategories={handleClearCategories}
                                />}/>
                            </Routes>
                        </div>
                    </div>

                </div>
            </BrowserRouter>

            <Footer/>
        </>
    )
}

export default App
