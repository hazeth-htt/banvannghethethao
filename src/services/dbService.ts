export interface Submission {
  id: string;
  submittedAt: string;
  hoTen: string;
  mssv: string;
  khoa: string;
  truongKhoa: string;
  lop: string;
  sdt: string;
  facebook: string;
  email: string;
  mang: string;
  bietGi: string;
  lyDo: string;
  answers: Record<string, string>;
}

const STORAGE_KEY = "bvntt_submissions";

// Local backup
export const getLocalSubmissions = (): Submission[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
};

export const saveLocalSubmission = (sub: Submission) => {
  try {
    const existing = getLocalSubmissions();
    existing.unshift(sub);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (e) {
    console.warn("Could not save to localStorage", e);
  }
};

/**
 * Gửi đơn ứng tuyển:
 * 1. Gửi lên Neon Database qua /api/submissions
 * 2. Lưu dự phòng vào localStorage
 */
export async function submitApplication(data: Omit<Submission, "id" | "submittedAt">): Promise<{ success: boolean; id?: string }> {
  const tempId = crypto.randomUUID();
  const tempSub: Submission = {
    ...data,
    id: tempId,
    submittedAt: new Date().toISOString(),
  };

  // 1. Lưu backup cục bộ
  saveLocalSubmission(tempSub);

  // 2. Gửi lên Neon Database
  try {
    const res = await fetch("/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const json = await res.json();
      return { success: true, id: json.id || tempId };
    }
  } catch (err) {
    console.error("Lỗi khi kết nối Neon Database API:", err);
  }

  return { success: true, id: tempId };
}

/**
 * Lấy danh sách đơn từ Neon Database (với fallback localStorage)
 */
export async function fetchSubmissions(): Promise<Submission[]> {
  try {
    const res = await fetch("/api/submissions");
    if (res.ok) {
      const data: Submission[] = await res.json();
      if (Array.isArray(data)) {
        // Đồng bộ vào localStorage để cache
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        return data;
      }
    }
  } catch (err) {
    console.warn("Không thể fetch từ /api/submissions, dùng dữ liệu cache:", err);
  }

  return getLocalSubmissions();
}

/**
 * Xoá một đơn theo ID
 */
export async function deleteSubmission(id: string): Promise<boolean> {
  // Xoá cục bộ trước
  try {
    const local = getLocalSubmissions().filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(local));
  } catch {}

  // Gửi lệnh xoá lên Neon
  try {
    const res = await fetch(`/api/submissions?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    return res.ok;
  } catch {
    return false;
  }
}
