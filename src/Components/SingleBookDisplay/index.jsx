import {Link} from "react-router-dom";
import SimpleBooksDetail from "../SimpleBooksDetail/index.jsx";
import {useEffect, useState} from "react";
import Button from "../Button/index.jsx";

function SingleBookDisplay({bookID, setSelectedTag, setSelectedCategory}) {

    const [book, setBook] = useState()
    //This uses subscriptions API
    const [bookDetails, setBookDetails] = useState()
    //This uses google books API but is it actually being used for anything?
    const [description, setDescription] = useState()
    const [subjects, setSubjects] = useState([])
    const [tags, setTags] = useState()
    const [userInputTag, setUserInputTag] = useState()
    const [buttonToggle, setButtonToggle] = useState(false)


    const getBookByID = async (bookID) => {
        let url = 'http://0.0.0.0:8081/book/' + bookID;
        let response = await fetch(url);
        let json = await response.json();
        setBook(json.data)
    }

    const getBookDetails = async (input) => {
        let url = 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + input;
        let response = await fetch(url);
        let json = await response.json();
        setBookDetails(json)
        if (json.items) {
            setDescription(json.items[0].volumeInfo.description)
        }
    }

    const getSubjects = async (isbn) => {
        let url = 'https://openlibrary.org/api/books?bibkeys=ISBN:' + isbn + '&jscmd=data&format=json'
        let response = await fetch(url);
        let json = await response.json()
        setSubjects(json[`ISBN:${isbn}`].subjects)

    }

    const displaySubjects = (subjects) => {
        return subjects.map((subject, i) =>
            (<li key={i}>{subject.name}</li>)
        )
    }

    const displayTags = (tags) => {
        return tags.map((tag, i) =>
            (
                <li key={i} onClick={() => {
                    setSelectedTag(tag.tag);
                    setSelectedCategory('')
                }}><Link to={'/book'}>{tag.tag}</Link></li>
            ))
    }

    const getTagsForSingleBook = async (bookID) => {
        let url = 'http://0.0.0.0:8081/book/' + bookID + '/tags';
        let response = await fetch(url);
        let json = await response.json()
        setTags(json.data)
    }

    const addTagForSingleBook = async (bookID, tag) => {
        let url = 'http://0.0.0.0:8081/books/actions/add-tag';
        let payload = {
            book_id : bookID,
            tag : tag
        };

        try {
            let response = await fetch(url, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify(payload),
                mode: 'cors',
            });

            let data = await response.json();

            return data;

        } catch (error) {
            console.error('Error occurred during POST request: ', error);
        }
    }

    const submitClickHandler = async (e) => {
        e.preventDefault();
        if (bookID && userInputTag) {
            await addTagForSingleBook(bookID, userInputTag)
            setUserInputTag('')
        } else {
            console.warn('Make sure you have entered a tag.')
        }
        setButtonToggle(!buttonToggle)
    }


    useEffect(() => {
        if (bookID) {
            getBookByID(bookID)
            getTagsForSingleBook(bookID)
        }
    }, [bookID]);

    useEffect(() => {
        if(bookID){
            getTagsForSingleBook(bookID)
        }
    }, [buttonToggle]);

    useEffect(() => {
        if (book?.isbn) {
            getBookDetails(book.isbn)
        }
    }, [book]);

    useEffect(() => {
        if (book?.isbn) {
            getSubjects(book.isbn)
        }
    }, [bookDetails]);


    if (!book) {
        return <div>Loading...</div>;
    }


    return (
        <div className='text-center w-full'>

            <SimpleBooksDetail book={book}/>
            {description && <p className='w-1/2 mx-auto'>{description}</p>}
            <form onSubmit={submitClickHandler}>
                <label>Tags: <input
                    className='m-5 rounded-2xl border-2 border-gray-300 px-4 py-2 text-gray-700 bg-white ring-2 ring-blue-500'
                    type='text'
                    value={userInputTag}
                    onChange={(e) => setUserInputTag(e.target.value)}/></label>
                <button type='submit'>Add Tag</button>
            </form>
            <div className='border-2 w-1/2 mx-auto my-5'>
                <ul className='border-2 rounded-br'>Mr B's Tags: {tags && displayTags(tags)}</ul>
                {!subjects && <div>Loading subjects...</div>}
                <ul className='p-3'>{subjects && displaySubjects(subjects)}</ul>
            </div>

            {
                <Link to={'/book'}>
                    <Button buttonText='Back'/>
                </Link>
            }
        </div>
    )
}

export default SingleBookDisplay;