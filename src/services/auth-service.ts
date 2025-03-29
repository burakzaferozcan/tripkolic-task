import axios from "axios";
import { UserCredentials, ApiResponse } from "@/types";

const API_URL = "https://api.tripkolic.com/api/v1/task";

export const authService = {
  login: async (credentials: UserCredentials): Promise<ApiResponse> => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Giriş işlemi başarısız oldu");
    }
  },

  // Kullanıcı profil bilgilerini çekmek için mock fonksiyon
  // Gerçek API olmadığı için profil bilgilerini burada simüle ediyoruz
  getUserProfile: async () => {
    return {
      companyDetails: {
        operatorId: "2324234234",
        companyNumber: "453536565456",
        legalName: "Kamil koç co.ltd",
        tatNumber: "23/4536536",
        vatNumber: "34635636353635",
        address:
          "atatürk bulvarı 1234 sokak ayden apartmanı no:23 gayrettepe istanbul",
      },
      bankDetails: {
        accountType: "Bireysel/şirket hesabı ikisinden birini seçecek",
        bankName: "Kasikorn bankası iStane banka ismi olacak",
        accountName: "Hakan kizilkaya",
        accountNumber: "3635635635 on haneli olacak",
      },
      contactDetails: {
        companyOwnerName: "Hakan kizilkaya",
        phoneNumber: "+6687997755",
        officePhoneNumber1: "+66758575858",
        officePhoneNumber2: "+66858758758",
      },
      settings: {
        password: "^^^^^^^^^^^^",
        email: "Hakankizi^^^^^^@gmail.com",
      },
    };
  },
};
