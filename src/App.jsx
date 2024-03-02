import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Edit from "./Components/Edit";
import Create from "./Components/Create";
import BookDetails from "./Components/BookDetails";

const App = () => {
  const [id, SetId] = useState(0);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home SetId={SetId} />} />
          <Route path="/edit/:id" element={<Edit id={id} />} />
          <Route path="/create" element={<Create />} />
          <Route path="/bookdetails/:id" element={<BookDetails id={id} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
