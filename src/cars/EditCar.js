import React, {useEffect, useState} from "react"
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import API_URL from "../config";

export default function EditCar() {

    let navigate = useNavigate();


    const {carId} = useParams();

    const [car, setCar] = useState({
        name: "",
        popular: "",
        country: ""
    });

    const {name, popular, country} = car;

    const onInputChange = (e) => {
        setCar({...car, [e.target.name]: e.target.value});
    };

    useEffect(() => {
        loadCar();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`${API_URL}/cars/update?id=${carId}`, car)
            .then(function (response ){
                console.log(response);
            })
        navigate("/");
    };

    const loadCar = async () => {
        await axios.get(`${API_URL}/cars?id=${carId}`)
            .then(function (response){
                console.log(response);
                setCar(response.data);
            });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">

                    <h2 className="text-center m-4">Edit car</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                Name
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter car name"
                                name="name"
                                value={name}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="Popularity" className="form-label">
                                Popularity
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Is car popular today?"
                                name="popular"
                                value={popular}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="Country" className="form-label">
                                Country
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter country"
                                name="country"
                                value={country}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className="text-lg-start">
                            <label className="col-md-5 mb-4 mt-2">
                                Edit models:
                            </label>

                            <Link className="btn btn-outline-dark" to={`/cars/${carId}/models`}>
                                Edit models
                            </Link>
                        </div>

                        <div className="text-lg-start">
                            <label className=" col-md-5 mb-4 mt-2">
                                Edit colors:
                            </label>
                            <Link className="btn btn-outline-dark" to={`/cars/${carId}/colors`}>
                                Edit colors
                            </Link>
                        </div>


                        <button type="submit" className="btn btn-outline-dark">
                            Submit
                        </button>

                        <Link className="btn btn-outline-danger mx-2" to="/">
                            Cancel
                        </Link>

                    </form>
                </div>

            </div>
        </div>
    )
}