import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Download, AlertCircle } from 'lucide-react';
import ImageUploader from '../components/ImageUploader';
import ImageDisplay from '../components/ImageDisplay';
import Button from '../components/Button';
import { enhanceImage, downloadImage, getQualityMetrics } from '../utils/imageProcessing';

const UploadPage = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<{ sharpness: number; noise: number; colorEnhance: number } | null>(null);

  const handleImageSelected = (file: File, preview: string) => {
    setOriginalImage(preview);
    setUploadedFile(file);
    setEnhancedImage(null);
    setError(null);
    setMetrics(null);
  };

  const handleProcessImage = async () => {
    if (!uploadedFile) {
      setError('Please upload an image first');
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);
      
      // Process the image
      const enhanced = await enhanceImage(uploadedFile);
      setEnhancedImage(enhanced);
      
      // Get simulated metrics
      setMetrics(getQualityMetrics());
    } catch (err) {
      console.error('Error processing image:', err);
      setError('An error occurred while processing your image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (enhancedImage) {
      downloadImage(enhancedImage, `enhanced-${uploadedFile?.name || 'image.jpg'}`);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 pt-32 pb-20">
      <motion.div 
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <motion.h1 
            className="heading-lg text-primary-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Enhance Your Image
          </motion.h1>
          <motion.p 
            className="text-lg text-slate-700 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Upload your image and our AI will enhance it in seconds, improving clarity, sharpness, and overall quality.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-card p-6">
            <h2 className="heading-sm mb-4 text-primary-800">Upload Your Image</h2>
            <ImageUploader onImageSelected={handleImageSelected} />
            
            {originalImage && !enhancedImage && !isProcessing && (
              <motion.div 
                className="mt-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Button 
                  variant="accent" 
                  icon={<Sparkles />} 
                  iconPosition="left" 
                  onClick={handleProcessImage}
                  fullWidth
                >
                  Enhance Image
                </Button>
              </motion.div>
            )}
            
            {error && (
              <motion.div 
                className="mt-4 bg-error-50 text-error-700 p-4 rounded-lg flex items-start"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <p>{error}</p>
              </motion.div>
            )}
          </div>
          
          <div className="glass-card p-6">
            <h2 className="heading-sm mb-4 text-primary-800">Preview</h2>
            
            <AnimatePresence mode="wait">
              {!originalImage && (
                <motion.div 
                  key="placeholder"
                  className="aspect-[4/3] bg-slate-100 rounded-xl flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <p className="text-slate-500">Upload an image to see preview</p>
                </motion.div>
              )}
              
              {originalImage && !enhancedImage && !isProcessing && (
                <motion.div 
                  key="original"
                  className="aspect-[4/3] rounded-xl overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <img 
                    src={originalImage} 
                    alt="Original image" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              )}
              
              {isProcessing && (
                <motion.div 
                  key="processing"
                  className="aspect-[4/3] bg-slate-100 rounded-xl flex flex-col items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="mb-4">
                    <div className="h-12 w-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <p className="text-primary-700 font-medium">Enhancing your image...</p>
                  <p className="text-slate-500 text-sm mt-2">This may take a few seconds</p>
                </motion.div>
              )}
              
              {originalImage && enhancedImage && !isProcessing && (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ImageDisplay 
                    originalImage={originalImage}
                    enhancedImage={enhancedImage}
                    isProcessing={isProcessing}
                    onDownload={handleDownload}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            
            {metrics && (
              <motion.div 
                className="mt-6 p-4 bg-primary-50 rounded-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="font-medium text-primary-800 mb-2">Enhancement Metrics</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-slate-600">Sharpness</p>
                    <div className="mt-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary-500 rounded-full" 
                        style={{ width: `${metrics.sharpness}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-right mt-1 text-slate-600">{metrics.sharpness}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Noise Reduction</p>
                    <div className="mt-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-success-500 rounded-full" 
                        style={{ width: `${100 - metrics.noise}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-right mt-1 text-slate-600">{100 - metrics.noise}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Color Enhancement</p>
                    <div className="mt-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-accent-500 rounded-full" 
                        style={{ width: `${metrics.colorEnhance}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-right mt-1 text-slate-600">{metrics.colorEnhance}%</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UploadPage;