import {Link} from "react-router-dom";
import SimpleBooksDetail from "../SimpleBooksDetail/index.jsx";
import {useEffect, useState} from "react";
function SingleBookDisplay({bookID}) {

    const [book, setBook] = useState()
    const getBookByID = async (bookID) => {
        let url = 'http://0.0.0.0:8081/book/' + bookID;
        let response = await fetch(url);
        let json = await response.json();
        console.log(json.data)
        setBook(json.data)
    }

    useEffect(() => {
        if (bookID) {
            getBookByID(bookID)
        }
    }, [bookID]);

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div className='text-center'>
            <h1>{bookID}</h1>
            <SimpleBooksDetail book={book}/>

            {
                <Link to={'/'}>
                    <button>Back</button>
                </Link>
            }
        </div>
    )
}

export default SingleBookDisplay;