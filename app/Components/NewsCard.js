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
      className="w-[26vw] h-[80vh] rounded-2xl p-[1vw] flex flex-col items-center transition-all duration-500 ease-in-out transform 
                 hover:shadow-[0px_6px_15px_rgba(0,0,0,0.8)] hover:-translate-y-2 cursor-pointer"
      style={{ backgroundColor: "#1E1E1E", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.6)" }}
    >
      <div className="w-[100%] h-[90%] flex flex-col items-center"
        onClick={handleVisit(newsItem.url)}
      >
        <Image
          src={imageUrl}
          alt="News Image"
          width={300}
          height={500}
          unoptimized
          className="mt-[2vh] w-[90%] h-[50%] rounded-lg"
        />

        <p className="title w-[90%] mt-[2vh] text-start font-bold text-white">
          {truncateText(newsItem.title, 110)}
        </p>
        
        <p className="title w-[90%] mt-[2vh] text-start text-gray-300">
          {truncateText(newsItem.abstract, 145)}
        </p>

        <p className="w-[90%] text-sm text-gray-400">
          {newsItem.byline || "Unknown Author"} | {new Date(newsItem.published_date).toLocaleDateString()}
        </p>
      </div>

      <button className="w-[12vw] h-[5vh] rounded-lg mt-[3vh] shadow-xl"
        style={{ backgroundColor: "#B71C1C", color: "#E0E0E0", cursor: "pointer" }}
      >
        AI Summarize
      </button>
    </div>
  );
};

export default NewsCard;
