import "./Password.scss"

export default function Password() {
    return (
        <div className="password-container">
            <div className="password-section">
                <div className="dashborad-heading">
                    <h1 className='dashborad-main-heading'>Reset Password</h1>
                    <hr className="dashborad-hr-1"/><hr className="dashborad-hr-2"/>
                    {/* <h3 className="second-heading">Welcome User</h3> */}
                </div>
                <form className="form-table">
                    <div className="form-group">
                        <label className="form-label" for="currentPassword">Current Password</label>
                        <input type="password" className="form-control" id="currentpassword" placeholder="Enter your Current Password"/>
                    </div>
                    <div className="form-group">
                        <label className="form-label" for="newPassword">New Password</label>
                        <input type="password" className="form-control" id="newpassword" placeholder="Enter the New Password"/>
                    </div>
                    <div className="form-group">
                        <label className="form-label" for="confirmPassword">Confirm Password</label>
                        <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm your Password"/>
                    </div>
                    <button className="reset-btn">Reset</button>
                </form>
            </div>
        </div>
    )
}