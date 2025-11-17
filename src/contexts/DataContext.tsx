import React, { createContext, useContext, useState } from 'react';
import { 
  KPIData, 
  Distributor, 
  InventoryItem, 
  ForecastData, 
  MarketData, 
  BrandingRecommendation, 
  Alert, 
  RegionalPerformance, 
  Campaign,
  Order,
  SalesTarget,
  ProductionBatch,
  SalesLead,
  SystemHealth,
  ConsumerInsight,
  DistributorEngagement
} from '../types';

interface DataContextType {
  kpiData: KPIData;
  distributors: Distributor[];
  inventory: InventoryItem[];
  forecastData: ForecastData[];
  marketData: MarketData[];
  recommendations: BrandingRecommendation[];
  alerts: Alert[];
  regionalPerformance: RegionalPerformance[];
  campaigns: Campaign[];
  orders: Order[];
  salesTargets: SalesTarget[];
  productionBatches: ProductionBatch[];
  salesLeads: SalesLead[];
  systemHealth: SystemHealth;
  consumerInsights: ConsumerInsight[];
  distributorEngagement: DistributorEngagement[];
  refreshData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [kpiData] = useState<KPIData>({
    totalManufactured: 125000,
    totalDispatched: 118500,
    totalSold: 112300,
    marketShare: 34.2,
    growthTrend: 12.5,
    yoyGrowth: 18.3,
    redZones: 3,
    totalRevenue: 47200000,
    quarterlyGrowth: 15.8,
    consumerAcquisition: 8.7,
    distributorEfficiency: 82.4
  });

  const [distributors] = useState<Distributor[]>([
    {
      id: '1',
      name: 'Delhi Metro Distributors',
      region: 'North India',
      state: 'Delhi',
      city: 'New Delhi',
      orderFrequency: 15,
      turnoverSpeed: 8.5,
      paymentCycle: 28,
      efficiencyScore: 'green',
      performanceBadge: 'gold',
      motivationScore: 92,
      lastOrderDate: '2025-01-10',
      totalOrders: 156,
      avgOrderValue: 45000,
      orderTimeliness: 95,
      responseSpeed: 2.1,
      paymentRegularity: 98,
      engagementLevel: 88,
      monthlyTarget: 50000,
      monthlyAchievement: 52000,
      currentStock: 2400,
      lowStockAlerts: 0,
      salesRepId: '5',
      visits: 12,
      followUps: 8,
      creditLimit: 500000,
      outstandingPayments: 25000
    },
    {
      id: '2',
      name: 'Mumbai Coastal Trading',
      region: 'West India',
      state: 'Maharashtra',
      city: 'Mumbai',
      orderFrequency: 12,
      turnoverSpeed: 12.2,
      paymentCycle: 35,
      efficiencyScore: 'amber',
      performanceBadge: 'silver',
      motivationScore: 76,
      lastOrderDate: '2025-01-08',
      totalOrders: 98,
      avgOrderValue: 52000,
      orderTimeliness: 82,
      responseSpeed: 4.2,
      paymentRegularity: 75,
      engagementLevel: 65,
      monthlyTarget: 48000,
      monthlyAchievement: 44000,
      currentStock: 1800,
      lowStockAlerts: 2,
      salesRepId: '5',
      visits: 8,
      followUps: 5,
      creditLimit: 400000,
      outstandingPayments: 85000
    },
    {
      id: '3',
      name: 'Chennai Express Logistics',
      region: 'South India',
      state: 'Tamil Nadu',
      city: 'Chennai',
      orderFrequency: 8,
      turnoverSpeed: 18.5,
      paymentCycle: 45,
      efficiencyScore: 'red',
      performanceBadge: 'bronze',
      motivationScore: 58,
      lastOrderDate: '2025-01-05',
      totalOrders: 64,
      avgOrderValue: 38000,
      orderTimeliness: 68,
      responseSpeed: 7.8,
      paymentRegularity: 52,
      engagementLevel: 45,
      monthlyTarget: 42000,
      monthlyAchievement: 35000,
      currentStock: 900,
      lowStockAlerts: 3,
      visits: 4,
      followUps: 2,
      creditLimit: 300000,
      outstandingPayments: 120000
    },
    {
      id: '4',
      name: 'Bangalore Tech Distributors',
      region: 'South India',
      state: 'Karnataka',
      city: 'Bangalore',
      orderFrequency: 10,
      turnoverSpeed: 14.2,
      paymentCycle: 32,
      efficiencyScore: 'green',
      performanceBadge: 'gold',
      motivationScore: 89,
      lastOrderDate: '2025-01-11',
      totalOrders: 142,
      avgOrderValue: 48000,
      orderTimeliness: 91,
      responseSpeed: 2.8,
      paymentRegularity: 94,
      engagementLevel: 82,
      monthlyTarget: 46000,
      monthlyAchievement: 49000,
      currentStock: 2100,
      lowStockAlerts: 1,
      visits: 10,
      followUps: 7,
      creditLimit: 450000,
      outstandingPayments: 35000
    },
    {
      id: '5',
      name: 'Kolkata Eastern Traders',
      region: 'East India',
      state: 'West Bengal',
      city: 'Kolkata',
      orderFrequency: 14,
      turnoverSpeed: 16.8,
      paymentCycle: 38,
      efficiencyScore: 'amber',
      performanceBadge: 'silver',
      motivationScore: 71,
      lastOrderDate: '2025-01-09',
      totalOrders: 89,
      avgOrderValue: 41000,
      orderTimeliness: 78,
      responseSpeed: 5.1,
      paymentRegularity: 68,
      engagementLevel: 58,
      monthlyTarget: 40000,
      monthlyAchievement: 38500,
      currentStock: 1500,
      lowStockAlerts: 1,
      visits: 6,
      followUps: 4,
      creditLimit: 350000,
      outstandingPayments: 65000
    }
  ]);

