import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartSidebarOpen: false,
  mobileMenuOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleCartSidebar: (state) => {
      state.cartSidebarOpen = !state.cartSidebarOpen;
    },
    
    openCartSidebar: (state) => {
      state.cartSidebarOpen = true;
    },
    
    closeCartSidebar: (state) => {
      state.cartSidebarOpen = false;
    },
    
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    
    closeMobileMenu: (state) => {
      state.mobileMenuOpen = false;
    },
  },
});

export const { 
  toggleCartSidebar, 
  openCartSidebar, 
  closeCartSidebar,
  toggleMobileMenu,
  closeMobileMenu 
} = uiSlice.actions;

export default uiSlice.reducer;
