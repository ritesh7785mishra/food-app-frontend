import React, { useState, useRef, useEffect } from "react";
import { useCart } from "./ContextReducer";
import { useDispatchCart } from "./ContextReducer";

export default function ({ foodItem, options }) {
  let priceOptions = Object.keys(options);
  const data = useCart();
  const priceRef = useRef();
  let dispatch = useDispatchCart();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const handleAddToCart = async () => {
    try {
      let food = [];
      for (const item of data) {
        if (item.id === foodItem._id) {
          food = item;
          break;
        }
      }

      if (food.length > 0) {
        if (food.size === size) {
          await dispatch({
            type: "UPDATE",
            id: foodItem._id,
            price: finalPrice,
            qty: qty,
          });

          return;
        } else if (food.size !== size) {
          await dispatch({
            type: "ADD",
            id: foodItem._id,
            name: foodItem.name,
            price: finalPrice,
            img: foodItem.img,
            qty: qty,
            size: size,
          });

          return;
        }
      } else {
        await dispatch({
          type: "ADD",
          id: foodItem._id,
          name: foodItem.name,
          price: finalPrice,
          img: foodItem.img,
          qty: qty,
          size: size,
        });

        console.log(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div className="card mt-3" style={{ width: "18rem", minHeight: "360px" }}>
      <img
        src={foodItem.img}
        className="card-img-top"
        alt="..."
        style={{ height: "180px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{foodItem.name}</h5>
        {/* <p className="card-text">This is some important text</p> */}
        <div className="container w-100">
          <select
            className="m-2 h-100 w-40 bg-success rounded"
            onChange={(e) => {
              setQty(e.target.value);
            }}
          >
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>

          <select
            className="m-2 h-100 w-40 bg-success rounded"
            ref={priceRef}
            onChange={(e) => {
              setSize(e.target.value);
            }}
          >
            {priceOptions.map((optionName) => {
              return (
                <option key={optionName} value={optionName}>
                  {optionName}
                </option>
              );
            })}
          </select>
          <div className="d-inline h-100 fs-5">{finalPrice}/-</div>
        </div>
        <hr />
        <button
          className="btn btn-success ms-2"
          onClick={() => {
            handleAddToCart();
          }}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
