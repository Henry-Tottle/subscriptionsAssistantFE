import {useEffect, useState} from "react";

function SearchBar ({setBooks, qty, searchResetTrigger, apiURL}) {

    const [searchTerm, setSearchTermLocal] = useState('')
    const getBooksBySearch = async () => {
        if(!searchTerm.trim()) return
        let url = apiURL +
            'books/search/' + searchTerm + '/' + qty
        try {
            let response = await fetch(url)
            let json = await response.json()
            setBooks(json.data)
        } catch (error) {
            console.error("Error fetching books: ", error)
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted Value: ', searchTerm)
        getBooksBySearch()

    }


    const handleInputChange = (e) => {
        setSearchTermLocal(e.target.value)
    }

    useEffect(() => {
        setSearchTermLocal('')
    }, [searchResetTrigger]);

    return (
        <form className='my-5 text-center' onSubmit={handleSubmit}>
            <input
                    className='text-black w-80 px-4 py-2 rounded-l-md border border-black focus:outline-none focus:ring-2 focus:ring-blue-500'
                    type='text'
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder='Search by title, author or ISBN'/>
            <button type='submit' className='px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2'>Submit</button>
        </form>
    )
}

export default SearchBar