import { motion } from "motion/react";
import { Button, Card } from "@heroui/react";
import { House, MapPin } from "@gravity-ui/icons";

const PropertiesCard = ({ properties }) => {
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    return (
        <div>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >

                {properties?.map((property) => (
                    <motion.div
                        key={property._id}
                        variants={itemVariants}
                        whileHover={{ y: -6 }}
                        transition={{ duration: 0.3 }}
                        className="w-full"
                    >
                        <Card className="bg-[#0a140f]/40 backdrop-blur-md border border-[#5dcaa5]/15 rounded-2xl hover:border-[#5dcaa5]/40 hover:shadow-[0_0_25px_rgba(93,202,165,0.12)] transition-all duration-300 h-[410px] flex flex-col justify-between group overflow-hidden p-0">

                            {/* Image Section */}
                            <div className="w-full h-44 bg-zinc-950 overflow-hidden relative flex items-center justify-center">
                                {property.images ? (
                                    <img
                                        src={property.images}
                                        alt={property.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="text-zinc-600 group-hover:text-[#5dcaa5] transition-colors">
                                        <House size={34} />
                                    </div>
                                )}

                                {/* Property Type Badge */}
                                <span className="absolute top-3 right-3 px-3 py-1 bg-black/80 backdrop-blur-sm border border-[#5dcaa5]/30 text-[#5dcaa5] rounded-full text-[11px] font-bold tracking-wide shadow-sm uppercase">
                                    {property.propertyType}
                                </span>
                            </div>

                            {/* Content Section */}
                            <div className="flex-1 flex flex-col justify-between p-5">

                                {/* Top Text Group */}
                                <div className="space-y-3 text-left">
                                    {/* Title */}
                                    <h3 className="font-extrabold text-lg md:text-xl text-white group-hover:text-[#5dcaa5] transition-colors tracking-tight line-clamp-1">
                                        {property.title}
                                    </h3>

                                    {/* Location */}
                                    <div className="flex items-center gap-2 text-zinc-400 text-sm">
                                        <MapPin
                                            size={14}
                                            className="text-[#5dcaa5]/70 group-hover:text-[#5dcaa5] transition-colors flex-shrink-0"
                                        />
                                        <span className="line-clamp-1 font-medium tracking-wide">
                                            {property.location}
                                        </span>
                                    </div>

                                    {/* Meta Info (Beds, Baths, Size) */}
                                    <div className="flex items-center gap-4 text-sm font-medium text-zinc-400 pt-1">
                                        <div className="flex items-center gap-1.5 bg-zinc-900/50 px-2.5 py-1 rounded-md border border-zinc-800/60">
                                            <span className="text-zinc-500">🛏</span>
                                            <span>{property.bedrooms} Beds</span>
                                        </div>

                                        <div className="flex items-center gap-1.5 bg-zinc-900/50 px-2.5 py-1 rounded-md border border-zinc-800/60">
                                            <span className="text-zinc-500">🚿</span>
                                            <span>{property.bathrooms} Baths</span>
                                        </div>

                                        <div className="flex items-center gap-1.5 bg-zinc-900/50 px-2.5 py-1 rounded-md border border-zinc-800/60 text-zinc-400">
                                            <span className="text-zinc-500">📐</span>
                                            <span>{property.propertySize}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Section */}
                                <div className="flex justify-between items-end pt-4 border-t border-zinc-900/80 mt-auto">
                                    {/* Price and Duration */}
                                    <div className="flex items-baseline gap-1 text-left">
                                        <span className="font-black text-white text-xl md:text-2xl tracking-tight text-[#5dcaa5]">
                                            ৳{property.rent?.toLocaleString()}
                                        </span>
                                        <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">
                                            /{property.rentType}
                                        </span>
                                    </div>

                                    {/* Action Button */}
                                    <Button
                                        size="md"
                                        className="bg-[#0f6e56] text-white font-bold px-5 h-10 rounded-xl border border-[#0f6e56] hover:bg-[#5dcaa5] hover:text-black hover:border-[#5dcaa5] transition-all duration-200 shadow-md text-sm tracking-wide"
                                    >
                                        View Details
                                    </Button>
                                </div>

                            </div>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default PropertiesCard;