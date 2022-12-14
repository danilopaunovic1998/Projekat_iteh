import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../services/jikenAPI";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Comments from "../components/comments/Comments";

function DisplayElement({ token, popup }) {
  let navigate = useNavigate();
  let { id, type } = useParams();
  const [element, SetElement] = useState("");
  const ref = useRef(null);
  useEffect(() => {
    generate(type + "/" + id);
    focus();
  }, []);
  const generate = async (param) => {
    var data = await api.GETById(param);
    SetElement({
      id: data.mal_id,
      title: data.title,
      img: data.images.jpg.image_url,
      synopsis: data.synopsis,
    });
  };
  function focus() {
    ref.current.focus();
  }

  function handleAdd(e) {
    e.preventDefault();
    let listtype;
    if (type == "anime") listtype = "watchlist/";
    else listtype = "readlist/";
    if (token == null) {
      popup("Login or register");
      navigate("/login");
    } else {
      var config = {
        method: "post",
        url: "http://127.0.0.1:8000/api/profile/" + listtype + element.id,
        headers: {
          Authorization: "Bearer " + window.sessionStorage.auth_token,
        },
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response));
          if (response.data.success == true) {
            popup(response.data.message);
          } else {
            popup(response.data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  return (
    <div className="main-div">
      <div className="random-container">
        <div className="details">
          <img className="random-img" src={element.img} alt="Random"></img>
          <h3 className="title" ref={ref} tabIndex={-1}>
            {element.title}
          </h3>
          <p className="synopsis">{element.synopsis}</p>
          <div className="random-button">
            <button className="myButton" onClick={handleAdd}>
              Add
            </button>
          </div>
        </div>
        <Comments element_id={element.id} />
      </div>
    </div>
  );
}

export default DisplayElement;
