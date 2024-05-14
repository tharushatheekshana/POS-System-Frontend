import React from "react";

function FAQPage() {
  return (
    <div className="item-body">
    <div className="container">
      <h1 className="text-center">Frequently Asked Questions</h1>
      <div className="row">
        <div className="col-md-6">
          <h2>General</h2>
          <ul className="list-group">
            <li className="list-group-item">
              <h3>What are the opening hours of Shanghai Family Restaurant?</h3>
              <p>
                The restaurant is open from 11:00 AM to 10:00 PM, Monday to
                Sunday.
              </p>
            </li>
            <li className="list-group-item">
              <h3>Do I need to make a reservation?</h3>
              <p>
                Reservations are recommended, especially during peak hours and
                weekends.
              </p>
            </li>
            <li className="list-group-item">
              <h3>Is there parking available?</h3>
              <p>Yes, we have a parking lot available for our customers.</p>
            </li>
          </ul>
        </div>
        <div className="col-md-6">
          <h2>Menu</h2>
          <ul className="list-group">
            <li className="list-group-item">
              <h3>
                What type of cuisine does Shanghai Family Restaurant serve?
              </h3>
              <p>We specialize in authentic Shanghai-style cuisine.</p>
            </li>
            <li className="list-group-item">
              <h3>Are there vegetarian options available?</h3>
              <p>Yes, we have a variety of vegetarian dishes on our menu.</p>
            </li>
            <li className="list-group-item">
              <h3>Can I make special dietary requests?</h3>
              <p>
                Yes, please inform our staff about any dietary restrictions or
                allergies, and we will do our best to accommodate your needs.
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <h2>Payment</h2>
          <ul className="list-group">
            <li className="list-group-item">
              <h3>What payment methods do you accept?</h3>
              <p>
                We accept cash, credit cards, and mobile payment apps like Apple
                Pay and Google Pay.
              </p>
            </li>
            <li className="list-group-item">
              <h3>Do you accept reservations for large groups?</h3>
              <p>
                Yes, we accept reservations for large groups. Please contact us
                in advance to make arrangements.
              </p>
            </li>
            <li className="list-group-item">
              <h3>Is there a service charge?</h3>
              <p>No, we do not charge any additional service fees.</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  );
}

export default FAQPage;
