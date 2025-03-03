import { motion } from "framer-motion";
import { useAuth } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./Events.scss"
import { CiGrid41, CiGrid2H, CiGrid2V } from "react-icons/ci";
import { tournaments } from "../../../DataSet/tournaments"
import { RiExpandUpDownFill } from "react-icons/ri";
import { ImEnlarge } from "react-icons/im";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";


import stick from "../../../Assets/Common/Billiard-Stick.png"
import { MdOutlineZoomOutMap } from "react-icons/md";
import { useEffect, useState } from "react";
import { dubaiCities } from "../../../DataSet/dubaiCities";


export default function Events({searchOption}) {

    const {searchCity, handleSearchCity} = useAuth()
    const navigate = useNavigate();

    const events = useSelector((state) => {
        return state.events.data
    })

    // const eventClub = useSelector((state) => {
    //     return state?.clubsAndBars?.data
    //         .find(ele => !ele?.isDeleted && ele?._id === events.ClubID)
    // })
    let eventTypes = [] 
    events.forEach(ele => {
        if(!(Array.isArray(ele.EventType))) {
            if (!eventTypes.includes(ele.EventType)) {
                eventTypes.push(ele.EventType)
            }
        } 
        // else {
        //     ele.category.forEach(category => {
        //         if (!categories.includes(category)) {
        //             categories.push(category)
        //         }
        //     })
        // }
    })

    console.log(eventTypes)

    const [sortBy, setSortBy] = useState("")
    const [showNo, setShowNo] = useState(6)
    const [cityFilterOpen, setCityFilterOpen] = useState(true)
    const [categoryFilter, setCategoryFilter] = useState("")
    const [categoryFilterOpen, setCategoryFilterOpen] = useState(true)
    const [priceFilter, setPriceFilter] = useState("")
    const [priceFilterOpen, setPriceFilterOpen] = useState(true)
    const [eventTypeFilter, setEventTypeFilter] = useState([])
    const [eventTypeFilterOpen, setEventTypeFilterOpen] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    const [gridDisplay, setGridDisplay] = useState("style1")
    const [clubId, setClubId] = useState("")

    const formatDate = (isoDate) => {
        if (!isoDate) return "";  // Handle empty cases
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Month starts from 0
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };
    
    // console.log(sortBy, showNo)

    // Filtered and sorted array based on selected filters and sort option
    const getProcessedEvents = () => {
        // Find the highest EnrollmentFee in the dataset
        const maxPrice = Math.max(...events.map(ele => ele.EnrollmentFee));
        const priceSegment = maxPrice / 3; // Divide into three segments

        const lowThreshold = priceSegment;
        const mediumThreshold = priceSegment * 2;

        console.log(maxPrice)

        // Apply category filter
        let filteredArray = events.filter((ele) => {
            // if (categoryFilter && !ele?.category?.includes(categoryFilter)) {
            //     return false; // If category filter does not match, exclude this item
            // }

            // if (searchCity && !ele?.city?.includes(searchCity)) {
            //     return false; // If category filter does not match, exclude this item
            // }

            if (eventTypeFilter && !ele?.EventType?.includes(eventTypeFilter)) {
                return false;
            }
            // Apply additional filters here (like priceFilter, eventTypeFilter, etc.)
            if (priceFilter === "high" && ele.EnrollmentFee <= mediumThreshold) return false;
            if (priceFilter === "medium" && (ele.EnrollmentFee <= lowThreshold || ele.EnrollmentFee > mediumThreshold)) return false;
            if (priceFilter === "low" && ele.EnrollmentFee > lowThreshold) return false;

            return true; // Include the item if it passes the filters
        });

        // Sort the array based on selected sort criteria
        filteredArray = filteredArray.sort((a, b) => {
            if (sortBy === "Name") {
                return a.EventName.localeCompare(b.EventName);
            } else if (sortBy === "Type") {
                return a.EventType.localeCompare(b.EventType);
            } else if (sortBy === "Fees") {
                return a.EnrollmentFee - b.EnrollmentFee;
            }
            return 0; // Default to no sorting
        });

        // Slice the array for pagination
        const startIndex = (currentPage - 1) * showNo;
        const endIndex = startIndex + showNo;
        return filteredArray.slice(startIndex, endIndex);
    };

    const totalFilteredItems = events.filter((ele) => {
        // Find the highest EnrollmentFee in the dataset
        const maxPrice = Math.max(...events.map(ele => ele.EnrollmentFee));
        const priceSegment = maxPrice / 3; // Divide into three segments

        const lowThreshold = priceSegment;
        const mediumThreshold = priceSegment * 2;

        // if (categoryFilter && !ele.category.includes(categoryFilter)) {
        //     return false; // If category filter does not match, exclude this item
        // }

        // if (searchCity && !ele.city.includes(searchCity)) {
        //     return false; // If category filter does not match, exclude this item
        // }

        if (eventTypeFilter && !ele?.EventType?.includes(eventTypeFilter)) {
            return false;
        }

        // Apply additional filters here (like priceFilter, eventTypeFilter, etc.)
        if (priceFilter === "high" && ele.EnrollmentFee <= mediumThreshold) return false;
            if (priceFilter === "medium" && (ele.EnrollmentFee <= lowThreshold || ele.EnrollmentFee > mediumThreshold)) return false;
            if (priceFilter === "low" && ele.EnrollmentFee > lowThreshold) return false;

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
        setEventTypeFilter("")
    }

    // console.log(pageNumbers)
      
    return (
        <section className="events container-section">
            <div className="heading">
                <h1 className='main-heading'>Events</h1>
                <hr className="hr-1"/><hr className="hr-2"/>
                <h3 className="second-heading">All</h3>
            </div>
            <div className="section">
                {/* <!-- Filters Sidebar --> */}
                <div className="filters">
                    <h3>Filters</h3>
                    {/* <div className="filter-category">
                        <div className="filter-header" onClick={() => setCategoryFilterOpen(!categoryFilterOpen)}>
                            <span>Categories</span>
                            {!categoryFilterOpen ? <FaCaretDown /> : <FaCaretUp/>}
                        </div>
                        <motion.ul
                            id="categories"
                            initial={false}
                            animate={{ height: categoryFilterOpen ? "auto" : 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="filter-content"
                            style={{ overflow: "hidden" }}
                            >
                            <li>
                                <input 
                                    type="checkbox" 
                                    value="Club" 
                                    checked={categoryFilter === "Club"}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                />
                                <span>Clubs</span>
                            </li>
                            <li>
                                <input 
                                    type="checkbox" 
                                    value="Bar" 
                                    checked={categoryFilter === "Bar"}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                />
                                <span>Bars</span></li>
                        </motion.ul>
                    </div> */}
                    {/* <div className="filter-category">
                        <div className="filter-header" onClick={() => setCityFilterOpen(!cityFilterOpen)}>
                            <span>Cities</span>
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
                                        checked={searchCity === city}
                                        onChange={() => handleSearchCity(city)}
                                    />
                                    <span>{city}</span>
                                </li>
                            ))}                    
                        </motion.ul>
                    </div> */}
                    <div className="filter-category">
                        <div className="filter-header" onClick={() => setEventTypeFilterOpen(!eventTypeFilterOpen)}>
                            <span>Event Types</span>
                            {!eventTypeFilterOpen ? <FaCaretDown /> : <FaCaretUp/>}
                        </div>
                        <motion.ul
                            id="categories"
                            initial={false}
                            animate={{ height: eventTypeFilterOpen ? "auto" : 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="filter-content"
                            style={{ overflow: "hidden" }}
                            >
                            {eventTypes.map((ele) => {
                                return (
                                    <li>
                                        <input 
                                            type="checkbox"
                                            value={ele}
                                            checked={eventTypeFilter === ele}
                                            onChange={(e) => setEventTypeFilter(e.target.value)}
                                        />
                                        <span>{ele}</span>
                                    </li>
                                )
                            })}
                            {/* <li>
                                <input 
                                    type="checkbox"
                                    value="Double Elimination"
                                    checked={eventTypeFilter === "Double Elimination"}
                                    onChange={(e) => setEventTypeFilter(e.target.value)}
                                />
                                <span>Double Elimination</span>
                            </li>
                            <li>
                                <input 
                                    type="checkbox"
                                    value="Round Robin"
                                    checked={eventTypeFilter === "Round Robin"}
                                    onChange={(e) => setEventTypeFilter(e.target.value)}
                                />
                                <span>Round Robin</span>
                            </li>
                            <li>
                                <input 
                                    type="checkbox"
                                    value="Ladder Tournament"
                                    checked={eventTypeFilter === "Ladder Tournament"}
                                    onChange={(e) => setEventTypeFilter(e.target.value)}
                                />
                                <span>Ladder Tournament</span>
                            </li>
                            <li>
                                <input 
                                    type="checkbox"
                                    value="Swiss System"
                                    checked={eventTypeFilter === "Swiss System"}
                                    onChange={(e) => setEventTypeFilter(e.target.value)}
                                />
                                <span>Swiss System</span>
                            </li> */}
                        </motion.ul>
                    </div>
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
                            {/* <CiGrid2H className={`style2 ${gridDisplay === "style2" ? "active" : ""}`} onClick={() => setGridDisplay("style2")}/>
                            <CiGrid2V className={`style2 ${gridDisplay === "style3" ? "active" : ""}`} onClick={() => setGridDisplay("style3")}/> */}
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
                                        <option value="Type">Type</option>
                                        <option value="Fees">Fees</option>
                                    </select>
                                    <RiExpandUpDownFill/>
                                </div>
                            </div>
                            <div className="sort-show">
                                <label for="show-select">Show:</label>
                                <div className="sort-select-div">
                                    <select id="show-select" value={showNo} onChange={(e) => {handleShow(e)}}>
                                        <option value={events.length}>All</option>
                                        <option value="6">6</option>
                                        <option value="9">9</option>
                                        <option value="12">12</option>
                                    </select>
                                    <RiExpandUpDownFill/>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Product Grid --> */}
                    {getProcessedEvents().length === 0 ? (
                        <div className="events-grid-zero">
                            <p>No Record Found,  <button className="no-record" onClick={handleReset}>Show All</button> </p>
                        </div>
                    ) : (
                        <div className="events-grid">
                        {getProcessedEvents().map((ele) => {
                            return (
                                <div className="events-card" key={ele.id} onClick={() => {navigate(`/events/${ele?.EventName?.replace(/\s+/g, '-')?.toLowerCase()}`)}}>
                                    {/* <div className="product-badges">
                                        <span className="badge sale">Sale</span>
                                        <span className="badge new">New</span>
                                        <span className="badge hot">Hot</span>
                                    </div> */}
                                    <div className="events-image">
                                        {/* <MdOutlineZoomOutMap /> */}
                                        <img src={ele?.EventImage} alt=""/>
                                        {/* <img src={event} alt=""/> */}
                                    </div>
                                    <div className="events-details">
                                        <div className="top">
                                            <div className="left">
                                                <h3>{ele?.EventName}</h3>
                                                <p>{ele?.EventType}</p>
                                                {/* <p>At {ele?.clubName}</p> */}
                                            </div>
                                            <div className="right">
                                                <p className="price">AED {ele?.EnrollmentFee}</p>
                                                <p className="dateNTime">{formatDate(ele.StartingDate)} to {formatDate(ele.EndingDate)}</p>
                                                <button>Register Now</button>
                                            </div>
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
                            {Math.min(currentPage * showNo, totalFilteredItems)} of {totalFilteredItems} Events
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}