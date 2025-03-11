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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center sm:items-stretch sm:flex-row sm:flex-wrap gap-4 md:gap-6 lg:gap-[2vw] justify-center mt-[15vh] md:mt-[12vh]">
          {data?.pages.map((page, i) =>
            page.news.map((newsItem, index) => (
              <div key={newsItem.url || index} className="w-full sm:w-auto flex justify-center">
                <NewsCard newsItem={newsItem} />
              </div>
            ))
          )}
        </div>
        <div ref={loadMoreRef} className="h-20 text-center text-gray-400 py-6">
          {isFetchingNextPage ? "Loading more stories..." : hasNextPage ? "Scroll for more" : "No more stories"}
        </div>
      </div>
    </div>
  );
}
