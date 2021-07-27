import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../../apis/api";

import { AuthContext } from "../../contexts/authContext";

function NewPost(props) {
  const authContext = useContext(AuthContext);

  const [state, setState] = useState({
    title: "",
    content: "",
    tripCost: "",
    pros: "",
    cons: "",
    image: "",
  });
  const [errors, setErrors] = useState({
    title: null,
    content: null,
    tripCost: null,
    pros: null,
    cons: null,
    image: null,
  });

  function handleChange(event) {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post("/post", state);
      console.log(response);

      authContext.setLoggedInUser({ ...response.data });
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ ...response.data })
      );
      setErrors({
        title: "",
        content: "",
        tripCost: "",
        pros: "",
        cons: "",
        image: "",
      });
      props.history.push("/book/all");
    } catch (err) {
      console.error(err.response);
      setErrors({ ...err.response.data.errors });
    }
  }

  return (
    <form className="mx-3 my-3" onSubmit={handleSubmit}>
      <h1>Novo Post</h1>
      <hr />

      <div className="form-group">
        <label for="postFormTitle">Destino</label>
        <input
          className="form-control"
          placeholder="País e cidade"
          type="text"
          name="title"
          id="postFormTitle"
          value={state.title}
          error={errors.title}
          onChange={handleChange}
        />
      </div>

      {/* <div className="form-group mb-3"> */}
      {/* <label htmlFor="postFormTitle">Título</label>
        <input
          className="form-control"
          type="text"
          name="title"
          id="postFormTitle"
          value={state.title}
          error={errors.title}
          onChange={handleChange}
        />
      </div> */}

      <div className="mt-3">
        <label htmlFor="postFormContent">Conte sobre sua viagem</label>
        <textarea
          className="form-control "
          type="text"
          name="content"
          id="signupFormContent"
          value={state.content}
          error={errors.content}
          onChange={handleChange}
          rows="3"
        ></textarea>
      </div>

      <div className="row">
        <div className="col mt-3">
          <label htmlFor="postFormPros">Prós</label>
          <textarea
            className="form-control"
            type="text"
            name="pros"
            id="signupFormPros"
            value={state.pros}
            error={errors.pros}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="col mt-3">
          <label htmlFor="postFormCons">Contras</label>
          <textarea
            className="form-control"
            type="text"
            name="cons"
            id="signupFormCons"
            value={state.cons}
            error={errors.cons}
            onChange={handleChange}
          ></textarea>
        </div>
      </div>

      <div className="mt-3">
        <label htmlFor="postFormTripCost">Valor total:</label>
        <input
          className="ml-2"
          type="text"
          name="tripCost"
          id="postFormTripCost"
          value={state.tripCost}
          error={errors.tripCost}
          onChange={handleChange}
        />
      </div>

      <div className="mt-3">
        <label htmlFor="postFormImage">Imagem:</label>
        <input
          className="ml-2"
          type="file"
          name="image"
          id="signupFormImage"
          value={state.image}
          error={errors.image}
          onChange={handleChange}
        />
      </div>

      <div>
        <button className="btn btn-primary mt-2" type="submit">
          Publicar
        </button>
      </div>
    </form>
  );
}

export default NewPost;
