function CategoryPicker({categories, setSelectedCategory}) {
    const clickHandler = (e) => {
       setSelectedCategory(e.target.value)
    }
    return (
        <select className="m-5 rounded-2xl border-2 border-gray-300 px-4 py-2 text-gray-700 bg-white ring-2 ring-blue-500" onChange={clickHandler}>
            {categories.map((category, i) => {
                return <option key={i} value={category.subject}>{category.subject}</option>
            })}
        </select>
    )
}

export default CategoryPicker;