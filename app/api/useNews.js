"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAtom } from "jotai";
import { categoryAtom } from "@/app/StateManagement/Category"; 

const API_BASE_URL = "http://api.mediastack.com/v1/news";
const API_TOKEN = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const LIMIT = 15; // Number of articles per request

export default function useNews() {
  const [category] = useAtom(categoryAtom); // Read category from atom

  // Fetch function now uses category from atom
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

      const newsData = response.data.data || [];

      return {
        news: newsData,
        nextOffset: newsData.length === LIMIT ? pageParam + LIMIT : null,
      };
    } catch (error) {
      console.error("Error fetching news:", error);
      return { news: [], nextOffset: null };
    }
  };

  return useInfiniteQuery({
    queryKey: ["news", category], // When category changes, query refetches automatically
    queryFn: fetchNews,
    getNextPageParam: (lastPage) => lastPage.nextOffset,
  });
}
