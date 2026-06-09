import { useEffect, useState } from "react";
import { indianStates } from "../data/products";
import { useEcommerce } from "../context/EcommerceContext";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import api from "../utils/axios";

const UpdateAddress = () => {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { handleUpdateAddress } = useEcommerce();
  const addressId = useParams().id;
  const navigate = useNavigate();

  const data = useLoaderData();
  const addressInfo = data.data.address;

  useEffect(() => {
    setFormData({ ...addressInfo, id: addressInfo.id });
  }, [addressInfo]);

  const handleOnChange = (e) => {
    setFormData((prevStat) => ({ ...prevStat, [e.target.id]: e.target.value }));
  };

  const submitToUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.patch(
        `/address/update/${addressId}`,
        formData,
      );

      console.log(response.data);
      navigate("/user");

      handleUpdateAddress(formData);
    } catch (error) {
      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container">
      <h1>Update Address </h1>
      {isLoading && (
        <div className="overlay m-auto">
          <Loading />
        </div>
      )}
      <form onSubmit={submitToUpdate}>
        <div className="mb-2">
          <label
            htmlFor="name"
            className="form-labe "
            onChange={handleOnChange}
          >
            Full Name:
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            className="form-control"
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="row">
          <div className="col">
            <div className="mb-2">
              <label htmlFor="phoneNumber" className="form-labe ">
                Phone number:
              </label>
              <input
                type="number"
                id="phoneNumber"
                onChange={handleOnChange}
                value={formData.phoneNumber}
                required
                minLength={10}
                maxLength={10}
                className="form-control"
              />
            </div>
          </div>
          <div className="col">
            <div className="mb-2">
              <label htmlFor="zipCode" className="form-labe ">
                Zip Code:
              </label>
              <input
                type="number"
                id="zipCode"
                onChange={handleOnChange}
                value={formData.zipCode}
                required
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="mb-2">
              <label htmlFor="area" className="form-labe ">
                Area:
              </label>
              <input
                type="text"
                id="area"
                onChange={handleOnChange}
                value={formData.area}
                required
                className="form-control"
              />
            </div>
          </div>
          <div className="col">
            <div className="mb-2">
              <label htmlFor="city" className="form-labe ">
                City:
              </label>
              <input
                type="text"
                id="city"
                onChange={handleOnChange}
                value={formData.city}
                required
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="mb-2">
          <label htmlFor="fullAddress" className="form-labe ">
            Write your full address:
          </label>
          <textarea
            id="fullAddress"
            onChange={handleOnChange}
            value={formData.fullAddress}
            required
            className="form-control"
            placeholder="Enter you full address with House number, Street, Near landmark"
          ></textarea>
        </div>

        <div className="mb-2">
          <label htmlFor="state">Select State: </label>
          <select
            id="state"
            onChange={handleOnChange}
            required
            className="form-select"
            value={formData.state}
          >
            <option value={""} disabled selected>
              Select Your State
            </option>
            {indianStates.map((state) => (
              <option value={state}>{state}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary my-3"
        >
          Update Address
        </button>
      </form>
    </main>
  );
};

export default UpdateAddress;

export const loader = async ({ request, params }) => {
  const addressId = params.id;

  try {
    const response = await api.get(`/address/address_info/${addressId}`);

    return response.data;
  } catch (err) {
    console.log(err);
  }
};
