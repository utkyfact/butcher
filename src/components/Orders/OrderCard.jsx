import React from 'react';
import { ORDER_STATUS_LABELS } from '../../utils/constants';
import { formatPrice, formatDate } from '../../utils/helpers';

const OrderCard = ({ order }) => {
    const getStatusBadge = (status) => {
      const badges = {
        pending: 'bg-yellow-100 text-yellow-700',
        preparing: 'bg-blue-100 text-blue-700',
        ready: 'bg-green-100 text-green-700',
        completed: 'bg-green-100 text-green-700',
        cancelled: 'bg-red-100 text-red-700'
      };
      return (
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${badges[status]}`}>
          {ORDER_STATUS_LABELS[status]}
        </span>
      );
    };
  
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Sipariş #{order.id}</h3>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Sipariş Tarihi:</span> {formatDate(order.createdAt)}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Teslim:</span> {order.date} {order.time}
                </p>
              </div>
            </div>
            <div className="text-right">
              {getStatusBadge(order.status)}
              <p className="text-3xl font-bold text-red-600 mt-3">
                {order.total ? formatPrice(order.total) : 'Fiyat yok'}
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <h4 className="font-semibold text-gray-900 mb-3">Sipariş Detayları</h4>
            <div className="space-y-3">
              {order.items.map(item => (
                <div key={item.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.quantity} {item.unit}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-red-600">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>
          
          {order.notes && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-2">
                <span className="text-blue-600 text-lg">📝</span>
                <div>
                  <p className="font-semibold text-blue-900 mb-1">Sipariş Notu</p>
                  <p className="text-blue-800">{order.notes}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

export default OrderCard;