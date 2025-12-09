import { Github, Mail } from "lucide-react";
import unstreamLogo from "@/assets/unstream-logo.png";

const UnstreamFooter = () => {
  return (
    <footer className="py-12 bg-black border-t border-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img 
              src={unstreamLogo} 
              alt="unstream.fm" 
              className="w-12 h-12 object-contain"
            />
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a 
              href="#" 
              className="text-gray-500 hover:text-[#00FF77] transition-colors flex items-center gap-2"
            >
              <Github size={18} />
              <span className="text-sm">GitHub</span>
            </a>
            <a 
              href="#" 
              className="text-gray-500 hover:text-[#00FF77] transition-colors flex items-center gap-2"
            >
              <Mail size={18} />
              <span className="text-sm">Contact</span>
            </a>
          </div>

          {/* Copyright */}
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} unstream.fm. All rights reserved.
          </p>
        </div>

        {/* Tagline */}
        <p className="text-center text-gray-700 text-xs mt-8 font-mono">
          Local-first. Offline-first. Privacy-first.
        </p>
      </div>
    </footer>
  );
};

export default UnstreamFooter;
