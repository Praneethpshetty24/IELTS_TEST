import React from 'react';
import { FaFreeCodeCamp, FaStar, FaRegMoneyBillAlt } from 'react-icons/fa';
import { MdAttachMoney, MdCheckCircle } from 'react-icons/md';
import { GiAchievement, GiOpenBook } from 'react-icons/gi';
import { IoIosPeople } from 'react-icons/io';
import { BiSupport } from 'react-icons/bi';
import './Payments.css'; // Ensure this CSS file is created/updated

const PaymentCard = ({ title, price, features, isRecommended, Icon }) => {
  return (
    <div className={`payment-card ${isRecommended ? 'recommended' : ''}`}>
      <div className="payment-card-header">
        <Icon className="payment-card-icon" />
        <h3 className="payment-card-title">{title}</h3>
      </div>
      <p className="payment-card-price">{price}</p>
      <ul className="payment-card-features">
        {features.map((feature, index) => (
          <li key={index} className="payment-card-feature">
            <MdCheckCircle className="feature-icon" />
            {feature}
          </li>
        ))}
      </ul>
      <button className="payment-card-button">Choose Plan</button>
    </div>
  );
};

const Payments = () => {
  const plans = [
    {
      title: 'Free Plan',
      price: '₹0',
      features: [
        'Access to basic tests',
        'Weekly tips',
        'Community support',
        'Basic learning resources',
        'Limited practice questions'
      ],
      isRecommended: false,
      Icon: FaFreeCodeCamp,
    },
    {
      title: 'Basic Plan',
      price: '₹50',
      features: [
        'Access to all test modules',
        'Detailed performance analytics',
        'Newsletter updates',
        'Study guides',
        'Group practice sessions'
      ],
      isRecommended: true,
      Icon: FaStar,
    },
    {
      title: 'Premium Plan',
      price: '₹500',
      features: [
        'Unlimited tests',
        'AI-powered feedback',
        'One-on-one coaching sessions',
        'Exclusive study material',
        'Priority support'
      ],
      isRecommended: false,
      Icon: FaRegMoneyBillAlt,
    },
  ];

  return (
    <div className="payments-container">
      <h1 className="payments-title">Choose Your Plan</h1>
      <p className="payments-desc">Select the plan that best suits your needs.</p>
      <div className="payments-cards-container">
        {plans.map((plan, index) => (
          <PaymentCard
            key={index}
            title={plan.title}
            price={plan.price}
            features={plan.features}
            isRecommended={plan.isRecommended}
            Icon={plan.Icon}
          />
        ))}
      </div>
    </div>
  );
};

export default Payments;
