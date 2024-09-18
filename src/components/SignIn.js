import React, { useState } from 'react';
// import { firebase } from './firebaseConfig'; // Import your Firebase configuration
import '../App.css'; 

const SignIn = () => {
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSendOtp = async () => {
        // setLoading(true);
        // try {
        //     const result = await firebase.auth().signInWithPhoneNumber(phone, window.recaptchaVerifier);
        //     setConfirmationResult(result);
        //     alert('OTP sent!');
        // } catch (error) {
        //     alert('Error sending OTP: ' + error.message);
        // } finally {
        //     setLoading(false);
        // }
    };

    const handleVerifyOtp = async () => {
        // setLoading(true);
        // try {
        //     await confirmationResult.confirm(otp);
        //     alert('Phone number verified!');
        //     // Redirect or perform additional actions after successful verification
        // } catch (error) {
        //     alert('Error verifying OTP: ' + error.message);
        // } finally {
        //     setLoading(false);
        // }
    };

    return (
        <div className="sign-in-container">
            <h2 style={{color:"white"}}>Sign In</h2>
            <div>
                <input
                    type="text"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <button onClick={handleSendOtp} disabled={loading}>Send OTP</button>
            </div>
            {confirmationResult && (
                <div>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <button onClick={handleVerifyOtp} disabled={loading}>Verify OTP</button>
                </div>
            )}
        </div>
    );
};

export default SignIn;
