"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAtom } from "jotai";
import { categoryAtom } from "@/app/StateManagement/Category"; 

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_TOKEN = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const LIMIT = 15; // Number of articles per request

export default function useNews() {
  const [category] = useAtom(categoryAtom); // Read category from atom

  const fetchNews = async ({ pageParam = 0 }) => {
    try {
      const response = await axios.get(API_BASE_URL, {
        params: {
          access_key: API_TOKEN,
          countries: "in",
          languages: "en",
          limit: LIMIT,
          categories: category, // Use latest category
          offset: pageParam,
        },
      });

      if (!response.data || !response.data.data) {
        throw new Error("No news data available.");
      }

      const newsData = response.data.data;

      return {
        news: newsData,
        nextOffset: newsData.length === LIMIT ? pageParam + LIMIT : null,
      };
    } catch (error) {
      throw new Error(error.response?.data?.error || "Failed to fetch news. Please try again.");
    }
  };

  return useInfiniteQuery({
    queryKey: ["news", category], // Refetches when category changes
    queryFn: fetchNews,
    getNextPageParam: (lastPage) => lastPage.nextOffset,
    retry: false, // Disable auto-retry if needed
  });
}
