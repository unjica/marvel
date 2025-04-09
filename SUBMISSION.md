# Marvel Comics Web App Submission

## Implementation

This implementation follows all the requirements specified in the challenge:

- Displays a grid of Marvel comics fetched from the Marvel API
- Implements filtering functionality via a header menu based on format
- Shows a detailed modal with comic information when "More info" is clicked
- Features infinite scrolling for pagination
- Uses TypeScript for type safety
- Has a responsive grid layout that works on different screen sizes
- Implements proper error handling for failed image loads
- Uses environment variables for API key management
- Follows BEM methodology for CSS class naming
- Implements utility functions for common operations (price formatting)

## Extra Credits Implemented

- TypeScript: Implemented throughout the application for better type safety
- Responsive Grid: The grid layout adjusts based on screen size
- Infinite Scrolling: Smooth loading of additional comics
- Error Handling: Graceful handling of failed image loads and API errors
- Price Formatting: Centralized utility for consistent price display
- BEM CSS: Clean and maintainable CSS class naming
- Environment Variables: Secure API key management

## Issues Faced

- Working with Marvel API authentication required careful handling of API keys
- Ensuring consistent card heights with varying image and content sizes required CSS adjustments
- Implementing infinite scrolling while maintaining smooth performance
- Handling various price formats and edge cases in the Marvel API response

## Requirements Not Implemented

- No requirements were left unimplemented

## Notes

- The application uses environment variables for the Marvel API key
- Google Fonts (Quicksand, Roboto) were used for typography
- The UI follows the design specifications provided in the requirements
- The codebase follows modern React and TypeScript best practices
- The application is well-documented with a comprehensive README 