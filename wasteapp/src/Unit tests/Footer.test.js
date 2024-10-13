// src/components/Footer.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../components/Footer.js';

describe('Footer Component', () => {
  test('renders the footer with all links', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    // Check for the presence of footer links
    const links = [
      'Home',
      'About',
      'Services',
      'Blog',
      'Contact Us',
      'Login',
      'Register',
      'Privacy Policy',
      'Terms of Service',
      'FAQ',
      'Support',
    ];

    links.forEach((linkText) => {
      const link = screen.getByText(linkText);
      expect(link).toBeInTheDocument();
    });

    // Check for brand name
    const brandName = screen.getByText(/GreenEn/i);
    expect(brandName).toBeInTheDocument();

    // Check for copyright notice
    const copyrightText = screen.getByText(/© 2024 GreenEn. All Rights Reserved./i);
    expect(copyrightText).toBeInTheDocument();
  });
});
