import React, { useState } from "react";
import Providers from "@/components/Providers";

import type { SelectedPageType } from "@/shared/types";
import { Navbar } from "./components/navbar/Index";
import Hero from "./components/hero/Index";

const App: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState<SelectedPageType>("Pomodoro");

  return (
    <Providers>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Navbar setSelectedPage={setSelectedPage} />
        <main>
          
          <Hero setSelectedPage={setSelectedPage} />
        </main>
      </div>
    </Providers>
  );
};

export default App;
