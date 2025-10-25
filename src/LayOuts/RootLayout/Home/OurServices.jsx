import * as FaIcons from "react-icons/fa";

const servicesData = [
  {
    id: 1,
    icon: "FaTruck",
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off."
  },
  {
    id: 2,
    icon: "FaGlobeAsia",
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours."
  },
  {
    id: 3,
    icon: "FaWarehouse",
    title: "Fulfillment Solution",
    description:
      "We offer customized services with inventory management support, online order processing, packaging, and after-sales support."
  },
  {
    id: 4,
    icon: "FaMoneyBillWave",
    title: "Cash on Home Delivery",
    description:
      "100% cash-on-delivery anywhere in Bangladesh with guaranteed safety of your product."
  },
  {
    id: 5,
    icon: "FaBuilding",
    title: "Corporate Service / Contract In Logistics",
    description:
      "Customized corporate services which include warehouse and inventory management support."
  },
  {
    id: 6,
    icon: "FaUndoAlt",
    title: "Parcel Return",
    description:
      "Through our reverse logistics facility, we allow customers to return or exchange their products with online business merchants."
  }
];

const OurServices = () => {
  return (
    <section className="py-12 bg-base-200 my-10">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
          Our Services
        </h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. 
          From personal packages to business shipments — we deliver on time, every time.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map(({ id, icon, title, description }) => {
            const IconComponent = FaIcons[icon];
            return (
              <div
                key={id}
                className="card bg-base-100 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="card-body items-center text-center">
                  <div className="text-5xl text-primary mb-3">
                    <IconComponent />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{title}</h3>
                  <p className="text-gray-600 text-sm text-justify  ">{description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
