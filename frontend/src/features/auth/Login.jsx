import { SignIn } from "@clerk/clerk-react";

export default function Login() {
  return (
    <div className="flex min-h-screen bg-[#0A0D12] text-white">
      {/* Left Panel - Visual/Brand Area */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#0E131A] items-center justify-center border-r border-white/10 overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00E5FF] rounded-full opacity-10 blur-[100px]"></div>
        
        <div className="relative z-10 p-12 max-w-lg">
          <h1 className="text-5xl font-bold font-['Sora'] tracking-tight mb-6">
            DriveSphere
          </h1>
          <p className="text-lg text-gray-400 font-['Plus_Jakarta_Sans'] leading-relaxed mb-8">
            The apex marketplace for high-performance mobility. Access exclusive allocations, verified telemetry, and digital chassis passes.
          </p>
          
          <div className="grid grid-cols-2 gap-6 mt-12">
            <div className="border border-white/10 bg-white/5 rounded-lg p-4 backdrop-blur-md">
              <div className="text-[#00E5FF] text-sm font-['Space_Grotesk'] tracking-widest mb-1 uppercase">Network</div>
              <div className="text-xl font-semibold">Verified</div>
            </div>
            <div className="border border-white/10 bg-white/5 rounded-lg p-4 backdrop-blur-md">
              <div className="text-[#00E5FF] text-sm font-['Space_Grotesk'] tracking-widest mb-1 uppercase">Security</div>
              <div className="text-xl font-semibold">256-bit</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 relative z-10">
        <div className="w-full max-w-md">
          <SignIn 
            routing="path" 
            path="/login" 
            signUpUrl="/signup" 
            appearance={{
              elements: {
                rootBox: "w-full",
                cardBox: "w-full shadow-none",
                card: "bg-transparent shadow-none w-full p-0",
                headerTitle: "text-3xl font-bold font-['Sora'] text-white mb-2",
                headerSubtitle: "text-gray-400 font-['Plus_Jakarta_Sans']",
                socialButtonsBlockButton: "bg-[#0E131A] border border-white/10 text-white hover:border-[#2979FF] hover:bg-white/5 transition-all h-12",
                socialButtonsBlockButtonText: "font-semibold",
                dividerLine: "bg-white/10",
                dividerText: "text-gray-500",
                formFieldLabel: "text-gray-300 font-['Space_Grotesk'] uppercase tracking-wider text-xs font-semibold mb-2",
                formFieldInput: "bg-[#0E131A] border border-white/10 text-white focus:border-[#2979FF] focus:ring-1 focus:ring-[#2979FF] rounded-md transition-all py-3 px-4",
                formButtonPrimary: "bg-[#00E5FF] hover:bg-[#00b3cc] text-[#0A0D12] font-bold py-3 rounded-md transition-all font-['Sora'] shadow-[0_0_20px_rgba(0,229,255,0.2)] hover:shadow-[0_0_25px_rgba(0,229,255,0.4)] text-base mt-2",
                footerActionText: "text-gray-400",
                footerActionLink: "text-[#00E5FF] hover:text-[#00b3cc] transition-colors font-semibold",
                identityPreviewText: "text-white",
                identityPreviewEditButtonIcon: "text-[#00E5FF]",
                formFieldAction: "text-[#00E5FF] hover:text-[#00b3cc] transition-colors"
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
