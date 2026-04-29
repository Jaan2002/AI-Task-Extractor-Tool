const FilterBar = ({ filter, setFilter }) => {
  const filters = ["All", "High", "Medium", "Low"];

  return (
    <div className="filter-bar">
      {filters.map((type) => (
        <button
          key={type}
          onClick={() => setFilter(type)}
          className={`filter-btn ${filter === type ? "active" : ""} ${type.toLowerCase()}`}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;