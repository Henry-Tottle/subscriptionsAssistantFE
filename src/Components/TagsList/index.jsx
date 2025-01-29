import {useState} from "react";

function TagsList ({tags, setSelectedTag})  {

    const [buttonToggle, setButtonToggle] = useState(false)

    const showTagsHandler = () => {
        setButtonToggle(!buttonToggle)
    }

    return (
        <div>
            <button onClick={showTagsHandler}>Show Tags</button>
            {buttonToggle && <div>{tags.map((tag, i) => (
                <p key={i} onClick={() => setSelectedTag(tag.tag)}>{tag.tag}</p>
            ))}</div>}
        </div>
    )
}

export default TagsList