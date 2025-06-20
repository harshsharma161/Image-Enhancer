import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, ImagePlus, Wand2, Award, Sparkles } from 'lucide-react';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import FeatureCard from '../components/FeatureCard';
import Button from '../components/Button';

const LandingPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Sample before/after images
  const demoImages = [
    {
      before: 'https://images.pexels.com/photos/2662792/pexels-photo-2662792.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      after: 'https://images.pexels.com/photos/2662792/pexels-photo-2662792.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1&sat=1.25&sharp=15&con=1.15',
      title: 'Portrait Enhancement'
    },
    {
      before: 'https://images.pexels.com/photos/1144687/pexels-photo-1144687.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      after: 'https://images.pexels.com/photos/1144687/pexels-photo-1144687.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1&sat=1.2&sharp=20&con=1.2',
      title: 'Landscape Improvement'
    },
    {
      before: 'https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      after: 'https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1&sat=1.15&sharp=25&con=1.2',
      title: 'Product Photography'
    }
  ];

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-36 md:pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-10 md:mb-0 md:pr-10"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h1 
                className="heading-xl mb-6 text-primary-900"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Transform Your Images with AI
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl text-slate-700 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Experience the power of AI to enhance your photos instantly. Make blurry, low-quality images sharp, clear, and professionally refined with one click.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link to="/upload">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    icon={<ArrowRight />}
                    iconPosition="right"
                  >
                    Get Started
                  </Button>
                </Link>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => document.getElementById('examples')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View Examples
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <BeforeAfterSlider 
                beforeImage="https://images.pexels.com/photos/935835/pexels-photo-935835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                afterImage="https://images.pexels.com/photos/935835/pexels-photo-935835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1&sat=1.3&sharp=25&con=1.25"
                aspectRatio="aspect-[4/3]"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-radial from-slate-50 to-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="heading-lg mb-4 text-primary-900">
              Advanced AI Features
            </h2>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto">
              Our cutting-edge AI technology brings professional-grade image enhancement to everyone, no technical skills required.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Wand2 size={24} />}
              title="Smart Enhancement"
              description="Our AI automatically detects faces, objects, and scenes to apply optimal enhancements."
              delay={0.1}
            />
            
            <FeatureCard
              icon={<Zap size={24} />}
              title="Instant Processing"
              description="Transform your images in seconds with our high-performance cloud infrastructure."
              delay={0.2}
            />
            
            <FeatureCard
              icon={<Sparkles size={24} />}
              title="Noise Reduction"
              description="Remove grain and noise while preserving important details and textures."
              delay={0.3}
            />
            
            <FeatureCard
              icon={<Award size={24} />}
              title="Professional Results"
              description="Get photo studio quality results from any image with just one click."
              delay={0.4}
            />
          </div>
        </div>
      </section>
      
      {/* Examples Section */}
      <section id="examples" className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="heading-lg mb-4 text-primary-900">
              See the Difference
            </h2>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto">
              Explore our before and after examples to see how our AI can transform your images.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {demoImages.map((demo, index) => (
              <motion.div 
                key={index}
                className="glass-card p-6"
                variants={itemVariants}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-primary-800">{demo.title}</h3>
                <BeforeAfterSlider 
                  beforeImage={demo.before}
                  afterImage={demo.after}
                  aspectRatio="aspect-[4/3]"
                  className="rounded-xl"
                />
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link to="/upload">
              <Button 
                variant="primary" 
                size="lg" 
                icon={<ImagePlus className="mr-2" />}
                iconPosition="left"
              >
                Enhance Your Image Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-primary-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="heading-lg mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-primary-100 max-w-3xl mx-auto">
              Thousands of photographers and creators use EnhanceAI to improve their images.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "I was amazed at how it restored detail in my old family photos. The results are incredible!",
                author: "Sarah J.",
                role: "Photographer"
              },
              {
                quote: "This tool has saved me countless hours of editing. One click and my product photos look professional.",
                author: "Mark T.",
                role: "E-commerce Owner"
              },
              {
                quote: "The AI enhancement is like magic. It brings life back to my travel photos taken in poor lighting.",
                author: "Priya K.",
                role: "Travel Blogger"
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-primary-800 p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <p className="text-lg mb-6 text-primary-100 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-primary-300">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="glass-card p-10 md:p-16 text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="heading-lg mb-6 text-primary-900">
              Ready to Transform Your Images?
            </h2>
            <p className="text-lg text-slate-700 mb-8 max-w-2xl mx-auto">
              Join thousands of creators who trust our AI to enhance their photos. Get started for free today.
            </p>
            <Link to="/upload">
              <Button 
                variant="accent" 
                size="lg" 
                icon={<ArrowRight />}
                iconPosition="right"
              >
                Start Enhancing Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;