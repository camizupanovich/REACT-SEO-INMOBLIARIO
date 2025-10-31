// src/pages/Admin.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { BackofficeLayout } from "./components/BackofficeLayout";
import { PropertiesAdmin } from "./pages/PropertiesAdmin";
import { PropertyEditor } from "./pages/PropertiesEditor";
// import { BlogAdmin } from "./pages/BlogAdmin";

export const Admin = () => {
  return (
    <BackofficeLayout>
      <Routes>
        <Route index element={<Navigate to="properties" />} />
        <Route path="properties" element={<PropertiesAdmin />} />
        <Route path="properties/new" element={<PropertyEditor />} />
        <Route path="properties/:id" element={<PropertyEditor />} />
        {/* <Route path="blog" element={<BlogAdmin />} /> */}
      </Routes>
    </BackofficeLayout>
  );
};
