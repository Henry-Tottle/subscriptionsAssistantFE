import {Link} from "react-router-dom";
import SimpleBooksDetail from "../SimpleBooksDetail/index.jsx";
import {useEffect, useState} from "react";
import Button from "../Button/index.jsx";
function SingleBookDisplay({bookID}) {

    const [book, setBook] = useState()
    //This uses subscriptions API
    const [bookDetails, setBookDetails] = useState()
    //This uses google books API but is it actually being used for anything?
    const [description, setDescription] = useState()
    const [subjects, setSubjects] = useState([])
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
        setDescription(json.items[0].volumeInfo.description)
    }

    const getSubjects = async (isbn) => {
        let url = 'https://openlibrary.org/api/books?bibkeys=ISBN:'+ isbn +'&jscmd=data&format=json'
        let response = await fetch(url);
        let json = await response.json()
        setSubjects(json[`ISBN:${isbn}`].subjects)

    }

    const displaySubjects = (subjects) => {
        return subjects.map((subject, i) =>
             (<li key={i}>{subject.name}</li>)
        )
    }

    useEffect(() => {
        if (bookID) {
            getBookByID(bookID)
            console.log(book)
        }
    }, [bookID]);

    useEffect(() => {
        if(book?.isbn)
        {
            getBookDetails(book.isbn)

        }
    }, [book]);

    useEffect(() => {
        if(book?.isbn)
        {
            getSubjects(book.isbn)
        }    }, [bookDetails]);





    if (!book) {
        return <div>Loading...</div>;
    }



    return (
        <div className='text-center w-full'>

            <SimpleBooksDetail book={book}/>
            {description && <p className='w-1/2 mx-auto'>{description}</p>}
            <form>
                <label>Tags: <input className='m-5 rounded-2xl border-2 border-gray-300 px-4 py-2 text-gray-700 bg-white ring-2 ring-blue-500' type='text'/></label>
                <input type='submit'/>
            </form>
            <div className='border-2 w-1/2 mx-auto my-5'>
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