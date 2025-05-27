import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import './ShoppingReview.css';

const ShoppingReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.createReview({
        shopping: id,
        user: localStorage.getItem('userId'),
        rating: rating,
        comment: comment
      });

      navigate(`/shopping/${id}`);
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error);
      setError('Não foi possível enviar sua avaliação. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shopping-review-container">
      <h1>Avaliar Shopping</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="review-form">
        <div className="rating-container">
          <label>Avaliação:</label>
          <div className="star-rating">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <button
                  type="button"
                  key={ratingValue}
                  className={`star ${ratingValue <= (hover || rating) ? 'active' : ''}`}
                  onClick={() => setRating(ratingValue)}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(0)}
                >
                  ★
                </button>
              );
            })}
          </div>
        </div>

        <div className="comment-container">
          <label htmlFor="comment">Comentário:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Conte-nos sua experiência..."
            rows="4"
            required
          />
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={loading || rating === 0}
        >
          {loading ? 'Enviando...' : 'Enviar Avaliação'}
        </button>
      </form>
    </div>
  );
};

export default ShoppingReview; 