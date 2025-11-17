export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ceo' | 'admin' | 'distributor' | 'brand_manager' | 'sales_team' | 'manufacturing' | 'reports';
  avatar?: string;
  region?: string;
  territory?: string;
  permissions?: string[];
  lastLogin?: string;
  status?: 'active' | 'inactive';
}

export interface KPIData {
  totalManufactured: number;
  totalDispatched: number;
  totalSold: number;
  marketShare: number;
  growthTrend: number;
  yoyGrowth: number;
  redZones: number;
  totalRevenue: number;
  quarterlyGrowth: number;
  consumerAcquisition: number;
  distributorEfficiency: number;
}

export interface Distributor {
  id: string;
  name: string;
  region: string;
  state: string;
  city: string;
  orderFrequency: number;
  turnoverSpeed: number;
  paymentCycle: number;
  efficiencyScore: 'green' | 'amber' | 'red';
  performanceBadge: 'gold' | 'silver' | 'bronze';
  motivationScore: number;
  lastOrderDate: string;
  totalOrders: number;
  avgOrderValue: number;
  orderTimeliness: number;
  responseSpeed: number;
  paymentRegularity: number;
  engagementLevel: number;
  monthlyTarget: number;
  monthlyAchievement: number;
  currentStock: number;
  lowStockAlerts: number;
  salesRepId?: string;
  visits: number;
  followUps: number;
  creditLimit: number;
  outstandingPayments: number;
}

export interface InventoryItem {
  id: string;
  productName: string;
  sku: string;
  manufactured: number;
  dispatched: number;
  sold: number;
  inStock: number;
  status: 'healthy' | 'warning' | 'critical';
  lastUpdated: string;
  region: string;
  state: string;
  batchNumber?: string;
  expiryDate?: string;
  shelfLife?: number;
  warehouseLocation: string;
  reorderLevel: number;
  maxStockLevel: number;
}

export interface ForecastData {
  region: string;
  state: string;
  predicted: number;
  actual: number;
  variance: number;
  confidence: number;
  seasonalFactor: number;
  trendDirection: 'up' | 'down' | 'stable';
}

export interface MarketData {
  region: string;
  state: string;
  consumers: number;
  marketShare: number;
  growth: number;
  competitorPresence: number;
  newConsumers: number;
  repeatConsumers: number;
  avgOrderValue: number;
  purchaseFrequency: number;
}

export interface BrandingRecommendation {
  id: string;
  type: 'campaign' | 'promotion' | 'distributor_incentive' | 'market_expansion';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  estimatedImpact: string;
  investmentRequired: string;
  timeline: string;
  region: string;
  state: string;
  expectedROI: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface Alert {
  id: string;
  type: 'market_share' | 'distributor_delay' | 'campaign_roi' | 'payment_delay' | 'stock_out' | 'production_delay' | 'sales_drop' | 'competitor_pressure';
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  region: string;
  state?: string;
  timestamp: string;
  assignedTo?: string;
  status: 'open' | 'in_progress' | 'resolved';
  actionRequired: boolean;
  escalationLevel: number;
}

export interface RegionalPerformance {
  region: string;
  state: string;
  performance: 'top' | 'bottom';
  marketShare: number;
  growth: number;
  distributorCount: number;
  avgEfficiency: number;
  consumerSatisfaction: number;
  competitiveIndex: number;
}

export interface Campaign {
  id: string;
  name: string;
  region: string;
  state: string;
  investment: number;
  roi: number;
  status: 'active' | 'completed' | 'planned';
  startDate: string;
  endDate: string;
  targetAudience: string;
  channelMix: string[];
  kpis: CampaignKPI[];
}

export interface CampaignKPI {
  metric: string;
  target: number;
  achieved: number;
  unit: string;
}

export interface Order {
  id: string;
  distributorId: string;
  distributorName: string;
  products: OrderProduct[];
  totalValue: number;
  status: 'pending' | 'approved' | 'dispatched' | 'delivered' | 'cancelled';
  orderDate: string;
  expectedDelivery: string;
  region: string;
  state: string;
  salesRepId?: string;
  priority: 'normal' | 'urgent';
  paymentTerms: string;
  creditApproval?: boolean;
  notes?: string;
}

export interface OrderProduct {
  sku: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  availability: 'in_stock' | 'low_stock' | 'out_of_stock';
}

export interface SalesTarget {
  id: string;
  salesRepId: string;
  salesRepName: string;
  period: 'monthly' | 'quarterly' | 'annual';
  target: number;
  achieved: number;
  region: string;
  distributorsManaged: number;
  newDistributorsAcquired: number;
  conversionRate: number;
  visits: number;
  followUps: number;
  pipelineValue: number;
  closedDeals: number;
}

export interface ProductionBatch {
  id: string;
  sku: string;
  productName: string;
  batchNumber: string;
  quantityProduced: number;
  productionDate: string;
  expiryDate: string;
  status: 'in_production' | 'quality_check' | 'ready_to_dispatch' | 'dispatched';
  qualityScore: number;
  productionLine: string;
  supervisor: string;
  estimatedCompletion?: string;
}

export interface SalesLead {
  id: string;
  distributorName: string;
  contactPerson: string;
  phone: string;
  email: string;
  region: string;
  state: string;
  city: string;
  status: 'lead' | 'in_progress' | 'closed' | 'lost';
  salesRepId: string;
  estimatedValue: number;
  lastContact: string;
  nextFollowUp: string;
  notes: string;
  source: 'referral' | 'cold_call' | 'marketing' | 'existing';
}

export interface SystemHealth {
  apiStatus: 'healthy' | 'degraded' | 'down';
  uptime: number;
  lastBackup: string;
  activeUsers: number;
  systemLoad: number;
  errorRate: number;
  responseTime: number;
}

export interface UserPermission {
  module: string;
  actions: ('view' | 'create' | 'edit' | 'delete')[];
}

export interface ConsumerInsight {
  region: string;
  state: string;
  newCustomers: number;
  repeatCustomers: number;
  churnRate: number;
  avgLifetimeValue: number;
  satisfactionScore: number;
  preferredChannels: string[];
  seasonalTrends: SeasonalTrend[];
}

export interface SeasonalTrend {
  month: string;
  demandMultiplier: number;
  historicalData: number[];
}

export interface DistributorEngagement {
  distributorId: string;
  salesRepId: string;
  visits: number;
  meetings: number;
  followUps: number;
  responseTime: number;
  satisfactionScore: number;
  lastInteraction: string;
  nextScheduled: string;
}