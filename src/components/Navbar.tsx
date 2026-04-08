"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

const publicLinks = [
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Process", href: "#process" },
  { name: "Pricing", href: "#pricing" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

const protectedLinks = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Workflow Suite Apps", href: "/suite" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();

  const navLinks = isAuthenticated
    ? [...protectedLinks, ...publicLinks]
    : publicLinks;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-navy" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold tracking-tight text-foreground">
                  Leadership Legacy
                </span>
                <span className="text-xs text-muted-foreground -mt-0.5">
                  Digital Solutions
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  {link.name}
                  <span className="absolute bottom-1 left-4 right-4 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </Link>
              ))}
            </div>

            {/* CTA / Auth Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  <span className="text-xs text-muted-foreground">
                    {user?.firstName || user?.email}
                  </span>
                  <button
                    onClick={() => logout()}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium bg-gold text-navy rounded-full hover:bg-gold-light transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Link>
              )}
              <Link
                href="#contact"
                className="px-6 py-2.5 text-sm font-medium bg-gold text-navy rounded-full hover:bg-gold-light transition-colors"
              >
                Book Discovery Call
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-navy/95 backdrop-blur-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="relative pt-24 px-6 pb-8 flex flex-col gap-2"
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-3 text-2xl font-medium text-foreground hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Auth */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="mt-4 flex flex-col gap-3"
              >
                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full py-4 text-center text-lg font-medium border border-white/20 text-foreground rounded-full hover:bg-white/5 transition-colors"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full py-4 text-center text-lg font-medium border border-gold/50 text-gold rounded-full hover:bg-gold/10 transition-colors"
                  >
                    Sign In
                  </Link>
                )}
                <Link
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full py-4 text-center text-lg font-medium bg-gold text-navy rounded-full hover:bg-gold-light transition-colors"
                >
                  Book Discovery Call
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
