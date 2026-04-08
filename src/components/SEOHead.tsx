import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const SEOHead = ({ 
  title = "Kaleemiya Perfumes | The Essence of Purity", 
  description = "Discover our exclusive sanctuary of premium attars, luxurious oud, and elegantly crafted fragrances for the discerning soul.", 
  image = "/logo.png",
  url = "https://kaleemiya.com"
}: SEOProps) => {
  useEffect(() => {
    // 1. Update standard document title
    document.title = title;
    
    // 2. Define the exact meta tags Google and Social Media look for
    const metaTags = {
      "description": description,
      "og:title": title,
      "og:description": description,
      "og:image": image,
      "og:url": url,
      "og:type": "website",
      "twitter:card": "summary_large_image",
      "twitter:title": title,
      "twitter:description": description,
      "twitter:image": image,
    };

    // 3. Inject or update tags dynamically based on the current page
    Object.entries(metaTags).forEach(([name, content]) => {
      // Find existing tag
      let element = document.querySelector(`meta[name="${name}"]`) || 
                    document.querySelector(`meta[property="${name}"]`);
      
      // If it doesn't exist, create it to ensure perfect SEO indexing
      if (!element) {
        element = document.createElement('meta');
        if (name.startsWith('og:')) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      
      // Assign the content
      element.setAttribute('content', content);
    });
  }, [title, description, image, url]);

  // This component doesn't render anything visual, just injects code into the <head>
  return null;
};

export default SEOHead;
