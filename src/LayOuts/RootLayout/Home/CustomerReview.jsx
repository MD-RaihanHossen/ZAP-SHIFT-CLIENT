import { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaQuoteLeft } from "react-icons/fa";
import customer_top from '../../../assets/customer-top.png'

export default function CustomerReview() {
  const reviews = [
    {
      id: 1,
      name: "Awlad Hossin",
      role: "Senior Product Designer",
      text: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
    },
    {
      id: 2,
      name: "Rasel Ahamed",
      role: "CTO",
      text: "This product helped me keep my back straight while working long hours. It's super comfortable and effective!",
    },
    {
      id: 3,
      name: "Nasir Uddin",
      role: "CEO",
      text: "I’ve seen real improvement in my posture after using it daily. Definitely recommended for office workers.",
    },
    {
      id: 4,
      name: "Mahmud Karim",
      role: "Project Manager",
      text: "Stylish, easy to wear, and makes a noticeable difference in posture comfort.",
    },
    {
      id: 5,
      name: "raihan hossen",
      role: "Project Manager",
      text: "Stylish, easy to wear, and makes a noticeable difference in posture comfort.",
    },
  ];

  const [index, setIndex] = useState(1);

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

 

  const nextSlide = () => {
    setIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };
  

  const getPosition = (i) => {
    if (i === index) return "center";
    if (i === (index - 1 + reviews.length) % reviews.length) return "left";
    if (i === (index + 1) % reviews.length) return "right";
    return "hidden";
  };

  return (
    <section className="bg-[#F6F8F9] py-20 overflow-hidden my-10">
      <div className="container mx-auto px-4 text-center">
        {/* === Top Icon === */}
        <div className="flex justify-center mb-6">
          <img
            src={customer_top}
            alt="Top Icon"
            className="w-auto h-16"
          />
        </div>

        {/* === Title and Subtext === */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#03373D] mb-3">
          What our customers are saying
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto mb-10">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>

        {/* === Carousel === */}
        <div className="relative flex items-center justify-center">
          {/* Left Button */}
          <button
            onClick={prevSlide}
            className="btn btn-circle btn-outline absolute left-0 md:left-10 z-10"
          >
            <FaArrowLeft />
          </button>

          {/* Reviews */}
          <div className="flex items-center justify-center space-x-6 transition-all duration-500">
            {reviews.map((review, i) => {
              const position = getPosition(i);
              const base =
                "bg-white shadow-md rounded-2xl p-6 md:p-8 text-gray-600 w-72 md:w-96 transition-all duration-500";
              if (position === "center") {
                return (
                  <div
                    key={review.id}
                    className={`${base} scale-100 opacity-100 z-10`}
                  >
                    <FaQuoteLeft className="text-3xl text-primary mb-4 mx-auto" />
                    <p className="mb-6">{review.text}</p>
                    <h4 className="text-[#03373D] font-semibold">
                      {review.name}
                    </h4>
                    <p className="text-sm text-gray-500">{review.role}</p>
                  </div>
                );
              } else if (position === "left" || position === "right") {
                return (
                  <div
                    key={review.id}
                    className={`${base} scale-90 opacity-40 blur-[1px] hidden md:block`}
                  >
                    <FaQuoteLeft className="text-2xl text-gray-300 mb-3 mx-auto" />
                    <p className="text-sm">{review.text}</p>
                    <h4 className="mt-4 text-gray-400 font-medium">
                      {review.name}
                    </h4>
                    <p className="text-xs text-gray-400">{review.role}</p>
                  </div>
                );
              } else return null;
            })}
          </div>

          {/* Right Button */}
          <button
            onClick={nextSlide}
            className="btn btn-circle btn-outline absolute right-0 md:right-10 z-10"
          >
            <FaArrowRight />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === index ? "bg-primary" : "bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}
