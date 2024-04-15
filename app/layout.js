

import { AuthContext } from "./_utils/auth-context"; // Adjust the path as needed

export default function MainLayout({ children }) {
  return (
    <AuthContext>
      {children}
    </AuthContext>
  );
}