import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import './ShoppingDetails.css';

const ShoppingDetails = () => {
  const { id } = useParams();
  const [shoppingDetails, setShoppingDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchShoppingDetails = async () => {
      try {
        setLoading(true);
        // TODO: Implementar busca dos detalhes do shopping quando o endpoint estiver disponível
        const mockShoppingDetails = {
          id: id,
          name: "Shopping Example",
          address: "Rua Example, 123",
          cep: "12345-678"
        };
        setShoppingDetails(mockShoppingDetails);

        // Buscar avaliações do shopping
        const reviewsData = await api.getShoppingReviews(mockShoppingDetails.cep);
        setReviews(reviewsData);
      } catch (error) {
        console.error("Erro ao carregar detalhes do shopping:", error);
        setError('Não foi possível carregar os detalhes do shopping. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchShoppingDetails();
  }, [id]);

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
    return <div className="shopping-details-loading">Carregando detalhes do shopping...</div>;
  }

  if (error) {
    return <div className="shopping-details-error">{error}</div>;
  }

  if (!shoppingDetails) {
    return <div className="shopping-details-error">Shopping não encontrado</div>;
  }

  return (
    <div className="shopping-details-container">
      <div className="shopping-header">
        <h1>{shoppingDetails.name}</h1>
        <p className="shopping-address">{shoppingDetails.address}</p>
      </div>

      <div className="reviews-section">
        <h2>Avaliações</h2>
        {reviews.length === 0 ? (
          <p className="no-reviews">Ainda não há avaliações para este shopping.</p>
        ) : (
          <div className="reviews-list">
            {reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <h3>{review.user}</h3>
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
        )}
      </div>
    </div>
  );
};

export default ShoppingDetails; 