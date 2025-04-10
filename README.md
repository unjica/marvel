# Marvel Comics App

A React application that displays Marvel comics using the Marvel API.

## Features

- Display a list of Marvel comics with infinite scrolling
- Filter comics by format (Comic, Magazine, Digital Comic)
- Persist filter selection in LocalStorage for better user experience
- View detailed comic information in a modal with smooth animations
- Responsive design with Tailwind CSS
- Error handling for failed image loads
- Price formatting utility
- Efficient data fetching and caching with TanStack Query
- Automatic data revalidation and background updates
- Keyboard navigation support (ESC to close modal)
- Smooth animations using Framer Motion
- Lazy loading for images
- Loading skeletons for better UX
- Comprehensive accessibility features
- Focus trap implementation for modal dialogs

## Accessibility Features

The application implements comprehensive accessibility features to ensure it can be used by everyone:

### Semantic HTML Structure
- Proper use of semantic HTML elements (`nav`, `header`, `article`, etc.)
- Appropriate ARIA roles and labels for interactive elements
- Clear content hierarchy with proper heading structure

### Interactive Elements
- Descriptive `aria-label` attributes for buttons and controls
- Proper `role` attributes for navigation and interactive components
- Tab-based navigation support with `role="tablist"` and `role="tab"`
- Clear indication of selected states with `aria-selected`

### Modal Dialog
- Proper modal dialog implementation with `role="dialog"`
- Clear modal title association with `aria-labelledby`
- Keyboard support for closing (ESC key)
- Focus management for modal content
- Backdrop click handling for closing
- Focus trap implementation that:
  - Keeps focus within the modal when open
  - Cycles focus between first and last elements
  - Prevents focus from escaping the modal
  - Automatically focuses first element on open
  - Handles both Tab and Shift+Tab navigation
- Body scroll lock when modal is open

### Navigation
- Breadcrumb navigation with proper ARIA labeling
- Mobile menu with proper expand/collapse states
- Clear indication of current page/selection
- Proper menu structure for screen readers

### Images and Media
- Descriptive `alt` text for all images
- Decorative images marked with `aria-hidden="true"`
- Lazy loading with proper fallbacks

### Error Handling
- Failed image loads show a placeholder image
- API errors display user-friendly error messages with:
  - Clear error descriptions
  - Retry button for immediate recovery
  - Page reload option for complete reset
  - Specific error messages for different failure scenarios:
    - Invalid API credentials
    - Rate limiting (too many requests)
    - No comics found
    - General network errors
- Loading states are shown during data fetching
- Automatic retry mechanism for failed requests
- Deduplication of comic entries to prevent duplicates
- Invalid dates are handled gracefully with 'Unknown' fallback
- Network errors are handled with appropriate user feedback
- Comprehensive error recovery options

### Responsive Design
- Accessible mobile menu implementation
- Proper touch target sizes
- Clear visual hierarchy across all screen sizes

### Keyboard Navigation
- Full keyboard support for all interactive elements
- Logical tab order throughout the application
- Focus trap in modal dialogs
- ESC key support for closing modals
- Proper focus management for screen readers

## Project Structure

```
src/
├── components/
│   ├── ComicCard.tsx       # Card component for displaying individual comics
│   ├── ComicDetailModal.tsx # Modal for displaying comic details with Framer Motion animations
│   ├── ComicFilter.tsx     # Component for filtering comics by format
│   ├── ComicList.tsx       # Main component for displaying the list of comics
│   ├── SkeletonCard.tsx    # Loading skeleton component with animations
│   ├── Header.tsx          # Header component with logo and filters
│   ├── Breadcrumbs.tsx     # Navigation breadcrumbs component
│   ├── ErrorMessage.tsx    # Reusable error message component with retry functionality
│   └── Loader.tsx          # Loading spinner component
├── types/
│   └── types.ts            # TypeScript type definitions for API responses
├── utils/
│   ├── api.ts              # API utility functions for Marvel API integration
│   ├── price.ts            # Utility functions for price formatting
│   └── storage.ts          # Utility functions for LocalStorage operations
├── App.tsx                 # Main application component
├── index.tsx               # Application entry point
└── index.css               # Global styles and Tailwind imports
```

### Components

#### ComicCard
Displays individual comic information with:
- Responsive image loading with fallback
- Price formatting
- Accessibility attributes
- Hover animations
- Loading state handling

#### ComicDetailModal
Modal component for detailed comic view with:
- Framer Motion animations
- Focus trap for accessibility
- Keyboard navigation
- Responsive design
- Loading states
- Error handling

#### ComicFilter
Format filtering component with:
- Dropdown interface
- State management
- Accessibility support
- Responsive design

#### ComicList
Main list component with:
- Infinite scrolling
- Loading states
- Error handling
- Responsive grid layout
- Accessibility support

#### SkeletonCard
Loading state component with:
- Pulse animations
- Responsive design
- Matches ComicCard layout

#### Header
Top navigation component with:
- Logo display
- Filter integration
- Responsive design
- Accessibility support

