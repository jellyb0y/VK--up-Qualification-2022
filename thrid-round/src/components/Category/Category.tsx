import classnames from 'classnames';

import { useLanguages } from '@lib/Languages/useLanguages';

import OrderIcon from '@assets/images/order.svg';
import TicketIcon from '@assets/images/ticket.svg';
import RegistrationIcon from '@assets/images/registration.svg';
import MoneyIcon from '@assets/images/money.svg';
import PlaneIcon from '@assets/images/plane.svg';
import GovernmentIcon from '@assets/images/government.svg';

import S from './Category.scss';

import type { FC } from 'react';
import type { CategoryProps, IconsRegistry } from './types';

const TRANSLATIONS = {
  'Заказы': 'Orders',
  'Финансы': 'Finance',
  'Штрафы и налоги': 'Fines and taxes',
  'Регистрации': 'Registrations',
  'Путешевствия': 'Journeys',
  'Билеты': 'Tickets',
};

const ICONS: IconsRegistry = {
  'Заказы': OrderIcon,
  'Финансы': MoneyIcon,
  'Штрафы и налоги': GovernmentIcon,
  'Регистрации': RegistrationIcon,
  'Путешевствия': PlaneIcon,
  'Билеты': TicketIcon,
};

const Category: FC<CategoryProps> = ({
  category,
  withName,
  className,
}) => {
  const applyLanguage = useLanguages();

  const IconComponent = ICONS[category];

  if (!IconComponent) {
    return null;
  }

  return (
    <div className={classnames(S.root, className)}>
      <IconComponent className={S.icon} />
      {withName && (
        <span className={S.name}>
          {applyLanguage([category, TRANSLATIONS[category] || category])}
        </span>
      )}
    </div>
  );
};

export default Category;
