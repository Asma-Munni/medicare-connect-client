import Link from "next/link";
import Image from "next/image";

import At from "@gravity-ui/icons/At";
import Bell from "@gravity-ui/icons/Bell";
import CardHeart from "@gravity-ui/icons/CardHeart";
import Car from "@gravity-ui/icons/Car";

const socialLinks = [
  { name: "Facebook", label: "F", href: "#" },
  { name: "Twitter / X", label: "X", href: "#" },
  { name: "LinkedIn", label: "in", href: "#" },
  { name: "Instagram", label: "IG", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & About */}
          <div>
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/images/logo.png"
                alt="MediCare Connect Logo"
                width={160}
                height={60}
                className="h-12 w-auto object-contain bg-white rounded-md p-1"
              />
            </Link>

            <p className="mt-4 text-sm leading-6 text-slate-400">
              MediCare Connect is a modern healthcare platform that helps
              patients find doctors, book appointments, make payments, and
              receive healthcare services easily.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 mt-5">
              {socialLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-label={item.name}
                  className="h-9 w-9 flex items-center justify-center rounded-full bg-slate-800 text-white text-sm font-semibold hover:bg-blue-600 transition"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-blue-400 transition">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/find-doctors"
                  className="hover:text-blue-400 transition"
                >
                  Find Doctors
                </Link>
              </li>

              <li>
                <Link
                  href="/about-us"
                  className="hover:text-blue-400 transition"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/contact-us"
                  className="hover:text-blue-400 transition"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-blue-400 transition"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact Information
            </h3>

            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Car width={18} height={18} className="text-blue-400 mt-1" />
                <span>25 Healthcare Avenue, Dhaka, Bangladesh</span>
              </li>

              <li className="flex items-center gap-3">
                <Bell width={18} height={18} className="text-blue-400" />
                <span>+880 1700-000000</span>
              </li>

              <li className="flex items-center gap-3">
                <At width={18} height={18} className="text-blue-400" />
                <span>support@medicareconnect.com</span>
              </li>
            </ul>
          </div>

          {/* Emergency Hotline */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Emergency Hotline
            </h3>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-red-500/10 flex items-center justify-center">
                  <CardHeart
                    width={24}
                    height={24}
                    className="text-red-500"
                  />
                </div>

                <div>
                  <p className="text-sm text-slate-400">24/7 Emergency</p>
                  <h4 className="text-2xl font-bold text-white">999</h4>
                </div>
              </div>

              <p className="mt-4 text-sm text-slate-400 leading-6">
                For urgent medical support, call the national emergency hotline
                immediately.
              </p>

              <Link
                href="/contact-us"
                className="inline-block mt-5 px-5 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
              >
                Get Support
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} MediCare Connect. All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-sm text-slate-500">
            <Link href="#" className="hover:text-blue-400 transition">
              Privacy Policy
            </Link>

            <Link href="#" className="hover:text-blue-400 transition">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}