import React, { useContext } from 'react';
import { useState } from 'react';
import './Signup.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../UserContext/UserContext';

const Signup = () => {
    const [error, setError] = useState(null);
    const { createUser } = useContext(AuthContext);
    const handleSubmit = event => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value
        const password = form.password.value;
        const confirm = form.confirm.value;
        if (password !== confirm) {
            setError('Wrong Password, try again');
            return
        }
        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                form.reset()
            })
            .catch(error => {
                console.error(error)
            })
    }
    return (
        <div className='form-container'>
            <h1 className='form-title'>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" required />
                </div>
                <div className="form-control">
                    <label htmlFor="confirm">Confirm Password</label>
                    <input type="password" name="confirm" required />
                </div>
                <input className='btn-submit' type="submit" value="Signup" />
            </form>
            <p className='error-msg'>{error}</p>
            <p>Already have an account? <Link to='/Login'>Log In please</Link></p>
        </div>
    );
};

export default Signup;