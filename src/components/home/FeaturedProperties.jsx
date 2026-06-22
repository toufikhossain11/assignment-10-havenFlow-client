"use client";

import { motion } from "motion/react";
import { Button, Card } from "@heroui/react";
import { House, MapPin } from "@gravity-ui/icons";
import PropertiesCard from "../PropertiesCard";


export default function FeaturedProperties({ properties }) {
 
  return (
    <section className="w-full bg-black py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-left space-y-2">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Featured Properties
          </h2>
          <p className="text-zinc-500 text-sm font-medium">
            A few approved listings picked for you
          </p>
        </div>

        {/* Cards */}
        {/* <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        > */}
          {/* card  */}
           <PropertiesCard properties={properties} />
        {/* </motion.div> */}
      </div>
    </section>
  );
}