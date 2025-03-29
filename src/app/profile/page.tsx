"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EditIcon, LogoutIcon } from "@/components/Icons";
import { MainLayout } from "@/components/layouts/MainLayout";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfilePage() {
  const { user, profile, logout } = useAuth();
  const router = useRouter();

  // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
  useEffect(() => {
    if (!user || !user.isLoggedIn) {
      router.push("/login");
    }
  }, [user, router]);

  if (!profile) {
    return (
      <MainLayout>
        <div className="min-h-screen flex justify-center items-center">
          <p>Yükleniyor...</p>
        </div>
      </MainLayout>
    );
  }

  const navigationItems = [
    {
      id: "profile",
      label: "Profile",
      isActive: true,
      icon: "/icons/profile.svg",
    },
    { id: "users", label: "Users", isActive: false, icon: "/icons/users.svg" },
    {
      id: "products",
      label: "Products",
      isActive: false,
      icon: "/icons/products.svg",
    },
    {
      id: "seller",
      label: "Seller",
      isActive: false,
      icon: "/icons/seller.svg",
    },
  ];

  return (
    <MainLayout title="Profile - ORCA Softwares">
      <div className="min-h-screen bg-gray-100">
        {/* Üst Navigasyon */}
        <nav className="bg-white shadow">
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto py-2">
              {navigationItems.map((item) => (
                <div
                  key={item.id}
                  className={`flex-shrink-0 px-6 py-2 flex flex-col items-center ${
                    item.isActive
                      ? "text-orange-500 border-b-2 border-orange-500"
                      : "text-gray-600"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </nav>

        {/* Profil İçeriği */}
        <div className="container mx-auto p-4">
          {/* Şirket Detayları */}
          <Card
            title="Company details"
            rightIcon={<EditIcon className="text-gray-600 cursor-pointer" />}
          >
            <div className="flex">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex-shrink-0 mr-4">
                {/* Placeholder for profile image */}
              </div>
              <div className="grid grid-cols-2 gap-2 flex-grow">
                <div className="text-right text-gray-600">Operator ID:</div>
                <div>{profile.companyDetails.operatorId}</div>

                <div className="text-right text-gray-600">Company Number:</div>
                <div>{profile.companyDetails.companyNumber}</div>

                <div className="text-right text-gray-600">Legal name:</div>
                <div>{profile.companyDetails.legalName}</div>

                <div className="text-right text-gray-600">TAT Number:</div>
                <div>{profile.companyDetails.tatNumber}</div>

                <div className="text-right text-gray-600">VAT number:</div>
                <div>{profile.companyDetails.vatNumber}</div>

                <div className="text-right text-gray-600">Address:</div>
                <div>{profile.companyDetails.address}</div>
              </div>
            </div>
          </Card>

          {/* Banka Detayları */}
          <Card
            title="Bank Details"
            rightIcon={<EditIcon className="text-gray-600 cursor-pointer" />}
          >
            <div className="grid grid-cols-3 gap-2">
              <div className="text-gray-600">Account Type</div>
              <div className="col-span-2">
                {profile.bankDetails.accountType}
              </div>

              <div className="text-gray-600">Bank name:</div>
              <div className="col-span-2">{profile.bankDetails.bankName}</div>

              <div className="text-gray-600">Account Name:</div>
              <div className="col-span-2">
                {profile.bankDetails.accountName}
              </div>

              <div className="text-gray-600">Account Number</div>
              <div className="col-span-2">
                {profile.bankDetails.accountNumber}
              </div>
            </div>
          </Card>

          {/* İletişim Detayları */}
          <Card
            title="Contact details"
            rightIcon={<EditIcon className="text-gray-600 cursor-pointer" />}
          >
            <div className="grid grid-cols-3 gap-2">
              <div className="text-gray-600">Company owner name</div>
              <div className="col-span-2">
                {profile.contactDetails.companyOwnerName}
              </div>

              <div className="text-gray-600">Phone number</div>
              <div className="col-span-2">
                {profile.contactDetails.phoneNumber}
              </div>

              <div className="text-gray-600">Office phone number</div>
              <div className="col-span-2">
                {profile.contactDetails.officePhoneNumber1}
              </div>

              <div className="text-gray-600">Office phone number</div>
              <div className="col-span-2">
                {profile.contactDetails.officePhoneNumber2}
              </div>
            </div>
          </Card>

          {/* Ayarlar */}
          <Card
            title="Settings"
            rightIcon={<EditIcon className="text-gray-600 cursor-pointer" />}
          >
            <div className="grid grid-cols-3 gap-2">
              <div className="text-gray-600">Change password</div>
              <div className="col-span-2">{profile.settings.password}</div>

              <div className="text-gray-600">Change mail</div>
              <div className="col-span-2">{profile.settings.email}</div>
            </div>
          </Card>

          {/* Çıkış Butonu */}
          <div className="flex justify-end mt-4">
            <Button
              variant="primary"
              className="flex items-center gap-2"
              onClick={logout}
            >
              <LogoutIcon /> Log out
            </Button>
          </div>
        </div>

        {/* Alt Navigasyon */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3">
          <div className="container mx-auto">
            <div className="flex justify-around items-center">
              <div className="flex flex-col items-center text-gray-600">
                <span className="text-sm">Bookings</span>
              </div>
              <div className="flex flex-col items-center text-gray-600">
                <span className="text-sm">Invoice</span>
              </div>
              <div className="flex flex-col items-center text-gray-600">
                <span className="text-sm">Messages</span>
              </div>
              <div className="flex flex-col items-center text-gray-600">
                <span className="text-sm">Report</span>
              </div>
              <div className="flex flex-col items-center text-orange-500">
                <span className="text-sm">Profile</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
