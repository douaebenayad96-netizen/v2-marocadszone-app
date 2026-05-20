import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import CompanyNotificationNote from "../../components/company/CompanyNotificationNote";
import { useAuthStore } from "../../services/store/authStore";
import { useUserAnnonces } from "../../services/api/fetchAnnonce";
import { Annonce } from "../../services/types/annonce";
import { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import { apiClientV2 } from "../../services/config/axiosConfig";
import getLocalized from '../../utils/getLocalized';

// Fonction pour traduire la date
const getTranslatedDate = (dateString: string | undefined, lang: string) => {
  if (!dateString) return "";
  
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (lang === "ar") {
    // Secondes
    if (diffSecs < 5) return "الآن";
    if (diffSecs < 60) return `منذ ${diffSecs} ثانية`;
    // Minutes
    if (diffMins < 60) {
      if (diffMins === 1) return "منذ دقيقة واحدة";
      return `منذ ${diffMins} دقائق`;
    }
    // Heures
    if (diffHours < 24) {
      if (diffHours === 1) return "منذ ساعة واحدة";
      return `منذ ${diffHours} ساعات`;
    }
    // Jours
    if (diffDays === 1) return "منذ يوم واحد";
    if (diffDays < 7) return `منذ ${diffDays} أيام`;
    // Semaines
    if (diffWeeks === 1) return "منذ أسبوع واحد";
    if (diffWeeks < 4) return `منذ ${diffWeeks} أسابيع`;
    // Mois
    if (diffMonths === 1) return "منذ شهر واحد";
    if (diffMonths < 12) return `منذ ${diffMonths} أشهر`;
    // Années
    if (diffYears === 1) return "منذ سنة واحدة";
    return `منذ ${diffYears} سنوات`;
  } 
  else if (lang === "en") {
    // Seconds
    if (diffSecs < 5) return "just now";
    if (diffSecs < 60) return `${diffSecs} seconds ago`;
    // Minutes
    if (diffMins < 60) {
      if (diffMins === 1) return "1 minute ago";
      return `${diffMins} minutes ago`;
    }
    // Hours
    if (diffHours < 24) {
      if (diffHours === 1) return "1 hour ago";
      return `${diffHours} hours ago`;
    }
    // Days
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    // Weeks
    if (diffWeeks === 1) return "1 week ago";
    if (diffWeeks < 4) return `${diffWeeks} weeks ago`;
    // Months
    if (diffMonths === 1) return "1 month ago";
    if (diffMonths < 12) return `${diffMonths} months ago`;
    // Years
    if (diffYears === 1) return "1 year ago";
    return `${diffYears} years ago`;
  } 
  else {
    // Français
    // Secondes
    if (diffSecs < 5) return "à l'instant";
    if (diffSecs < 60) return `il y a ${diffSecs} secondes`;
    // Minutes
    if (diffMins < 60) {
      if (diffMins === 1) return "il y a 1 minute";
      return `il y a ${diffMins} minutes`;
    }
    // Heures
    if (diffHours < 24) {
      if (diffHours === 1) return "il y a 1 heure";
      return `il y a ${diffHours} heures`;
    }
    // Jours
    if (diffDays === 1) return "il y a 1 jour";
    if (diffDays < 7) return `il y a ${diffDays} jours`;
    // Semaines
    if (diffWeeks === 1) return "il y a 1 semaine";
    if (diffWeeks < 4) return `il y a ${diffWeeks} semaines`;
    // Mois
    if (diffMonths === 1) return "il y a 1 mois";
    if (diffMonths < 12) return `il y a ${diffMonths} mois`;
    // Années
    if (diffYears === 1) return "il y a 1 an";
    return `il y a ${diffYears} ans`;
  }
};

const AnnoncesListPage = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="app-container"
    >
      <div className="py-4 md:p-12">
        <div className="flex justify-between items-center">
          <h1 className="title-h2">{t("annonces_page.title")}</h1>
          <Link
            to="/annonces/new"
            className="text-primary-orange underline font-semibold hover:text-primary-orange/80 transition-all flex items-center justify-center gap-2"
          >
            {t("annonces_page.publish_new")}
          </Link>
        </div>
        <div className="py-2 justify-center items-center">
          <div className="mt-8 space-y-4">
            <CompanyNotificationNote />
            <AnnoncesList />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ConfirmDeleteModal = ({
  onConfirm,
  onCancel,
  message,
  cancelLabel,
  deleteLabel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
  cancelLabel: string;
  deleteLabel: string;
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
    <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md border-2 border-primary-orange relative">
      <div className="flex flex-col items-center">
        <svg
          className="w-14 h-14 text-primary-orange mb-3"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
          />
        </svg>
        <div className="mb-5 text-lg font-semibold text-primary-orange text-center">
          {message}
        </div>
        <div className="flex justify-center gap-4 w-full">
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded bg-white border border-primary-orange text-primary-orange font-semibold hover:bg-primary-orange hover:text-white transition-all shadow"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded bg-primary-orange text-white font-semibold hover:bg-orange-600 transition-all shadow flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 7h12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3m2 0v13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7h12z"
              />
            </svg>
            {deleteLabel}
          </button>
        </div>
      </div>
      <button
        onClick={onCancel}
        className="absolute top-3 right-3 text-primary-orange hover:text-orange-700 text-2xl leading-none"
      >
        &times;
      </button>
    </div>
  </div>
);

type Subcategory = {
  id: number;
  category_id: number;
  name?: string;
  title?: string;
  label?: string;
};

type Category = {
  id: number;
  name?: string;
  title?: string;
  label?: string;
  subcategories?: Subcategory[];
};

interface EditableAnnonceFields {
  id?: number;
  title?: string;
  description?: string;
  email?: string;
  phone_number?: string;
  city_id?: number | string;
  country_id?: number | string;
  category_id?: number | string;
  subcategory_id?: number | string;
  images?: unknown;
  remove_existing_images?: unknown;
  is_active?: boolean;
  status?: string;
  new_images?: File[];
  [key: string]: unknown;
}

const AnnoncesList = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const token = useAuthStore((state) => state.token);
  const { data, isLoading, isError, refetch } = useUserAnnonces(token as string);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{ id: number } | null>(null);
  const [editAnnonce, setEditAnnonce] = useState<Annonce | null>(null);

  const handleDelete = async (id: number) => {
    setAlert(null);
    setConfirmDelete({ id });
  };

  const confirmDeleteAnnonce = async () => {
    if (!confirmDelete) return;
    try {
      await fetch(
        `${import.meta.env.VITE_API_V2_URL}/announces/id/${confirmDelete.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setAlert({ type: "success", message: t("annonces_page.delete_success") });
      refetch();
    } catch (err) {
      setAlert({ type: "error", message: t("annonces_page.delete_error") });
    }
    setTimeout(() => setAlert(null), 3000);
    setConfirmDelete(null);
  };

  const cancelDeleteAnnonce = () => {
    setConfirmDelete(null);
    setAlert(null);
  };

  const handleEdit = (annonce: Annonce) => {
    setEditAnnonce(annonce);
  };

  const saveEditAnnonce = async (updatedAnnonce: EditableAnnonceFields) => {
    const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

    const allowedFields = [
      "title",
      "description",
      "email",
      "phone_number",
      "city_id",
      "country_id",
      "category_id",
      "subcategory_id",
      "is_active",
      "status",
    ];
    const payload: { [key: string]: unknown } = {};
    allowedFields.forEach((field) => {
      if (updatedAnnonce[field] !== undefined) {
        if (
          ["city_id", "country_id", "category_id", "subcategory_id"].includes(field) &&
          updatedAnnonce[field] !== "" &&
          !isNaN(Number(updatedAnnonce[field]))
        ) {
          payload[field] = Number(updatedAnnonce[field]);
        } else {
          payload[field] = updatedAnnonce[field];
        }
      }
    });

    if (updatedAnnonce.images && Array.isArray(updatedAnnonce.images)) {
      payload.remove_existing_images = (updatedAnnonce.images as any[]).length === 0;
    }

    if (!updatedAnnonce.id) {
      setAlert({ type: "error", message: "Annonce ID is missing." });
      return;
    }

    try {
      if (
        updatedAnnonce.new_images &&
        Array.isArray(updatedAnnonce.new_images) &&
        updatedAnnonce.new_images.length > 0
      ) {
        const formData = new FormData();
        Object.keys(payload).forEach((key) => {
          formData.append(key, String(payload[key]));
        });
        updatedAnnonce.new_images.forEach((file, index) => {
          formData.append(`images[${index}]`, file);
        });
        formData.append(`_method`, "PUT");

        await apiClientV2.post(`/announces/${updatedAnnonce.id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await apiClientV2.post(
          `/announces/id/${updatedAnnonce.id}`,
          { ...payload, _method: 'PUT' },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      }

      setAlert({ type: "success", message: t("annonces_page.update_success") });
      refetch();
    } catch (err: any) {
      setAlert({
        type: "error",
        message: err.response?.data?.message || t("annonces_page.update_error"),
      });
    }

    setTimeout(() => setAlert(null), 3000);
    setEditAnnonce(null);
  };

  const cancelEditAnnonce = () => {
    setEditAnnonce(null);
  };

  const EditAnnonceModal = ({
    annonce,
    onSave,
    onCancel,
  }: {
    annonce: Annonce;
    onSave: (a: Annonce) => void;
    onCancel: () => void;
  }) => {
    const [form, setForm] = useState<{ [key: string]: unknown }>({
      id: annonce.id,
      title: annonce.title || "",
      description: annonce.description || "",
      email: annonce.email || "",
      phone_number: annonce.phone_number || annonce.formatted_phone_number || "",
      city_id: annonce.city && "id" in annonce.city ? annonce.city.id : "",
      country_id: annonce.country && "id" in annonce.country ? annonce.country.id : "",
      category_id: annonce.subcategory?.category?.id ?? annonce.category_id ?? "",
      subcategory_id: annonce.subcategory?.id ?? annonce.subcategory_id ?? "",
      is_active: annonce.is_active ?? true,
      status: annonce.status || "pending",
      images: annonce.images || [],
      remove_existing_images: false,
    });
    const [categories, setCategories] = useState<Category[]>([]);
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

    useEffect(() => {
      fetch(`${import.meta.env.VITE_API_URL}/categories`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setCategories(data);
          } else if (Array.isArray(data.data)) {
            setCategories(data.data);
          } else {
            setCategories([]);
          }
        });
    }, []);

    const fetchSubcategories = useCallback((selectedCatId: number | string) => {
      if (!selectedCatId || isNaN(Number(selectedCatId))) {
        setSubcategories([]);
        return;
      }
      fetch(`${import.meta.env.VITE_API_URL}/subcategories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category_ids: [Number(selectedCatId)] }),
      })
        .then((res) => res.json())
        .then((data) => setSubcategories(Array.isArray(data) ? data : []))
        .catch(() => setSubcategories([]));
    }, []);

    const selectedCategoryId = form.category_id;
    useEffect(() => {
      if (selectedCategoryId && !isNaN(Number(selectedCategoryId))) {
        fetchSubcategories(selectedCategoryId);
      }
    }, [selectedCategoryId, fetchSubcategories]);

    useEffect(() => {
      if (categories && selectedCategoryId) {
        const selectedCat = categories.find((cat) => cat.id === Number(selectedCategoryId));
        setSubcategories(selectedCat?.subcategories || []);
      }
    }, [categories, selectedCategoryId]);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const catId = Number(e.target.value);
      const cat = categories.find((c) => c.id === catId);
      setForm((f) => ({
        ...f,
        category_id: catId,
        category: cat,
        subcategory_id: "",
        subcategory: "",
      }));
      setSubcategories(cat?.subcategories || []);
    };

    const handleSubcategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const subId = Number(e.target.value);
      const sub = subcategories.find((s) => s.id === subId);
      setForm((f) => ({ ...f, subcategory_id: subId, subcategory: sub }));
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-200 relative">
          <h2 className="text-xl font-bold mb-6 text-primary-orange border-b pb-3">
            {t("annonces_page.edit_modal_title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("annonces_page.title")} *
              </label>
              <input
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                value={form.title as string}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder={t("annonces_page.title_placeholder")}
                minLength={3}
                maxLength={255}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("annonces_page.email_label")}
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                value={form.email as string}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder={t("annonces_page.email_placeholder")}
                maxLength={255}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("annonces_page.phone_label")}
              </label>
              <input
                type="tel"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                value={form.phone_number as string}
                onChange={(e) => setForm((f) => ({ ...f, phone_number: e.target.value }))}
                placeholder={t("annonces_page.phone_placeholder")}
                maxLength={20}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("annonces_page.status_label")}
              </label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={form.is_active as boolean}
                  onChange={(e) => setForm((f) => ({ ...f, is_active: e.target.checked }))}
                  className="h-4 w-4 text-primary-orange focus:ring-primary-orange border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">{t("annonces_page.active_checkbox")}</label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("annonces_page.category_label")}
              </label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                value={
                  categories.some((cat) => String(cat.id) === String(form["category_id"]))
                    ? String(form["category_id"])
                    : ""
                }
                onChange={handleCategoryChange}
              >
                <option value="">{t("annonces_page.select_category")}</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {getLocalized(cat, 'label') || cat.label || cat.name || cat.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("annonces_page.subcategory_label")}
              </label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent disabled:bg-gray-100"
                value={String(form["subcategory_id"] ?? "")}
                onChange={handleSubcategoryChange}
                disabled={!form["category_id"]}
              >
                <option value="">{t("annonces_page.select_subcategory")}</option>
                {subcategories.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {getLocalized(sub, 'label') || sub.label || sub.name || sub.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="md:col-span-2 mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("annonces_page.description_label")} *
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
              value={form.description as string}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder={t("annonces_page.description_placeholder")}
              minLength={10}
              rows={4}
            />
          </div>
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            <button
              onClick={onCancel}
              className="px-6 py-2 rounded-md bg-white border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              {t("annonces_page.cancel")}
            </button>
            <button
              onClick={() => onSave(form as Annonce)}
              className="px-6 py-2 rounded-md bg-primary-orange text-white font-medium hover:bg-orange-600 transition-colors"
            >
              {t("annonces_page.save_button")}
            </button>
          </div>
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            &times;
          </button>
        </div>
      </div>
    );
  };

  if (isLoading) return <div className="text-center py-8">{t("annonces_page.loading")}</div>;
  if (isError) return <div className="text-center py-8 text-red-500">{t("annonces_page.error_loading")}</div>;

  return (
    <div className="overflow-x-auto">
      {alert && !confirmDelete && (
        <div
          className={`mb-4 px-4 py-3 rounded text-sm font-medium ${
            alert.type === "success"
              ? "bg-green-100 text-green-800 border border-green-200"
              : "bg-red-100 text-red-800 border border-red-200"
          }`}
          role="alert"
        >
          {alert.message}
        </div>
      )}
      {confirmDelete &&
        ReactDOM.createPortal(
          <ConfirmDeleteModal
            onConfirm={confirmDeleteAnnonce}
            onCancel={cancelDeleteAnnonce}
            message={t("annonces_page.confirm_delete")}
            cancelLabel={t("annonces_page.cancel")}
            deleteLabel={t("annonces_page.delete")}
          />,
          document.body
        )}
      {editAnnonce &&
        ReactDOM.createPortal(
          <EditAnnonceModal
            annonce={editAnnonce}
            onSave={saveEditAnnonce}
            onCancel={cancelEditAnnonce}
          />,
          document.body
        )}
      
      <table className="min-w-full bg-white border border-primary-orange/20 rounded-lg">
        <thead className="bg-primary-orange/10">
          <tr>
            <th className={`px-4 py-2 text-xs font-semibold text-primary-orange uppercase ${isRTL ? "text-right" : "text-left"}`}>
              {t("annonces_page.title")}
            </th>
            <th className={`px-4 py-2 text-xs font-semibold text-primary-orange uppercase ${isRTL ? "text-right" : "text-left"}`}>
              {t("annonces_page.description")}
            </th>
            <th className={`px-4 py-2 text-xs font-semibold text-primary-orange uppercase ${isRTL ? "text-right" : "text-left"}`}>
              {t("annonces_page.status")}
            </th>
            <th className={`px-4 py-2 text-xs font-semibold text-primary-orange uppercase ${isRTL ? "text-right" : "text-left"}`}>
              {t("annonces_page.date")}
            </th>
            <th className={`px-4 py-2 text-xs font-semibold text-primary-orange uppercase ${isRTL ? "text-right" : "text-left"}`}>
              {t("annonces_page.actions")}
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-8 text-center text-primary-orange/60">
                {t("annonces_page.no_annonces")}
              </td>
            </tr>
          )}
          {data?.data?.map((annonce: Annonce) => (
            <tr key={annonce.id} className="border-t border-primary-orange/10 hover:bg-primary-orange/5 transition-colors">
              <td className={`px-4 py-3 text-sm text-primary-orange underline font-medium ${isRTL ? "text-right" : "text-left"}`}>
                <Link target="_blank" to={`/annonces/${annonce.slug}`}>
                  {annonce.title}
                </Link>
              </td>
              <td className={`px-4 py-3 ${isRTL ? "text-right" : "text-left"}`}>
                <span className="text-sm font-medium rounded px-2 py-1">
                  {annonce.description
                    ? annonce.description.length > 30
                      ? `${annonce.description.slice(0, 30)}...`
                      : annonce.description
                    : "-"}
                </span>
              </td>
              <td className={`px-4 py-3 ${isRTL ? "text-right" : "text-left"}`}>
                {(() => {
                  const activationStatus = (annonce as any).activation_status ?? (annonce as any).status;
                  const isActive = activationStatus === "active" || activationStatus === 1 || (annonce as any).is_active === true || (annonce as any).is_active === 1;
                  return (
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        isActive
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : "bg-gray-100 text-gray-700 border border-gray-200"
                      }`}
                    >
                      {isActive ? t("annonces_page.active") : t("annonces_page.inactive")}
                    </span>
                  );
                })()}
              </td>
              <td className={`px-4 py-3 text-gray-700 ${isRTL ? "text-right" : "text-left"}`}>
                {annonce.created_at ? getTranslatedDate(annonce.created_at, i18n.language) : "-"}
              </td>
              <td className={`px-4 py-3 text-sm flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                <button
                  className="text-primary-orange hover:text-primary-orange/80"
                  title={t("annonces_page.edit")}
                  onClick={() => handleEdit(annonce)}
                >
                  <span className="text-lg font-bold">✏️</span>
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  title={t("annonces_page.delete")}
                  onClick={() => handleDelete(annonce.id)}
                >
                  <span className="text-lg font-bold">🗑️</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnnoncesListPage;