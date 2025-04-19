import { Testimonial } from "@/components/ui/testimonial-card";

const testimonials = [
  {
    name: "Trevor Helwig",
    role: "SMRID", // Simplified Role
    // company: "SMRID", // Removed Company field
    rating: 5,
    image: "https://source.unsplash.com/random/150x150/?person&sig=1", // Unsplash Placeholder
    testimonial:
      "Coalbanks collected some drone footage for SMRID of larger canals and drop structures. Communication and scheduling was excellent and we were very pleased with the final product.", // Updated full text
  },
  {
    name: "Rod Leland",
    role: "Commercial Truck", // Role remains the same
    rating: 5,
    image: "https://source.unsplash.com/random/150x150/?person&sig=2", // Unsplash Placeholder
    testimonial:
      "I’ve worked with Coalbanks in a professional capacity and the agreed-upon creative brief led easily to exactly what we needed for our project quickly and with strong value.",
  },
  {
    name: "Jason Visser",
    role: "Taber Christian School", // Simplified Role
    rating: 5,
    image: "https://source.unsplash.com/random/150x150/?person&sig=3", // Unsplash Placeholder
    testimonial:
      "Michael was good to work with and went the extra mile to accommodate our school in helping us produce a promotional video that matched what we were looking for.",
  },
];

function TestimonialSection() {
  // Renamed from TestimonialDemo for clarity
  return (
    <div className="container pt-5 pb-10"> {/* Reduced top padding */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <Testimonial key={testimonial.name} {...testimonial} />
        ))}
      </div>
    </div>
  );
}

export default TestimonialSection; // Use default export for easier Astro import
