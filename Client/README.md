# DevLink - Developer Directory Platform

A modern, responsive platform for connecting with talented developers from around the world. Built with React.js and TailwindCSS.

## Features

### 🏠 Home Page
- **Developer Cards**: Display name, primary skill, profile photo, and location
- **Advanced Search**: Filter developers by name, skill, or location
- **Responsive Grid**: Adapts to mobile, tablet, and desktop screens
- **Loading States**: Smooth loading animations
- **Empty States**: Helpful messages when no results are found

### 👤 Developer Detail Page
- **Comprehensive Profile**: Full bio, skills, contact information, and location
- **Contact Information**: Email, GitHub, LinkedIn, and personal website links
- **Skills Display**: All skills shown as interactive tags
- **Quick Info Sidebar**: Availability, experience, and key details
- **Responsive Layout**: Optimized for all screen sizes

### ➕ Add Developer Form
- **Multi-tag Skills Input**: Add/remove skills with interactive tags
- **Form Validation**: Real-time validation with error messages
- **Comprehensive Fields**: Name, photo URL, skills, location, bio, contact info
- **Responsive Design**: Works perfectly on mobile and desktop
- **Loading States**: Visual feedback during form submission

### 🎨 Design Features
- **Modern UI**: Clean, professional design with TailwindCSS
- **Responsive Design**: Mobile-first approach with breakpoints
- **Smooth Animations**: Hover effects and transitions
- **Accessibility**: Proper focus states and semantic HTML
- **Loading States**: Spinners and skeleton screens

## Tech Stack

- **Frontend**: React.js 18
- **Routing**: React Router DOM v6
- **Styling**: TailwindCSS
- **Build Tool**: Create React App
- **Icons**: Heroicons (SVG)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd DEVLink/Client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## Project Structure

```
Client/
├── public/
│   └── index.html
├── src/
│   ├── pages/
│   │   ├── Home.js          # Home page with developer list and search
│   │   ├── DeveloperDetail.js # Individual developer profile page
│   │   └── AddDeveloper.js   # Form to add new developers
│   ├── app.js               # Main App component with routing
│   ├── index.js             # Application entry point
│   └── index.css            # Global styles and TailwindCSS imports
├── package.json
├── tailwind.config.js       # TailwindCSS configuration
└── postcss.config.js        # PostCSS configuration
```

## Features in Detail

### Search Functionality
- Real-time search across developer names, skills, and locations
- Case-insensitive matching
- Instant filtering without page reload

### Developer Cards
- Profile photos with fallback handling
- Primary skill highlighting
- Skill tags with overflow handling
- Hover effects and smooth transitions

### Form Validation
- Required field validation
- Email format validation
- URL format validation for photo and website
- Real-time error display
- Form submission prevention on errors

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Flexible grid layouts
- Touch-friendly interface

## Mock Data

The application currently uses mock data for demonstration purposes. In a production environment, you would:

1. Replace mock data with API calls
2. Implement proper error handling
3. Add authentication and authorization
4. Set up a backend API
5. Add database integration

## Customization

### Colors
The primary color scheme uses blue tones. You can customize colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      blue: {
        // Custom blue shades
      }
    }
  }
}
```

### Styling
All styling is done with TailwindCSS utility classes. You can add custom styles in `src/index.css`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support or questions, please open an issue in the repository. 