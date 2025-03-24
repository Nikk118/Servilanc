import { useEffect, useState } from "react";
import { useBookingStore } from "../../store/useBookingStore";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import BookingSuccess from "../booking components/BookingSuccess";

export default function Payment() {
  const { selectedService, createBooking } = useBookingStore();
  const location = useLocation();
  const [isBooked, setIsBooked] = useState(false);
  const initialBooking = location.state?.booking || {};
  const [booking, setBooking] = useState(initialBooking);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    amount: selectedService?.price || 0,
    transactionId: "",
  });

  useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({ ...prev, amount: selectedService.price }));
    }
  }, [selectedService]);

  useEffect(() => {
    if (selectedService) {
      localStorage.setItem("selectedService", JSON.stringify(selectedService));
    }
  }, [selectedService]);

  useEffect(() => {
    const storedService = localStorage.getItem("selectedService");
    if (storedService) {
      useBookingStore.setState({ selectedService: JSON.parse(storedService) });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/; // MM/YY format
    if (formData.cardNumber.length !== 14) {
      toast.error("Card number must be 14 digits long");
      return false;
    }
    if (formData.cvv.length !== 3) {
      toast.error("CVV must be 3 digits long");
      return false;
    }
    if (!expiryRegex.test(formData.expiryDate)) {
      toast.error("Expiry date must be in MM/YY format");
      return false;
    }
    
    // Check if expiry date is in the future
    const [month, year] = formData.expiryDate.split("/").map(Number);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // Get last two digits of the year
    const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-based
    
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      toast.error("Expiry date must be in the future");
      return false;
    }
    
    return true;
  };

  const generateTransactionId = () => {
    return "TXN" + Math.random().toString(36).substr(2, 10).toUpperCase();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Generate Transaction ID
    const transactionId = generateTransactionId();

    // Create updated booking data
    const updatedBooking = { ...booking, transactionId };

    // Update states
    setBooking(updatedBooking);
    setFormData((prev) => ({ ...prev, transactionId }));

    // Use updatedBooking instead of booking
    console.log("Updated Booking Data:", updatedBooking);
    
    try {
      createBooking(updatedBooking);
      setIsBooked(true);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return isBooked ? (
    <BookingSuccess booking={booking} />
  ) : (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-5">
      <div className="bg-white w-96 p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={formData.cardNumber}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <div className="flex space-x-2">
            <input
              type="text"
              name="expiryDate"
              placeholder="MM/YY"
              value={formData.expiryDate}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="password"
              name="cvv"
              placeholder="CVV"
              value={formData.cvv}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          
          {formData.transactionId && (
            <p className="text-sm text-gray-600">Transaction ID: {formData.transactionId}</p>
          )}
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}