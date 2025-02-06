import {useState} from "react";

function TagsCheckboxList ({tags, setSelectedTag}) {

    const [buttonToggle, setButtonToggle] = useState(false)

    const showTagsHandler = () => {
        setButtonToggle(!buttonToggle)
    }

    const tickBoxHandler = (e) => {
        const value = e.target.value
        setSelectedTag((prevState) => prevState.includes(value) ?
        prevState.filter((item) => item !== value) :
         [...prevState, value]
        )
    }

    return (
        <>
            <button onClick={showTagsHandler}>Show Tags</button>
            {buttonToggle && <div className='flex flex-col'>{tags.map((tag,i) => (
                <label key={i}><input onChange={tickBoxHandler} type='checkbox' key={i} value={tag.tag}/>{tag.tag}</label>
            ))}</div>}
        </>
    )
}

export default TagsCheckboxList