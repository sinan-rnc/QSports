import { useState } from "react";
import "./ClubBarProfile.scss"
import { IoClose } from "react-icons/io5";

export default function ClubBarProfile() {
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedFoodServices, setSelectedFoodServices] = useState([]);

    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue && !selectedServices.includes(selectedValue)) {
            setSelectedServices((prevServices) => [...prevServices, selectedValue]);
        }
    };

    const handleSelectFoodChange = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue && !selectedFoodServices.includes(selectedValue)) {
            setSelectedFoodServices((prevServices) => [...prevServices, selectedValue]);
        }
    };

    const handleRemoveService = (service) => {
        setSelectedServices((prevServices) => prevServices.filter((item) => item !== service));
    };

    const handleRemoveFoodService = (service) => {
        setSelectedFoodServices((prevServices) => prevServices.filter((item) => item !== service));
    };

    const renderInputField = (service) => {
        switch (service) {
            case "No. of pool & snooker tables":
                return (
                <div className="same-line" key={service}>
                    <label className="form-label" htmlFor="poolTables">No. of pool & snooker tables</label>
                    <input type="number" className="form-control" id="poolTables" placeholder="No. of pool & snooker tables" />
                    <IoClose className="close-icon" onClick={() => handleRemoveService(service)} />
                </div>
                );
            case "Ages aloud in the club":
                return (
                <div className="same-line" key={service}>
                    <label className="form-label" htmlFor="agesAllowed">Ages allowed in the club</label>
                    <input type="number" className="form-control" id="agesAllowed" placeholder="Ages aloud in the club" />
                    <IoClose className="close-icon" onClick={() => handleRemoveService(service)} />
                </div>
                );
            case "Clubs space and seating space":
                return (
                <div className="same-line" key={service}>
                    <label className="form-label" htmlFor="clubSpace">Club space and seating space</label>
                    <input type="number" className="form-control" id="clubSpace" placeholder="Club space and seating space" />
                    <IoClose className="close-icon" onClick={() => handleRemoveService(service)} />
                </div>
                );
            case "Pool Coaching":
                return (
                <div className="same-line" key={service}>
                    <label className="form-label" htmlFor="poolCoaching">Pool Coaching</label>
                    <input type="text" className="form-control" id="poolCoaching" placeholder="Pool Coaching - Yes/No" />
                    <IoClose className="close-icon" onClick={() => handleRemoveService(service)} />
                </div>
                );
            case "Pool & Billiard Products":
                return (
                <div className="same-line" key={service}>
                    <label className="form-label" htmlFor="poolProducts">Pool & Billiard Products</label>
                    <input type="text" className="form-control" id="poolProducts" placeholder="Pool & Billiard Products" />
                    <IoClose className="close-icon" onClick={() => handleRemoveService(service)} />
                </div>
                );
            case "Table models & sizes":
                return (
                <div className="same-line" key={service}>
                    <label className="form-label" htmlFor="tableModels">Table models & sizes</label>
                    <input type="text" className="form-control" id="tableModels" placeholder="Table models & sizes" />
                    <IoClose className="close-icon" onClick={() => handleRemoveService(service)} />
                </div>
                );
            case "Pool Competitions & Events":
                return (
                <div className="same-line" key={service}>
                    <label className="form-label" htmlFor="competitions">Pool Competitions & Events</label>
                    <input type="text" className="form-control" id="competitions" placeholder="Pool Competitions & Events" />
                    <IoClose className="close-icon" onClick={() => handleRemoveService(service)} />
                </div>
                );
            case "Billiard Balls and Cloth":
                return (
                <div className="same-line" key={service}>
                    <label className="form-label" htmlFor="billiardBalls">Billiard Balls and Cloth</label>
                    <input type="text" className="form-control" id="billiardBalls" placeholder="Billiard Balls and Cloth" />
                    <IoClose className="close-icon" onClick={() => handleRemoveService(service)} />
                </div>
                );
            default:
                return null;
        }
    };

    const renderFoodInputField = (service) => {
        switch (service) {
            case "Food":
                return (
                <div className="same-line" key={service}>
                    <label className="form-label" htmlFor="food">Type of Food</label>
                    <input type="number" className="form-control" id="food" placeholder="Type of Food" />
                    <IoClose className="close-icon" onClick={() => handleRemoveFoodService(service)} />
                </div>
                );
            case "Drinks":
                return (
                <div className="same-line" key={service}>
                    <label className="form-label" htmlFor="drinks">Type of Drinks</label>
                    <input type="number" className="form-control" id="drinks" placeholder="Type of Drinks" />
                    <IoClose className="close-icon" onClick={() => handleRemoveFoodService(service)} />
                </div>
                );
            case "Coffees":
                return (
                <div className="same-line" key={service}>
                    <label className="form-label" htmlFor="coffees">Type of Coffees</label>
                    <input type="number" className="form-control" id="coffees" placeholder="Type of Coffees" />
                    <IoClose className="close-icon" onClick={() => handleRemoveFoodService(service)} />
                </div>
                );
            case "Desserts":
                return (
                <div className="same-line" key={service}>
                    <label className="form-label" htmlFor="desserts">Type of Desserts</label>
                    <input type="number" className="form-control" id="desserts" placeholder="Type of Desserts" />
                    <IoClose className="close-icon" onClick={() => handleRemoveFoodService(service)} />
                </div>
                );
            default:
                return null;
        }
    };
    

    return (
        <div className="clubBar-profile-container">
            <div className="clubBar-profile-section">
                <div className="dashborad-heading">
                    <h1 className='dashborad-main-heading'>Registration</h1>
                    <hr className="dashborad-hr-1"/><hr className="dashborad-hr-2"/>
                    <h3 className="dashborad-second-heading">Club</h3>
                </div>
                <form className="form-table">
                    <div className="same-line">
                        <div className="form-group">
                            <label className="form-label" for="clubBarName">Club/Bar Name</label>
                            <input type="text" className="form-control" id="clubBarName" placeholder="Enter the Club/Bar Name"/>
                        </div>
                        <div className="form-group">
                            <label className="form-label" for="clubBarNumber">Club/Bar ID</label>
                            <input type="text" className="form-control" id="clubBarNumber" placeholder="Enter the Club/Bar ID"/>
                        </div>
                    </div>
                    <div className="same-line">
                        <div className="form-group">
                            <label className="form-label" for="clubBarNumber">Club/Bar Slogan</label>
                            <input type="text" className="form-control" id="clubBarNumber" placeholder="Enter the Club/Bar Slogan"/>
                        </div>
                        <div className="form-group">
                            <label className="form-label" for="clubBarNumber">Club/Bar Images</label>
                            <input type="file" className="form-control" id="clubBarNumber" placeholder="Enter the Club/Bar Images"/>
                        </div>
                    </div>
                    <div className="same-line">
                        <div className="form-group">
                            <label className="form-label" for="email">Email Address</label>
                            <input type="text" className="form-control" id="email" placeholder="Enter the Email Address"/>
                        </div>
                        <div className="form-group">
                            <label className="form-label" for="phoneNumber">Phone Number</label>
                            <input type="text" className="form-control" id="phoneNumber" placeholder="Enter the Phone Number"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" for="phoneNumber">Website Link</label>
                        <input type="text" className="form-control" id="phoneNumber" placeholder="Enter the Website Link"/>
                    </div>
                    <div className="same-line">
                        <div className="form-group">
                            <label className="form-label" for="location">Address</label>
                            <input type="text" className="form-control" id="location" placeholder="Enter the Address"/>
                        </div>
                        <div className="form-group">
                            <label className="form-label" for="location">Geo Location</label>
                            <input type="text" className="form-control" id="location" placeholder="Enter the Geo Location"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" for="city"><h1>Services</h1></label>
                        {selectedServices.map((service) => renderInputField(service))}
                        <div className="same-line">
                            <label className="form-label" for="city">Add a new Service</label>
                            <select 
                                className="form-control"
                                id="services"
                                value={selectedServices}
                                onChange={handleSelectChange}
                                placeholder="No. of pool & snooker tables">
                                <option value="">Select a Service</option>
                                <option value="No. of pool & snooker tables">No. of pool & snooker tables</option>
                                <option value="Ages aloud in the club">Ages allowed in the club</option>
                                <option value="Clubs space and seating space">Clubs space and seating space</option>
                                <option value="Pool Coaching">Pool Coaching</option>
                                <option value="Pool & Billiard Products">Pool & Billiard Products</option>
                                <option value="Table models & sizes">Table models & sizes</option>
                                <option value="Pool Competitions & Events">Pool Competitions & Events</option>
                                <option value="Billiard Balls and Cloth">Billiard Balls and Cloth</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label" for="city"><h1>Food and Drinks Service</h1></label>
                        {selectedFoodServices.map((service) => renderFoodInputField(service))}
                        <div className="same-line">
                            <label className="form-label" for="city">Add a Service</label>
                            <select 
                                className="form-control"
                                id="services"
                                value={selectedFoodServices}
                                onChange={handleSelectFoodChange}
                                placeholder="Select a Service">
                                <option value="">Select a Service</option>
                                <option value="Food">Food</option>
                                <option value="Drinks">Drinks</option>
                                <option value="Coffees">Coffees</option>
                                <option value="Desserts">Desserts</option>
                            </select>
                        </div>
                    </div>

                    {/* <div className="form-group">
                        <label className="form-label" for="city"><h1>Services</h1></label>
                        <div className="same-line">
                            <label className="form-label" for="city">No. of pool & snooker tables</label>
                            <input type="number" className="form-control" id="city" placeholder="No. of pool & snooker tables"/>
                        </div>
                        <div className="same-line">
                            <label className="form-label" for="city">Ages aloud in the club</label>
                            <input type="number" className="form-control" id="city" placeholder="Ages aloud in the club"/>
                        </div>
                        <div className="same-line">
                            <label className="form-label" for="city">Clubs space and seating space</label>
                            <input type="number" className="form-control" id="city" placeholder="Clubs space and seating space"/>
                        </div>
                        <div className="same-line">
                            <label className="form-label" for="city">Pool Coaching</label>
                            <input type="text" className="form-control" id="city" placeholder="Pool Coaching - Yes/No"/>
                        </div>
                        <div className="same-line">
                            <label className="form-label" for="city">Pool & Billiard Products</label>
                            <input type="text" className="form-control" id="city" placeholder="Pool & Billiard Products"/>
                        </div>
                        <div className="same-line">
                            <label className="form-label" for="city">Table models & sizes</label>
                            <input type="text" className="form-control" id="city" placeholder="Table models & sizes"/>
                        </div>
                        <div className="same-line">
                            <label className="form-label" for="city">Pool Competitions & Events</label>
                            <input type="text" className="form-control" id="city" placeholder="Pool Competitions & Events"/>
                        </div>
                        <div className="same-line">
                            <label className="form-label" for="city">Billiard Balls and Cloth</label>
                            <input type="text" className="form-control" id="city" placeholder="Billiard Balls and Cloth"/>
                        </div>
                    </div> */}

                    {/* <div className="form-group">
                        <label className="form-label" for="city"><h1>Food and Drinks</h1></label>
                        <div className="same-line">
                            <label className="form-label" for="city">Type of Food</label>
                            <input type="text" className="form-control" id="city" placeholder="Type of Food"/>
                        </div>
                        <div className="same-line">
                            <label className="form-label" for="city">Type of Drinks</label>
                            <input type="text" className="form-control" id="city" placeholder="Type of Drinks"/>
                        </div>
                        <div className="same-line">
                            <label className="form-label" for="city">Type of Coffees</label>
                            <input type="text" className="form-control" id="city" placeholder="Type of Coffees"/>
                        </div>
                        <div className="same-line">
                            <label className="form-label" for="city">Type of Desserts</label>
                            <input type="text" className="form-control" id="city" placeholder="Type of Desserts"/>
                        </div>
                    </div> */}

                    <div className="form-group">
                        <label className="form-label" for="city"><h1>Working Hours</h1></label>
                        <div className="same-line-openclose">
                            <div className="same-line">
                                <label className="form-label" for="city">Open</label>
                                <input type="time" className="form-control" id="city" placeholder="Open"/>
                            </div>
                            <div className="same-line">
                                <label className="form-label" for="city">Close</label>
                                <input type="time" className="form-control" id="city" placeholder="Close"/>
                            </div>
                        </div>
                        <div className="same-line-openclose">
                            <div className="same-line">
                                <label className="form-label" for="city">Happy hour rate</label>
                                <input type="text" className="form-control" id="city" placeholder="Happy hour rate"/>
                            </div>
                            <div className="same-line">
                                <label className="form-label" for="city">Regular hour rate</label>
                                <input type="text" className="form-control" id="city" placeholder="Regular hour rate"/>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" for="location">Why "Your Club name here"</label>
                        <textarea type="text" className="form-control" id="location" placeholder={`Brief description on why your club is better and the services and ambiance is of better convenience.\nThe future programs and services.`}/>
                    </div>
                    <div className="form-group">
                        <label className="form-label" for="location">History of the Club</label>
                        <textarea type="text" className="form-control" id="location" placeholder="When it opened first. How it was back then. What programs were organized?"/>
                    </div>
                    <button className="save-btn">Save</button>
                </form>
            </div>
            <p className="login-link">Already Registered? <a href="/register">Login</a></p>
        </div>
    )
}