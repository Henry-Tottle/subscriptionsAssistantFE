import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BooksDisplay from "./Components/BooksDisplay/index.jsx";
import CategoryPicker from "./Components/CategoryPicker/index.jsx";

function App() {
  const [count, setCount] = useState(0)

    const [books, setBooks] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState()
    const getBooks = async () => {
      let url = selectedCategory ? 'http://0.0.0.0:8080/books/' + selectedCategory :'http://0.0.0.0:8080/books'
      let response = await fetch(url);
      let json = await response.json();
      console.log('url')
      setBooks(json.data);
    }

    const getCategories = async() => {
      let response = await fetch('http://0.0.0.0:8080/categories');
      let json = await response.json();
      setCategories(json.data);

    }

    useEffect(() => {
        getBooks();
        getCategories();
    }, [selectedCategory]);

  return (
    <>
        <div>
            <h1>Subscriptions Assistant</h1>
            <CategoryPicker categories={categories}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}/>
            <BooksDisplay books={books} />
        </div>
    </>
  )
}

export default App
