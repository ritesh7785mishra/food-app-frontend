import React, { useState, useEffect } from "react";
import Card from "../components/Card";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
// import Carousel from "../components/CarouseComponent";
import CarouselComponent from "../components/CarouseComponent";
//learn usecallback and usememo

const Home = () => {
  const { VITE_serverBaseURL } = import.meta.env;
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);

  const loadFoodItems = async () => {
    const res = await fetch(`${VITE_serverBaseURL}/food/food-items`);

    const data = await res.json();

    setFoodItems(data.food_items);
  };

  const loadFoodCategory = async () => {
    const res = await fetch(`${VITE_serverBaseURL}/food/food-category`);
    const data = await res.json();
    setFoodCat(data.food_category);
  };

  useEffect(() => {
    loadFoodCategory();
    loadFoodItems();
  }, []);

  return (
    // in function based component rendering happens initially and after that everything happens
    <div className="home">
      <div>
        <Navbar />
      </div>
      {/* Carousel container is here below due to child to parent connection we can't made it a component */}

      <div>
        <div className="carousel-container">
          <div
            id="carouselExampleFade"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner" id="carousel">
              <div className="carousel-caption" style={{ zIndex: "10" }}>
                <div className="d-flex justify-content-center">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                  {/* <button
                    className="btn btn-outline-success text-white bg-success"
                    type="submit"
                  >
                    Search
                  </button> */}
                </div>
              </div>
              <div className="carousel-item active">
                <img
                  src="https://source.unsplash.com/random/900×700?burger"
                  className="d-block w-100"
                  alt="..."
                  style={{
                    filter: "brightness(30%)",
                    height: "700px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://source.unsplash.com/random/900×700?pastry"
                  className="d-block w-100"
                  alt="..."
                  style={{
                    filter: "brightness(30%)",
                    height: "700px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://source.unsplash.com/random/900×700?barbeque"
                  className="d-block w-100"
                  alt="..."
                  style={{
                    filter: "brightness(30%)",
                    height: "700px",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
      <div className="container">
        {foodCat.length > 0 ? (
          foodCat.map((data) => {
            return (
              <div className="row mb-3">
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr />

                {foodItems.length > 0 ? (
                  foodItems
                    .filter(
                      (item) =>
                        item.CategoryName == data.CategoryName &&
                        item.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((filterItems) => {
                      return (
                        <div
                          key={filterItems._id}
                          className="col-12 col-md-6 col-lg-4 col-xl-3"
                        >
                          <Card
                            foodItem={filterItems}
                            options={filterItems.options[0]}
                          />
                        </div>
                      );
                    })
                ) : (
                  <div> No such data found</div>
                )}
              </div>
            );
          })
        ) : (
          <div>""</div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
