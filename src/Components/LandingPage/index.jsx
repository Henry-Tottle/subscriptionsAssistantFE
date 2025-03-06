import {Link} from "react-router-dom";

function LandingPage () {

    return (
        <div className='bg-gray-200 bg-opacity-80 m-14'>
            <p>Welcome to the subscriptions assistant. This is a tool to assist in the picking of bespoke subscriptions
                by combining our popular picks, with user tags and information from Google Books and Open Library to
                allow informed decisions.</p>
            <p>It is currently a work in progress.</p>
            <p>Currently you can filter by category, tag and format, and sort ascending and descending. THe search bar
                works independently from the rest of these filters at this stage.</p>
            <p> To begin, click the button below:</p>
            <div className='w-max mx-auto'>
                <Link to={'/book'}>
                    <button className='border rounded px-2 bg-cyan-500'>Start browsing books</button>
                </Link>
            </div>

        </div>
    )

}
export default LandingPage