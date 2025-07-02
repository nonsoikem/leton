import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, FileText, Filter, Eye } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [estimatesActualsView, setEstimatesActualsView] = useState('summary');
  const [filterColumn, setFilterColumn] = useState('all');

  // Sample data for demonstration
  const summaryData = {
    estimates: 125000,
    actuals: 137000
  };

  const itemLineData = [
    {
      itemLine: 'Development Phase 1',
      estCost: 45000,
      actCost: 48500,
      estRev: 65000,
      actRev: 68000,
      total: 19500,
      percentage: 28.7
    },
    {
      itemLine: 'Testing & QA',
      estCost: 25000,
      actCost: 27800,
      estRev: 35000,
      actRev: 38200,
      total: 10400,
      percentage: 27.2
    },
    {
      itemLine: 'Cloud Deployment',
      estCost: 15000,
      actCost: 16200,
      estRev: 25000,
      actRev: 30800,
      total: 14600,
      percentage: 47.4
    }
  ];

  const cashFlowData = [
    // Past data (actual)
    { month: 'Jan', inflow: 15000, outflow: -8000, net: 7000, type: 'actual' },
    { month: 'Feb', inflow: 22000, outflow: -12000, net: 10000, type: 'actual' },
    { month: 'Mar', inflow: 18000, outflow: -15000, net: 3000, type: 'actual' },
    { month: 'Apr', inflow: 28000, outflow: -18000, net: 10000, type: 'actual' },
    { month: 'May', inflow: 35000, outflow: -22000, net: 13000, type: 'actual' },
    { month: 'Jun', inflow: 30000, outflow: -20000, net: 10000, type: 'actual' },
    // Future projections
    { month: 'Jul', inflow: 32000, outflow: -21000, net: 11000, type: 'projected' },
    { month: 'Aug', inflow: 38000, outflow: -25000, net: 13000, type: 'projected' },
    { month: 'Sep', inflow: 42000, outflow: -28000, net: 14000, type: 'projected' },
    { month: 'Oct', inflow: 45000, outflow: -32000, net: 13000, type: 'projected' },
    { month: 'Nov', inflow: 40000, outflow: -29000, net: 11000, type: 'projected' },
    { month: 'Dec', inflow: 48000, outflow: -35000, net: 13000, type: 'projected' }
  ];

  const profitabilityData = [
    { name: 'Profit', value: summaryData.actuals - 100000, fill: '#10b981' },
    { name: 'Costs', value: 100000, fill: '#ef4444' }
  ];

  const totalCumulative = itemLineData.reduce((acc, item) => acc + item.total, 0);
  const avgProfitability = itemLineData.reduce((acc, item) => acc + item.percentage, 0) / itemLineData.length;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const StatCard = ({ title, value, trend, icon: Icon, color }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color === 'text-green-600' ? 'bg-green-100' : color === 'text-red-600' ? 'bg-red-100' : 'bg-blue-100'}`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
      </div>
      {trend && (
        <div className="flex items-center mt-2">
          {trend > 0 ? <TrendingUp className="w-4 h-4 text-green-500 mr-1" /> : <TrendingDown className="w-4 h-4 text-red-500 mr-1" />}
          <span className={`text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {Math.abs(trend)}% vs estimate
          </span>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Project X - Financials</h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">Financial monitoring and analysis dashboard</p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Active Project
              </div>
              <div className="text-left sm:text-right">
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="font-semibold text-gray-900">July 1, 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex justify-center space-x-1 bg-gray-100 p-1 rounded-xl mb-8 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: Eye },
            { id: 'estimates', label: 'Estimates vs Actuals', icon: FileText },
            { id: 'cashflow', label: 'Cash Flow Graph', icon: TrendingUp }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-3 sm:px-6 py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap text-sm sm:text-base ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.id === 'overview' ? 'Overview' : tab.id === 'estimates' ? 'Est/Act' : 'Cash Flow'}</span>
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Estimates"
                value={formatCurrency(summaryData.estimates)}
                icon={DollarSign}
                color="text-blue-600"
              />
              <StatCard
                title="Total Actuals"
                value={formatCurrency(summaryData.actuals)}
                trend={((summaryData.actuals - summaryData.estimates) / summaryData.estimates * 100).toFixed(1)}
                icon={DollarSign}
                color="text-green-600"
              />
              <StatCard
                title="Cumulative Profit"
                value={formatCurrency(totalCumulative)}
                icon={TrendingUp}
                color="text-green-600"
              />
              <StatCard
                title="Avg Profitability"
                value={`${avgProfitability.toFixed(1)}%`}
                icon={TrendingUp}
                color="text-blue-600"
              />
            </div>

            {/* Charts Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Profitability Breakdown</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={profitabilityData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {profitabilityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Cash Flow Trend</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={cashFlowData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Line type="monotone" dataKey="net" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Estimates vs Actuals Tab */}
        {activeTab === 'estimates' && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Financial Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                <div 
                  className={`p-4 sm:p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                    estimatesActualsView === 'estimates' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setEstimatesActualsView('estimates')}
                >
                  <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">Estimates</h3>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-600">{formatCurrency(summaryData.estimates)}</p>
                </div>
                <div 
                  className={`p-4 sm:p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                    estimatesActualsView === 'actuals' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setEstimatesActualsView('actuals')}
                >
                  <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">Actuals</h3>
                  <p className="text-2xl sm:text-3xl font-bold text-green-600">{formatCurrency(summaryData.actuals)}</p>
                </div>
              </div>
            </div>

            {/* Detailed Table */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {estimatesActualsView === 'estimates' ? 'Estimated Values' : 
                   estimatesActualsView === 'actuals' ? 'Actual Values' : 'Item Line Details'}
                </h3>
                <div className="flex items-center space-x-4">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <select 
                    value={filterColumn} 
                    onChange={(e) => setFilterColumn(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="all">All Columns</option>
                    <option value="costs">Costs Only</option>
                    <option value="revenue">Revenue Only</option>
                    <option value="profit">Profit Only</option>
                  </select>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 sm:px-4 font-semibold text-gray-700 text-sm">Item Line</th>
                      
                      {/* Show different columns based on selected view */}
                      {estimatesActualsView === 'summary' && (
                        <>
                          {(filterColumn === 'all' || filterColumn === 'costs') && (
                            <>
                              <th className="text-right py-3 px-2 sm:px-4 font-semibold text-gray-700 text-sm">Est Cost</th>
                              <th className="text-right py-3 px-2 sm:px-4 font-semibold text-gray-700 text-sm">Act Cost</th>
                            </>
                          )}
                          {(filterColumn === 'all' || filterColumn === 'revenue') && (
                            <>
                              <th className="text-right py-3 px-2 sm:px-4 font-semibold text-gray-700 text-sm">Est Rev</th>
                              <th className="text-right py-3 px-2 sm:px-4 font-semibold text-gray-700 text-sm">Act Rev</th>
                            </>
                          )}
                          {(filterColumn === 'all' || filterColumn === 'profit') && (
                            <>
                              <th className="text-right py-3 px-2 sm:px-4 font-semibold text-gray-700 text-sm">Total</th>
                              <th className="text-right py-3 px-2 sm:px-4 font-semibold text-gray-700 text-sm">%</th>
                            </>
                          )}
                        </>
                      )}
                      
                      {estimatesActualsView === 'estimates' && (
                        <>
                          {(filterColumn === 'all' || filterColumn === 'costs') && (
                            <th className="text-right py-3 px-2 sm:px-4 font-semibold text-blue-600 text-sm">Est Cost</th>
                          )}
                          {(filterColumn === 'all' || filterColumn === 'revenue') && (
                            <th className="text-right py-3 px-2 sm:px-4 font-semibold text-blue-600 text-sm">Est Revenue</th>
                          )}
                          {(filterColumn === 'all' || filterColumn === 'profit') && (
                            <th className="text-right py-3 px-2 sm:px-4 font-semibold text-blue-600 text-sm">Est Profit</th>
                          )}
                        </>
                      )}
                      
                      {estimatesActualsView === 'actuals' && (
                        <>
                          {(filterColumn === 'all' || filterColumn === 'costs') && (
                            <th className="text-right py-3 px-2 sm:px-4 font-semibold text-green-600 text-sm">Act Cost</th>
                          )}
                          {(filterColumn === 'all' || filterColumn === 'revenue') && (
                            <th className="text-right py-3 px-2 sm:px-4 font-semibold text-green-600 text-sm">Act Revenue</th>
                          )}
                          {(filterColumn === 'all' || filterColumn === 'profit') && (
                            <th className="text-right py-3 px-2 sm:px-4 font-semibold text-green-600 text-sm">Act Profit</th>
                          )}
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {itemLineData.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-3 sm:py-4 px-2 sm:px-4 font-medium text-gray-900 text-sm">{item.itemLine}</td>
                        
                        {/* Summary view - show all columns */}
                        {estimatesActualsView === 'summary' && (
                          <>
                            {(filterColumn === 'all' || filterColumn === 'costs') && (
                              <>
                                <td className="py-3 sm:py-4 px-2 sm:px-4 text-right text-gray-700 text-sm">{formatCurrency(item.estCost)}</td>
                                <td className="py-3 sm:py-4 px-2 sm:px-4 text-right text-gray-700 text-sm">{formatCurrency(item.actCost)}</td>
                              </>
                            )}
                            {(filterColumn === 'all' || filterColumn === 'revenue') && (
                              <>
                                <td className="py-3 sm:py-4 px-2 sm:px-4 text-right text-gray-700 text-sm">{formatCurrency(item.estRev)}</td>
                                <td className="py-3 sm:py-4 px-2 sm:px-4 text-right text-gray-700 text-sm">{formatCurrency(item.actRev)}</td>
                              </>
                            )}
                            {(filterColumn === 'all' || filterColumn === 'profit') && (
                              <>
                                <td className="py-3 sm:py-4 px-2 sm:px-4 text-right font-semibold text-green-600 text-sm">{formatCurrency(item.total)}</td>
                                <td className="py-3 sm:py-4 px-2 sm:px-4 text-right font-semibold text-green-600 text-sm">{item.percentage}%</td>
                              </>
                            )}
                          </>
                        )}
                        
                        {/* Estimates view - show only estimated values */}
                        {estimatesActualsView === 'estimates' && (
                          <>
                            {(filterColumn === 'all' || filterColumn === 'costs') && (
                              <td className="py-3 sm:py-4 px-2 sm:px-4 text-right font-semibold text-blue-600 text-sm">{formatCurrency(item.estCost)}</td>
                            )}
                            {(filterColumn === 'all' || filterColumn === 'revenue') && (
                              <td className="py-3 sm:py-4 px-2 sm:px-4 text-right font-semibold text-blue-600 text-sm">{formatCurrency(item.estRev)}</td>
                            )}
                            {(filterColumn === 'all' || filterColumn === 'profit') && (
                              <td className="py-3 sm:py-4 px-2 sm:px-4 text-right font-semibold text-blue-600 text-sm">{formatCurrency(item.estRev - item.estCost)}</td>
                            )}
                          </>
                        )}
                        
                        {/* Actuals view - show only actual values */}
                        {estimatesActualsView === 'actuals' && (
                          <>
                            {(filterColumn === 'all' || filterColumn === 'costs') && (
                              <td className="py-3 sm:py-4 px-2 sm:px-4 text-right font-semibold text-green-600 text-sm">{formatCurrency(item.actCost)}</td>
                            )}
                            {(filterColumn === 'all' || filterColumn === 'revenue') && (
                              <td className="py-3 sm:py-4 px-2 sm:px-4 text-right font-semibold text-green-600 text-sm">{formatCurrency(item.actRev)}</td>
                            )}
                            {(filterColumn === 'all' || filterColumn === 'profit') && (
                              <td className="py-3 sm:py-4 px-2 sm:px-4 text-right font-semibold text-green-600 text-sm">{formatCurrency(item.total)}</td>
                            )}
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Cash Flow Tab */}
        {activeTab === 'cashflow' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Cash Flow Analysis</h2>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Monitor money flow and identify potential liquidity obstacles through past performance and future projections.</p>
              
              {/* Timeline indicator */}
              <div className="flex items-center justify-center mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-8">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-600 rounded"></div>
                    <span className="text-xs sm:text-sm font-medium text-gray-700">Past Performance (Jan-Jun)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-400 rounded border-2 border-blue-600"></div>
                    <span className="text-xs sm:text-sm font-medium text-gray-700">Future Projections (Jul-Dec)</span>
                  </div>
                </div>
              </div>
              
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={cashFlowData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip 
                    formatter={(value, name) => [formatCurrency(Math.abs(value)), name === 'inflow' ? 'Inflow' : name === 'outflow' ? 'Outflow' : 'Net Flow']}
                    labelFormatter={(label) => {
                      const dataPoint = cashFlowData.find(d => d.month === label);
                      return `${label} ${dataPoint?.type === 'projected' ? '(Projected)' : '(Actual)'}`;
                    }}
                  />
                  <Bar dataKey="inflow" fill="#10b981" name="inflow" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="outflow" fill="#ef4444" name="outflow" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="net" fill="#3b82f6" name="net" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
                <div className="text-center p-3 sm:p-4 bg-green-50 rounded-lg">
                  <div className="text-xl sm:text-2xl font-bold text-green-600">
                    {formatCurrency(cashFlowData.reduce((acc, item) => acc + item.inflow, 0))}
                  </div>
                  <div className="text-green-700 font-medium text-sm sm:text-base">Total Inflows (12 months)</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Past: {formatCurrency(cashFlowData.filter(d => d.type === 'actual').reduce((acc, item) => acc + item.inflow, 0))} | 
                    Projected: {formatCurrency(cashFlowData.filter(d => d.type === 'projected').reduce((acc, item) => acc + item.inflow, 0))}
                  </div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-red-50 rounded-lg">
                  <div className="text-xl sm:text-2xl font-bold text-red-600">
                    {formatCurrency(Math.abs(cashFlowData.reduce((acc, item) => acc + item.outflow, 0)))}
                  </div>
                  <div className="text-red-700 font-medium text-sm sm:text-base">Total Outflows (12 months)</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Past: {formatCurrency(Math.abs(cashFlowData.filter(d => d.type === 'actual').reduce((acc, item) => acc + item.outflow, 0)))} | 
                    Projected: {formatCurrency(Math.abs(cashFlowData.filter(d => d.type === 'projected').reduce((acc, item) => acc + item.outflow, 0)))}
                  </div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-lg">
                  <div className="text-xl sm:text-2xl font-bold text-blue-600">
                    {formatCurrency(cashFlowData.reduce((acc, item) => acc + item.net, 0))}
                  </div>
                  <div className="text-blue-700 font-medium text-sm sm:text-base">Net Cash Flow (12 months)</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Past: {formatCurrency(cashFlowData.filter(d => d.type === 'actual').reduce((acc, item) => acc + item.net, 0))} | 
                    Projected: {formatCurrency(cashFlowData.filter(d => d.type === 'projected').reduce((acc, item) => acc + item.net, 0))}
                  </div>
                </div>
              </div>

              {/* Liquidity Alert */}
              <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-amber-400 rounded-full"></div>
                  <h4 className="font-semibold text-amber-800 text-sm sm:text-base">Liquidity Analysis</h4>
                </div>
                <p className="text-amber-700 mt-2 text-xs sm:text-sm">
                  Based on projections, potential liquidity challenges may occur in October due to increased outflows. 
                  Consider adjusting payment schedules or securing additional funding to maintain optimal cash flow.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;