import * as FaIcons from "react-icons/fa";

const howItWorksData = [
  {
    id: 1,
    icon: "FaShippingFast",
    title: "Fast Delivery",
    description:
      "We deliver your products quickly and safely to your doorstep, ensuring on-time service every time."
  },
  {
    id: 2,
    icon: "FaCreditCard",
    title: "Booking Pick & Drop",
    description:
      "Pay easily through our secure payment system that protects your personal and financial information."
  },
  {
    id: 3,
    icon: "FaBoxOpen",
    title: "Cash On Delivery",
    description:
      "Each order is packed with care to ensure your products arrive in perfect condition."
  },
  {
    id: 4,
    icon: "FaHeadset",
    title: "Delivery Hub",
    description:
      "Our friendly support team is always ready to help you with any questions or concerns."
  }
];

const HowWork = () => {
  return (
    <div
      
      className="py-5 my-10 bg-base-200 ">
      <div className="container mx-auto px-4 text-left">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary">
          How It Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorksData.map(({ id, icon, title, description }) => {
            const IconComponent = FaIcons[icon];
            return (
              <div
                key={id}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="card-body items-center text-center">
                  <div className="text-5xl text-primary mb-3">
                    <IconComponent />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{title}</h3>
                  <p className="text-gray-600 text-justify">{description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HowWork;
