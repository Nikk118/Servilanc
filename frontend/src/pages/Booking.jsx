import React, { useEffect, useState } from "react";
import { useBookingStore } from "../store/useBookingStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import BookingSuccess from "../Components/booking components/BookingSuccess";

function Booking() {
  const navigate=useNavigate();
  const { selectedService, setSelectedService,craeteAddress, createBooking,updateAddress, userAddress, getAddress } = useBookingStore();
  const [booking, setBooking] = useState({ 
    bookingDate: "", 
    bookingTime: "", 
    paymentMethod: "",
    transactionId:""
  });
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  

  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "Gujarat",
    pincode: "",
    mobileNumber: ""
  });

  const [updatedAddress, setUpdatedAddress] = useState({});

  useEffect(() => {
    getAddress();
  }, []);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleUpdateChange = (e) => {
    setUpdatedAddress({ ...updatedAddress, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    craeteAddress(address);
    setIsAddressModalOpen(false);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    updateAddress(updatedAddress);
    setIsUpdateModalOpen(false);
  };

  const openUpdateModal = () => {
    setUpdatedAddress(userAddress); 
    setIsUpdateModalOpen(true);
  };

  const makeBooking = (e) => {
    e.preventDefault();
    
    if (!booking.bookingDate || !booking.bookingTime || !booking.paymentMethod) {
      toast.error("Please fill in all required fields before proceeding.");
      return;
    }
    if (!userAddress) {
      toast.error("Please enter your address before booking.");
      return;
    }
    if (booking.paymentMethod === "online") {
      console.log("bookings",booking)
      navigate("/payment", { state: { booking }}); 
    }else{
      try {
        console.log("bookings",booking)
        createBooking(booking);
        setIsBooked(true); 
      } catch (error) {
        console.error("Booking failed:", error);
      }
    }
  };
  

  useEffect(() => {
    if (selectedService) {
      localStorage.setItem("selectedService", JSON.stringify(selectedService));
    }
  }, [selectedService]);

 
  useEffect(() => {
    const storedService = localStorage.getItem("selectedService");
    if (storedService) {
      setSelectedService(JSON.parse(storedService));
    }
  }, []);

  if (!selectedService) {
    return <h2 className="text-center mt-10 text-red-500">No service selected</h2>;
  }

  return (

    // for bookings 
    isBooked ? (
     
      <BookingSuccess booking={booking} />    
  ) : ( 
     
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-5 pt-30"> 
      <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col md:flex-row w-full max-w-4xl">
        <div className="md:w-1/2 p-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Book Your Service</h2>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Your Address</h3>
            {userAddress ? (
              <div>
                <p className="text-green-600">✔ Address Saved</p>
                <button onClick={openUpdateModal} className="text-blue-600 underline">
                  Edit
                </button>
              </div>
            ) : (
              
              <button
                onClick={() => setIsAddressModalOpen(true)}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg"
              >
                Enter Address
              </button>
            )}
          </div>
            {/* for booking */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Select Booking Date & Time</h3>
            <form  onSubmit={makeBooking} className="space-y-3">
              <input 
              type="date" 
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300" 
              value={booking.bookingDate}
              min={new Date().toISOString().split("T")[0]} 
              onChange={(e) => setBooking({ ...booking, bookingDate: e.target.value })}/>
              <select 
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
              value={booking.bookingTime}
              onChange={(e) => setBooking({ ...booking, bookingTime: e.target.value })}>
                <option value="">Select Time</option>  
                <option value="9:00 AM">9:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="1:00 PM">1:00 PM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="03:00 PM">03:00 PM</option>
                <option value="04:00 PM">04:00 PM</option>
                <option value="05:00 PM">05:00 PM</option>
                <option value="06:00 PM">06:00 PM</option>
              </select>
              <div className="mt-3">
            <h3 className="text-lg font-semibold mb-2">Select Payment Method</h3>
            <label className="flex items-center space-x-2">
              <input 
                type="radio" 
                name="paymentMethod" 
                value="cash"
                className="form-radio text-blue-600"
                onChange={(e) => setBooking({ ...booking, paymentMethod: e.target.value })}
              />
              <span>Cash on Service</span>
            </label>
            <label className="flex items-center space-x-2 mt-2">
              <input 
                type="radio" 
                name="paymentMethod" 
                value="online"
                className="form-radio text-blue-600"
                onChange={(e) => setBooking({ ...booking, paymentMethod: e.target.value })}
              />
              <span>Online Payment</span>
            </label>
          </div>
              <button  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
                Confirm Booking
              </button>
            </form>
          </div>
        </div>

            {/* for displaaying slected service */}
        <div className="md:w-1/2 p-4 flex flex-col items-center justify-center text-center">
          <img
            src={selectedService.image_url}
            alt={selectedService.name}
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-900">{selectedService.name}</h3>
          <p className="text-gray-600">{selectedService.description}</p>
          <p className="text-sm text-gray-500 mt-1">{selectedService.duration}</p>
          <p className="text-lg font-bold text-green-600 mt-2">₹{selectedService.price}</p>
        </div>
        
      </div>

      {/* Address Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative bg-white p-6 rounded-lg shadow-lg w-96">
          {/* Close (X) Button Positioned Correctly */}
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
            onClick={() => setIsAddressModalOpen(false)}
          >
            ❌
          </button>
      
          <h2 className="text-xl font-semibold mb-4 text-center">Enter Your Address</h2>
      
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="street"
              value={address.street}
              onChange={handleChange}
              placeholder="Street"
              className="w-full p-2 border rounded-lg"
              required
            />
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full p-2 border rounded-lg"
              required
            />
            <input
              type="text"
              name="state"
              value="Gujarat"
              readOnly
              placeholder="State"
              className="w-full p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
              required
            />
            <input
              type="text"
              name="pincode"
              value={address.pincode}
              onChange={handleChange}
              placeholder="Pincode"
              className="w-full p-2 border rounded-lg"
              required
            />
            <input
              type="tel"
              name="mobileNumber"
              value={address.mobileNumber}
              onChange={handleChange}
              placeholder="Mobile Number"
              className="w-full p-2 border rounded-lg"
              required
            />
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">
              Save Address
            </button>
          </form>
        </div>
      </div>
      
      )}

      {/* Update Address Modal */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative bg-white p-6 rounded-lg shadow-lg w-96">
          {/* Close (X) Button Positioned Correctly */}
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
            onClick={() => setIsUpdateModalOpen(false)}
          >
            ❌
          </button>
      
          <h2 className="text-xl font-semibold mb-4 text-center">Update Your Address</h2>
      
          <form onSubmit={handleUpdateSubmit} className="space-y-3">
            <input
              type="text"
              name="street"
              value={updatedAddress.street}
              onChange={handleUpdateChange}
              placeholder="Street"
              className="w-full p-2 border rounded-lg"
              required
            />
            <input
              type="text"
              name="city"
              value={updatedAddress.city}
              onChange={handleUpdateChange}
              placeholder="City"
              className="w-full p-2 border rounded-lg"
              required
            />
            <input
              type="text"
              name="state"
              value="Gujarat"
              readOnly
              placeholder="State"
              className="w-full p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
              required
            />
            <input
              type="text"
              name="pincode"
              value={updatedAddress.pincode}
              onChange={handleUpdateChange}
              placeholder="Pincode"
              className="w-full p-2 border rounded-lg"
              required
            />
            <input
              type="tel"
              name="mobileNumber"
              value={updatedAddress.mobileNumber}
              onChange={handleUpdateChange}
              placeholder="Mobile Number"
              className="w-full p-2 border rounded-lg"
              required
            />
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">
              Update Address
            </button>
          </form>
        </div>
      </div>
      
      )}
    
    </div>
  )
);
  
 
}

export default Booking;
