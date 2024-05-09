import React from 'react';

const Contact = () => {
    return (
        <div className="container">
            <h1>Contact Us</h1>
            <div className="card">
                <div className="card-body">
                    <form>
                        <div className="form-row">
                            <div className="form-group col">
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" className="form-control" id="firstName" placeholder="Enter your first name" />
                            </div>
                            <div className="form-group col">
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" className="form-control" id="lastName" placeholder="Enter your last name" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter your email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input type="tel" className="form-control" id="phoneNumber" placeholder="Enter your phone number" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea className="form-control" id="message" rows="5" placeholder="Enter your message"></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
            <div className="restaurant-details">
                <h2>Restaurant Details</h2>
                <p>Number: +1 123-456-7890</p>
                <p>Email: info@restaurant.com</p>
                <p>Fax: +1 123-456-7891</p>
            </div>
            <footer>
                <p>&copy; 2022 Restaurant Name. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Contact;