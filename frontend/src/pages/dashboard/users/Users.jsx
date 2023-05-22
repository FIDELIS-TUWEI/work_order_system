import { useEffect } from "react";

export default function Users({ setSelectedLink, link }) {
  // useEffect hook
  useEffect(() => {
    setSelectedLink(link);
  }, []);
  
  return (
    <div>Users</div>
  )
}
