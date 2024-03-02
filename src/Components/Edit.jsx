import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Style/Edit.css";
import { string, object } from "yup";
import { useFormik } from "formik";

const Edit = ({ id }) => {
  const navigate = useNavigate();

  // State to store data
  const [editBooks, SetEditBooks] = useState({
    title: "",
    author: "",
    publication_date: "",
    isbn: "",
  });

  // Fetch data from the API when the component mounts
  useEffect(() => {
    fetch();
  }, []);

  // Function to fetch data from the API
  const fetch = async () => {
    try {
      const response = await axios.get(
        `https://65e32ebb88c4088649f5724c.mockapi.io/lib/${id}`
      );
      // Set the fetched data to the state
      SetEditBooks(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    formik.setValues(editBooks);
  }, [editBooks]);

  const validationSchema = object().shape({
    title: string().required("Book Title is Required"),
    author: string().required("Book Author Name is Required"),
    publication_date: string()
      .matches(/(?:[0-9]{4})?[0-9]{4}/, "Invalid Year")
      .required("Book Published Year is Required"),
    isbn: string()
      .min(5, "ISBN-NUMBER must be atmost 5 digits ")
      .max(5, "ISBN-NUMBER must be atmost 5 digits ")
      .required("ISBN-NUMBER is Required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      publication_date: "",
      isbn: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // PUT request to update the data in the API
        await axios.put(
          `https://65e32ebb88c4088649f5724c.mockapi.io/lib/${id}`,
          values
        );
        // Navigate to the userdetails page after successful update
        navigate("/");
        console.log("done");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div class="form-container">
      <div class="form-box-container">
        <h2>Edit Book Details:</h2>
        <form onSubmit={formik.handleSubmit}>
          <div class="my-3">
            Book Title<span class="text-danger">*</span>
            <input
              className="form-control"
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
            ></input>
            <div className="text-warning">{formik.errors.title}</div>
          </div>
          <div class="mb-3">
            Book Author<span class="text-danger">*</span>
            <input
              className="form-control"
              type="text"
              name="author"
              value={formik.values.author}
              onChange={formik.handleChange}
            ></input>
            <div className="text-warning">{formik.errors.author}</div>
          </div>
          <div class="mb-3">
            Published Year<span class="text-danger">*</span>
            <input
              className="form-control"
              type="text"
              name="publication_date"
              value={formik.values.publication_date}
              onChange={formik.handleChange}
            ></input>
            <div className="text-warning">{formik.errors.publication_date}</div>
          </div>
          <div class="mb-3">
            ISBN Number<span class="text-danger">*</span>
            <input
              className="form-control"
              type="tel"
              name="isbn"
              value={formik.values.isbn}
              onChange={formik.handleChange}
            ></input>
            <div className="text-warning">{formik.errors.isbn}</div>
          </div>
          <div class="d-flex justify-content-center" id="btn-div">
            <button
              type="submit"
              class="btn btn-primary mb-2"
              style={{ fontSize: "large" }}
            >
              Update
            </button>
          </div>
        </form>
        <div class="text-center">
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
    </div>
  );
};

export default Edit;
