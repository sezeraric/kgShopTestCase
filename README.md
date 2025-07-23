# 🛍️ KG Shop App - Modern E-Commerce Mobile Application

A professional, feature-rich e-commerce mobile application built with React Native, showcasing modern mobile development practices and clean architecture.

![IMG_1206](https://github.com/user-attachments/assets/c2ab8489-85dc-4ee0-b71c-9cef3352fa1e)
![IMG_1210](https://github.com/user-attachments/assets/c60d68f6-9c93-403f-8a8a-2c66c613dac0)
![IMG_1207](https://github.com/user-attachments/assets/eb6c4665-ad0e-4763-9d40-3e9cf4ff6f9d)
![IMG_1208](https://github.com/user-attachments/assets/cf81aba8-1b1f-4415-a633-44e9dbd9b3d5)
![IMG_1211](https://github.com/user-attachments/assets/756aa242-a0e6-4f34-9291-f2340a4d09b4)


## ✨ Features

### 🏠 **Home Screen**
- **Product Grid/List View**: Toggle between grid and list layouts
- **Smart Search & Filtering**: Advanced search with category and sorting options
- **Sticky Header Animation**: Smooth header hide/show on scroll
- **Tab Bar Opacity Animation**: Dynamic tab bar visibility based on scroll direction
- **Scroll to Top**: Smooth scroll-to-top functionality with tab bar animation

### 🛒 **Shopping Cart**
- **Cart Management**: Add, remove, and update product quantities
- **Real-time Total Calculation**: Dynamic price updates
- **Stepper UI**: Professional checkout flow (Cart > Address > Payment)
- **Sticky Action Button**: Modern "Complete Purchase" button
- **Navigation Integration**: Seamless product detail navigation

### ❤️ **Favorites System**
- **Favorite Management**: Add/remove products to favorites
- **Redux Integration**: Persistent favorite state management
- **Empty State**: Beautiful empty favorites showcase
- **Cross-Navigation**: Navigate between favorites and product details

### 📱 **Product Details**
- **Image Gallery**: Swipeable product image carousel
- **Professional UI**: Modern, clean design with proper spacing
- **Animated Heart Button**: Smooth favorite toggle animation
- **Product Information**: Comprehensive product details with badges
- **Sticky Add to Cart**: Always-accessible purchase button

### 🎨 **UI/UX Excellence**
- **Custom Toast Messages**: Professional in-app notifications
- **Smooth Animations**: 60fps animations throughout the app
- **Responsive Design**: Optimized for various screen sizes
- **Modern Color Scheme**: Professional color palette
- **Clean Typography**: Consistent text hierarchy

## 🏗️ Architecture

### **State Management**
- **Redux Toolkit**: Modern Redux with RTK Query patterns
- **Redux Saga**: Side effects and API call management
- **Redux Persist**: Persistent cart and favorites data
- **TypeScript**: Full type safety across the application

### **Navigation**
- **React Navigation v7**: Latest navigation library
- **Stack Navigator**: Screen transitions and navigation
- **Bottom Tab Navigator**: Main app navigation
- **Nested Navigators**: Complex navigation patterns

### **Component Architecture**
- **Reusable Components**: Modular, maintainable code
- **Clean Code Principles**: Single responsibility, DRY principles
- **Props Interface**: TypeScript interfaces for all components
- **Performance Optimized**: FlatList optimizations, memo usage

## 🛠️ Technical Stack

### **Core Technologies**
- **React Native 0.80.1**: Latest stable version
- **TypeScript 5.8.3**: Full type safety
- **React 19.1.0**: Latest React features

### **State Management**
- **Redux Toolkit 2.8.2**: Modern Redux
- **Redux Saga 1.3.0**: Side effects
- **Redux Persist 6.0.0**: Data persistence
- **React Redux 9.2.0**: React bindings

### **Navigation & UI**
- **React Navigation 7.x**: Latest navigation
- **React Native Vector Icons 9.2.0**: Icon library
- **React Native Reanimated 3.18.0**: Smooth animations
- **React Native Gesture Handler 2.27.2**: Touch handling

### **Development Tools**
- **ESLint**: Code quality
- **Prettier**: Code formatting
- **Jest**: Testing framework
- **Metro**: Bundler

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- React Native CLI
- Android Studio / Xcode
- JDK 17 (for Android)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/sezeraric/kgShopTestCase.git
cd kgShopApp
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **iOS Setup** (macOS only)
```bash
cd ios && bundle install && bundle exec pod install && cd ..
```

4. **Start Metro bundler**
```bash
npm start
# or
yarn start
```

5. **Run the application**

**Android:**
```bash
npm run android
# or
yarn android
```

**iOS:**
```bash
npm run ios
# or
yarn ios
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CartItemCard.tsx
│   ├── CustomToast.tsx
│   ├── EmptyCartShowcase.tsx
│   ├── Header.tsx
│   ├── ProductCard.tsx
│   ├── SearchBarWithFilter.tsx
│   ├── Stepper.tsx
│   └── StickyButton.tsx
├── navigation/          # Navigation configuration
│   └── AppNavigator.tsx
├── redux/              # State management
│   ├── cartSlice.ts
│   ├── favoritesSlice.ts
│   ├── productSlice.ts
│   ├── rootReducer.ts
│   ├── rootSaga.ts
│   └── store.ts
├── screens/            # Screen components
│   ├── CartScreen.tsx
│   ├── FavoritesScreen.tsx
│   ├── ProductDetailScreen.tsx
│   └── ProductListScreen.tsx
├── styles/             # Global styles
│   └── colors.ts
├── types.ts            # TypeScript definitions
└── App.tsx            # Root component
```

## 🎯 Key Features for Job Applications

### **Clean Architecture**
- Separation of concerns
- Modular component design
- Scalable folder structure
- TypeScript integration

### **Performance Optimizations**
- FlatList optimizations
- Image lazy loading
- Memory management
- Smooth animations

### **Modern Development Practices**
- Redux Toolkit patterns
- React Navigation v7
- Latest React Native features
- Professional code organization

### **UI/UX Excellence**
- Modern design patterns
- Smooth animations
- Responsive layouts
- Professional styling

## 🤝 Contributing

This project demonstrates professional mobile development practices suitable for job applications. The codebase showcases:

- **Clean Code Principles**
- **Modern React Native Patterns**
- **Professional UI/UX Design**
- **Scalable Architecture**
- **Type Safety with TypeScript**

## 📱 Screenshots

*[Screenshots would be added here]*

## 🏆 Why This Project Stands Out

1. **Modern Tech Stack**: Latest React Native, Redux Toolkit, TypeScript
2. **Clean Architecture**: Well-organized, maintainable code
3. **Professional UI/UX**: Smooth animations, modern design
4. **Performance Optimized**: Efficient rendering, memory management
5. **Production Ready**: Error handling, loading states, edge cases
6. **Scalable**: Easy to extend with new features

---

**Built with ❤️ using React Native**
