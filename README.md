# Budget & Resource Management System - Frontend

Professional React 18 frontend for government budget and resource allocation management.

## Features

- **Dashboard**: Overview of budget allocations and resources
- **Create Budget**: Allocate budget to programs
- **Allocate Resources**: Manage resource allocations
- **Budget Summary**: Detailed analysis of program budgets
- **Professional UI**: Government-grade design with animations
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Validation**: Form validation with error handling
- **Toast Notifications**: User feedback for all operations

## Tech Stack

- **React 18.3.1**: Modern React with hooks
- **Vite 5.0.8**: Lightning-fast build tool
- **Bootstrap 5.3**: Professional CSS framework
- **Framer Motion 10.16.16**: Smooth animations
- **Axios 1.6.2**: HTTP client
- **React Router v6**: Client-side routing
- **React Toastify**: Toast notifications

## Setup Instructions

### Prerequisites

- Node.js 16+ and npm
- Backend service running on `http://localhost:8085`

### Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Configure environment** (create `.env` file):
```
VITE_API_BASE_URL=http://localhost:8085/api
VITE_APP_NAME=Budget & Resource Management System
```

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Quick Start

1. **Navigate to frontend directory**:
```bash
cd budget-frontend
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start development server**:
```bash
npm run dev
```

4. **Open in browser**:
```
http://localhost:5173
```

## Project Structure

```
src/
├── components/
│   ├── common/          # Reusable UI components (Loader, Modal, EmptyState, Badge)
│   ├── forms/           # Form components (CreateBudgetForm, AllocateResourcesForm)
│   └── layout/          # Layout components (Header, Sidebar, Footer, Layout)
├── pages/               # Page components (Dashboard, CreateBudget, etc.)
├── services/            # API services (axiosInstance, budgetService, resourceService)
├── hooks/               # Custom React hooks (useAsync, useForm)
├── utils/               # Utility functions (helpers, formatters, validators)
├── styles/              # Global styles (CSS variables, themes)
├── App.jsx              # Root component with routing
└── main.jsx             # Entry point
```

## API Integration

The frontend integrates seamlessly with the Spring Boot backend:

### Backend Connection
- Base URL: `http://localhost:8085/api`
- Configurable via `.env` file
- Automatic error handling with toast notifications

### Budget Endpoints
- `POST /budget/createAllocation` - Create budget allocation
- `GET /budget/getAllAllocation` - Fetch all allocations
- `GET /budget/summary/{programId}` - Get budget summary
- `DELETE /budget/deleteAllocation/{allocationId}` - Delete allocation

### Resource Endpoints
- `POST /resources/createResource` - Create resource allocation
- `GET /resources/program/{programId}` - Fetch program resources
- `GET /resources/getAllallocated` - Fetch all resources
- `DELETE /resources/deleteResource/{resourceId}` - Delete resource

## Error Handling

Comprehensive error handling for all backend exception types:
- **VALIDATION_ERROR**: Field-level validation messages
- **BUSINESS_RULE_VIOLATION**: Business logic errors
- **Issue With The PROGRAM_ID**: Program not found
- **MALFORMED_JSON**: Invalid data format
- **UNEXPECTED_ERROR**: Server errors with logging
- **NO_RESPONSE**: Network connectivity issues

## Design Highlights

### Government-Grade UI
- Professional blue color scheme (#1e4d8b primary)
- Clean, minimalist design
- Proper spacing and typography
- Accessibility-first approach

### Animations
- Page transitions with Framer Motion
- Hover effects on interactive elements
- Loading animations with spinners
- Skeleton loaders for better UX

### Responsive Layout
- Mobile-first design
- Collapsible sidebar navigation
- Touch-friendly buttons
- Optimized for all screen sizes

### Professional Components
- Styled forms with validation
- Data tables with sorting
- Progress bars and charts
- Status badges and indicators

## Development

### Running Development Server
```bash
npm run dev
```

### Building for Production
```bash
npm run build
npm run preview
```

### Linting
```bash
npm run lint
```

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Performance

- Optimized bundle size
- Code splitting with React Router
- Lazy loading of components
- Efficient CSS with variables
- Minified production builds

## Version

**Current Version**: 1.0.0  
**React Version**: 18.3.1  
**Vite Version**: 5.0.8  
**Bootstrap Version**: 5.3.0

## Environment Configuration

Create `.env` file in project root:

```env
# Backend API URL
VITE_API_BASE_URL=http://localhost:8085/api

# Application Name
VITE_APP_NAME=Budget & Resource Management System
```

## Troubleshooting

### Issue: "Cannot GET /"
- Ensure backend is running on port 8085
- Check `VITE_API_BASE_URL` in `.env`

### Issue: "CORS Error"
- Verify backend has CORS enabled
- Check browser console for detailed error

### Issue: "Styles not loading"
- Clear browser cache (Ctrl+Shift+Delete)
- Run `npm install` again
- Restart dev server

### Issue: "Port 5173 already in use"
- Run on different port: `npm run dev -- --port 5174`
- Or kill existing process on port 5173

## Support

For issues or questions:
1. Check browser console for errors
2. Verify backend is running
3. Review `.env` configuration
4. Check network requests in DevTools

---

**Last Updated**: April 2026  
**Organization**: Ministry of Finance, Government of India

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
