import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import type { ChaiTalk } from "./ChaiTalks";
import { ChaiTalkDetailUI } from "../components/figma/chai-talks/ChaiTalkDetailUI";

const STORAGE_KEY = "designerscolony_chai_talks";

export default function ChaiTalkDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [talk, setTalk] = useState<ChaiTalk | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored || !id) {
      navigate("/chai-talks");
      return;
    }

    const talks: ChaiTalk[] = JSON.parse(stored);
    const found = talks.find((t) => t.id === id);

    if (!found) {
      navigate("/chai-talks");
      return;
    }

    setTalk(found);
  }, [id, navigate]);

  if (!talk) return null;

  /* ---------- Actions ---------- */

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Chai Talk?"
    );

    if (!confirmed) return;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    const talks: ChaiTalk[] = JSON.parse(stored);
    const updated = talks.filter((t) => t.id !== talk.id);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    navigate("/chai-talks");
  };

  const handleEdit = () => {
    navigate(`/chai-talks/${talk.id}/edit`);
  };

  /* ---------- Render ---------- */

  return (
    <ChaiTalkDetailUI
      title={talk.title}
      description={talk.about}
      city={talk.city}
      mode={talk.type}
      date={`${talk.date} · ${talk.time}`}
      hostName={talk.hostedBy}
      locationOrJoin={talk.locationOrJoinLink}
      onBack={() => navigate("/chai-talks")}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}
