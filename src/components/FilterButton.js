const FilterButton = ({ activeFilter, filter, onClick }) => {
    return (
        <button
            className={`filter ${activeFilter === filter && `active`}`}
            onClick={onClick}
        >
            {filter}
        </button>
    );
};


export default FilterButton