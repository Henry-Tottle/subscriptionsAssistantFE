function CategoryPicker({categories, setSelectedCategory, selectedCategory}) {
    const clickHandler = (e) => {
       setSelectedCategory(e.target.value)
    }
    console.log(selectedCategory)
    return (
        <select onChange={clickHandler}>
            {categories.map((category, i) => {
                return <option key={i} value={category.subject}>{category.subject}</option>
            })}
        </select>
    )
}

export default CategoryPicker;