#### Breadcrumbs
Navigation component with:
- Current page context
- Responsive design
- Accessibility support

#### ErrorMessage
Reusable error component with:
- User-friendly error messages
- Retry functionality
- Accessibility support
- Responsive design
- Consistent styling

#### Loader
Loading spinner component

### Utilities

#### api.ts
Marvel API integration with:
- Axios configuration
- Error handling
- Authentication
- Response typing

#### price.ts
Price formatting utilities:
- Currency conversion
- Formatting options
- Fallback handling

#### storage.ts
LocalStorage utilities:
- Data persistence
- Type safety
- Error handling

### Types

#### types.ts
TypeScript definitions for:
- API responses
- Component props
- Utility functions
- State management

## Styling

### Tailwind CSS
The application uses Tailwind CSS for styling with the following configuration:
- Base font size: 17px
- Small screens (sm, 640px+): 15px
- Large screens (lg, 1024px+): 19px
- Custom Marvel colors:
  - Red: #ED1D24
- Responsive grid layouts
- Smooth transitions and animations
- Hover effects for interactive elements

### Animations
The application uses Framer Motion for smooth animations:
- Modal entrance and exit animations
- Smooth transitions between states
- Optimized performance with hardware acceleration
- Gesture support for interactive elements
- Loading skeleton animations with pulsing effect

## Data Management

### TanStack Query Implementation
The application uses TanStack Query for efficient data management:
- Automatic caching of comic data
- Background data revalidation
- Optimized loading states
- Deduplication of comic entries
- Efficient infinite scrolling implementation
- Automatic retry on failed requests
- Configurable stale time (5 minutes) and garbage collection time (30 minutes)

## Performance Optimizations

### Image Loading
- Lazy loading for all images
- Optimized image sizes and formats
- Progressive loading for better user experience

### Loading States
- Skeleton loading for initial data fetch
- Skeleton loading for infinite scroll
- Smooth transitions between states
- Optimized performance with hardware acceleration
- Consistent layout during loading

## Utilities

### Price Formatting
The `formatPrice` utility function in `src/utils/price.ts` handles price formatting:
- Returns 'N/A' if no prices are available
- Returns 'Free' if the price is 0
- Returns the formatted price with € symbol otherwise
- Prioritizes print price if available, otherwise uses the lowest price

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with your Marvel API keys:
   ```
   REACT_APP_MARVEL_PUBLIC_KEY=your_public_key_here
   REACT_APP_MARVEL_PRIVATE_KEY=your_private_key_here
   ```
   Note: 
   - For local development, only the public key is required
   - For production, both public and private keys are required
   - You can obtain these from the Marvel Developer Portal (https://developer.marvel.com/)

4. Start the development server:
   ```bash
   npm start
   ```

## API Authentication

The app uses different authentication methods based on the environment:

### Development Environment
- Only requires the public key (`REACT_APP_MARVEL_PUBLIC_KEY`)
- Simpler authentication for local development and testing

### Production Environment
- Requires both public and private keys
- Uses timestamp and hash-based authentication
- More secure but requires additional configuration

### Troubleshooting

#### Marvel API Authentication Issues
If you're getting 401 (Unauthorized) errors:
- In development: Verify your public key is correctly set
- In production: Verify both public and private keys are correctly set
- Check that the Marvel Developer Portal is accessible
- Ensure your API keys are valid and not expired

#### Marvel Developer Portal Issues
If the Marvel Developer Portal is down:
1. Development can continue with just the public key
2. Production deployment will require both keys
3. Check your email for previous API key communications
4. Look for saved API keys in your browser's password manager

## Technologies Used

- React 19.1.0
- TypeScript 4.9.5
- Marvel API
- Tailwind CSS 3.3.0
- Framer Motion for animations
- Axios 1.8.4 for API requests
- TanStack Query 5.72.2 for data fetching and caching
- PostCSS with nesting support
- Testing libraries (Jest, React Testing Library)

## API Integration

The app uses the Marvel Comics API to fetch comic data. The API key should be stored in the `.env` file as `REACT_APP_MARVEL_PUBLIC_KEY`. TanStack Query manages the API requests with automatic caching and revalidation.

## Error Handling

- Failed image loads show a placeholder image
- API errors display user-friendly error messages with:
  - Clear error descriptions
  - Retry button for immediate recovery
  - Page reload option for complete reset
  - Specific error messages for different failure scenarios:
    - Invalid API credentials
    - Rate limiting (too many requests)
    - No comics found
    - General network errors
- Loading states are shown during data fetching
- Automatic retry mechanism for failed requests
- Deduplication of comic entries to prevent duplicates
- Invalid dates are handled gracefully with 'Unknown' fallback
- Network errors are handled with appropriate user feedback
- Comprehensive error recovery options

## Future Improvements

- Add search functionality
- Implement sorting options
- Add favorites/bookmarks
- Add unit tests
- Add offline support with TanStack Query's persistence
- Add dark mode support
- Add analytics tracking

