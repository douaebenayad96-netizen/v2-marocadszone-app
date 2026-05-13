
const BlogCard = () => {
  return (
    <div
      className="rounded-lg overflow-hidden shadow-lg"
    >
      <img
        src="https://freeagent.gavencreative.com/wp-content/uploads/2023/11/ser8-min-367x218.jpg"
        alt="Blog 1"
        className="object-cover w-full h-48"
      />
      <div
        className="p-4"
      >
        <small
          className="text-primary-blue font-bold bg-primary-blue bg-opacity-10 px-2 py-1 rounded-lg inline-block mb-2"
        >
          #Blog
        </small>
        <h3
          className="text-blue-950 font-bold text-lg mb-2"
        >
          5 Tips for Finding a Great Freelancer
        </h3>
        <p
          className="text-gray-500 text-base"
        >
          We’ve all heard the horror stories of hiring a freelancer who didn’t deliver on time, or worse, didn’t deliver at all. Here are 5 tips for finding a great freelancer.
        </p>
      </div>
    </div>
  )
}

export default BlogCard