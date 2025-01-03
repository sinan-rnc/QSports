import "./Bars.scss"
import { CiGrid41, CiGrid2H, CiGrid2V } from "react-icons/ci";
import { barsAndClubs } from "../../../DataSet/barsAndClubs"
import { RiExpandUpDownFill } from "react-icons/ri";
// import { ImEnlarge } from "react-icons/im";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

// import stick from "../../../Assets/Common/Billiard-Stick.png"
// import { MdOutlineZoomOutMap } from "react-icons/md";
import { useEffect, useState } from "react";
import { dubaiCities } from "../../../DataSet/dubaiCities";
import {motion} from "framer-motion"
import { useAuth } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Bars({searchOption}) {
    const navigate = useNavigate()

    const {searchCity, handleSearchCity} = useAuth()

    const [sortBy, setSortBy] = useState("")
    const [showNo, setShowNo] = useState(12)
    const [cityFilterOpen, setCityFilterOpen] = useState(true)
    const [priceFilter, setPriceFilter] = useState("")
    const [priceFilterOpen, setPriceFilterOpen] = useState(true)
    const [tournamentFilter, setTournamentFilter] = useState([])
    const [tournamentFilterOpen, setTournamentFilterOpen] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    const [gridDisplay, setGridDisplay] = useState("style1")
    
    // console.log(sortBy, showNo)

    // useEffect(() => {
    //     if (searchOption) {
    //         setCategoryFilter(searchOption === "NearBy" || searchOption === "Tournament" ? "" : searchOption)
    //     }
    // }, [setCategoryFilter, searchOption])

    // const handleCategoryChange = (city) => {
    //     if (categoryFilter.includes(city)) {
    //         // Remove the city from the filter
    //         setCategoryFilter(categoryFilter.filter((item) => item !== city));
    //     } else {
    //         // Add the city to the filter
    //         setCategoryFilter([...categoryFilter, city]);
    //     }
    // };

    // Filtered and sorted array based on selected filters and sort option
    const getProcessedBarsAndClubs = () => {
        // Apply category filter
        let filteredArray = barsAndClubs.filter((ele) => {
            if (searchCity && !ele.city.includes(searchCity)) {
                return false; // If category filter does not match, exclude this item
            }
            // Apply additional filters here (like priceFilter, tournamentFilter, etc.)
            if (priceFilter === "high" && ele.amount < 150) return false;
            if (priceFilter === "medium" && (ele.amount >= 150 || ele.amount < 100)) return false;
            if (priceFilter === "low" && ele.amount >= 100) return false;

            return true; // Include the item if it passes the filters
        });

        // Sort the array based on selected sort criteria
        filteredArray = filteredArray.sort((a, b) => {
            if (sortBy === "Name") {
                return a.name.localeCompare(b.name);
            } else if (sortBy === "City") {
                return a.city.localeCompare(b.city);
            } else if (sortBy === "Price") {
                return a.amount - b.amount;
            }
            return 0; // Default to no sorting
        });

        // Slice the array for pagination
        const startIndex = (currentPage - 1) * showNo;
        const endIndex = startIndex + showNo;
        return filteredArray.slice(startIndex, endIndex);
    };

    const totalFilteredItems = barsAndClubs.filter((ele) => {
        if (searchCity && !ele.city.includes(searchCity)) {
            return false; // If category filter does not match, exclude this item
        }
        // Apply additional filters here (like priceFilter, tournamentFilter, etc.)
        if (priceFilter === "high" && ele.amount < 150) return false;
        if (priceFilter === "medium" && (ele.amount >= 150 || ele.amount < 100)) return false;
        if (priceFilter === "low" && ele.amount >= 100) return false;

        return true; // Include the item if it passes the filters
    }).length;

    const totalPages = Math.ceil(totalFilteredItems / showNo);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const handleShow = (e) => {
        setShowNo(Number(e.target.value));
        setCurrentPage(1); // Reset to first page when showNo changes
    };

    // Handle Prev and Next clicks
    const handlePrev = () => {
        setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
    };

    const handleNext = () => {
        setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
    };

    // Handle clicking a specific page number
    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    const handleReset = () => {
        // setCategoryFilter("");
        handleSearchCity("")
        setPriceFilter("");
    }

    // console.log(dubaiCities)
      
    return (
        <section className="bars container-section">
            <div className="heading">
                <h1 className='main-heading'>Bars</h1>
                <hr className="hr-1"/><hr className="hr-2"/>
                <h3 className="second-heading">all</h3>
            </div>
            {/* <img src={stick} alt="" className="stick"/>   */}
                
            <div className="section">
                {/* <!-- Filters Sidebar --> */}
                <div className="filters">
                    <h3>Filters</h3>
                    {/* <hr/> */}
                    <div className="filter-category">
                        <div className="filter-header" onClick={() => setCityFilterOpen(!cityFilterOpen)}>
                            <span>Cities</span>
                            {!searchCity ? <FaCaretDown /> : <FaCaretUp/>}
                        </div>
                        <motion.ul
                            id="categories"
                            initial={false}
                            animate={{ height: cityFilterOpen ? "auto" : 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="filter-content"
                            style={{ overflow: "hidden" }}
                        >
                            {dubaiCities.map((city) => (
                                <li key={city}>
                                    <input
                                        type="checkbox"
                                        value={city}
                                        checked={searchCity === city}
                                        onChange={() => handleSearchCity(city)}
                                    />
                                    <span>{city}</span>
                                </li>
                            ))}                    
                            {/* <li>
                                <input 
                                    type="checkbox" 
                                    value="Bar" 
                                    checked={categoryFilter === "Bar"}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                />
                                <span>Bars</span></li> */}
                        </motion.ul>
                    </div>
                    {/* <hr/> */}
                    <div className="filter-category">
                        <div className="filter-header" onClick={() => setTournamentFilterOpen(!tournamentFilterOpen)}>
                            <span>Tournaments</span>
                            {!tournamentFilterOpen ? <FaCaretDown /> : <FaCaretUp/>}
                        </div>
                        <motion.ul
                            id="categories"
                            initial={false}
                            animate={{ height: tournamentFilterOpen ? "auto" : 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="filter-content"
                            style={{ overflow: "hidden" }}
                        >
                            <li><input type="checkbox"></input><span>Single Elimination</span></li>
                            <li><input type="checkbox"></input><span>Double Elimination</span></li>
                            <li><input type="checkbox"></input><span>Round Robin</span></li>
                            <li><input type="checkbox"></input><span>Ladder Tournament</span></li>
                            <li><input type="checkbox"></input><span>Swiss System</span></li>
                        </motion.ul>
                    </div>
                    {/* <hr/> */}
                    <div className="filter-category">
                        <div className="filter-header" onClick={() => setPriceFilterOpen(!priceFilterOpen)}>
                            <span>Price</span>
                            {!priceFilterOpen ? <FaCaretDown /> : <FaCaretUp/>}
                        </div>
                        <motion.ul
                            id="categories"
                            initial={false}
                            animate={{ height: priceFilterOpen ? "auto" : 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="filter-content"
                            style={{ overflow: "hidden" }}
                            >
                            <li><input 
                                type="checkbox" 
                                value="high" 
                                checked={priceFilter === "high"}
                                onChange={(e) => setPriceFilter(e.target.value)}
                            /><span>High</span></li>
                            <li><input 
                                type="checkbox" 
                                value="medium" 
                                checked={priceFilter === "medium"}
                                onChange={(e) => setPriceFilter(e.target.value)} 
                            /><span>Medium</span></li>
                            <li><input 
                                type="checkbox" 
                                value="low" 
                                checked={priceFilter === "low"}
                                onChange={(e) => setPriceFilter(e.target.value)} 
                            /><span>Low</span></li>
                        </motion.ul>
                    </div>
                    {/* <hr/> */}
                    {/* <!-- Add more filter sections as needed --> */}
                    <button 
                        className="reset-btn"
                        onClick={handleReset}>Reset</button>
                </div>

                {/* <!-- Main Content --> */}
                <div className="content">
                    {/* <!-- Header --> */}
                    <div className="header-controls">
                        <div className="product_views">
                            <CiGrid41 className={`style1 ${gridDisplay === "style1" ? "" : ""}`} onClick={() => setGridDisplay("style1")}/>
                            {/* <CiGrid2H className={`style2 ${gridDisplay === "style2" ? "active" : ""}`} onClick={() => setGridDisplay("style2")}/> */}
                            {/* <CiGrid2V className={`style2 ${gridDisplay === "style3" ? "active" : ""}`} onClick={() => setGridDisplay("style3")}/> */}
                        </div>
                        
                        {/* <button className="view-grid active">Grid</button>
                        <button className="view-list">List</button> */}
                        <div className="product_filters">
                            <div className="sort-show">
                                <label for="sort-select">Sort:</label>
                                <div className="sort-select-div">
                                    <select id="sort-select" value={sortBy} onChange={(e) => {setSortBy(e.target.value)}}>
                                        <option value="">Default</option>
                                        <option value="Name">Name</option>
                                        <option value="City">City</option>
                                        <option value="Price">Price</option>
                                    </select>
                                    <RiExpandUpDownFill/>
                                </div>
                            </div>
                            <div className="sort-show">
                                <label for="show-select">Show:</label>
                                <div className="sort-select-div">
                                    <select id="show-select" value={showNo} onChange={(e) => {handleShow(e)}}>
                                        <option value={barsAndClubs.length}>All</option>
                                        <option value="6">6</option>
                                        <option value="12">12</option>
                                        <option value="24">24</option>
                                    </select>
                                    <RiExpandUpDownFill/>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Product Grid --> */}
                    {getProcessedBarsAndClubs().length === 0 ? (
                        <div className="product-grid-zero">
                            <p>No Record Found,  <button className="no-record" onClick={handleReset}>Show All</button></p>
                        </div>
                    ) : (
                        <div className="product-grid">
                        {getProcessedBarsAndClubs().map((ele) => {
                            return (
                                <div className="product-card" key={ele.id} onClick={() => {navigate("/clubs/clubId")}}>
                                    {/* <div className="product-badges">
                                        <span className="badge sale">Sale</span>
                                        <span className="badge new">New</span>
                                        <span className="badge hot">Hot</span>
                                    </div> */}
                                    <div className="product-image">
                                        {/* <MdOutlineZoomOutMap /> */}
                                        <img src={ele.image} alt=""/>
                                    </div>
                                    <div className="product-details">
                                        <div className="left">
                                            <h3>{ele.name}</h3>
                                            <p>{ele.city}</p>
                                            <div className="rating">
                                                <span className="star">&#9733;</span>
                                                <span className="star">&#9733;</span>
                                                <span className="star">&#9733;</span>
                                                <span className="star">&#9733;</span>
                                                <span className="star">&#9733;</span>
                                            </div>
                                        </div>
                                        <div className="right">
                                            <p className="price">AED {ele.amount}</p>
                                            <button>Book Now</button>
                                            {/* <ImEnlarge /> */}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        </div>
                    )}

                    {/* <!-- Footer --> */}
                    {/* <div className="footer-controls">
                        <div className="footer-pagination">
                            <span className="prev">❮</span>
                            {pageNumbers.map((ele) => {
                                return(
                                    <span key={ele} className={ ""}>{ele}</span>
                                )
                            })}
                            <span className="next">❯</span>
                        </div>
                        <div className="footer-details">
                            Showing 1-{showNo}  of {barsAndClubs.length} Clubs and Bars
                        </div>
                    </div> */}
                    <div className="footer-controls">
                        <div className="footer-pagination">
                            <span
                                disabled={currentPage === 1}
                                className={`prev ${currentPage === 1 ? "disabled" : ""}`}
                                onClick={handlePrev}
                            >
                                ❮
                            </span>
                            {pageNumbers.map((page) => (
                                <span
                                    key={page}
                                    className={`page-number ${page === currentPage ? "active" : ""}`}
                                    onClick={() => handlePageClick(page)}
                                >
                                    {page}
                                </span>
                            ))}
                            <span
                                disabled={currentPage === totalPages}
                                className={`next ${currentPage === totalPages ? "disabled" : ""}`}
                                onClick={handleNext}
                            >
                                ❯
                            </span>
                        </div>
                        <div className="footer-details">
                            Showing {(currentPage - 1) * showNo + 1}-
                            {Math.min(currentPage * showNo, totalFilteredItems)} of {totalFilteredItems} Clubs and Bars
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}