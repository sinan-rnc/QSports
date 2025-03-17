import { useDispatch, useSelector } from "react-redux"

import "./AdminClubBarApprovalDashboard.scss"
import { useEffect, useState } from "react"
import { useAuth } from "../../../../../Context/AuthContext"
import { IoClose } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import { startDeleteClub, startFeatureClub, startUpdateClub } from "../../../../../Actions/clubsAndBarsActions"
import PhoneInput from "react-phone-input-2"
import { dubaiCities } from "../../../../../DataSet/dubaiCities"
import { RiDeleteBin5Fill } from "react-icons/ri"
import { FaSearchLocation } from "react-icons/fa"
import { startApproveClub } from "../../../../../Actions/clubApprovalActions"

export default function AdminClubBarApprovalDashboard() {
    const dispatch = useDispatch()
    const { setAlertMessage, setAlertMessageColor } = useAuth()
    const allClubs = useSelector((state) => {
        return state.clubApprovalList.data
            // ?.filter(ele => ele.clubType === "Club")
            // .filter((ele => !ele.isDeleted))
    })

    const formatDateDDMMYYYY = (isoDate) => {
        if (!isoDate) return "";  // Handle empty cases
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Month starts from 0
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };


    const handleApproveClub = (ClubID) => {
        const confirmation = window.confirm("Are you sure you want to Approve this Club?");
        if (confirmation) {
            dispatch(startApproveClub(ClubID, setAlertMessage, setAlertMessageColor))
        }
    }


    return (
        <section className="admin-club-dashboard-container">
            <div id="club-dashboard" className="admin-club-dashboard">
                <div className="dashborad-heading">
                    <h1 className='dashborad-main-heading'>All Clubs</h1>
                    <hr className="dashborad-hr-1"/><hr className="dashborad-hr-2"/>
                    {/* <h3 className="dashborad-second-heading">{currentClub?.name}</h3> */}
                </div>
                {allClubs.length > 0 ? (
                    <table className="recent-orders__table">
                        <thead>
                        <tr>
                            <th>CLUB NAME</th>
                            <th>CITY</th>
                            <th>CONTACT PERSON</th>
                            <th>PHONE NO</th>
                            <th>EMAIL</th>
                            <th>REGISTERED DATE</th>
                            <th>STATUS</th>
                            <th>ACTION</th>
                        </tr>
                        </thead>
                        <tbody>
                        {allClubs?.map((ele, index) => (
                            <tr key={ele?._id}>
                                <td>{ele?.name}</td>
                                <td>{ele?.city}</td>
                                <td>{ele?.contactPerson}</td>
                                <td>{ele?.phoneNo}</td>
                                <td>{ele?.emailAddress}</td>
                                <td>{formatDateDDMMYYYY(ele?.createdAt)}</td>
                                <td>{ele?.status}</td>
                                <td>
                                    <div className="action-div">
                                        <a href="#edit-club"><button className={`edit-profile ${ele?.status === "Active" ? "approved" : ""}`}
                                            onClick={() => {
                                                handleApproveClub(ele._id)
                                            }}
                                        >{ele?.status === "Active" ? "Approved" : "Approve CLub"}</button></a>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No Event Found, Create new Event</p>
                )}
            </div>
        </section>
    )
}