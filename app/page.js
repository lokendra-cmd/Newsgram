"use client";
import { useEffect, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useNews from "@/app/api/useNews";
import NewsCard from "@/app/Components/NewsCard";
import Header from "@/app/Components/Header";

export default function HomePage() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NewsFeed />
    </QueryClientProvider>
  );
}

function NewsFeed() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useNews();
  const loadMoreRef = useRef(null);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "100px", threshold: 1.0 } // Load when user is near bottom
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="bg-[#121212] text-white min-h-screen">
      <Header />
      <div className="flex flex-wrap gap-[2vw] justify-center mt-[15vh]">
        {data?.pages.map((page, i) =>
          page.news.map((newsItem, index) => (
            <NewsCard key={newsItem.url || index} newsItem={newsItem} />
          ))
        )}
      </div>
      <div ref={loadMoreRef} className="h-10 text-center text-gray-400">
        {isFetchingNextPage ? "Loading more..." : "Scroll down for more"}
      </div>
    </div>
  );
}
