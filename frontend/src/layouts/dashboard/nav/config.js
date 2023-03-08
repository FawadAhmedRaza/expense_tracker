// routes
// components
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import SvgColor from '../../../components/svg-color';
// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: icon('ic_blog'),
  cart: icon('ic_cart'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'Dashboard', path: '/dashboard', icon: ICONS.dashboard },
      { title: 'Products', path: '/product', icon: ICONS.file, 
      children: [
        { title: 'create', path: '/product/create' },
        {title:'list',path:'/product/list'}
        
      ], },
      { title: 'Categories', path: '/category', icon: ICONS.file, 
      children: [
        { title: 'create', path: '/category/create' },
        // {title:'list',path:'/product/list'}
        
      ], },
      { title: 'Expense', path: '/expense', icon: ICONS.analytics },
      { title: 'Transactions', path: '/transactions', icon: ICONS.banking },
    ],
  },
];

export default navConfig;
