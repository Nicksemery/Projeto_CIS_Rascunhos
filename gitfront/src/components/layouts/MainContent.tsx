import type { ReactNode } from "react";

interface MainContentProps {
  children: ReactNode;
}

const MainContent = ({ children }: MainContentProps) => {
  return (
    <div className="w-full lg:flex-1 flex flex-col h-full overflow-hidden">
      {/* Page Content */}
      <main
        className="flex-1 overflow-y-auto bg-white rounded-t-xl p-4 lg:p-6 pb-32 lg:pb-6 mb-0"
        style={{
          boxShadow: "0 6px 18px rgba(18,18,18,0.06)",
          border: "1px solid #E6E7EA",
          borderBottom: "none",
          borderBottomLeftRadius: "0",
          borderBottomRightRadius: "0",
          marginBottom: "0",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default MainContent;
