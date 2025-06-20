import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Share2 } from 'lucide-react';
import Button from './Button';
import BeforeAfterSlider from './BeforeAfterSlider';

interface ImageDisplayProps {
  originalImage: string;
  enhancedImage: string;
  isProcessing: boolean;
  onDownload: () => void;
}

const ImageDisplay = ({
  originalImage,
  enhancedImage,
  isProcessing,
  onDownload,
}: ImageDisplayProps) => {
  const [activeTab, setActiveTab] = useState<'comparison' | 'enhanced'>('comparison');
  const [animationComplete, setAnimationComplete] = useState(false);

  // Auto-switch to the comparison view when processing completes
  useEffect(() => {
    if (!isProcessing && enhancedImage) {
      setActiveTab('comparison');
      
      // Set a timeout to mark animation as complete after enhancement is done
      const timeout = setTimeout(() => {
        setAnimationComplete(true);
      }, 1000);
      
      return () => clearTimeout(timeout);
    }
  }, [isProcessing, enhancedImage]);

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-4 border-b border-slate-100">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('comparison')}
            className={`px-4 py-2 font-medium rounded-lg transition-colors ${
              activeTab === 'comparison'
                ? 'bg-primary-50 text-primary-600'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Comparison
          </button>
          <button
            onClick={() => setActiveTab('enhanced')}
            className={`px-4 py-2 font-medium rounded-lg transition-colors ${
              activeTab === 'enhanced'
                ? 'bg-primary-50 text-primary-600'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Enhanced Only
          </button>
        </div>
      </div>
      
      <div className="p-6">
        {activeTab === 'comparison' ? (
          <BeforeAfterSlider
            beforeImage={originalImage}
            afterImage={enhancedImage}
            aspectRatio="aspect-[4/3]"
            className="w-full"
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden"
          >
            <img
              src={enhancedImage}
              alt="Enhanced image"
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
        
        {animationComplete && (
          <motion.div 
            className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button 
              variant="primary" 
              fullWidth 
              icon={<Download />} 
              iconPosition="left"
              onClick={onDownload}
            >
              Download Enhanced Image
            </Button>
            
            <Button 
              variant="outline" 
              fullWidth 
              icon={<Share2 />} 
              iconPosition="left"
              onClick={() => alert('Share functionality would go here')}
            >
              Share
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ImageDisplay;