import traking from '../../assets/live-tracking.png'
import safe from '../../assets/safe-de.png'
import safe1 from '../../assets/safe-de.png'

const servicesData = [
  {
    id: 1,
    img: traking,
    title: "Fast & Reliable Delivery",
    description:
      "We provide quick and dependable delivery services, ensuring your parcels reach their destination on time and in perfect condition."
  },
  {
    id: 2,
    img: safe,
    title: "Nationwide Coverage",
    description:
      "Our logistics network covers all major cities and districts, so you can send and receive parcels anywhere across the country."
  },
  {
    id: 3,
    img: safe1,
    title: "Secure Packaging",
    description:
      "We handle each item carefully with top-quality packaging to keep your goods safe during every step of transportation."
  }
];

const GiveServices = () => {
  return (
    // <section className="py-16 bg-base-200">
    //   <div className="container mx-auto px-4 space-y-10">
    //     {servicesData.map(({ id, img, title, description }) => (
    //       <div
    //         key={id}
    //         className="card bg-base-100 shadow-lg p-6 flex flex-col md:flex-row items-center md:items-stretch md:gap-6 rounded-2xl"
    //       >
    //         {/* Left Side: Image */}
    //         <div className="md:w-auto flex-shrink-0"> 
    //           <img
    //             src={img}
    //             alt={title}
    //             className="h-64 object-cover rounded-xl" 
    //           />
    //         </div>

    //         {/* Middle: Vertical Dashed Line */}
    //         <div className="hidden md:flex justify-center mx-[20px]"> 
    //           <div className="border-l-2 border-dashed border-gray-400 h-auto"></div>
    //         </div>

    //         {/* Right Side: Text */}
    //         <div className="md:w-1/2 flex flex-col justify-center text-center md:text-left md:pl-[20px]"> {/* 🔹 Shifted content left */}
    //           <h3 className="text-2xl font-bold text-primary mb-2">{title}</h3>
    //           <p className="text-gray-600">{description}</p>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </section>


     <section className="py-10 bg-base-200 my-20">
      <div className="container mx-auto px-4 space-y-10">
        {servicesData.map(({ id, img, title, description }) => (
          <div
            key={id}
            className="card bg-base-100 shadow-lg p-6 flex flex-col md:flex-row items-center md:items-stretch md:gap-6 rounded-2xl"
          >
            {/* Left Side: Image */}
            <div className=" md:w-auto ">
              <img
                src={img}
                alt={title}
                className=" w-49 h-50 object-cover rounded-xl "
              />
            </div>

            {/* Middle: Vertical Dashed Line */}
            <div className="hidden md:flex justify-center ml-[100px]">
              <div className="border-l-2 border-dashed border-gray-400 h-auto mx-4"></div>
            </div>

            {/* Right Side: Text */}
            <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left md:pl-[20px] sm:mt-10">
              <h3 className="text-2xl font-bold text-primary mb-2">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GiveServices;
