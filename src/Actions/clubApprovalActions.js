import axios from "axios";
import { backendApi } from "../Apis/api";

export const startGetApprovalClubList = () => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${backendApi}/club/getclub-forapproval`, { limit: 100 } ,{
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(response.data.data.results)
            // console.log(searchFilters)
            dispatch(setApprovalClubList(response.data.data.results))
        } catch(err) {
            console.log(err);
            // alert(err.response.data.message)
        }
    }
}

const setApprovalClubList = (clubAndBars) => {
    return {
        type: "GET_CLUB_APPROVAL_LIST",
        payload: clubAndBars
    }
}

export const startApproveClub = (clubID, setAlertMessage, setAlertMessageColor) => {
    return async (dispatch) => {
        try {
            // console.log(formData)
            const response = await axios.put(`${backendApi}/club/approve-club`, { _id: clubID }, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(response)
            dispatch(approveClub(response.data.club))
            setAlertMessage("Club Profile Approved")
            setAlertMessageColor("green")
        } catch(err) {
            console.log(err)
            // setAlertMessage(err.response.data.message)
            setAlertMessageColor("red")
        }
    }
}

const approveClub = (club) => {
    return {
        type : "APPROVE_CLUB",
        payload : club
    }
}