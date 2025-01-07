function CategoryPicker({categories, setSelectedCategory}) {
    const clickHandler = (e) => {
       setSelectedCategory(e.target.value)
    }
    return (
        <select onChange={clickHandler}>
            {categories.map((category, i) => {
                return <option key={i} value={category.subject}>{category.subject}</option>
            })}
        </select>
    )
}

export default CategoryPicker;