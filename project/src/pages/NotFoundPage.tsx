import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, AlertTriangle } from 'lucide-react';
import Button from '../components/Button';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div 
        className="text-center max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-error-50 text-error-500 rounded-full mb-6"
        >
          <AlertTriangle size={32} />
        </motion.div>
        
        <h1 className="heading-lg text-primary-900 mb-4">Page Not Found</h1>
        <p className="text-lg text-slate-700 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <Link to="/">
          <Button 
            variant="primary" 
            icon={<Home />} 
            iconPosition="left"
          >
            Return Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;