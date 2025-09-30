import React, { useEffect, useState } from "react";
import { getHeadlinesByDate } from "./newsService";

interface Article {
  title: string;
  description: string;
  url: string;
}

const NewsComponent: React.FC<{ date: string }> = ({ date }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsArticles = await getHeadlinesByDate(date);
        setArticles(newsArticles);
      } catch (error) {
        setError("Failed to fetch news articles");
      }
    };
    fetchNews();
  }, [date]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Headlines for {date}</h1>
      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
            <p>{article.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsComponent;
