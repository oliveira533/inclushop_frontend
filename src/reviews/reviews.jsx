import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../services/api';
import './reviews.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const data = await api.getAllReviews();
        setReviews(data);
      } catch (error) {
        console.error("Erro ao carregar avaliações:", error);
        setError('Não foi possível carregar as avaliações. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleReviewClick = (shoppingId) => {
    navigate(`/shopping/${shoppingId}`);
  };

  const renderStars = (rating) => {
    const fullStars = Math.min(Math.floor(rating), 5);
    const hasHalfStar = rating % 1 !== 0 && fullStars < 5;
    const emptyStars = Math.max(5 - fullStars - (hasHalfStar ? 1 : 0), 0);

    return (
      <>
        {'★'.repeat(fullStars)}
        {hasHalfStar && '½'}
        {'☆'.repeat(emptyStars)}
      </>
    );
  };

  if (loading) {
    return <div className="reviews-loading">Carregando avaliações...</div>;
  }

  if (error) {
    return <div className="reviews-error">{error}</div>;
  }

  return (
    <div className="reviews-container">
      <h1>Avaliações do Shopping</h1>
      <div className="reviews-list">
        {reviews.map((review) => (
          <div 
            key={review.id} 
            className="review-card"
            onClick={() => handleReviewClick(review.shopping)}
            style={{ cursor: 'pointer' }}
          >
            <div className="review-header">
              <h3>{review.cep}</h3>
              <div className="review-rating">
                {renderStars(review.rating)}
                <span className="rating-number">({review.rating})</span>
              </div>
            </div>
            <p className="review-comment">
              {review.response && review.response[0]?.response}
            </p>
            <span className="review-date">
              {new Date(review.createdAt).toLocaleDateString('pt-BR')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews; 