import { motion } from "motion/react"
import amazon from "../../assets/brands/amazon.png"
import vector from "../../assets/brands/amazon_vector.png"
import casio from "../../assets/brands/casio.png"
import moonstar from "../../assets/brands/moonstar.png"
import randstad from "../../assets/brands/randstad.png"
import start from "../../assets/brands/start-people 1.png"
import start1 from "../../assets/brands/start.png"



const imageData = [
    { id: 1, src: amazon },
    { id: 2, src: vector },
    { id: 3, src: casio },
    { id: 4, src: moonstar },
    { id: 5, src: randstad },
    { id: 6, src: start },
    { id: 7, src: start1 }
];
const SalesTeams = () => {

    return (
        <div className="py-10 bg-base-200 my-10 ">
            <div className="container mx-auto px-4 text-center">
                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-primary">
                    We've helped thousands of sales teams
                </h2>

                {/* Images Row */}
                <motion.div animate={{ x: [0, 50, 0] }} transition={{duration : 4, repeat: Infinity, ease: 'easeInOut',  }} className=" flex h-7  justify-center items-center gap-6">
                    {imageData.map(({ id, src }) => (
                        <div  key={id} className="w-28  md:w-36 lg:w-44">
                            <img
                                src={src}
                                alt={`Sales Team ${id}`}
                                className="w-full h-7 object-contain rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default SalesTeams;