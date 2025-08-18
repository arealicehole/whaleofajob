import React, { useState, useEffect } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    _hp: '', // honeypot field
    _startTime: Date.now()
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  // Service options for dropdown
  const serviceOptions = [
    { value: '', label: 'Select a service (optional)' },
    { value: 'Sprinkler/Irrigation Repair', label: 'Sprinkler/Irrigation Repair' },
    { value: 'Small Engine Repair', label: 'Small Engine Repair' },
    { value: 'Junk Hauling', label: 'Junk Hauling' },
    { value: 'Landscaping', label: 'Landscaping' }
  ];

  // Validate individual field
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.trim().length < 2 ? 'Name must be at least 2 characters' : '';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'Please enter a valid email address' : '';
      case 'message':
        return value.trim().length < 10 ? 'Message must be at least 10 characters' : '';
      default:
        return '';
    }
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors = {};
    
    // Required fields
    const requiredFields = ['name', 'email', 'message'];
    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      } else {
        const fieldError = validateField(field, formData[field]);
        if (fieldError) {
          newErrors[field] = fieldError;
        }
      }
    });

    // Optional phone validation
    if (formData.phone.trim()) {
      const phoneRegex = /^[\d\s\-\(\)\+\.\x20]{10,}$/;
      if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }

    return newErrors;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Real-time validation for better UX
    if (value.trim() && ['name', 'email', 'message'].includes(name)) {
      const fieldError = validateField(name, value);
      if (fieldError) {
        setErrors(prev => ({
          ...prev,
          [name]: fieldError
        }));
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
          _hp: '',
          _startTime: Date.now()
        });
        setErrors({});
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success message component
  if (submitStatus === 'success') {
    return (
      <div className="form">
        <div className="card" style={{ textAlign: 'center', padding: 'var(--space-2xl)' }}>
          <h3 style={{ color: 'var(--color-success)', marginBottom: 'var(--space-lg)' }}>
            Thank You!
          </h3>
          <p style={{ marginBottom: 'var(--space-lg)' }}>
            Your message has been sent successfully. We'll get back to you within 24 hours.
          </p>
          <button 
            className="form__button"
            onClick={() => setSubmitStatus(null)}
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      {/* Honeypot field - hidden from users */}
      <div style={{ display: 'none' }}>
        <label htmlFor="website">Website (leave blank):</label>
        <input
          type="text"
          id="website"
          name="_hp"
          value={formData._hp}
          onChange={handleChange}
          tabIndex="-1"
          autoComplete="off"
        />
      </div>

      {/* Name field */}
      <div className="form__field">
        <label htmlFor="name" className="form__label form__label--required">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`form__input ${errors.name ? 'form__input--error' : ''}`}
          placeholder="Enter your full name"
          required
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <span id="name-error" className="form__error" role="alert">
            {errors.name}
          </span>
        )}
      </div>

      {/* Email field */}
      <div className="form__field">
        <label htmlFor="email" className="form__label form__label--required">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`form__input ${errors.email ? 'form__input--error' : ''}`}
          placeholder="Enter your email address"
          required
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <span id="email-error" className="form__error" role="alert">
            {errors.email}
          </span>
        )}
      </div>

      {/* Phone field */}
      <div className="form__field">
        <label htmlFor="phone" className="form__label">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`form__input ${errors.phone ? 'form__input--error' : ''}`}
          placeholder="(optional) Enter your phone number"
          aria-describedby={errors.phone ? 'phone-error' : 'phone-help'}
        />
        {errors.phone ? (
          <span id="phone-error" className="form__error" role="alert">
            {errors.phone}
          </span>
        ) : (
          <span id="phone-help" className="form__help">
            Optional - helps us provide faster service
          </span>
        )}
      </div>

      {/* Service field */}
      <div className="form__field">
        <label htmlFor="service" className="form__label">
          Service Needed
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="form__select"
          aria-describedby="service-help"
        >
          {serviceOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span id="service-help" className="form__help">
          Optional - helps us prepare for your specific needs
        </span>
      </div>

      {/* Message field */}
      <div className="form__field">
        <label htmlFor="message" className="form__label form__label--required">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className={`form__textarea ${errors.message ? 'form__textarea--error' : ''}`}
          placeholder="Tell us about your project or service needs..."
          required
          rows="5"
          aria-describedby={errors.message ? 'message-error' : 'message-help'}
        />
        {errors.message ? (
          <span id="message-error" className="form__error" role="alert">
            {errors.message}
          </span>
        ) : (
          <span id="message-help" className="form__help">
            Please provide details about your project or service needs
          </span>
        )}
      </div>

      {/* Submit button */}
      <div className="form__field">
        <button
          type="submit"
          className="form__button"
          disabled={isSubmitting}
          style={{ 
            width: '100%',
            opacity: isSubmitting ? 0.7 : 1 
          }}
        >
          {isSubmitting ? 'Sending Message...' : 'Send Message'}
        </button>
        
        {submitStatus === 'error' && (
          <span className="form__error" role="alert" style={{ marginTop: 'var(--space-sm)' }}>
            Sorry, there was an error sending your message. Please try again or call us at (623) 931-0846.
          </span>
        )}
      </div>

      {/* Additional info */}
      <div className="form__field">
        <p className="form__help" style={{ textAlign: 'center' }}>
          We typically respond within 24 hours. For urgent matters, please call{' '}
          <a href="tel:+16239310846" style={{ color: 'var(--color-primary)' }}>
            (623) 931-0846
          </a>
        </p>
      </div>
    </form>
  );
};

export default ContactForm;