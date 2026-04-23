import { Zap } from 'lucide-react';

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary/10 border-t-primary rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Zap size={24} className="text-primary fill-primary animate-pulse" />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-xl font-black tracking-tighter gradient-text">TradeNest</span>
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground animate-pulse mt-2">
          Loading Elite Knowledge...
        </p>
      </div>
    </div>
  );
}
