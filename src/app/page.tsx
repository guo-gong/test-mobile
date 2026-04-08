"use client";

import React, { useState } from "react";
import { 
  Bell, 
  Calendar, 
  Search, 
  Plus, 
  Wallet, 
  Clock, 
  User, 
  CreditCard, 
  ShieldCheck,
  LayoutDashboard,
  Eye,
  HelpCircle,
  Banknote,
  Building2,
  ChevronRight,
  TrendingUp,
  Filter
} from "lucide-react";

// --- Mock Data ---
const MERCHANTS = [
  { id: 1, name: "Alpha 游戏", expected: 8000000, dispatched: 2500000, progress: 31, active: true },
  { id: 2, name: "Beta 跨境", expected: 5000000, dispatched: 1200000, progress: 24, active: false },
  { id: 3, name: "Gamma 电商", expected: 12000000, dispatched: 9000000, progress: 75, active: false },
];

const ORDERS = [
  { id: "MO-A88310", sysId: "SYS:PO-20260406-001", amount: 50000, time: "25m", user: "王大明", card: "822-1234567890" },
  { id: "MO-A88311", sysId: "SYS:PO-20260406-002", amount: 125000, time: "18m", user: "李小美", card: "621-0987654321" },
  { id: "MO-A88312", sysId: "SYS:PO-20260406-003", amount: 30000, time: "12m", user: "张伟", card: "533-1122334455" },
];

const AGENTS = [
  { 
    id: 1, 
    name: "张三", 
    status: "营业中", 
    totalAvailable: 5500000, 
    channels: [
      { name: "A银行网银", type: "网银", available: 3000000 },
      { name: "支付宝专线", type: "三方", available: 2500000 }
    ]
  },
  { 
    id: 2, 
    name: "李四", 
    status: "休息中", 
    totalAvailable: 1200000, 
    channels: [
      { name: "B银行网银", type: "网银", available: 1200000 }
    ]
  }
];

