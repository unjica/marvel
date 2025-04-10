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

## Project Structure

```
src/
├── components/
│   ├── ComicCard.tsx       # Card component for displaying individual comics
│   ├── ComicDetailModal.tsx # Modal for displaying comic details with Framer Motion animations
│   ├── ComicFilter.tsx     # Component for filtering comics by format
│   ├── ComicList.tsx       # Main component for displaying the list of comics
│   ├── SkeletonCard.tsx    # Loading skeleton component with animations
│   └── Header.tsx          # Header component with logo and filters
├── types/
│   └── types.ts            # TypeScript type definitions for API responses
├── utils/
│   ├── price.ts            # Utility functions for price formatting
│   └── storage.ts          # Utility functions for LocalStorage operations
├── App.tsx                 # Main application component
└── index.tsx               # Application entry point
```

## Components

### ComicCard
Displays a single comic with:
- Lazy loaded thumbnail image
- Title
- Price
- "More info" button to open the detail modal
- Responsive design for different screen sizes

### SkeletonCard
Loading placeholder component that:
- Matches the layout of ComicCard
- Uses Framer Motion for smooth animations
- Implements a pulsing animation effect
- Shows placeholders for image, title, price, and button
- Provides visual feedback during loading states

### ComicDetailModal
Shows detailed information about a comic:
- Large thumbnail
- Title
- Release date (formatted in Slovenian locale)
- Format
- Page count
- Characters list
- Creators list with roles
- Diamond code (if available)
- Price
- Close button with hover effect
- ESC key support for closing
- Smooth animations using Framer Motion for opening/closing and transitions

### ComicFilter
Allows filtering comics by format:
- All
- Comic
- Magazine
- Digital Comic
- Persists selected filter in LocalStorage for returning users
- Automatically restores last used filter on page load

### ComicList
Main component that:
- Fetches comics from the Marvel API using TanStack Query
- Implements infinite scrolling with automatic data fetching
- Handles loading states and error messages
- Renders the grid of comic cards
- Deduplicates comics to prevent duplicates
- Optimizes performance with memoization
- Implements lazy loading for images
- Shows loading skeletons during data fetching:
  - 20 skeleton cards when fetching more comics
  - Smooth transitions between loading and loaded states

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
- API errors display user-friendly error messages
- Loading states are shown during data fetching
- Automatic retry mechanism for failed requests
- Deduplication of comic entries to prevent duplicates
- Invalid dates are handled gracefully with 'Unknown' fallback
- Network errors are handled with appropriate user feedback

## Future Improvements

- Add search functionality
- Implement sorting options
- Add favorites/bookmarks
- Add unit tests
- Add offline support with TanStack Query's persistence
- Add dark mode support
- Add analytics tracking

