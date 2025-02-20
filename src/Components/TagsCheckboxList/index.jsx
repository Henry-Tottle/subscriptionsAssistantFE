import {useEffect, useState} from "react";
import button from "../Button/index.jsx";

function TagsCheckboxList ({tags, setSelectedTag, tickBoxChanger}) {

    const [buttonToggle, setButtonToggle] = useState(false)
    const [checkedTags, setCheckedTags] = useState([])

    useEffect(() => {
        setCheckedTags([])
        setSelectedTag([])
    }, [tickBoxChanger]);

    const showTagsHandler = () => {
        setButtonToggle(!buttonToggle)
    }

    const tickBoxHandler = (e) => {
        const value = e.target.value
        setSelectedTag((prevState) => prevState.includes(value) ?
        prevState.filter((item) => item !== value) :
         [...prevState, value]
        )

        setCheckedTags((prevState) => prevState.includes(value) ?
            prevState.filter((item) => item !== value) :
            [...prevState, value]
        )
    }

    return (
        <div className={'p-2 bg-gray-200 rounded-br h-min' }>
            <button onClick={showTagsHandler} >Show Tags</button>
            {buttonToggle && <div className={buttonToggle ? 'flex flex-col' : 'hidden'}>{tags.map((tag,i) => (
                <label key={i}><input
                    onChange={tickBoxHandler}
                    type='checkbox'
                    key={i}
                    value={tag.tag}
                    checked={checkedTags.includes(tag.tag)}
                    />{tag.tag}</label>
            ))}</div>}
        </div>
    )
}

export default TagsCheckboxList