import React, { useState, useEffect } from "react";
import { User, Phone, Home, MapPin, Map, Hash } from "lucide-react"; 
import statesDataJson from "./states.json";

export default function AddressForm({onAddressChange , onValidChange }) {
  const [statesData, setStatesData] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    state: "",
    district: "",
    city: "",
    pincode: "",
  });

    useEffect(() => {
    onAddressChange && onAddressChange(address);
    onValidChange && onValidChange(validateAddress() === null);
  }, [address, onAddressChange, onValidChange]);
  useEffect(() => {
    setStatesData(statesDataJson.states);
  }, []);

  useEffect(() => {
    if (!address.state) {
      setDistricts([]);
      return;
    }
    const selectedState = statesData.find((s) => s.state === address.state);
    setDistricts(selectedState ? selectedState.districts : []);
  }, [address.state, statesData]);

  const validateAddress = () => {
    if (!address.fullName.trim()) return "Full Name required";
    if (!/^[6-9]\d{9}$/.test(address.phone)) return "Invalid phone number";
    if (!/^[1-9][0-9]{5}$/.test(address.pincode)) return "Invalid pincode";
    if (!address.state || !address.district) return "Select state and district";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validateAddress();
    if (error) {
      alert(error);
      return;
    }
    console.log("✅ Final Address:", address);
    alert("Address saved successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white shadow-2xl rounded-2xl p-8 space-y-6 transform transition-transform hover:scale-105 duration-300"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Shipping Address
        </h2>

        {/* Full Name */}
        <div className="relative">
          <User className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Full Name"
            value={address.fullName}
            onChange={(e) =>
              setAddress({ ...address, fullName: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Phone Number */}
        <div className="relative">
          <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Phone Number"
            value={address.phone}
            onChange={(e) => setAddress({ ...address, phone: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Address Line */}
        <div className="relative">
          <Home className="absolute left-3 top-3 text-gray-400" size={18} />
          <textarea
            placeholder="Address Line"
            value={address.addressLine}
            onChange={(e) =>
              setAddress({ ...address, addressLine: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none h-20"
          />
        </div>

        {/* State & District */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
            <select
              value={address.state}
              onChange={(e) =>
                setAddress({ ...address, state: e.target.value, district: "" })
              }
              className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">-- Select State --</option>
              {statesData.map((s, idx) => (
                <option key={idx} value={s.state}>
                  {s.state}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <Map className="absolute left-3 top-3 text-gray-400" size={18} />
            <select
              value={address.district}
              onChange={(e) =>
                setAddress({ ...address, district: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={!address.state}
            >
              <option value="">-- Select District --</option>
              {districts.map((d, idx) => (
                <option key={idx} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* City & Pincode */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Home className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="City"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="relative">
            <Hash className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Pincode"
              value={address.pincode}
              onChange={(e) =>
                setAddress({ ...address, pincode: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300"
        >
          Save Address
        </button>
      </form>
    </div>
  );
}
