import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Contact } from '../sections/Contact';

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get('service') || undefined;

  return (
    <div className="pt-20 pb-20">
      {/* Main Contact Section with Preselected Service Support */}
      <Contact selectedService={serviceParam} />
    </div>
  );
};