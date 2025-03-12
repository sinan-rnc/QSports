import "./Bars.scss"
import { CiGrid41, CiGrid2H, CiGrid2V } from "react-icons/ci";
import { RiExpandUpDownFill } from "react-icons/ri";
// import { ImEnlarge } from "react-icons/im";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

// import stick from "../../../Assets/Common/Billiard-Stick.png"
// import { MdOutlineZoomOutMap } from "react-icons/md";
import { useEffect, useState } from "react";
import { dubaiCities } from "../../../DataSet/dubaiCities";
import { motion } from "framer-motion"
import { useAuth } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { startSearchClubsAndBars } from "../../../Actions/clubsAndBarsActions";

import addImage from "../../../Assets/Common/add-image.jpg"

export default function Bars() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { handleSearchFilters, searchNearByFilters, setSearchNearByFilters } = useAuth()

    // console.log(searchNearByFilters)

    const barsData = useSelector((state) => {
        return state.clubsAndBars.data.filter(ele => ele.clubType === "Bar")
    })

    console.log(barsData)

    const [ searchFilterValues, setSearchFiltersValues ] = useState({
        clubType: "Bar",
        isDeleted: false,
        sortBy: "createdAt",
        limit: 100,
        page: 1
    })

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
    const getProcessedBars = () => {
         // Find the highest normalHrRates in the dataset
        const maxPrice = Math.max(...barsData.map(ele => ele.normalHrRates));
        const priceSegment = maxPrice / 3; // Divide into three segments

        const lowThreshold = priceSegment;
        const mediumThreshold = priceSegment * 2;

        // Apply category and price filters
        let filteredArray = barsData.filter((ele) => {
            if (searchFilterValues.city && !ele.city.includes(searchFilterValues.city)) {
                return false; // If city filter does not match, exclude this item
            }

            // Apply price filtering based on calculated segments
            if (priceFilter === "high" && ele.normalHrRates <= mediumThreshold) return false;
            if (priceFilter === "medium" && (ele.normalHrRates <= lowThreshold || ele.normalHrRates > mediumThreshold)) return false;
            if (priceFilter === "low" && ele.normalHrRates > lowThreshold) return false;

            return true; // Include the item if it passes the filters
        });

        // Sort the array based on selected sort criteria
        filteredArray = filteredArray.sort((a, b) => {
            if (sortBy === "Name") {
                return a.name.localeCompare(b.name);
            } else if (sortBy === "City") {
                return a.city.localeCompare(b.city);
            } else if (sortBy === "Price") {
                return a.normalHrRates - b.normalHrRates;
            }
            return 0; // Default to no sorting
        });

        // Slice the array for pagination
        const startIndex = (currentPage - 1) * showNo;
        const endIndex = startIndex + showNo;
        return filteredArray.slice(startIndex, endIndex);
    };

    const totalFilteredItems = barsData.filter((ele) => {
        const maxPrice = Math.max(...barsData.map(ele => ele.normalHrRates));
        const priceSegment = maxPrice / 3; // Divide into three segments

        const lowThreshold = priceSegment;
        const mediumThreshold = priceSegment * 2;
        
        if (searchFilterValues.city && !ele.city.includes(searchFilterValues.city)) {
            return false; // If category filter does not match, exclude this item
        }
        // Apply additional filters here (like priceFilter, tournamentFilter, etc.)
            if (priceFilter === "high" && ele.normalHrRates <= mediumThreshold) return false;
            if (priceFilter === "medium" && (ele.normalHrRates <= lowThreshold || ele.normalHrRates > mediumThreshold)) return false;
            if (priceFilter === "low" && ele.normalHrRates > lowThreshold) return false;

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
        setPriceFilter("");
        setSearchNearByFilters({})
        setSearchFiltersValues({
            clubType: "Bar",
            isDeleted: false,
            sortBy: "createdAt",
            limit: 100,
            page: 1
        })
        const resetFilters = {
            clubType: "Bar",
            isDeleted: false,
            sortBy: "createdAt",
            limit: 100,
            page: 1
        }
        handleSearchFilters(resetFilters)
    }

    useEffect(() => {
        if(searchFilterValues.city) {
            handleSearchFilters(searchFilterValues)
        } else if(searchNearByFilters) {
            if(searchNearByFilters.lattitude || searchNearByFilters.longitude)  {
                dispatch(startSearchClubsAndBars(searchNearByFilters))
            }
        } else {
            const resetFilters = {
                clubType: "Bar",
                isDeleted: false,
                sortBy: "createdAt",
                limit: 100,
                page: 1
            }
            handleSearchFilters(resetFilters)   
        }
    }, [searchFilterValues, handleSearchFilters]);

    // console.log("searchFilterValues", searchFilterValues)
    // console.log("searchNearByFilters", searchNearByFilters)
      
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
                            <span>Emirates</span>
                            {!cityFilterOpen ? <FaCaretDown /> : <FaCaretUp/>}
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
                                        checked={searchFilterValues.city === city}
                                        onChange={() => {
                                            setSearchFiltersValues({...searchFilterValues, city: city})
                                            handleSearchFilters(searchFilterValues)
                                        }}
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
                    {/* <div className="filter-category">
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
                    </div> */}
                    {/* <hr/> */}
                    {/* <div className="filter-category">
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
                    </div> */}
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
                                        <option value={barsData.length}>All</option>
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
                    {getProcessedBars().length === 0 ? (
                        <div className="product-grid-zero">
                            <p>No Record Found,  <button className="no-record" onClick={handleReset}>Show All</button></p>
                        </div>
                    ) : (
                        <div className="product-grid">
                        {getProcessedBars().map((ele) => {
                            return (
                                <div className="product-card" key={ele.id} onClick={() => {navigate(`/clubs/${ele.name.replace(/\s+/g, '-').toLowerCase()}`)}}>
                                    {/* <div className="product-badges">
                                        <span className="badge sale">Sale</span>
                                        <span className="badge new">New</span>
                                        <span className="badge hot">Hot</span>
                                    </div> */}
                                    <div className="product-image">
                                        {/* <MdOutlineZoomOutMap /> */}
                                        {ele.image ? <img src={ele.image} alt=""/> : <img src={addImage} alt=""/>}
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
                                            <p className="price">AED {ele.normalHrRates}</p>
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
                            Showing 1-{showNo}  of {barsData.length} Clubs and Bars
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