  const [inventory] = useState<InventoryItem[]>([
    {
      id: '1',
      productName: 'Premium Widget A',
      sku: 'PWA-001',
      manufactured: 15000,
      dispatched: 14200,
      sold: 13800,
      inStock: 800,
      status: 'healthy',
      lastUpdated: '2025-01-12',
      region: 'North India',
      state: 'Delhi',
      batchNumber: 'PWA-2025-001',
      expiryDate: '2026-01-12',
      shelfLife: 365,
      warehouseLocation: 'Delhi Central',
      reorderLevel: 500,
      maxStockLevel: 5000
    },
    {
      id: '2',
      productName: 'Elite Widget B',
      sku: 'EWB-002',
      manufactured: 8500,
      dispatched: 8100,
      sold: 7900,
      inStock: 200,
      status: 'warning',
      lastUpdated: '2025-01-12',
      region: 'West India',
      state: 'Maharashtra',
      batchNumber: 'EWB-2025-002',
      expiryDate: '2026-01-12',
      shelfLife: 365,
      warehouseLocation: 'Mumbai West',
      reorderLevel: 300,
      maxStockLevel: 3000
    },
    {
      id: '3',
      productName: 'Pro Widget C',
      sku: 'PWC-003',
      manufactured: 12000,
      dispatched: 11800,
      sold: 10500,
      inStock: 1300,
      status: 'critical',
      lastUpdated: '2025-01-11',
      region: 'South India',
      state: 'Tamil Nadu',
      batchNumber: 'PWC-2025-003',
      expiryDate: '2026-01-11',
      shelfLife: 365,
      warehouseLocation: 'Chennai South',
      reorderLevel: 800,
      maxStockLevel: 4000
    }
  ]);

  const [forecastData] = useState<ForecastData[]>([
    { region: 'North India', state: 'Delhi', predicted: 25000, actual: 23500, variance: -6, confidence: 89, seasonalFactor: 1.2, trendDirection: 'up' },
    { region: 'West India', state: 'Maharashtra', predicted: 18000, actual: 19200, variance: 6.7, confidence: 92, seasonalFactor: 1.1, trendDirection: 'up' },
    { region: 'South India', state: 'Tamil Nadu', predicted: 15000, actual: 12800, variance: -14.7, confidence: 78, seasonalFactor: 0.9, trendDirection: 'down' },
    { region: 'East India', state: 'West Bengal', predicted: 12000, actual: 11900, variance: -0.8, confidence: 85, seasonalFactor: 1.0, trendDirection: 'stable' },
    { region: 'South India', state: 'Karnataka', predicted: 22000, actual: 24100, variance: 9.5, confidence: 91, seasonalFactor: 1.3, trendDirection: 'up' },
    { region: 'West India', state: 'Gujarat', predicted: 16000, actual: 15200, variance: -5, confidence: 87, seasonalFactor: 1.0, trendDirection: 'stable' }
  ]);

