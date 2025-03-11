"use client";
import Image from "next/image";
import he from "he";

const NewsCard = ({ newsItem }) => {
  const truncateText = (str, limit) => he.decode(str.length > limit ? str.slice(0, limit) + "..." : str);

  const handleVisit = (url) => () => {
    window.open(url, "_blank");
  };

  // Extract the first valid image from NYTimes multimedia
  const imageUrl = newsItem.multimedia?.[0]?.url || 
    "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div
      className="w-full sm:w-[85vw] md:w-[45vw] lg:w-[30vw] xl:w-[26vw] h-auto min-h-[450px] max-h-[80vh] 
                 rounded-2xl p-4 md:p-[1vw] flex flex-col items-center transition-all duration-500 ease-in-out transform 
                 hover:shadow-[0px_6px_15px_rgba(0,0,0,0.8)] hover:-translate-y-2 cursor-pointer mb-6 md:mb-0"
      style={{ backgroundColor: "#1E1E1E", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.6)" }}
    >
      <div className="w-full h-full flex flex-col items-center"
        onClick={handleVisit(newsItem.url)}
      >
        <div className="relative w-full aspect-video md:aspect-[4/3] lg:aspect-[3/2] overflow-hidden rounded-lg mt-2">
          <Image
            src={imageUrl}
            alt="News Image"
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 768px) 85vw, (max-width: 1024px) 45vw, (max-width: 1280px) 30vw, 26vw"
            style={{ objectFit: 'cover' }}
            unoptimized
            className="rounded-lg"
          />
        </div>

        <p className="title w-full mt-4 text-start font-bold text-white text-base md:text-lg">
          {truncateText(newsItem.title, 110)}
        </p>
        
        <p className="title w-full mt-3 text-start text-gray-300 text-sm md:text-base">
          {truncateText(newsItem.abstract, 145)}
        </p>

        <p className="w-full text-xs md:text-sm text-gray-400 mt-2">
          {newsItem.byline || "Unknown Author"} | {new Date(newsItem.published_date).toLocaleDateString()}
        </p>
      </div>

      <button className="w-full sm:w-[60%] md:w-[80%] lg:w-[70%] xl:w-[60%] h-10 rounded-lg mt-4 mb-2 shadow-xl"
        style={{ backgroundColor: "#B71C1C", color: "#E0E0E0", cursor: "pointer" }}
      >
        AI Summarize
      </button>
    </div>
  );
};

export default NewsCard;
