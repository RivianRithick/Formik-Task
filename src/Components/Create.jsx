import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { string, object } from "yup";
import { useFormik } from "formik";

const Create = () => {
  const navigate = useNavigate();
  const [CreateData, SetCreateData] = useState({
    title: "",
    author: "",
    publication_date: "",
    isbn: "",
  });

  const validationSchema = object().shape({
    title: string().required("Book Title is Required"),
    author: string().required("Book Author Name is Required"),
    publication_date: string()
      .matches(/(?:[0-9]{4})?[0-9]{4}/, "Invalid Year")
      .required("Book Published Year is Required"),
    isbn: string()
      .min(
        5,
        `ISBN-NUMBER must be
         atmost 5 digits`
      )
      .max(
        5,
        `ISBN-NUMBER must be
        atmost 5 digits`
      )
      .required("ISBN-NUMBER is Required"),
  });

  const formik = useFormik({
    initialValues: { CreateData },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Making a POST request to the API endpoint
        await axios.post(
          "https://65e32ebb88c4088649f5724c.mockapi.io/lib",
          values
        );
        // Navigating to the userDetails page
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div class="form-container">
      <div class="form-box-container">
        <h2>Create New Book:</h2>
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
              Create
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

export default Create;
