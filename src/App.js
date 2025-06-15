import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import './App.css';

const countries = {
  India: ["Mumbai", "Delhi", "Bangalore"],
  USA: ["New York", "Los Angeles", "Chicago"],
  UK: ["London", "Manchester", "Liverpool"]
};

function FormPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    showPassword: false,
    phoneCode: "+91",
    phoneNumber: "",
    country: "",
    city: "",
    pan: "",
    aadhar: ""
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required.";
    if (!formData.username.trim()) newErrors.username = "Username is required.";
    if (!formData.email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(formData.email)) newErrors.email = "Valid email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone Number is required.";
    if (!formData.country) newErrors.country = "Country is required.";
    if (!formData.city) newErrors.city = "City is required.";
    if (!formData.pan.trim()) newErrors.pan = "PAN No. is required.";
    if (!formData.aadhar.trim()) newErrors.aadhar = "Aadhar No. is required.";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      navigate("/success", { state: formData });
    }
  };

  const isFormValid = Object.keys(validate()).length === 0;

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 max-w-2xl mx-auto mt-10 space-y-6">
      <h2 className="text-2xl font-bold text-center mb-4">Registration Form</h2>

      {[
        ["firstName", "First Name"],
        ["lastName", "Last Name"],
        ["username", "Username"],
        ["email", "Email", "email"],
        ["pan", "PAN No."],
        ["aadhar", "Aadhar No."]
      ].map(([key, label, type = "text"]) => (
        <div key={key}>
          <label className="block font-semibold mb-1">{label}</label>
          <input
            type={type}
            name={key}
            value={formData[key]}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors[key] && <p className="text-red-500 text-sm mt-1">{errors[key]}</p>}
        </div>
      ))}

      <div>
        <label className="block font-semibold mb-1">Password</label>
        <input
          type={formData.showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <label className="inline-flex items-center mt-2 space-x-2">
          <input
            type="checkbox"
            name="showPassword"
            checked={formData.showPassword}
            onChange={handleChange}
          />
          <span>Show Password</span>
        </label>
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
      </div>

      <div>
        <label className="block font-semibold mb-1">Phone No.</label>
        <div className="flex gap-3">
          <input
            type="text"
            name="phoneCode"
            value={formData.phoneCode}
            onChange={handleChange}
            className="w-1/4 border border-gray-300 p-2 rounded"
          />
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-3/4 border border-gray-300 p-2 rounded"
          />
        </div>
        {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
      </div>

      <div>
        <label className="block font-semibold mb-1">Country</label>
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
        >
          <option value="">Select Country</option>
          {Object.keys(countries).map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
      </div>

      <div>
        <label className="block font-semibold mb-1">City</label>
        <select
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          disabled={!formData.country}
        >
          <option value="">Select City</option>
          {(countries[formData.country] || []).map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
      </div>

      <button
        type="submit"
        disabled={!isFormValid}
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        Submit
      </button>
    </form>
  );
}

function SuccessPage() {
  const location = useLocation();
  const data = location?.state;

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-xl w-full">
        <div className="text-6xl mb-4 text-green-600">✅</div>
        <h2 className="text-2xl font-bold mb-4">Form Submitted Successfully!</h2>
        <pre className="bg-gray-100 p-4 rounded text-left overflow-x-auto text-sm">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </Router>
  );
}