  const [marketData] = useState<MarketData[]>([
    { region: 'North India', state: 'Delhi', consumers: 45000, marketShare: 38.5, growth: 15.2, competitorPresence: 62, newConsumers: 3200, repeatConsumers: 41800, avgOrderValue: 1200, purchaseFrequency: 2.3 },
    { region: 'West India', state: 'Maharashtra', consumers: 38000, marketShare: 42.1, growth: 8.7, competitorPresence: 58, newConsumers: 2800, repeatConsumers: 35200, avgOrderValue: 1350, purchaseFrequency: 2.1 },
    { region: 'South India', state: 'Tamil Nadu', consumers: 28000, marketShare: 28.9, growth: -5.2, competitorPresence: 71, newConsumers: 1200, repeatConsumers: 26800, avgOrderValue: 1100, purchaseFrequency: 1.8 },
    { region: 'East India', state: 'West Bengal', consumers: 22000, marketShare: 31.2, growth: 2.1, competitorPresence: 69, newConsumers: 1800, repeatConsumers: 20200, avgOrderValue: 1050, purchaseFrequency: 1.9 },
    { region: 'South India', state: 'Karnataka', consumers: 35000, marketShare: 45.8, growth: 22.1, competitorPresence: 54, newConsumers: 4200, repeatConsumers: 30800, avgOrderValue: 1400, purchaseFrequency: 2.5 },
    { region: 'West India', state: 'Gujarat', consumers: 31000, marketShare: 36.7, growth: 11.3, competitorPresence: 63, newConsumers: 2600, repeatConsumers: 28400, avgOrderValue: 1250, purchaseFrequency: 2.2 }
  ]);

  const [recommendations] = useState<BrandingRecommendation[]>([
    {
      id: '1',
      type: 'campaign',
      priority: 'high',
      title: 'Boost South India Presence',
      description: 'Market share declining in South India due to increased competitor activity. Recommend targeted digital campaign focusing on consumer education and brand differentiation.',
      estimatedImpact: '+8-12% market share',
      investmentRequired: '₹25-35 Lakhs',
      timeline: '3-4 months',
      region: 'South India',
      state: 'Tamil Nadu',
      expectedROI: 3.2,
      riskLevel: 'medium'
    },
    {
      id: '2',
      type: 'distributor_incentive',
      priority: 'medium',
      title: 'Chennai Distributor Support',
      description: 'Chennai Express Logistics showing poor efficiency. Recommend incentive program to improve performance and reduce payment delays.',
      estimatedImpact: '+20% turnover speed',
      investmentRequired: '₹8-12 Lakhs',
      timeline: '6-8 weeks',
      region: 'South India',
      state: 'Tamil Nadu',
      expectedROI: 2.8,
      riskLevel: 'low'
    },
    {
      id: '3',
      type: 'market_expansion',
      priority: 'medium',
      title: 'Consumer Acquisition Drive',
      description: 'Deploy consumer promotions in East India to capitalize on growing market opportunity and increase repeat purchase rates.',
      estimatedImpact: '+15% consumer base',
      investmentRequired: '₹15-20 Lakhs',
      timeline: '2-3 months',
      region: 'East India',
      state: 'West Bengal',
      expectedROI: 2.5,
      riskLevel: 'medium'
    },
    {
      id: '4',
      type: 'campaign',
      priority: 'high',
      title: 'Karnataka Market Acceleration',
      description: 'Karnataka showing exceptional 22.1% growth. Increase investment to capture maximum market opportunity before competitors respond.',
      estimatedImpact: '+25% market penetration',
      investmentRequired: '₹40-50 Lakhs',
      timeline: '4-6 months',
      region: 'South India',
      state: 'Karnataka',
      expectedROI: 4.1,
      riskLevel: 'low'
    }
  ]);

