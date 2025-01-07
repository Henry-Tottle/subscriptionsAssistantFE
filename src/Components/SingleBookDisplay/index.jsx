import {Link} from "react-router-dom";
import SimpleBooksDetail from "../SimpleBooksDetail/index.jsx";
import {useEffect, useState} from "react";
import Button from "../Button/index.jsx";
function SingleBookDisplay({bookID}) {

    const [book, setBook] = useState()
    const [bookDetails, setBookDetails] = useState()
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
                <label>Tags: <input type='text'/></label>
                <input type='submit'/>
            </form>
            <div className='border-2 w-1/2 mx-auto'>
                {!subjects && <div>Loading subjects...</div>}
                <ul>{subjects && displaySubjects(subjects)}</ul>
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