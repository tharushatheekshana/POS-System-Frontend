import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function Invoice() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handlePrint = () => {
    // Open the print dialog
    window.print();
  };

  return (
    <>
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            .modal-footer {
              display: none !important;
            } 
            #modalContent, #modalContent * {
              visibility: visible;
            }
            #modalContent {
              position: absolute;

              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
            }
          }
        `}
      </style>
      <Button variant="primary" onClick={handleShow}>
        Show Invoice
      </Button>

      <Modal show={show} onHide={handleClose} centered id="modalContent">
        <Modal.Header closeButton>
          <Modal.Title>Invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Your invoice content goes here */}
          <div className="container">
            <div className="row">
              <div className="col">
                <p>
                  <strong>Invoice content:</strong>
                </p>
                <p>
                  <strong>Name of the customer:</strong> John Doe
                </p>
                <p>
                  <strong>Date:</strong> 2021-09-01
                </p>
                <p>
                  <strong>Payment method:</strong> Credit Card
                </p>
                <p>
                  <strong>Order ID:</strong> 12345
                </p>
                <p>
                  <strong>Shipping address:</strong> 123 Main St, New York, NY
                  10001
                </p>
                <p>
                  <strong>Billing address:</strong> 123 Main St, New York, NY
                  10001
                </p>
                <p>
                  <strong>Phone number:</strong> 123-456-7890
                </p>
              </div>
            </div>
          </div>

          <div className="container mt-3">
            <div className="row">
              <div className="col">
                <p>
                  <strong>Order Items:</strong>
                </p>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Item 1</td>
                      <td>2</td>
                      <td>$50</td>
                      <td>$100</td>
                    </tr>
                    <tr>
                      <td>Item 2</td>
                      <td>1</td>
                      <td>$30</td>
                      <td>$30</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <p className="mt-3">Thank you for shopping with us!</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePrint}>
            Print
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Invoice;
