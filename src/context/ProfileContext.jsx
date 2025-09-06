import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./authContext";
import { useStudentApi } from "../Services/studentAPi";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const getProfileData = async () => {
    if (!user?.id || !user?.studentType) return;

    try {
      const res = await useStudentApi.getStudentData(user.id);
      console.log("Fetching profile data for user:", user.id);
      console.log("Response from API:", res);
      if (res.success) {
        const data = res.data;
        console.log("Profile data fetched:", data);
        const formatted = {
          name: data.student.name,
          email: data.student.email,
          mobile: data.student.mobile,
          studentType: data.student.studentType,
          isComplete: !!(
            data.student.name &&
            data.student.email &&
            data.student.profilePicture
          ),
        };
        setProfile(formatted);
      }
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfileData();
  }, [user]);

  return (
    <ProfileContext.Provider
      value={{ profile, loading, refreshProfile: getProfileData }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
