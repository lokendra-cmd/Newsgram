"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAtom } from "jotai";
import { categoryAtom } from "@/app/StateManagement/Category";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // Newswire API Base URL
const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY; // NYTimes API Key
const LIMIT = 15; // Number of articles per request

// Map categoryAtom values to NYTimes section names
const categoryMap = {
  general: "all",
  business: "business",
  technology: "technology",
  sports: "sports",
  health: "health",
  world: "world",
  science: "science",
  entertainment: "arts",
};

export default function useNews() {
  const [category] = useAtom(categoryAtom); // Read category from atom
  const section = categoryMap[category] || "all"; // Default to 'all' if no category found

  const fetchNews = async ({ pageParam = 0 }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${section}.json`, {
        params: {
          "api-key": API_KEY,
          offset: pageParam, // Pagination via offset
          limit: LIMIT,
        },
      });

      if (!response.data || !response.data.results) {
        throw new Error("No news data available.");
      }

      const newsData = response.data.results;

      return {
        news: newsData,
        nextOffset: newsData.length === LIMIT ? pageParam + LIMIT : null,
      };
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch news. Please try again.");
    }
  };

  return useInfiniteQuery({
    queryKey: ["news", category], // Refetches when category changes
    queryFn: fetchNews,
    getNextPageParam: (lastPage) => lastPage.nextOffset,
    retry: false, // Disable auto-retry if needed
  });
}
