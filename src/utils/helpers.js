export const formatPrice = (price) => `${price.toFixed(2)}₺`;
export const formatDate = (date) => new Date(date).toLocaleDateString('tr-TR');