# Marvel Comics Web App Submission

## Implementation

This implementation follows all the requirements specified in the challenge:

- Displays a grid of Marvel comics fetched from the Marvel API
- Implements filtering functionality via a header menu based on format (Comic, Magazine, Digital Comic)
- Persists filter selection in LocalStorage for better user experience
- Shows a detailed modal with comic information when "More info" is clicked
- Features infinite scrolling for pagination with automatic data fetching
- Uses TypeScript for type safety and better developer experience
- Has a responsive grid layout that works on different screen sizes
- Implements proper error handling for failed image loads and API errors
- Uses environment variables for API key management
- Implements utility functions for common operations (price formatting)
- Uses TanStack Query for efficient data fetching and caching
- Implements keyboard navigation (ESC to close modal)
- Features smooth animations using Framer Motion
- Implements lazy loading for images
- Shows loading skeletons for better UX during data fetching
- Implements comprehensive accessibility features for all users

## Extra Credits Implemented

- TypeScript: Comprehensive type definitions for API responses and components
- Responsive Grid: Adaptive grid layout with proper spacing and alignment
- Infinite Scrolling: Smooth loading with automatic data fetching and deduplication
- Error Handling: Comprehensive error handling for images, API calls, and network issues
- Price Formatting: Centralized utility with proper currency formatting and edge cases
- Environment Variables: Secure API key management with example file
- Modern State Management: Using TanStack Query for efficient data fetching and caching
- User Preferences: Persistence of filter selection in LocalStorage
- Animations: Smooth transitions and animations using Framer Motion
- Accessibility: 
  - Semantic HTML structure with proper ARIA roles and labels
  - Keyboard navigation support
  - Screen reader compatibility
  - Proper modal dialog implementation
  - Accessible mobile menu
  - Descriptive image alt text
  - Error handling with proper ARIA attributes
  - Responsive design with accessibility in mind
- Performance Optimization: 
  - Memoization and efficient data fetching
  - Lazy loading for images
  - Optimized animations with hardware acceleration
  - Loading skeletons for better UX
- Responsive Design: Works seamlessly across different screen sizes
- Clean Code Architecture: Well-organized component structure and separation of concerns

## Technical Details

### Data Management
- Uses TanStack Query for efficient data fetching and caching
- Implements automatic background revalidation
- Configurable stale time and garbage collection
- Deduplication of comic entries
- Optimized loading states

### UI/UX Features
- Responsive grid layout with proper spacing
- Smooth animations using Framer Motion
- Loading states and error messages
- Keyboard navigation support
- Hover effects for interactive elements
- Lazy loaded images
- Loading skeletons with smooth animations
- Comprehensive accessibility features

### Error Handling
- Graceful handling of failed image loads with placeholder images
- User-friendly error messages for API failures
- Network error handling with appropriate feedback
- Invalid date handling with fallback values
- Automatic retry mechanism for failed requests
- Accessible error messages with proper ARIA attributes

### Performance Optimizations
- Lazy loading for all images
- Optimized animations with Framer Motion
- Efficient data fetching with TanStack Query
- Memoization of components and callbacks
- Progressive loading for better user experience
- Loading skeletons for smooth transitions

### Accessibility Implementation
- Semantic HTML structure with proper roles and labels
- ARIA attributes for interactive elements
- Keyboard navigation support
- Screen reader compatibility
- Accessible modal dialog
- Mobile menu accessibility
- Proper image descriptions
- Error handling with accessibility in mind
- Responsive design with accessibility considerations

## Issues Faced and Solutions

1. Price Formatting
   - Issue: Handling various price formats and edge cases in the Marvel API response
   - Solution: Created a robust price formatting utility with proper edge case handling

2. Modal Animations
   - Issue: Implementing smooth and performant animations for the modal
   - Solution: Used Framer Motion 

3. Image Loading
   - Issue: Optimizing image loading performance
   - Solution: Implemented lazy loading with placeholder images and proper fallbacks

4. Loading States
   - Issue: Providing smooth transitions during data fetching
   - Solution: Implemented loading skeletons with Framer Motion animations
   - Created reusable SkeletonCard component
   - Optimized performance with hardware acceleration
   - Maintained consistent layout during loading

## Requirements Not Implemented

- No requirements were left unimplemented

## Notes

- The application uses environment variables for the Marvel API key
- The UI follows modern design principles with smooth animations using Framer Motion
- The codebase follows React and TypeScript best practices
- Comprehensive documentation is provided in the README
- The application is built with scalability and maintainability in mind
- All components are properly typed and documented
- The application includes proper error boundaries and loading states
- The code is organized in a clean, modular structure
- Performance optimizations include lazy loading and efficient animations
- Loading skeletons provide a smooth user experience during data fetching

## API Integration

The app uses the Marvel Comics API with environment-specific authentication:

### Development Environment
- Uses simplified authentication with just the public key
- Faster development and testing workflow
- No private key required for local development

### Production Environment
- Implements full Marvel API authentication
- Requires both public and private keys
- Generates secure hash using timestamp and private key
- Includes all required parameters (apikey, ts, hash)

### Configuration
- Public key should be stored in the `.env` file as `REACT_APP_MARVEL_PUBLIC_KEY`
- Private key should be stored in the `.env` file as `REACT_APP_MARVEL_PRIVATE_KEY`
- Both keys can be obtained from the Marvel Developer Portal (https://developer.marvel.com/)

### Error Handling
- Clear error messages for missing private key in production
- Graceful fallback to public key authentication in development
- User-friendly error notifications for API failures
- Automatic retry mechanism for failed requests

### Authentication Process
1. The app generates a timestamp for each request
2. Creates a hash using the timestamp, private key, and public key
3. Includes all three parameters (apikey, ts, hash) in the API request
4. TanStack Query manages the API requests with automatic caching and revalidation

### Potential Issues
- 401 (Unauthorized) errors may occur if:
  - Either API key is missing or incorrect
  - The Marvel Developer Portal is down
  - API keys are expired
  - Environment variables are not properly configured in production
- The app includes error handling for authentication failures
- Users are notified when API requests fail 