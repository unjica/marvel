# Marvel Comics App

A React application that displays Marvel comics using the Marvel API.

## Features

- Display a list of Marvel comics
- Infinite scrolling for loading more comics
- Filter comics by format (Comic, Magazine, Digital Comic)
- View comic details in a modal
- Responsive design with Tailwind CSS
- Error handling for failed image loads
- Price formatting utility
- Efficient data fetching and caching with TanStack Query
- Automatic data revalidation and background updates

## Project Structure

```
src/
├── components/
│   ├── ComicCard.tsx       # Card component for displaying individual comics
│   ├── ComicDetailModal.tsx # Modal for displaying comic details
│   ├── ComicFilter.tsx     # Component for filtering comics by format
│   ├── ComicList.tsx       # Main component for displaying the list of comics
│   └── Header.tsx          # Header component with logo and filters
├── types/
│   └── types.ts            # TypeScript type definitions
├── utils/
│   └── price.ts            # Utility functions for price formatting
└── App.tsx                 # Main application component
```

## Components

### ComicCard
Displays a single comic with:
- Thumbnail image
- Title
- Price
- "More info" button to open the detail modal

### ComicDetailModal
Shows detailed information about a comic:
- Large thumbnail
- Title
- Release date
- Format
- Page count
- Characters
- Creators
- Diamond code
- Price
- Close button

### ComicFilter
Allows filtering comics by format:
- All
- Comic
- Magazine
- Digital Comic

### ComicList
Main component that:
- Fetches comics from the Marvel API using TanStack Query
- Implements infinite scrolling with automatic data fetching
- Handles loading states and error messages
- Renders the grid of comic cards
- Deduplicates comics to prevent duplicates
- Optimizes performance with memoization

## Styling

### Tailwind CSS
The application uses Tailwind CSS for styling with the following configuration:
- Base font size: 17px
- Small screens (sm, 640px+): 15px
- Large screens (lg, 1024px+): 19px
- Custom Marvel colors:
  - Red: #ED1D24

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
3. Create a `.env` file in the root directory with your Marvel API public key:
   ```
   REACT_APP_MARVEL_PUBLIC_KEY=your_public_key_here
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## Technologies Used

- React
- TypeScript
- Marvel API
- Tailwind CSS
- Axios for API requests
- TanStack Query for data fetching and caching

## API Integration

The app uses the Marvel Comics API to fetch comic data. The API key should be stored in the `.env` file as `REACT_APP_MARVEL_PUBLIC_KEY`. TanStack Query manages the API requests with automatic caching and revalidation.

## Error Handling

- Failed image loads show a placeholder image
- API errors display user-friendly error messages
- Loading states are shown during data fetching
- Automatic retry mechanism for failed requests
- Deduplication of comic entries to prevent duplicates
- Invalid dates are handled gracefully with 'Unknown' fallback

## Future Improvements

- Add search functionality
- Implement sorting options
- Add favorites/bookmarks
- Improve accessibility
- Add unit tests
- Implement optimistic updates for better UX
- Add offline support with TanStack Query's persistence