  const [alerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'market_share',
      severity: 'high',
      title: 'Market Share Decline in Tamil Nadu',
      description: 'Market share dropped 5.2% in Tamil Nadu due to increased competitor activity. Immediate intervention required.',
      region: 'South India',
      state: 'Tamil Nadu',
      timestamp: '2025-01-12T10:30:00Z',
      status: 'open',
      actionRequired: true,
      escalationLevel: 2
    },
    {
      id: '2',
      type: 'distributor_delay',
      severity: 'medium',
      title: 'Distributor Delays in Chennai',
      description: 'Chennai Express Logistics showing 18.5 day average turnover, 8 days above target. Payment delays affecting cash flow.',
      region: 'South India',
      state: 'Tamil Nadu',
      timestamp: '2025-01-12T09:15:00Z',
      status: 'in_progress',
      assignedTo: 'Emily Rodriguez',
      actionRequired: true,
      escalationLevel: 1
    },
    {
      id: '3',
      type: 'stock_out',
      severity: 'high',
      title: 'Critical Stock Shortage - Elite Widget B',
      description: 'Only 200 units remaining in Maharashtra warehouse, below safety threshold of 300 units.',
      region: 'West India',
      state: 'Maharashtra',
      timestamp: '2025-01-12T11:20:00Z',
      status: 'open',
      actionRequired: true,
      escalationLevel: 3
    },
    {
      id: '4',
      type: 'sales_drop',
      severity: 'medium',
      title: 'Sales Velocity Drop in West Bengal',
      description: 'Sales velocity decreased by 12% in West Bengal over the last 2 weeks. Consumer demand analysis needed.',
      region: 'East India',
      state: 'West Bengal',
      timestamp: '2025-01-12T08:45:00Z',
      status: 'open',
      actionRequired: true,
      escalationLevel: 1
    },
    {
      id: '5',
      type: 'competitor_pressure',
      severity: 'high',
      title: 'Increased Competitor Activity in Gujarat',
      description: 'New competitor launched aggressive pricing strategy in Gujarat. Market share at risk.',
      region: 'West India',
      state: 'Gujarat',
      timestamp: '2025-01-12T07:30:00Z',
      status: 'open',
      actionRequired: true,
      escalationLevel: 2
    }
  ]);

  const [regionalPerformance] = useState<RegionalPerformance[]>([
    { region: 'South India', state: 'Karnataka', performance: 'top', marketShare: 45.8, growth: 22.1, distributorCount: 8, avgEfficiency: 89, consumerSatisfaction: 4.6, competitiveIndex: 0.54 },
    { region: 'West India', state: 'Maharashtra', performance: 'top', marketShare: 42.1, growth: 8.7, distributorCount: 12, avgEfficiency: 85, consumerSatisfaction: 4.3, competitiveIndex: 0.58 },
    { region: 'North India', state: 'Delhi', performance: 'top', marketShare: 38.5, growth: 15.2, distributorCount: 15, avgEfficiency: 92, consumerSatisfaction: 4.5, competitiveIndex: 0.62 },
    { region: 'West India', state: 'Gujarat', performance: 'top', marketShare: 36.7, growth: 11.3, distributorCount: 9, avgEfficiency: 81, consumerSatisfaction: 4.2, competitiveIndex: 0.63 },
    { region: 'East India', state: 'West Bengal', performance: 'bottom', marketShare: 31.2, growth: 2.1, distributorCount: 6, avgEfficiency: 71, consumerSatisfaction: 3.8, competitiveIndex: 0.69 },
    { region: 'South India', state: 'Tamil Nadu', performance: 'bottom', marketShare: 28.9, growth: -5.2, distributorCount: 7, avgEfficiency: 58, consumerSatisfaction: 3.5, competitiveIndex: 0.71 }
  ]);

  const [campaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Digital Push Karnataka',
      region: 'South India',
      state: 'Karnataka',
      investment: 2800000,
      roi: 3.2,
      status: 'active',
      startDate: '2024-12-01',
      endDate: '2025-03-31',
      targetAudience: 'Urban millennials 25-40',
      channelMix: ['Digital', 'Social Media', 'Influencer'],
      kpis: [
        { metric: 'Brand Awareness', target: 65, achieved: 58, unit: '%' },
        { metric: 'Lead Generation', target: 5000, achieved: 4200, unit: 'leads' },
        { metric: 'Conversion Rate', target: 12, achieved: 14, unit: '%' }
      ]
    },
    {
      id: '2',
      name: 'Consumer Acquisition Tamil Nadu',
      region: 'South India',
      state: 'Tamil Nadu',
      investment: 3200000,
      roi: 2.1,
      status: 'active',
      startDate: '2024-11-15',
      endDate: '2025-02-28',
      targetAudience: 'Families 30-50',
      channelMix: ['TV', 'Print', 'Radio', 'Outdoor'],
      kpis: [
        { metric: 'Reach', target: 2000000, achieved: 1800000, unit: 'people' },
        { metric: 'Trial Rate', target: 8, achieved: 6, unit: '%' },
        { metric: 'Market Share', target: 32, achieved: 29, unit: '%' }
      ]
    }
  ]);

  const [orders] = useState<Order[]>([
    {
      id: 'ORD-001',
      distributorId: '1',
      distributorName: 'Delhi Metro Distributors',
      products: [
        { sku: 'PWA-001', productName: 'Premium Widget A', quantity: 500, unitPrice: 1200, totalPrice: 600000, availability: 'in_stock' },
        { sku: 'EWB-002', productName: 'Elite Widget B', quantity: 200, unitPrice: 1500, totalPrice: 300000, availability: 'in_stock' }
      ],
      totalValue: 900000,
      status: 'approved',
      orderDate: '2025-01-10',
      expectedDelivery: '2025-01-15',
      region: 'North India',
      state: 'Delhi',
      salesRepId: '5',
      priority: 'normal',
      paymentTerms: '30 days',
      creditApproval: true,
      notes: 'Regular monthly order'
    },
    {
      id: 'ORD-002',
      distributorId: '2',
      distributorName: 'Mumbai Coastal Trading',
      products: [
        { sku: 'PWC-003', productName: 'Pro Widget C', quantity: 300, unitPrice: 1100, totalPrice: 330000, availability: 'low_stock' }
      ],
      totalValue: 330000,
      status: 'pending',
      orderDate: '2025-01-12',
      expectedDelivery: '2025-01-17',
      region: 'West India',
      state: 'Maharashtra',
      salesRepId: '5',
      priority: 'urgent',
      paymentTerms: '45 days',
      creditApproval: false,
      notes: 'Credit limit exceeded, requires approval'
    },
    {
      id: 'ORD-003',
      distributorId: '4',
      distributorName: 'Bangalore Tech Distributors',
      products: [
        { sku: 'PWA-001', productName: 'Premium Widget A', quantity: 400, unitPrice: 1200, totalPrice: 480000, availability: 'in_stock' },
        { sku: 'EWB-002', productName: 'Elite Widget B', quantity: 150, unitPrice: 1500, totalPrice: 225000, availability: 'in_stock' }
      ],
      totalValue: 705000,
      status: 'dispatched',
      orderDate: '2025-01-08',
      expectedDelivery: '2025-01-13',
      region: 'South India',
      state: 'Karnataka',
      priority: 'normal',
      paymentTerms: '30 days',
      creditApproval: true,
      notes: 'High performer - expedited processing'
    }
  ]);

  const [salesTargets] = useState<SalesTarget[]>([
    {
      id: '1',
      salesRepId: '5',
      salesRepName: 'Priya Sharma',
      period: 'monthly',
      target: 2500000,
      achieved: 2180000,
      region: 'West India',
      distributorsManaged: 8,
      newDistributorsAcquired: 2,
      conversionRate: 78,
      visits: 45,
      followUps: 32,
      pipelineValue: 1200000,
      closedDeals: 12
    },
    {
      id: '2',
      salesRepId: '6',
      salesRepName: 'Rahul Gupta',
      period: 'monthly',
      target: 2200000,
      achieved: 2350000,
      region: 'North India',
      distributorsManaged: 10,
      newDistributorsAcquired: 3,
      conversionRate: 85,
      visits: 52,
      followUps: 38,
      pipelineValue: 1500000,
      closedDeals: 15
    }
  ]);

  const [productionBatches] = useState<ProductionBatch[]>([
    {
      id: '1',
      sku: 'PWA-001',
      productName: 'Premium Widget A',
      batchNumber: 'PWA-2025-004',
      quantityProduced: 5000,
      productionDate: '2025-01-10',
      expiryDate: '2026-01-10',
      status: 'ready_to_dispatch',
      qualityScore: 98,
      productionLine: 'Line A',
      supervisor: 'Vikram Singh',
      estimatedCompletion: '2025-01-12'
    },
    {
      id: '2',
      sku: 'EWB-002',
      productName: 'Elite Widget B',
      batchNumber: 'EWB-2025-003',
      quantityProduced: 3000,
      productionDate: '2025-01-11',
      expiryDate: '2026-01-11',
      status: 'in_production',
      qualityScore: 95,
      productionLine: 'Line B',
      supervisor: 'Amit Kumar',
      estimatedCompletion: '2025-01-14'
    },
    {
      id: '3',
      sku: 'PWC-003',
      productName: 'Pro Widget C',
      batchNumber: 'PWC-2025-004',
      quantityProduced: 4000,
      productionDate: '2025-01-09',
      expiryDate: '2026-01-09',
      status: 'quality_check',
      qualityScore: 92,
      productionLine: 'Line C',
      supervisor: 'Neha Patel'
    }
  ]);

  const [salesLeads] = useState<SalesLead[]>([
    {
      id: '1',
      distributorName: 'Hyderabad Premium Traders',
      contactPerson: 'Suresh Reddy',
      phone: '+91-9876543210',
      email: 'suresh@hpttraders.com',
      region: 'South India',
      state: 'Telangana',
      city: 'Hyderabad',
      status: 'in_progress',
      salesRepId: '7',
      estimatedValue: 350000,
      lastContact: '2025-01-10',
      nextFollowUp: '2025-01-15',
      notes: 'Interested in Premium Widget A. Needs pricing discussion.',
      source: 'referral'
    },
    {
      id: '2',
      distributorName: 'Pune Distribution Hub',
      contactPerson: 'Rajesh Patil',
      phone: '+91-9876543211',
      email: 'rajesh@punehub.com',
      region: 'West India',
      state: 'Maharashtra',
      city: 'Pune',
      status: 'lead',
      salesRepId: '5',
      estimatedValue: 280000,
      lastContact: '2025-01-08',
      nextFollowUp: '2025-01-13',
      notes: 'Cold lead from marketing campaign. Initial interest shown.',
      source: 'marketing'
    }
  ]);

  const [systemHealth] = useState<SystemHealth>({
    apiStatus: 'healthy',
    uptime: 99.8,
    lastBackup: '2025-01-12T02:00:00Z',
    activeUsers: 47,
    systemLoad: 23,
    errorRate: 0.02,
    responseTime: 145
  });

  const [consumerInsights] = useState<ConsumerInsight[]>([
    {
      region: 'North India',
      state: 'Delhi',
      newCustomers: 3200,
      repeatCustomers: 41800,
      churnRate: 8.5,
      avgLifetimeValue: 15600,
      satisfactionScore: 4.5,
      preferredChannels: ['Online', 'Retail', 'Direct'],
      seasonalTrends: [
        { month: 'Jan', demandMultiplier: 1.2, historicalData: [1200, 1350, 1180] },
        { month: 'Feb', demandMultiplier: 1.1, historicalData: [1100, 1250, 1080] }
      ]
    },
    {
      region: 'South India',
      state: 'Karnataka',
      newCustomers: 4200,
      repeatCustomers: 30800,
      churnRate: 6.2,
      avgLifetimeValue: 18200,
      satisfactionScore: 4.6,
      preferredChannels: ['Online', 'Retail'],
      seasonalTrends: [
        { month: 'Jan', demandMultiplier: 1.3, historicalData: [1400, 1520, 1380] },
        { month: 'Feb', demandMultiplier: 1.2, historicalData: [1300, 1420, 1280] }
      ]
    }
  ]);

  const [distributorEngagement] = useState<DistributorEngagement[]>([
    {
      distributorId: '1',
      salesRepId: '6',
      visits: 12,
      meetings: 8,
      followUps: 15,
      responseTime: 2.1,
      satisfactionScore: 4.8,
      lastInteraction: '2025-01-10',
      nextScheduled: '2025-01-17'
    },
    {
      distributorId: '2',
      salesRepId: '5',
      visits: 8,
      meetings: 5,
      followUps: 12,
      responseTime: 4.2,
      satisfactionScore: 4.1,
      lastInteraction: '2025-01-08',
      nextScheduled: '2025-01-15'
    }
  ]);

  const refreshData = () => {
    console.log('Refreshing data...');
  };

  return (
    <DataContext.Provider value={{
      kpiData,
      distributors,
      inventory,
      forecastData,
      marketData,
      recommendations,
      alerts,
      regionalPerformance,
      campaigns,
      orders,
      salesTargets,
      productionBatches,
      salesLeads,
      systemHealth,
      consumerInsights,
      distributorEngagement,
      refreshData
    }}>
      {children}
    </DataContext.Provider>
  );
};