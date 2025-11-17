
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  TrendingUp, 
  BarChart3, 
  Target, 
  FileText, 
  Settings,
  Zap,
  Map,
  Trophy,
  ShoppingCart,
  Factory,
  UserCheck,
  Activity,
  Heart,
  Phone
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  // FIX: Reordered the navItems array to match the visual order in the screenshots
  const navItems = [
    // Top Section (from Executive Command Center view)
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Package, label: 'Inventory', path: '/inventory', roles: ['ceo', 'admin', 'brand_manager', 'manufacturing'] },
    { icon: ShoppingCart, label: 'Orders', path: '/orders', roles: ['ceo', 'admin', 'sales_team', 'distributor'] },
    { icon: Phone, label: 'Sales Team', path: '/sales-team', roles: ['ceo', 'admin', 'sales_team'] }, // Using Phone for Sales Team
    { icon: Users, label: 'Distributors', path: '/distributors', roles: ['ceo', 'admin', 'brand_manager', 'sales_team'] },
    { icon: UserCheck, label: 'User Management', path: '/user-management', roles: ['ceo', 'admin'] }, // Using UserCheck for User Management
    { icon: Factory, label: 'Manufacturing', path: '/manufacturing', roles: ['ceo', 'admin', 'manufacturing'] },
    { icon: Activity, label: 'System Health', path: '/system-health', roles: ['ceo', 'admin'] }, // Using Activity for System Health
    { icon: Heart, label: 'Consumer Insights', path: '/consumer-insights', roles: ['ceo', 'admin', 'brand_manager'] }, // Using Heart for Consumer Insights

    // Middle/Bottom Section (from Geographic View)
    { icon: Map, label: 'Geographic View', path: '/geographic', roles: ['ceo', 'admin', 'brand_manager'] }, // Moved up
    { icon: Trophy, label: 'Leaderboards', path: '/leaderboards', roles: ['ceo', 'admin', 'brand_manager', 'sales_team'] }, // Moved up
    { icon: TrendingUp, label: 'Forecasting', path: '/forecasting', roles: ['ceo', 'admin', 'brand_manager', 'manufacturing'] }, // Moved up
    { icon: BarChart3, label: 'Market Insights', path: '/market-insights', roles: ['ceo', 'admin', 'brand_manager'] }, // Moved up
    { icon: Target, label: 'Branding Guidance', path: '/branding-guidance', roles: ['ceo', 'admin', 'brand_manager'] }, // Moved up
    { icon: FileText, label: 'Reports', path: '/reports' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const filteredNavItems = navItems.filter(item => 
    !item.roles || (user?.role && item.roles.includes(user.role))
  );

  return (
    // Minor changes for visual separation based on the image: Added a divider for the settings/reports section
    <div className="w-64 bg-black text-white flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <Zap className="h-8 w-8 text-white" />
          <div>
            <h1 className="text-xl font-bold font-montserrat">EVOLV</h1>
            <p className="text-xs text-gray-400 uppercase tracking-wider">Brand Intelligence</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4 overflow-y-auto"> {/* Added overflow-y-auto for scrollability */}
        <ul className="space-y-2">
          {filteredNavItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? 'bg-white text-black'
                      : 'hover:bg-gray-800 text-gray-300 hover:text-white'
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
              {/* Conditional divider for the reports/settings section, mimicking the visual break */}
              {(item.label === 'Consumer Insights' || item.label === 'Branding Guidance') && (
                <hr className="my-4 border-gray-800" />
              )}
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-800">
        <div className="text-xs text-gray-400 text-center">
          <p>© 2025 Evolv Global</p>
          <p className="mt-1">Brand Intelligence Platform</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

















// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';
// import { 
//   LayoutDashboard, 
//   Package, 
//   Users, 
//   TrendingUp, 
//   BarChart3, 
//   Target, 
//   FileText, 
//   Settings,
//   Zap,
//   Map,
//   Trophy,
//   ShoppingCart,
//   Factory,
//   UserCheck,
//   Activity,
//   Heart,
//   Phone
// } from 'lucide-react';

// const Sidebar: React.FC = () => {
//   const { user } = useAuth();

//   const navItems = [
//     { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
//     { icon: Package, label: 'Inventory', path: '/inventory', roles: ['ceo', 'admin', 'brand_manager', 'manufacturing'] },
//     { icon: ShoppingCart, label: 'Orders', path: '/orders', roles: ['ceo', 'admin', 'sales_team', 'distributor'] },
//     { icon: Phone, label: 'Sales Team', path: '/sales-team', roles: ['ceo', 'admin', 'sales_team'] },
//     { icon: Users, label: 'Distributors', path: '/distributors', roles: ['ceo', 'admin', 'brand_manager', 'sales_team'] },
//     { icon: UserCheck, label: 'User Management', path: '/user-management', roles: ['ceo', 'admin'] },
//     { icon: Factory, label: 'Manufacturing', path: '/manufacturing', roles: ['ceo', 'admin', 'manufacturing'] },
//     { icon: Activity, label: 'System Health', path: '/system-health', roles: ['ceo', 'admin'] },
//     { icon: Heart, label: 'Consumer Insights', path: '/consumer-insights', roles: ['ceo', 'admin', 'brand_manager'] },
//     { icon: Map, label: 'Geographic View', path: '/geographic', roles: ['ceo', 'admin', 'brand_manager'] },
//     { icon: Trophy, label: 'Leaderboards', path: '/leaderboards', roles: ['ceo', 'admin', 'brand_manager', 'sales_team'] },
//     { icon: TrendingUp, label: 'Forecasting', path: '/forecasting', roles: ['ceo', 'admin', 'brand_manager', 'manufacturing'] },
//     { icon: BarChart3, label: 'Market Insights', path: '/market-insights', roles: ['ceo', 'admin', 'brand_manager'] },
//     { icon: Target, label: 'Branding Guidance', path: '/branding-guidance', roles: ['ceo', 'admin', 'brand_manager'] },
//     { icon: FileText, label: 'Reports', path: '/reports' },
//     { icon: Settings, label: 'Settings', path: '/settings' },
//   ];

//   const filteredNavItems = navItems.filter(item => 
//     !item.roles || (user?.role && item.roles.includes(user.role))
//   );

//   return (
//     <div className="w-64 bg-black text-white flex flex-col">
//       <div className="p-6 border-b border-gray-800">
//         <div className="flex items-center space-x-3">
//           <Zap className="h-8 w-8 text-white" />
//           <div>
//             <h1 className="text-xl font-bold font-montserrat">EVOLV</h1>
//             <p className="text-xs text-gray-400 uppercase tracking-wider">Brand Intelligence</p>
//           </div>
//         </div>
//       </div>
      
//       <nav className="flex-1 p-4">
//         <ul className="space-y-2">
//           {filteredNavItems.map((item) => (
//             <li key={item.path}>
//               <NavLink
//                 to={item.path}
//                 end={item.path === '/'}
//                 className={({ isActive }) =>
//                   `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
//                     isActive
//                       ? 'bg-white text-black'
//                       : 'hover:bg-gray-800 text-gray-300 hover:text-white'
//                   }`
//                 }
//               >
//                 <item.icon className="h-5 w-5" />
//                 <span className="font-medium">{item.label}</span>
//               </NavLink>
//             </li>
//           ))}
//         </ul>
//       </nav>
      
//       <div className="p-4 border-t border-gray-800">
//         <div className="text-xs text-gray-400 text-center">
//           <p>© 2025 Evolv Global</p>
//           <p className="mt-1">Brand Intelligence Platform</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;