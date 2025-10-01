
import React from 'react';
import { SentinelLogo, GithubIcon, TwitterIcon, DiscordIcon } from '../icons/Icons';
import { NavLink } from 'react-router-dom';

const Footer: React.FC = () => {
  const socials = [
    { icon: <TwitterIcon className="h-5 w-5" />, href: "#" },
    { icon: <GithubIcon className="h-5 w-5" />, href: "#" },
    { icon: <DiscordIcon className="h-5 w-5" />, href: "#" },
  ];

  return (
    <footer className="border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <SentinelLogo className="h-6 w-6" />
            <span className="font-semibold">Sentinel Protocol</span>
          </div>
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Sentinel Protocol. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socials.map((social, index) => (
              <a key={index} href={social.href} className="text-gray-400 hover:text-white transition-colors">
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
