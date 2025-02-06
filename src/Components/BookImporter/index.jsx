// import ConvertCsvToJson from "convert-csv-to-json";
import Papa from "papaparse";
import {useState , useRef} from "react";

function BookImporter () {

    const [file, setFile] = useState()
    const fileInputRef = useRef(null)

    const handleFileChange = (e) => {
        setFile(e.target.files[0])

    }

    const importToDatabase = async (bookData) => {
        let url = 'http://0.0.0.0:8081/books/importBooks';
        let payload = {books : bookData};
        try {
            let response = await fetch(url, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(payload),
                mode : 'cors'
            });

            let data = await response.json();

            return data;
        } catch (error) {
            console.error('Error occured during POST request: ', error);
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()

        if(!file) {
            alert("Please select a file first!")
            return
        }
        const reader = new FileReader()

        reader.onload = (event) => {
            const csvData = event.target.result
            Papa.parse(csvData, {
                header:true,
                skipEmptyLines:true,
                complete:(results) => {
                    console.log("Converted JSON: ", results.data)
                    alert("CSV successfully converted to JSON. Check the console!")
                    importToDatabase(results.data)


                    setFile(null);
                    if (fileInputRef.current) {
                        fileInputRef.current.value = ""
                    }
                },
                error:(error)=> {
                    console.error("Error parsing CSV: ", error)
                    alert("An Error occurred while processing the CSV file.")
                }
            })
        }
        reader.readAsText(file)
    }


    return (
        <>
        <h1>Database Importer</h1>
            <p>This page has currently been set up to import Tom M's new title list to
            the subscriptions book database.</p>
            <form onSubmit={handleFormSubmit}>
                <label>CSV file to be imported: <input type='file' accept={'.csv'} onChange={handleFileChange}/></label>
                <button type='submit'>Submit</button>
            </form>
        </>
    )
}

export default BookImporter