import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export function PageTitle() {
  const [subtitle, setSubtitle] = useState("");

  useEffect(() => {
    async function fetchSubtitle() {
      const { data, error } = await supabase
        .from("site_content")
        .select("value")
        .eq("key", "jobs_subtitle")
        .single();

      if (error) {
        console.error("Error fetching subtitle:", error);
        return;
      }

      if (data) {
        setSubtitle(data.value);
      }
    }

    fetchSubtitle();
  }, []);

  return (
    <div className="mb-6">
      <h1 className="text-[28px] font-semibold text-[#1C1917]">
        UX & Product Design Jobs
      </h1>

      <p className="mt-2 text-[14px] text-[#78716C]">
        {subtitle}
      </p>
    </div>
  );
}
