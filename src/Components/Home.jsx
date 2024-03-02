import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Style/Home.css";
const Home = ({ SetId }) => {
  const navigate = useNavigate();

  // State to store user details
  const [UserDetails, SetUserDetails] = useState([]);

  // State to trigger re-rendering when a user is deleted
  const [DeleteData, SetDeleteData] = useState([]);

  // Fetch user details from the API
  useEffect(() => {
    fetchData();
  }, [DeleteData]);

  // Function to fetch user details from the API
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://65e32ebb88c4088649f5724c.mockapi.io/lib"
      );
      // Set the fetched user details to the state
      SetUserDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id) => {
    // Set the ID of the user to edit in the parent component
    SetId(id);
    // Navigate to the edit page
    navigate(`/edit/${id}`);
  };

  // Function to handle deleting a user
  const handleDelete = async (id) => {
    try {
      // Make a DELETE request to delete the user
      await axios.delete(
        `https://65e32ebb88c4088649f5724c.mockapi.io/lib/${id}`
      );
      SetDeleteData((prevData) => !prevData);
    } catch (error) {
      console.log(error);
    }
  };
  // Function to navigate to the create page
  const handleCreate = () => {
    navigate("/create");
  };

  const handleDetails = (id) => {
    SetId(id);
    navigate(`/bookdetails/${id}`);
  };

  return (
    <div className="container p-5 mt-1">
      <h1 className="mb-5 text-center"> All Book Details</h1>
      <div class="ms-1 mt-5">
        <h3>
          For Create New Book:
          <button
            className="btn btn-success ms-2"
            onClick={() => {
              handleCreate();
            }}
          >
            Create
          </button>
        </h3>
      </div>
      <br />
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-3 g-4">
        {/* Mapping through the UserDetails array to display user details */}
        {UserDetails.map((item, index) => {
          return (
            <div key={index} class="col">
              <div class="card h-100" id="card-w">
                <div class="card-body">
                  <h2 class="card-title text-center mb-4">{item.title}</h2>
                  <h5 class="card-text my-3">Author Name: {item.author}</h5>
                  <h6 class="card-subtitle my-3 text-body-secondary mb-3">
                    Published Year: {item.publication_date}
                  </h6>
                  <p class="card-text my-3">ISBN-Number: {item.isbn}</p>
                  <div class="d-flex justify-content-evenly mt-4">
                    <div>
                      <button
                        className="btn btn-warning"
                        onClick={() => {
                          handleEdit(item.id);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                    <div>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          handleDetails(item.id);
                        }}
                      >
                        Details
                      </button>
                    </div>
                    <div>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          handleDelete(item.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
