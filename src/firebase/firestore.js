// import { getFirestore, collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { mockProducts } from '../utils/mockData';

class FirestoreService {
  async getProducts() {
    // const db = getFirestore();
    // const productsCol = collection(db, 'products');
    // const snapshot = await getDocs(productsCol);
    // return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    return mockProducts;
  }

  async getOrders(userId = null) {
    // const db = getFirestore();
    // const ordersCol = collection(db, 'orders');
    // let q = ordersCol;
    // if (userId) q = query(ordersCol, where('userId', '==', userId));
    // const snapshot = await getDocs(q);
    // return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    return [];
  }

  async createOrder(orderData) {
    // const db = getFirestore();
    // const docRef = await addDoc(collection(db, 'orders'), {
    //   ...orderData,
    //   createdAt: new Date()
    // });
    // return { id: docRef.id, ...orderData };
    
    return { 
      id: Date.now(), 
      ...orderData, 
      createdAt: new Date().toISOString() 
    };
  }

  async updateProduct(productId, data) {
    // const db = getFirestore();
    // const productRef = doc(db, 'products', productId);
    // await updateDoc(productRef, data);
  }

  async updateOrder(orderId, data) {
    // const db = getFirestore();
    // const orderRef = doc(db, 'orders', orderId);
    // await updateDoc(orderRef, data);
  }
}

export const firestoreService = new FirestoreService();