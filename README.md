# Fusion RCM Dashboard

A comprehensive AI-powered Revenue Cycle Management (RCM) platform built with React, TypeScript, and Tailwind CSS. This enterprise-grade dashboard provides advanced analytics, denial management, credentialing services, and AI-driven insights for healthcare revenue cycle operations.

## 🚀 Features

### Core Modules
- **AR & Denial Management** - Advanced accounts receivable tracking and denial workflow automation
- **Enterprise Reporting** - Comprehensive reporting for 650+ RCM agency customers processing 300K+ claims monthly
- **Customer Reporting** - Individual customer performance analytics and communication tools
- **835s/CART Code Management** - 835 file processing and CART code population for denial reporting
- **Credentialing CRM** - Complete provider credentialing workflow management
- **AI Compliance & LMN Automation** - AI-driven chart note analysis and LCD compliance checking
- **Communication Tools** - Internal communication system to replace Salesforce ticketing
- **Data Integration** - Connect disparate databases (flat files, OCR, API, ODBC, legacy systems)
- **Access Controls** - User & role-based access controls with granular permissions
- **Analytics Dashboard** - Real-time analytics and utilization insights
- **Chronic Care Management (CCM)** - CCM service tracking and management
- **Cash Pay Solutions** - Cash payment processing and tracking
- **Factoring Services** - Invoice factoring and financial management
- **IT MSP Support** - IT managed service provider support tools

### Technical Features
- **Responsive Design** - Mobile-first responsive interface
- **Interactive Charts** - Real-time data visualization with Recharts
- **Modal Interfaces** - Professional form interfaces for data entry
- **Search & Filtering** - Advanced search and filtering capabilities
- **Export Functionality** - Multi-format export (PDF, Excel, CSV, JSON)
- **Real-time Updates** - Live data updates and notifications
- **HIPAA Compliant** - Security measures for healthcare data
- **White-label Ready** - Customizable branding and theming

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build Tool**: Create React App
- **Package Manager**: npm

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/adamanderson166/rcm.git
   cd rcm
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
   Navigate to `http://localhost:3000` to view the application

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── Dashboard.tsx    # Main dashboard
│   ├── ARDashboard.tsx  # AR & Denial Management
│   ├── EnterpriseReporting.tsx
│   ├── CustomerReporting.tsx
│   ├── CartCodeManagement.tsx
│   ├── CredentialingCRM.tsx
│   ├── AICompliance.tsx
│   ├── CommunicationTools.tsx
│   ├── DataIntegration.tsx
│   ├── AccessControls.tsx
│   ├── AnalyticsDashboard.tsx
│   ├── CCM.tsx
│   ├── CashPay.tsx
│   ├── Factoring.tsx
│   ├── ITMSP.tsx
│   └── ...
├── App.tsx             # Main application component
├── index.tsx           # Application entry point
└── index.css           # Global styles
```

## 🎯 Key Features

### Enterprise Scalability
- Designed for 650+ RCM agency customers
- Processes 300,000+ claims monthly
- Scalable architecture for future growth

### AI-Powered Insights
- Chart note analysis
- LCD compliance checking
- Denial management automation
- Predictive analytics

### Data Integration
- Flat file processing
- OCR document scanning
- API integrations
- ODBC database connections
- Legacy system migration (Access, TrueBridge)

### Security & Compliance
- HIPAA compliance measures
- Role-based access controls
- Audit trails
- Data encryption

## 🚀 Deployment

### Development
```bash
npm start
```

### Production Build
```bash
npm run build
```

### Testing
```bash
npm test
```

## 📊 Demo Data

The application includes comprehensive mock data for:
- 650+ agency customers
- 300K+ monthly claims
- 12+ specialty types
- 50+ payer networks
- Real-time analytics

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
REACT_APP_API_URL=your_api_url
REACT_APP_ENVIRONMENT=development
```

### Customization
- Update `src/App.tsx` for navigation changes
- Modify `tailwind.config.js` for theme customization
- Edit component files for feature modifications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Review the documentation

## 🎉 Acknowledgments

- Built for Fusion RCM requirements
- Designed for enterprise healthcare operations
- Optimized for AI-powered RCM workflows
- Created with modern React best practices

---

**Fusion RCM Dashboard** - Revolutionizing Revenue Cycle Management with AI-powered insights and enterprise-grade functionality. 