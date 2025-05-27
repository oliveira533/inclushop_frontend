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
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    response: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchShoppingDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://incluapi.vercel.app/api/shopping/info/${id}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error('Erro ao buscar informações do shopping');
        }

        setShoppingDetails({
          id: id,
          name: data.name,
          address: `${data.street}, ${data.number}`,
          cep: data.cep,
          state: data.state,
          description: "Um shopping moderno com diversas lojas e opções de lazer",
          openingHours: "Segunda a Sábado: 10h às 22h | Domingo: 14h às 20h",
          parking: "Estacionamento disponível",
          accessibility: "Acessibilidade completa"
        });

        // Buscar avaliações do shopping usando a API real
        console.log('Buscando avaliações para o shopping:', id);
        const reviewsData = await api.getShoppingReviews(id);
        console.log('Resposta da API de avaliações:', reviewsData);
        
        if (!reviewsData) {
          throw new Error('Nenhuma avaliação encontrada');
        }
        
        setReviews(Array.isArray(reviewsData) ? reviewsData : []);
      } catch (error) {
        console.error("Erro detalhado ao carregar dados:", error);
        console.error("Mensagem de erro:", error.message);
        console.error("Stack trace:", error.stack);
        setError('Não foi possível carregar as informações. Por favor, tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchShoppingDetails();
  }, [id]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const reviewData = {
        shopping: id,
        rating: newReview.rating,
        comment: newReview.response
      };

      console.log('Enviando avaliação:', reviewData);
      await api.createReview(reviewData);
      
      // Atualizar a lista de avaliações
      console.log('Buscando avaliações atualizadas...');
      const updatedReviews = await api.getShoppingReviews(id);
      console.log('Avaliações atualizadas:', updatedReviews);
      
      setReviews(Array.isArray(updatedReviews) ? updatedReviews : []);
      
      // Limpar o formulário e fechar
      setNewReview({ rating: 5, response: '' });
      setShowReviewForm(false);
    } catch (error) {
      console.error("Erro detalhado ao enviar avaliação:", error);
      console.error("Mensagem de erro:", error.message);
      console.error("Stack trace:", error.stack);
      setError('Não foi possível enviar sua avaliação. Por favor, tente novamente mais tarde.');
    } finally {
      setSubmitting(false);
    }
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
        <p className="shopping-description">{shoppingDetails.description}</p>
        <div className="shopping-info">
          <p><strong>Horário de Funcionamento:</strong> {shoppingDetails.openingHours}</p>
          <p><strong>Estacionamento:</strong> {shoppingDetails.parking}</p>
          <p><strong>Acessibilidade:</strong> {shoppingDetails.accessibility}</p>
        </div>
      </div>

      <div className="reviews-section">
        <div className="reviews-header">
          <h2>Avaliações</h2>
          <button 
            className="add-review-button"
            onClick={() => setShowReviewForm(!showReviewForm)}
          >
            {showReviewForm ? 'Cancelar' : 'Adicionar Avaliação'}
          </button>
        </div>

        {showReviewForm && (
          <form onSubmit={handleSubmitReview} className="review-form">
            <div className="rating-input">
              <label>Avaliação:</label>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    style={{ cursor: 'pointer', color: star <= newReview.rating ? '#ffd700' : '#ccc' }}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <div className="response-input">
              <label>Comentário:</label>
              <textarea
                value={newReview.response}
                onChange={(e) => setNewReview({ ...newReview, response: e.target.value })}
                required
                placeholder="Digite seu comentário sobre o shopping..."
              />
            </div>
            <button 
              type="submit" 
              className="submit-review-button"
              disabled={submitting}
            >
              {submitting ? 'Enviando...' : 'Enviar Avaliação'}
            </button>
          </form>
        )}

        {reviews.length === 0 ? (
          <p className="no-reviews">Ainda não há avaliações para este shopping.</p>
        ) : (
          <div className="reviews-list">
            {reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-header">
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