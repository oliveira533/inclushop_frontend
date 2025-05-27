import React, { useState, useEffect } from 'react';
import './reviews.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchReviews = async () => {
      try {
        // Simulated data - replace with actual API call
        const mockReviews = [
          {
            id: 1,
            user: "João Silva",
            rating: 4.5,
            comment: "Ótimo shopping, muito bem organizado e com ótimas lojas!",
            date: "2024-03-15"
          },
          {
            id: 2,
            user: "Maria Santos",
            rating: 5,
            comment: "Excelente experiência, estacionamento amplo e fácil acesso.",
            date: "2024-03-14"
          }
        ];
        setReviews(mockReviews);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar avaliações:", error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return <div className="reviews-loading">Carregando avaliações...</div>;
  }

  return (
    <div className="reviews-container">
      <h1>Avaliações do Shopping</h1>
      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <h3>{review.user}</h3>
              <div className="review-rating">
                {'★'.repeat(Math.floor(review.rating))}
                {review.rating % 1 !== 0 && '½'}
                {'☆'.repeat(5 - Math.ceil(review.rating))}
                <span className="rating-number">({review.rating})</span>
              </div>
            </div>
            <p className="review-comment">{review.comment}</p>
            <span className="review-date">{new Date(review.date).toLocaleDateString('pt-BR')}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews; 