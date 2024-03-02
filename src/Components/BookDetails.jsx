import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Style/BookDetails.css";
const BookDetails = ({ id }) => {
  const navigate = useNavigate();

  // State to store the data
  const [editBooks, SetEditBooks] = useState({
    title: "",
    author: "",
    publication_date: "",
  });

  // Fetch data from the API
  useEffect(() => {
    fetchG();
  }, []);

  // Function to fetch data from the API
  const fetchG = async () => {
    try {
      const response = await axios.get(
        `https://65e32ebb88c4088649f5724c.mockapi.io/lib/${id}`
      );
      SetEditBooks(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div class="container">
      <h1 className="text-center">Book Details</h1>
      <div class="card mt-5" id="large-card">
        <div class="card-body">
          <div className="mt-3 mb-2">
            <h1 className="card-title">{editBooks.title}</h1>
          </div>
          <div className="mb-4">
            <h5 className="text-secondary">Author: {editBooks.author}</h5>
          </div>
          <div className="my-3">
            <h6 className="text-secondary">
              Published Year: {editBooks.publication_date}
            </h6>
          </div>
          <div className="text-secondary">
            <p>ISBN: {editBooks.isbn}</p>
          </div>
        </div>
      </div>
      <div class="text-center mt-3">
        <button
          className="btn btn-success mt-4 w-100 back-btn"
          onClick={() => {
            navigate("/");
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default BookDetails;