export default function CapitalDispatchCommandCenter() {
  const [searchText, setSearchText] = useState("");
  const [selectedMerchant, setSelectedMerchant] = useState(1);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  const toggleOrder = (id: string) => {
    setSelectedOrders(prev => 
      prev.includes(id) ? prev.filter(oid => oid !== id) : [...prev, id]
    );
  };

  const toggleAllOrders = () => {
    if (selectedOrders.length === ORDERS.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(ORDERS.map(o => o.id));
    }
  };

  const totalSelected = ORDERS
    .filter(o => selectedOrders.includes(o.id))
    .reduce((sum, o) => sum + o.amount, 0);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans antialiased">
      
      {/* --- Header & Top Summary --- */}
      <div className="bg-[#040b1c] text-white overflow-hidden relative">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#3b82f6_0%,transparent_50%)]"></div>
        </div>

        {/* Top Navbar */}
        <header className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-8 h-8 bg-[#5551ff] rounded shadow-[0_0_15px_rgba(85,81,255,0.5)] flex items-center justify-center transition-transform group-hover:scale-110">
              <GlobeIcon className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">资金调度指挥中心</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="hidden md:flex items-center gap-2 bg-[#d93a3a]/10 hover:bg-[#d93a3a]/20 text-[#ff4d4f] px-4 py-2 rounded-full border border-[#d93a3a]/30 text-sm font-medium transition-all cursor-pointer active:scale-95">
              <Bell className="w-4 h-4 animate-pulse" />
              <span>异常报表 (3)</span>
            </button>
            <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white/90 px-4 py-2 rounded-full border border-white/10 text-sm font-medium transition-all cursor-pointer active:scale-95">
              <Calendar className="w-4 h-4" />
              <span>每日报表</span>
            </button>
            <div className="w-9 h-9 bg-[#5551ff] rounded-full flex items-center justify-center text-sm font-bold cursor-pointer hover:ring-2 hover:ring-white/50 transition-all shadow-lg">
              A1
            </div>
          </div>
        </header>

        {/* Top Metrics Area */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 items-center py-12 px-10 gap-8 md:gap-0">
          <div className="text-center relative md:border-r md:border-white/10">
            <p className="text-white/50 text-xs uppercase tracking-widest font-bold mb-3">上线渠道可用总资金</p>
            <div className="flex items-center justify-center gap-3">
              <h2 className="text-4xl lg:text-5xl font-black tracking-tighter tabular-nums">$12,450,000</h2>
              <TrendingUp className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
          
          <div className="text-center relative md:border-r md:border-white/10">
            <p className="text-white/50 text-xs uppercase tracking-widest font-bold mb-3">今日商户预计调度总额</p>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter tabular-nums">$8,000,000</h2>
          </div>
          
          <div className="flex flex-col items-center justify-center">
            <p className="text-white/50 text-xs uppercase tracking-widest font-bold mb-3">大盘供需健康度</p>
            <div className="flex items-center gap-3 bg-[#0d2822] text-[#10b981] px-6 py-2.5 rounded-full border border-[#10b981]/30 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-sm font-black tracking-wide">资金水位充足</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- Middle Merchant Cards Section --- */}
      <div className="px-6 py-6 flex flex-col gap-6 -mt-8 relative z-20">
        <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 min-h-[180px] items-stretch">
          
          {/* Sidebar Tabs */}
          <div className="w-full md:w-52 flex md:flex-col justify-between items-center md:items-start border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0 md:pr-6 gap-4">
            <div className="flex items-center gap-3 text-[#5551ff] font-black uppercase text-xs tracking-wider">
              <div className="w-8 h-8 bg-[#5551ff]/10 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-4 h-4" />
              </div>
              <span>商户看板</span>
            </div>
            <button className="flex items-center justify-center gap-2 bg-white border-2 border-[#5551ff] text-[#5551ff] font-bold py-2.5 px-6 rounded-xl hover:bg-[#5551ff] hover:text-white transition-all duration-300 text-sm shadow-sm active:scale-95 group">
              <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
              <span>新增商户</span>
            </button>
          </div>

          {/* Cards Scrollable Area */}
          <div className="flex-1 flex gap-5 overflow-x-auto scrollbar-hide pb-2 px-1">
            {/* View All Card */}
            <div className="w-44 flex-shrink-0 bg-gradient-to-br from-[#5551ff] to-[#3b37ff] text-white rounded-2xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer hover:shadow-[0_15px_30px_rgba(85,81,255,0.3)] hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                <Eye className="w-6 h-6" />
              </div>
              <span className="font-bold text-lg tracking-tight">全视角</span>
              <span className="text-[10px] font-black bg-white/20 px-3 py-1 rounded-full uppercase tracking-widest">待处理 8 笔</span>
            </div>

            {/* Merchant Cards */}
            {MERCHANTS.map((m) => (
              <div 
                key={m.id}
                onClick={() => setSelectedMerchant(m.id)}
                className={`min-w-[320px] bg-white rounded-2xl p-6 border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between hover:shadow-xl ${
                  selectedMerchant === m.id 
                  ? "border-[#5551ff] shadow-[0_10px_25px_rgba(85,81,255,0.1)] -translate-y-1" 
                  : "border-transparent shadow-sm grayscale opacity-70 hover:grayscale-0 hover:opacity-100"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-black text-xl mb-1 text-gray-900">{m.name}</h3>
                    <p className="text-gray-400 text-xs font-medium">预计调度 <span className="text-gray-600 font-bold tabular-nums">${m.expected.toLocaleString()}</span></p>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-9 h-9 bg-blue-50 text-[#5551ff] rounded-xl flex items-center justify-center shadow-sm">
                      <Banknote className="w-5 h-5" />
                    </div>
                    <div className="w-9 h-9 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center border border-gray-100">
                      <HelpCircle className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">已派发金额</span>
                    <span className="text-lg font-black text-[#5551ff] tabular-nums">{m.progress}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className="h-full bg-gradient-to-r from-[#5551ff] to-[#7c79ff] rounded-full transition-all duration-1000 ease-out" 
                      style={{ width: `${m.progress}%` }}
                    ></div>
                  </div>
                  <p className="mt-3 text-sm font-bold text-gray-800 tabular-nums">${m.dispatched.toLocaleString()}</p>
                </div>
              </div>
            ))}

            {/* Placeholder */}
            <div className="min-w-[200px] bg-gray-50/50 rounded-2xl p-6 border border-dashed border-gray-300 flex items-center justify-center text-gray-400 font-bold text-sm text-center px-10">
              更多商户<br/>接入中...
            </div>
          </div>
        </div>
      </div>

      {/* --- Bottom Main Content --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 pb-12">
        
        {/* Left Column: Order Dispatch Pool */}
        <div className="bg-[#fffaf5] rounded-[2.5rem] p-8 border border-orange-100 shadow-sm flex flex-col gap-6 transition-all hover:shadow-md">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-[#ff7d00] shadow-sm">
                <Wallet className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                  订单派发池 
                  <span className="bg-[#ff7d00] text-white text-[10px] px-2 py-1 rounded-md uppercase font-black tracking-widest">8 笔</span>
                </h3>
              </div>
            </div>
            <div className="bg-white text-[#ff7d00] px-4 py-2 rounded-xl border border-orange-200 text-xs font-black shadow-sm flex items-center gap-2">
              <Clock className="w-4 h-4" />
              逾时阈值: 20m
            </div>
          </div>

          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#ff7d00] transition-colors" />
            <input 
              type="text" 
              placeholder="搜索系统/商户单号、姓名..." 
              className="w-full bg-white border-2 border-orange-100/50 rounded-[1.25rem] py-4 pl-14 pr-6 focus:outline-none focus:border-[#ff7d00]/30 focus:ring-4 focus:ring-orange-500/5 transition-all text-sm font-medium shadow-inner"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-orange-50 rounded-lg transition-colors">
              <Filter className="w-4 h-4 text-orange-400" />
            </button>
          </div>

          <div className="flex items-center justify-between px-3 text-xs text-gray-400 font-black uppercase tracking-widest pb-4 border-b border-orange-100/50">
            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={toggleAllOrders}
            >
              <div className={`w-6 h-6 rounded-lg border-2 transition-all bg-white flex items-center justify-center ${selectedOrders.length === ORDERS.length ? 'border-[#ff7d00] bg-orange-50' : 'border-orange-200 group-hover:border-[#ff7d00]'}`}>
                {selectedOrders.length === ORDERS.length && <div className="w-3 h-3 bg-[#ff7d00] rounded-[2px]" />}
              </div>
              <span className={selectedOrders.length === ORDERS.length ? 'text-[#ff7d00]' : ''}>全选 ({selectedOrders.length})</span>
            </div>
            <div className="text-gray-900 flex items-baseline gap-2">
              总额 <span className="text-[#ff7d00] text-2xl font-black tabular-nums">${totalSelected.toLocaleString()}</span>
            </div>
          </div>

          {/* Order List */}
          <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-hide">
            {ORDERS.map((order, idx) => (
              <div 
                key={order.id} 
                onClick={() => toggleOrder(order.id)}
                className={`bg-white rounded-2xl p-6 shadow-sm border-2 transition-all cursor-pointer group ${selectedOrders.includes(order.id) ? 'border-[#ff7d00] shadow-md' : 'border-transparent hover:border-orange-200 hover:shadow-lg'}`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex justify-between items-start mb-5">
                  <div className="flex items-center gap-4">
                    <div className={`w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center ${selectedOrders.includes(order.id) ? 'border-[#ff7d00] bg-orange-50' : 'border-gray-200 group-hover:border-[#ff7d00]'}`}>
                      {selectedOrders.includes(order.id) && <div className="w-3 h-3 bg-[#ff7d00] rounded-[2px]" />}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-black text-gray-900 tracking-tight">{order.id}</span>
                        <span className="text-[9px] font-black text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md uppercase border border-gray-100 tracking-tighter">{order.sysId}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 text-xs font-black px-3 py-1 rounded-full ${parseInt(order.time) > 20 ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-400'}`}>
                    <Clock className="w-3.5 h-3.5" />
                    <span>{order.time}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                  <div className="text-4xl font-black text-gray-900 tracking-tighter tabular-nums">${order.amount.toLocaleString()}</div>
                  <div className="bg-orange-50/50 rounded-2xl p-4 flex flex-col gap-2 min-w-[180px] border border-orange-100/30">
                    <div className="flex items-center gap-3 text-xs font-bold text-gray-600">
                      <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center text-orange-400 shadow-sm">
                        <User className="w-3.5 h-3.5" />
                      </div>
                      <span>{order.user}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-bold text-[#5551ff]">
                      <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center text-blue-400 shadow-sm">
                        <CreditCard className="w-3.5 h-3.5" />
                      </div>
                      <span className="tabular-nums">{order.card}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full py-4 bg-white border-2 border-orange-200 text-orange-500 font-black rounded-2xl hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all active:scale-[0.98] shadow-sm uppercase tracking-widest text-xs">
            加载更多订单
          </button>
        </div>

        {/* Right Column: Agent Channel Resource Pool */}
        <div className="bg-[#f0f8ff] rounded-[2.5rem] p-8 border border-blue-100 shadow-sm flex flex-col gap-6 transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-[#5551ff]">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center shadow-sm">
                <Building2 className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black tracking-tight">代理渠道资源池</h3>
            </div>
            <button className="p-2 hover:bg-blue-50 rounded-full transition-colors">
              <ChevronRight className="w-6 h-6 text-blue-400" />
            </button>
          </div>

          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#5551ff] transition-colors" />
            <input 
              type="text" 
              placeholder="搜索代理名称或渠道代码..." 
              className="w-full bg-white border-2 border-blue-100/50 rounded-[1.25rem] py-4 pl-14 pr-6 focus:outline-none focus:border-[#5551ff]/30 focus:ring-4 focus:ring-blue-500/5 transition-all text-sm font-medium shadow-inner"
            />
          </div>

          {/* Agent List */}
          <div className="flex flex-col gap-6 max-h-[650px] overflow-y-auto pr-2 scrollbar-hide">
            {AGENTS.map((agent) => (
              <div key={agent.id} className="bg-white rounded-[2rem] p-8 shadow-sm border border-transparent hover:border-blue-200 hover:shadow-xl transition-all duration-500">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-8 gap-4">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center text-[#5551ff] text-3xl font-black border-2 border-white shadow-lg">
                      {agent.name[0]}
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-gray-900 mb-2">{agent.name}</h4>
                      <div className={`flex items-center gap-2 text-[10px] font-black px-3 py-1 rounded-full w-fit uppercase tracking-widest border ${
                        agent.status === "营业中" 
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                        : "bg-gray-50 text-gray-400 border-gray-100"
                      }`}>
                        <div className={`w-2 h-2 rounded-full ${agent.status === "营业中" ? "bg-emerald-500 animate-pulse" : "bg-gray-300"}`}></div>
                        {agent.status}
                      </div>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-[10px] text-blue-400 font-black uppercase mb-1 tracking-widest">代理可用总额</p>
                    <p className="text-4xl font-black text-[#1e293b] tracking-tighter tabular-nums">${agent.totalAvailable.toLocaleString()}</p>
                  </div>
                </div>

                {/* Sub-items: Bank Channels */}
                <div className="flex flex-col gap-3">
                  {agent.channels.map((channel, cIdx) => (
                    <div 
                      key={cIdx}
                      className="bg-gray-50/50 rounded-2xl p-5 border border-gray-100 flex items-center justify-between group hover:bg-blue-50 hover:border-blue-200 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100 group-hover:scale-110 transition-transform group-hover:border-blue-100">
                          {channel.type === "网银" ? <Building2 className="w-6 h-6 text-[#5551ff]" /> : <Wallet className="w-6 h-6 text-emerald-500" />}
                        </div>
                        <div>
                          <p className="font-black text-gray-900 tracking-tight">{channel.name}</p>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{channel.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-gray-400 font-black uppercase mb-1 tracking-widest">可用余额</p>
                        <p className="text-xl font-black text-gray-800 tracking-tight tabular-nums">${channel.available.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Custom Icon Components
function GlobeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      {...props} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}
