import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";


const JoinUs = () => {
  const [phone, setPhone] = useState("");

  const handleSubmit = () => {
    if (phone) {
      alert(`Your number: ${phone}`);
    } else {
      alert("Please enter your phone number!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 p-4">
      <div className="bg-purple-600 text-white p-6 rounded-2xl text-center w-full max-w-lg shadow-lg">
        {/* NEW: Section Title */}
        <h1 className="text-2xl font-bold mb-2">Stay Connected With Us!</h1>

        {/* NEW: Short description */}
        <p className="text-sm text-gray-200 mb-6">
          Join our WhatsApp community for exclusive updates, offers, and support.
        </p>

        {/* Main WhatsApp Input Section */}
        <h2 className="text-lg font-semibold mb-4 px-4">
          Share your WhatsApp number and we'll reach out via our WhatsApp Business Account.
        </h2>

        <div className="flex items-center bg-white p-2 rounded-lg w-full">
          <PhoneInput
            country={"in"}
            value={phone}
            onChange={setPhone}
            inputStyle={{
              width: "100%",
              height: "42px",
              border: "none",
              paddingLeft: "50px",
              color: "black",
            }}
            containerStyle={{ flex: 1 }}
            buttonStyle={{ border: "none", background: "transparent" }}
          />
          <button
            onClick={handleSubmit}
            className="bg-purple-600 text-white font-semibold px-4 py-2 rounded-lg ml-2 hover:bg-purple-700 transition"
          >
            Join Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
