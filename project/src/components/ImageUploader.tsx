import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, ImagePlus, AlertCircle } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelected: (file: File, preview: string) => void;
  maxSizeMB?: number;
}

const ImageUploader = ({ 
  onImageSelected, 
  maxSizeMB = 5 
}: ImageUploaderProps) => {
  const [error, setError] = useState<string | null>(null);
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    
    if (acceptedFiles.length === 0) {
      return;
    }
    
    const file = acceptedFiles[0];
    
    // Check file size
    if (file.size > maxSizeBytes) {
      setError(`File too large. Maximum size is ${maxSizeMB}MB.`);
      return;
    }
    
    // Create a preview URL
    const previewUrl = URL.createObjectURL(file);
    
    onImageSelected(file, previewUrl);
  }, [onImageSelected, maxSizeBytes, maxSizeMB]);
  
  const { 
    getRootProps, 
    getInputProps, 
    isDragActive,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1
  });
  
  // Determine border color based on state
  let borderColor = 'border-slate-300';
  if (isDragAccept) {
    borderColor = 'border-success-500';
  } else if (isDragReject) {
    borderColor = 'border-error-500';
  } else if (isFocused || isDragActive) {
    borderColor = 'border-primary-500';
  }

  return (
    <div className="w-full">
      <motion.div
        {...getRootProps()}
        className={`dropzone ${borderColor} ${
          isDragActive ? 'active bg-primary-50' : ''
        } rounded-xl p-8 cursor-pointer transition-all text-center`}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center justify-center space-y-4">
          {isDragActive ? (
            <>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Upload className="w-12 h-12 text-primary-500" />
              </motion.div>
              <p className="text-lg font-medium text-primary-600">Drop the image here</p>
            </>
          ) : (
            <>
              <ImagePlus className="w-12 h-12 text-slate-400" />
              <div>
                <p className="text-lg font-medium text-slate-700">
                  Drag & drop an image here, or click to select
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  Supports: JPG, PNG, WebP (max {maxSizeMB}MB)
                </p>
              </div>
            </>
          )}
        </div>
      </motion.div>
      
      {error && (
        <motion.div 
          className="mt-3 flex items-center text-error-700 bg-error-50 p-3 rounded-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </motion.div>
      )}
    </div>
  );
};

export default ImageUploader;