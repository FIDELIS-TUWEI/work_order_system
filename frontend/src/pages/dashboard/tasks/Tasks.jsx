import { useEffect } from "react";

export default function Tasks({ setSelectedLink, link }) {
  // useEffect hook
  useEffect(() => {
    setSelectedLink(link);
  }, []);

  return (
    <div>Tasks</div>
  )
}
