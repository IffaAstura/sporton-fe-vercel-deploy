import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const categoryList = [
    {
        name: "Running",
        imgUrl: "category-running.svg",
    },
    {
        name: "Tennis",
        imgUrl: "category-tennis.svg",
    },
    {
        name: "Basketball",
        imgUrl: "category-basketball.svg",
    },
    {
        name: "Football",
        imgUrl: "category-football.svg",
    },
    {
        name: "Badminton",
        imgUrl: "category-badminton.svg",
    },
    {
        name: "Swimming",
        imgUrl: "category-swimming.svg"
    }
]

const CategoriesSection = () => {
    return (
        <section id="category-section" className="container mx-auto pb-20">
            <div className="flex justify-between">
                <h2 className="font-bold text-2xl">Browse By Categories</h2>
                <div className="flex gap-2">
                    <Link href="#" className="flex gap-2 text-primary font-medium">
                        See All Categories
                        <FiArrowRight className="self-center"/>
                    </Link>
                </div>
            </div>
            <div className="grid grid-cols-6 gap-12 mt-8">
                {categoryList.map((category, index) => (
                    <div className="rounded-lg bg-gradient-to-r from-[#F1F1F1] to-[#F7F7F7] w-full aspect-square flex justify-center" key={index}>
                        <div className="self-center">
                            <Image src={`/image/categories/${category.imgUrl}`} width={86} height={86} alt={category.name} className="mb-[10px]"/>
                            <div className="text-primary-font-medium text-xl text-center">{category.name}</div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CategoriesSection;