"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { testimonials } from "@/lib/testimonials";
import TestimonialCard from "./TestimonialCard";

const TestimonialsCarousel = () => {
    const settings = {
        initialSlide: 0,
        dots: true,
        focusOnSelect: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        cssEase: "linear",
    };

    return (
        <div>
            <Slider {...settings} >
                {testimonials.map((testimonial) => (
                    <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                ))}
            </Slider>
        </div>
    )
}

export default TestimonialsCarousel