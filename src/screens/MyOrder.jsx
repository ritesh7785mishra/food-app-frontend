import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MyOrder() {
  const { VITE_serverBaseURL } = import.meta.env;
  const [orderData, setorderData] = useState([]);

  const fetchMyOrder = async () => {
    console.log(localStorage.getItem("userEmail"));
    const res = await fetch(`${VITE_serverBaseURL}/order/user-orders`, {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    });

    const data = await res.json();
    if (data) {
      console.log(data);
      setorderData(data.orderData.order_data);
      console.log("This is retreived data from server", orderData);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="container">
        <div className="row">
          {orderData ? (
            <div>
              {orderData
                .slice(0)
                .reverse()
                .map((order, index) => {
                  return order.map((item) => {
                    if (item.order_date) {
                      return (
                        <div className="m-auto mt-5">
                          {item.order_date}
                          <hr />
                        </div>
                      );
                    } else {
                      return (
                        <div className="col-12 col-md-6 col-lg-3">
                          <div
                            className="card mt-3"
                            style={{
                              width: "16rem",
                              maxHeight: "420px",
                            }}
                          >
                            <img
                              src={item.img}
                              className="card-img-top"
                              alt="..."
                              style={{
                                height: "180px",
                                objectFit: "cover",
                              }}
                            />
                            <div className="card-body">
                              <h5 className="card-title">{item.name}</h5>
                              <div
                                className="container w-100 p-0"
                                style={{ height: "38px" }}
                              >
                                <span className="m-1">{item.qty}</span>
                                <span className="m-1">{item.size}</span>
                                {/* <span className="m-1">{data}</span> */}
                                <div className=" d-inline ms-2 h-100 w-20 fs-5">
                                  ₹{item.price}/-
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  });
                })}
            </div>
          ) : (
            "Loading Data..."
          )}
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
}
